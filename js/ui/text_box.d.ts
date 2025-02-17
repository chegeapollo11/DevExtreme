import {
    UserDefinedElement,
} from '../core/element';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import {
    ValueChangedInfo,
} from './editor/editor';

import dxTextEditor, {
    dxTextEditorOptions,
} from './text_box/ui.text_editor.base';

/** @public */
export type ChangeEvent = NativeEventInfo<dxTextBox, Event>;

/** @public */
export type ContentReadyEvent = EventInfo<dxTextBox>;

/** @public */
export type CopyEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/** @public */
export type CutEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/** @public */
export type DisposingEvent = EventInfo<dxTextBox>;

/** @public */
export type EnterKeyEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/** @public */
export type FocusInEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/** @public */
export type FocusOutEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxTextBox>;

/** @public */
export type InputEvent = NativeEventInfo<dxTextBox, UIEvent & { target: HTMLInputElement }>;

/** @public */
export type KeyDownEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/** @public */
export type KeyPressEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/** @public */
export type KeyUpEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/** @public */
export type OptionChangedEvent = EventInfo<dxTextBox> & ChangedOptionInfo;

/** @public */
export type PasteEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/** @public */
export type ValueChangedEvent = NativeEventInfo<dxTextBox, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 */
export interface dxTextBoxOptions<T = dxTextBox> extends dxTextEditorOptions<T> {
    /**
     * @docid
     * @default null
     * @public
     */
    maxLength?: string | number;
    /**
     * @docid
     * @type Enums.TextBoxMode
     * @default "text"
     * @public
     */
    mode?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /**
     * @docid
     * @default ""
     * @public
     */
    value?: string;
}
/**
 * @docid
 * @isEditor
 * @inherits dxTextEditor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxTextBox extends dxTextEditor {
    constructor(element: UserDefinedElement, options?: dxTextBoxOptions)
}

/** @public */
export type Properties = dxTextBoxOptions;

/** @deprecated use Properties instead */
export type Options = dxTextBoxOptions;

/** @deprecated use Properties instead */
export type IOptions = dxTextBoxOptions;
