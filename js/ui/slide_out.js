import $ from '../core/renderer';
import { getPublicElement } from '../core/element';
import { noop } from '../core/utils/common';
import { isDefined } from '../core/utils/type';
import registerComponent from '../core/component_registrator';
import { extend } from '../core/utils/extend';
import PlainEditStrategy from './collection/ui.collection_widget.edit.strategy.plain';
import SlideOutView from './slide_out_view';
import CollectionWidget from './collection/ui.collection_widget.edit';
import List from './list';
import { ChildDefaultTemplate } from '../core/templates/child_default_template';
import { EmptyTemplate } from '../core/templates/empty_template';
import DataConverterMixin from './shared/grouped_data_converter_mixin';

// STYLE slideOut

const SLIDEOUT_CLASS = 'dx-slideout';
const SLIDEOUT_ITEM_CONTAINER_CLASS = 'dx-slideout-item-container';
const SLIDEOUT_MENU = 'dx-slideout-menu';

const SLIDEOUT_ITEM_CLASS = 'dx-slideout-item';
const SLIDEOUT_ITEM_DATA_KEY = 'dxSlideoutItemData';

const SlideOut = CollectionWidget.inherit({
    ctor: function(element, options) {
        this.callBase(element, options);
        this._logDeprecatedComponentWarning('20.1', 'dxDrawer');
    },

    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            activeStateEnabled: false,

            menuItemTemplate: 'menuItem',

            swipeEnabled: true,

            menuVisible: false,

            menuPosition: 'normal',


            menuGrouped: false,

            menuGroupTemplate: 'menuGroup',

            onMenuItemRendered: null,

            onMenuGroupRendered: null,

            contentTemplate: 'content',

            selectionMode: 'single',

            selectedIndex: 0,

            selectionRequired: true

            /**
            * @name dxSlideOutOptions.selectedItems
            * @hidden
            */

            /**
            * @name dxSlideOutOptions.selectedItemKeys
            * @hidden
            */

            /**
            * @name dxSlideOutOptions.keyExpr
            * @hidden
            */

            /**
            * @name dxSlideOutOptions.focusStateEnabled
            * @hidden
            */

            /**
            * @name dxSlideOutOptions.accessKey
            * @hidden
            */

            /**
            * @name dxSlideOutOptions.tabIndex
            * @hidden
            */
        });
    },

    _itemClass: function() {
        return SLIDEOUT_ITEM_CLASS;
    },

    _itemDataKey: function() {
        return SLIDEOUT_ITEM_DATA_KEY;
    },

    _itemContainer: function() {
        return $(this._slideOutView.content());
    },

    _init: function() {
        this._selectedItemContentRendered = false;
        this.callBase();
        this.$element().addClass(SLIDEOUT_CLASS);
        this._initSlideOutView();
    },

    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            menuItem: new ChildDefaultTemplate('item'),
            menuGroup: new ChildDefaultTemplate('group'),
            content: new EmptyTemplate()
        });
    },

    _initEditStrategy: function() {
        if(this.option('menuGrouped')) {
            const strategy = PlainEditStrategy.inherit({

                _getPlainItems: function() {
                    return this.callBase().reduce((result, group) => {
                        result.push.apply(result, group.items);
                        return result;
                    }, []);
                }

            });

            this._editStrategy = new strategy(this);
        } else {
            this.callBase();
        }
    },

    _initSlideOutView: function() {
        this._slideOutView = this._createComponent(this.$element(), SlideOutView, {
            integrationOptions: {},
            menuVisible: this.option('menuVisible'),
            swipeEnabled: this.option('swipeEnabled'),
            menuPosition: this.option('menuPosition'),
            onOptionChanged: this._slideOutViewOptionChanged.bind(this)
        });

        this._itemContainer().addClass(SLIDEOUT_ITEM_CONTAINER_CLASS);
    },

    _slideOutViewOptionChanged: function(args) {
        if(args.name === 'menuVisible') {
            this.option(args.name, args.value);
        }
    },

    _initMarkup: function() {
        this._renderList();

        this._renderContentTemplate();

        this.callBase();
    },

    _render: function() {
        // TODO: remove this, needed for memory leak tests
        this._slideOutView._renderShield();

        this.callBase();
    },

    _renderList: function() {
        const $list = this._list && this._list.$element() || $('<div>').addClass(SLIDEOUT_MENU).appendTo($(this._slideOutView.menuContent()));

        this._renderItemClickAction();

        this._list = this._createComponent($list, List, {
            itemTemplateProperty: 'menuTemplate',
            selectionMode: this.option('selectionMode'),
            selectionRequired: this.option('selectionRequired'),
            indicateLoading: false,
            onItemClick: this._listItemClickHandler.bind(this),
            items: this.option('items'),
            dataSource: this._dataSource,
            itemTemplate: this._getTemplateByOption('menuItemTemplate'),
            grouped: this.option('menuGrouped'),
            groupTemplate: this._getTemplateByOption('menuGroupTemplate'),
            onItemRendered: this.option('onMenuItemRendered'),
            onGroupRendered: this.option('onMenuGroupRendered'),
            onContentReady: this._updateSlideOutView.bind(this)
        });

        this._list.option('selectedIndex', this.option('selectedIndex'));
    },

    _getGroupedOption: function() {
        return this.option('menuGrouped');
    },

    _updateSlideOutView: function() {
        this._slideOutView._dimensionChanged();
    },

    _renderItemClickAction: function() {
        this._itemClickAction = this._createActionByOption('onItemClick');
    },

    _listItemClickHandler: function(e) {
        const selectedIndex = this._list.$element().find('.dx-list-item').index(e.itemElement);
        this.option('selectedIndex', selectedIndex);
        this._itemClickAction(e);
    },

    _renderContentTemplate: function() {
        if(isDefined(this._singleContent)) {
            return;
        }

        const itemsLength = this._itemContainer().html().length;
        this._getTemplateByOption('contentTemplate').render({
            container: getPublicElement(this._itemContainer())
        });
        this._singleContent = this._itemContainer().html().length !== itemsLength;
    },

    _itemClickHandler: noop,

    _renderContentImpl: function() {
        if(this._singleContent) {
            return;
        }

        const items = this.option('items');
        const selectedIndex = this.option('selectedIndex');

        if(items.length && selectedIndex > -1) {
            this._selectedItemContentRendered = true;
            const selectedItem = this._list.getItemByIndex(selectedIndex);
            this._renderItems([selectedItem]);
        }
    },

    _renderItem: function(index, item) {
        this._itemContainer().find('.' + SLIDEOUT_ITEM_CLASS).remove();
        this.callBase(index, item);
    },

    _selectedItemElement: function() {
        return this._itemElements().eq(0);
    },

    _updateSelection: function() {
        this._prepareContent();
        this._renderContent();
    },

    _getListWidth: function() {
        return this._slideOutView._getMenuWidth();
    },

    _changeMenuOption: function(name, value) {
        this._list.option(name, value);
        this._updateSlideOutView();
    },

    _cleanItemContainer: function() {
        if(this._singleContent) {
            return;
        }

        this.callBase();
    },

    beginUpdate: function() {
        this.callBase();
        this._list && this._list.beginUpdate();
    },

    endUpdate: function() {
        this._list && this._list.endUpdate();
        this.callBase();
    },

    _optionChanged: function(args) {
        const name = args.name;
        const value = args.value;

        switch(name) {
            case 'menuVisible':
            case 'swipeEnabled':
            case 'rtlEnabled':
            case 'menuPosition':
                this._slideOutView.option(name, value);
                break;
            case 'width':
                this.callBase(args);
                this._updateSlideOutView();
                break;
            case 'menuItemTemplate':
                this._changeMenuOption('itemTemplate', this._getTemplate(value));
                break;
            case 'items':
                this._changeMenuOption('items', this.option('items'));
                if(!this._selectedItemContentRendered) {
                    this._updateSelection();
                }
                break;
            case 'dataSource':
            case 'selectedIndex':
            case 'selectedItem':
                this._changeMenuOption(name, value);
                this.callBase(args);
                break;
            case 'menuGrouped':
                this._initEditStrategy();
                this._changeMenuOption('grouped', value);
                break;
            case 'menuGroupTemplate':
                this._changeMenuOption('groupTemplate', this._getTemplate(value));
                break;
            case 'onMenuItemRendered':
                this._changeMenuOption('onItemRendered', value);
                break;
            case 'onMenuGroupRendered':
                this._changeMenuOption('onGroupRendered', value);
                break;
            case 'onItemClick':
                this._renderItemClickAction();
                break;
            case 'contentTemplate':
                this._singleContent = null;
                this._invalidate();
                break;
            default:
                this.callBase(args);
        }
    },

    showMenu: function() {
        return this._slideOutView.toggleMenuVisibility(true);
    },

    hideMenu: function() {
        return this._slideOutView.toggleMenuVisibility(false);
    },

    toggleMenuVisibility: function(showing) {
        return this._slideOutView.toggleMenuVisibility(showing);
    }

    /**
    * @name dxSlideOut.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxSlideOut.focus
    * @publicName focus()
    * @hidden
    */
}).include(DataConverterMixin);

registerComponent('dxSlideOut', SlideOut);

export default SlideOut;

/**
 * @name dxSlideOutItem
 * @inherits CollectionWidgetItem
 * @type object
 */
