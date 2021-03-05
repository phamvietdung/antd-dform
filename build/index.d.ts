/** @module AntDesignDFormManager */
/// <reference types="react" />
/** Representer for form manager, build-in
 *
 * @FormManager
 *
 * @param {IField} fields define each field config
 * @param {Object} default define initial value
 * @param {FormInstance} form represented for form instance
 * @param {horizontal|vertical} layout optional choose horizontal or vertial layout
 */
declare const FormManager: (props: {
    fields: any[];
    default: Object;
    option?: any;
    form: any;
    layout?: "horizontal" | "vertical" | undefined;
}) => JSX.Element;
/** @SelectRemote2 */
export declare const SelectRemote2: (props: {
    service: any;
    id: string;
    label: string;
    value?: any;
}) => JSX.Element;
/** @SelectRemote */
/** select ajax remote component
 *  build-in with love <3
 *  value was props into child-component automatically
 */
export declare const SelectRemote: (props: {
    name: string;
    service: any;
    id: string;
    label: string;
    placeholder: string;
    disabled: boolean;
    value?: any;
    onChange?: Function | undefined;
}) => JSX.Element;
/** @MultipleInput */
/**
 * default data source model :
 * {
 *      value : string,
 *      checked : boolean,
 *      prefixValue : string
 * }
 */
export declare const MultipleInput: (props: {
    name?: string | undefined;
    value?: any;
    onChange?: any;
    dataSource?: Object[] | undefined;
    defaultPrefix?: string | undefined;
    label: string;
    required?: boolean | undefined;
}) => JSX.Element;
/** @SelectMultipleRemote */
export declare const SelectMultipleRemote: (props: {
    name: string;
    service: any;
    id: string;
    label: string;
    placeholder: string;
    disabled: boolean;
    value?: any;
    onChange?: Function | undefined;
}) => JSX.Element;
export default FormManager;
