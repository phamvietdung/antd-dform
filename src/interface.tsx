import React from 'react';

/** 
 * @name IConst
 * @interface
 * @property {number} INPUT_MAX_VALUE maximum number value accepted
 * @property {string} SELECT_DEFAULT_ID_NAME default property of id
 * @property {string} SELECT_DEFAULT_LABEL_NAME default property of name
 * @property {string} SELECT_DEFAULT_PLACEHOLDER default placeholder text
 * @property {string} INPUT_DATE_TIME_SHORT_FORMAT default datetime text in short format
 * @property {string} INPUT_DATE_TIME_LONG_FORMAT default datetime text in long format
 * */

export interface IConst {
    INPUT_MAX_VALUE: number,
    SELECT_DEFAULT_ID_NAME: string,
    SELECT_DEFAULT_LABEL_NAME: string,
    SELECT_DEFAULT_PLACEHOLDER: string,
    INPUT_DATE_TIME_SHORT_FORMAT: string,
    INPUT_DATE_TIME_LONG_FORMAT: string
}

/**
 * @name IFieldType
 * @type
 * @property {string} input
 * @property {string} password
 * @property {string} datetime
 * @property {string} datetimeRange
 * @property {string} datetimeRange
 * @property {string} time
 * @property {string} number
 * @property {string} textarea
 * @property {string} select
 * @property {string} heading
 * @property {string} radio
 * @property {string} checkbox
 * @property {string} selectMultiple
 * @property {string} hidden
 * @property {string} multipleValue
 * 
 */
export type IFieldType = 'input' | 'password' | 'datetime' | 'datetimeRange'
    | 'time' | 'number' | 'textarea' | 'select' | 'heading' | 'radio'
    | 'checkbox' | 'confirm' | 'selectMultiple' | 'hidden' | 'multiple-value';

/**
 * @name IField
 * @interface
 */

export interface IField {
    /** custom type
     * @IFieldType
     */
    type: IFieldType,
    /** unique name */
    name: string,
    /** label */
    label: string,
    /** required or not */
    required?: boolean,
    /** placeholder for input or textarea, select */
    placeholder?: string,
    /** work at datetime type */
    showTime?: boolean,
    /** Represent data source, support remote option
     * @IDataSource
     */
    dataSource?: IDataSource,
    /** Setting disabled base on rule */
    disabled?: IConditionFunction | boolean,
    visible?: IConditionFunction | boolean,
    span?: number
    rows?: number,
    maxLength?: number,
    defaultPrefix?: string,
    rule?: Function
}

/**
 * @name IDataSource
 * @interface
 */

export interface IDataSource {
    id?: string,
    label?: string,
    data?: Array<Object>,
    dataRemote?: IDataRemote,//Function,
    /** @default when remote had set data before loading */
    default?: any,
    /** @multiple */
    multiple?: boolean
}

/**
 * @name IDataRemote
 * @type
 */

export type IDataRemote = (search?: string, id?: any) => Promise<any>;

/**
 * @name IConditionFunction
 * @type
 */

export type IConditionFunction = (obj: Object) => boolean;

/**
 * @name IConditionFunction
 * @type
 * @property {string} size
 * @property {string} layout
 */

export interface IOption {
    size: string,
    layout: string
}