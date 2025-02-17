import {
    UserDefinedElement,
} from '../../core/element';

import CollectionWidget, {
    CollectionWidgetOptions,
} from '../collection/ui.collection_widget.base';

/** @namespace DevExpress.ui */
export interface HierarchicalCollectionWidgetOptions<T = HierarchicalCollectionWidget> extends CollectionWidgetOptions<T> {
    /**
     * @docid
     * @default 'disabled'
     * @public
     */
    disabledExpr?: string | Function;
    /**
     * @docid
     * @default 'text'
     * @type_function_param1 item:object
     * @public
     */
    displayExpr?: string | ((item: any) => string);
    /**
     * @docid
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid
     * @default 'items'
     * @public
     */
    itemsExpr?: string | Function;
    /**
     * @docid
     * @default 'id'
     * @public
     */
    keyExpr?: string | Function;
    /**
     * @docid
     * @default 'selected'
     * @public
     */
    selectedExpr?: string | Function;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @hidden
 * @namespace DevExpress.ui
 */
export default class HierarchicalCollectionWidget extends CollectionWidget {
    constructor(element: UserDefinedElement, options?: HierarchicalCollectionWidgetOptions)
}
