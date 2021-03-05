/** @module AntDesignDFormManager */

import React, { useEffect, useRef, useState } from 'react';

import { Form, Input, Button, Select, ConfigProvider, DatePicker, InputNumber, Radio, Switch, Checkbox, TimePicker, Row, Col, Space } from 'antd';

import { IConst, IField, IOption, IConditionFunction, IDataRemote } from './interface';

import TextArea from 'antd/lib/input/TextArea';

import { v4 as uuid } from 'uuid';

import { CheckOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'

import { CheckboxValueType } from 'antd/lib/checkbox/Group';

/** @todo localization */
let INPUT_MAX_VALUE = 999999999999999;
let SELECT_DEFAULT_ID_NAME = 'id';
let SELECT_DEFAULT_LABEL_NAME = 'label';
let SELECT_DEFAULT_PLACEHOLDER = '';
let INPUT_DATE_TIME_SHORT_FORMAT = 'DD/MM/YYYY';
let INPUT_DATE_TIME_LONG_FORMAT = 'DD/MM/YYYY HH:mm:ss';

let NotFoundItem  = (props : any) => <>Not Found, but it's update from npm link</>;

const { RangePicker } = DatePicker;

const { Option } = Select;

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/** Representer for form manager, build-in 
 * 
 * @FormManager
 * 
 * @param {IField} fields define each field config
 * @param {Object} default define initial value
 * @param {FormInstance} form represented for form instance
 * @param {horizontal|vertical} layout optional choose horizontal or vertial layout 
 */

const FormManager = (props: { fields: IField[], default: Object, option?: IOption, form: any, layout?: 'horizontal' | 'vertical' }) => {

    const [formId, setFormId] = useState<string>("");

    const [fields, setFields] = useState(props.fields);

    const [values, setValues] = useState<any>(props.default);

    const formRef = props.form; //useRef(props.form);

    useEffect(() => {

        setValues(props.default);

        formRef.current?.setFieldsValue(props.default);

        formRef.current!.resetFields();

        setFields(props.fields);

    }, [props.default, props.fields]);

    useEffect(() => {
        setFormId(uuid());
    }, [])

    let layout: any;

    switch (props.layout) {
        case undefined:
            layout = {
                layout: 'vertical',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            break;
        case 'horizontal':
            layout = {
                layout: 'horizontal',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            break;
        case 'horizontal':
            layout = {
                layout: 'vertical',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            }
            break;
        // case 'inline' : 
        //     layout = {
        //         layout : 'inline',
        //         labelCol : {span : 24},
        //         wrapperCol : {span : 24}
        //     }
        //     break;
    }

    const onFinish = (values: any) => {
        //console.log(values);
    };

    /** @onChangeHandler manual update value to correct property */
    const onChangeHandler = (name: string, value: any) => {

        let _o = Object.create({});

        _o[name] = value;

        formRef.current!.setFieldsValue(_o);
    }

    /** @getDefaultValue */
    const getDefaultValue = (propertyName: string) => (obj: Record<string, any>) => obj[propertyName] ?? undefined;

    /** @getDefaultArray */
    const getDefaultArray = (propertyName: string) => (obj: Record<string, any>): Array<CheckboxValueType> => obj[propertyName] ?? [];

    /** @getDefaultValueGeneric */
    const getDefaultValueBoolean = (propertyName: string) => (obj: Record<string, any>) => Boolean(obj[propertyName]);

    let timeout: any = undefined;

    /** @onValueChange */
    const onValueChange = (value: any, values: any) => {

        // if (timeout !== undefined)
        //     clearTimeout(timeout);

        // timeout = setTimeout(() => {
        //     setValues(values);
        // }, 350);

    }

    const onFieldChange = (field: any, fields: any) => {
        // console.log(field, fields);
    }

    const isDisabled = (disabled: undefined | boolean | IConditionFunction, field: string) => {

        let result = false;
        if (typeof (disabled) == 'boolean') {
            result = disabled;
        }
        else if (typeof (disabled) == 'function') {
            result = values == undefined ? result : disabled(values);
        }
        return result;
    }

    const isHidden = (visible: undefined | boolean | IConditionFunction, field: string) => {

        // console.log(visible, field)

        let result = true;
        if (typeof (visible) == 'boolean') {
            result = visible;
        }
        else if (typeof (visible) == 'function') {
            result = values == undefined ? result : visible(values);
        }
        return !result;
    }

    const defaultFieldOnChangeHandle = () => {
        /** @defaultFieldOnChangeHandle  */
        /** nothing to do here */
    }

    const propsWrapperHandle = (field: IField, index: number) => {
        return {
            span: field.span ?? 24,
            key: `${formId}-fields-${field.name}-${index}`
        }
    }

    const propsFormItemHandle = (field: IField) => {
        return {
            name: field.name,
            hidden: isHidden(field.visible, field.name),
            label: field.label,
            rules: [
                {
                    required: field.required ?? false
                }
            ]
        }
    }

    const propsFormItemHandleWithoutRule = (field: IField) => {
        return {
            name: field.name,
            hidden: isHidden(field.visible, field.name),
            label: field.label
        }
    }

    const propsItemHandle = () => {
        return {
            id: uuid(),
            name: `checkbox-group-${uuid()}`
        }
    }

    return (
        <ConfigProvider>
            <Form
                validateMessages={
                    {
                        required: "${label} là trường thông tin bắt buộc",
                    }
                }
                id={formId} {...layout} ref={formRef} name="control-ref" onFinish={onFinish} initialValues={props.default} layout={props.layout ?? "horizontal"} onValuesChange={onValueChange}
                onFieldsChange={onFieldChange}
            >
                <Row gutter={16}>
                    {
                        fields.map((field: IField, index: number) => {

                            switch (field.type) {
                                case 'hidden':
                                    return (
                                        <Form.Item name={field.name} key={`hidden-field-${index}`} hidden={true}>
                                            <Input autoComplete={undefined} {...propsItemHandle()} placeholder={field.placeholder ?? ""} disabled={isDisabled(field.disabled, field.name) ?? false} style={{ width: '100%' }} />
                                        </Form.Item>
                                    );
                                case 'input':
                                    return (
                                        <Col {...propsWrapperHandle(field, index)}  >
                                            {/* {isHidden(field.visible, field.name) ? 'true' : 'false'} */}
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <Input autoComplete={undefined} {...propsItemHandle()} placeholder={field.placeholder ?? ""} maxLength={field.maxLength ?? undefined} disabled={isDisabled(field.disabled, field.name) ?? false} style={{ width: '100%' }} />
                                            </Form.Item>

                                        </Col>
                                    );
                                case 'password':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <Input.Password {...propsItemHandle()} placeholder={field.placeholder ?? ""} disabled={isDisabled(field.disabled, field.name) ?? false} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>

                                    );
                                case 'textarea':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <TextArea {...propsItemHandle()} rows={field.rows ?? 1} placeholder={field.placeholder ?? ""} maxLength={field.maxLength} disabled={isDisabled(field.disabled, field.name) ?? false} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>

                                    );
                                case 'number':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <InputNumber
                                                    {...propsItemHandle()}
                                                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                                    style={{ width: '100%' }}
                                                    max={INPUT_MAX_VALUE}
                                                    disabled={isDisabled(field.disabled, field.name) ?? false}
                                                />
                                            </Form.Item>
                                        </Col>

                                    )

                                case 'datetime':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <DatePicker {...propsItemHandle()} style={{ width: '100%' }} showToday={true} showTime={field.showTime ?? false} disabled={isDisabled(field.disabled, field.name) ?? false} format={field.showTime ? INPUT_DATE_TIME_LONG_FORMAT : INPUT_DATE_TIME_SHORT_FORMAT} />
                                            </Form.Item>
                                        </Col>

                                    )
                                case 'time':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <TimePicker {...propsItemHandle()} style={{ width: '100%' }} showNow={true} disabled={isDisabled(field.disabled, field.name) ?? false} />
                                            </Form.Item>
                                        </Col>

                                    )
                                case 'datetimeRange':
                                    return (
                                        <Col  {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <RangePicker {...propsItemHandle()} style={{ width: '100%' }} showTime={field.showTime ?? false} disabled={isDisabled(field.disabled, field.name) ?? false} format={field.showTime ? INPUT_DATE_TIME_LONG_FORMAT : INPUT_DATE_TIME_SHORT_FORMAT} />
                                            </Form.Item>
                                        </Col>

                                    )
                                case 'select':
                                    if (field.dataSource == undefined)
                                        return (<> Component register failed! </>)
                                    else {
                                        if (field.dataSource!.data != undefined)
                                            return (
                                                <Col  {...propsWrapperHandle(field, index)}>
                                                    <Form.Item {...propsFormItemHandle(field)} >
                                                        <Select
                                                            {...propsItemHandle()}
                                                            disabled={isDisabled(field.disabled, field.name) ?? false}
                                                            showSearch
                                                            style={{ width: '100%' }}
                                                            placeholder={field.placeholder ?? ""}
                                                            defaultActiveFirstOption={false}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option: any) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                            allowClear={true}
                                                        >
                                                            {
                                                                field.dataSource != undefined
                                                                && field.dataSource!.data != undefined
                                                                && field.dataSource!.data!.map((select_data: any, select_index: any) => (
                                                                    <Option value={field.dataSource!.id !== undefined ? select_data[field.dataSource!.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${index}-${select_index}`}>
                                                                        {field.dataSource!.label !== undefined ? select_data[field.dataSource!.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                            )
                                        else {
                                            return (
                                                <Col  {...propsWrapperHandle(field, index)}>
                                                    <Form.Item {...propsFormItemHandle(field)} >
                                                        <SelectRemote
                                                            disabled={isDisabled(field.disabled, field.name) ?? false}
                                                            service={field.dataSource!.dataRemote!}
                                                            id={field.dataSource!.id ?? SELECT_DEFAULT_ID_NAME}
                                                            label={field.dataSource!.label ?? SELECT_DEFAULT_LABEL_NAME}
                                                            placeholder={field.placeholder ?? SELECT_DEFAULT_PLACEHOLDER}
                                                            //onChangeHandle={onChangeHandler}
                                                            name={field.name}
                                                        // default={props.default.hasOwnProperty(field.name) ? getDefaultValue(field.name)(props.default) : undefined }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                            )

                                        }

                                    }
                                case 'selectMultiple':
                                    if (field.dataSource == undefined)
                                        return (<> Component register failed! </>)
                                    else {
                                        if (field.dataSource!.data != undefined)
                                            return (
                                                <Col  {...propsWrapperHandle(field, index)}>
                                                    <Form.Item {...propsFormItemHandle(field)} >
                                                        <Select
                                                            {...propsItemHandle()}
                                                            mode="multiple"
                                                            disabled={isDisabled(field.disabled, field.name) ?? false}
                                                            // showSearch
                                                            style={{ width: '100%' }}
                                                            placeholder={field.placeholder ?? ""}
                                                            defaultActiveFirstOption={false}
                                                            optionFilterProp="children"
                                                            filterOption={(input, option: any) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                            allowClear={true}
                                                        >
                                                            {
                                                                field.dataSource != undefined
                                                                && field.dataSource!.data != undefined
                                                                && field.dataSource!.data!.map((select_data: any, select_index: any) => (
                                                                    <Option value={field.dataSource!.id !== undefined ? select_data[field.dataSource!.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${index}-${select_index}`}>
                                                                        {field.dataSource!.label !== undefined ? select_data[field.dataSource!.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>
                                                                ))
                                                            }
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                            )
                                        else {
                                            return (
                                                <Col {...propsWrapperHandle(field, index)}>
                                                    <Form.Item {...propsFormItemHandle(field)} >
                                                        <SelectMultipleRemote
                                                            disabled={isDisabled(field.disabled, field.name) ?? false}
                                                            service={field.dataSource!.dataRemote!}
                                                            id={field.dataSource!.id ?? SELECT_DEFAULT_ID_NAME}
                                                            label={field.dataSource!.label ?? SELECT_DEFAULT_LABEL_NAME}
                                                            placeholder={field.placeholder ?? SELECT_DEFAULT_PLACEHOLDER}
                                                            //onChangeHandle={onChangeHandler}
                                                            name={field.name}
                                                        // default={props.default.hasOwnProperty(field.name) ? getDefaultValue(field.name)(props.default) : undefined }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                            )

                                        }

                                    }
                                case 'radio':
                                    return (
                                        <Col {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} >
                                                <Radio.Group {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?? false}>
                                                    {
                                                        field.dataSource == undefined || field.dataSource.data == undefined
                                                            ? <>Undefined</>
                                                            : field.dataSource.data.map((radio_item: any, radio_item_index: number) => (
                                                                <Radio value={field.dataSource!.id !== undefined ? radio_item[field.dataSource!.id] : radio_item[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${radio_item_index}-${radio_item}`}>
                                                                    {field.dataSource!.label !== undefined ? radio_item[field.dataSource!.label] : radio_item[SELECT_DEFAULT_LABEL_NAME]}
                                                                </Radio>
                                                            ))
                                                    }
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>

                                    )
                                case 'checkbox':
                                    return (
                                        <Col {...propsWrapperHandle(field, index)}>

                                            <Form.Item
                                                {...propsFormItemHandle(field)}
                                                getValueProps={(value: any) => {
                                                    return value ?? [];
                                                }} >



                                                <Checkbox.Group
                                                    {...propsItemHandle()}
                                                    disabled={isDisabled(field.disabled, field.name) ?? false}
                                                    defaultValue={getDefaultValue(field.name)(props.default) ?? []}
                                                    options={field.dataSource?.data!.map((checkbox_value: any) => {


                                                        return {
                                                            value: field.dataSource!.id !== undefined ? checkbox_value[field.dataSource!.id] : checkbox_value[SELECT_DEFAULT_ID_NAME],
                                                            label: field.dataSource!.label !== undefined ? checkbox_value[field.dataSource!.label] : checkbox_value[SELECT_DEFAULT_LABEL_NAME]
                                                        }
                                                    })}
                                                />

                                            </Form.Item>
                                        </Col>

                                    )
                                case 'confirm':
                                    return (
                                        <Col {...propsWrapperHandle(field, index)}>
                                            <Form.Item {...propsFormItemHandle(field)} valuePropName="checked">
                                                {/* <Switch checkedChildren="Đồng ý" unCheckedChildren="Không đồng ý" /> */}
                                                <Switch
                                                    {...propsItemHandle()}
                                                    disabled={isDisabled(field.disabled, field.name) ?? false}
                                                    defaultChecked={getDefaultValueBoolean(field.name)(props.default)}
                                                    checkedChildren={<CheckOutlined />}
                                                    unCheckedChildren={<CloseOutlined />}
                                                />
                                            </Form.Item>

                                        </Col>

                                    )
                                case 'heading':
                                    return (
                                        <Col {...propsWrapperHandle(field, index)}>
                                            <h3 {...propsItemHandle()} key={`${formId}-fields-${field.name}-${index}`}>{field.label}</h3>
                                        </Col>

                                    )
                                case 'multiple-value':
                                    return (
                                        <>
                                            <Col {...propsWrapperHandle(field, index)}  >
                                                <Form.Item
                                                    // cause rule were defined bellow
                                                    {...propsFormItemHandleWithoutRule(field)}
                                                    normalize={(value, prevValue, prevValues) => { //(value, prevValue, prevValues)
                                                        return value;
                                                    }}
                                                    rules={[
                                                        {
                                                            validator: (rule, value) => {

                                                                // override all
                                                                if (field.required == undefined || field.required == false)
                                                                    return Promise.resolve();

                                                                if (field.rule == undefined)
                                                                    return Promise.resolve();
                                                                else {
                                                                    if (field.rule!(value))
                                                                        return Promise.resolve();
                                                                }

                                                                return Promise.reject();
                                                            },
                                                            message: `${field.label} là trường thông tin bắt buộc`,
                                                            required: field.required
                                                        }

                                                    ]}
                                                >
                                                    <MultipleInput label={field.label} dataSource={field.dataSource?.data} defaultPrefix={field.defaultPrefix} required={field.required} />

                                                </Form.Item>

                                            </Col>

                                        </>
                                    )
                            }
                        })
                    }
                </Row>
            </Form>
        </ConfigProvider >
    )

}

/** @SelectRemote2 */
export const SelectRemote2 = (props: { service: IDataRemote, id: string, label: string, value?: any }) => {

    const [domId] = useState(uuid());

    let timeout: any;

    let currentValue: any;


    const [data, setData] = useState<any>([]);

    // const [value, setValue] = useState<any>(undefined);

    useEffect(() => {

        let isMounted = true; // note this flag denote mount status
        // first time

        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response: any) => {

                let _tmp: any;

                if (response == null || response == undefined || response.length == 0) {

                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };

                } else {

                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label],
                    }

                }

                if (isMounted) {
                    setData([_tmp]);

                    // setValue(props.value)
                }

            });

        return () => { isMounted = false };

    }, []);


    const handleSearch = (value: any) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        currentValue = value;

        if (value) {
            props.service(currentValue).then((response: any) => {

                //console.log(response);
                setData(response.map((x: any) => {
                    return {
                        id: x[props.id],
                        label: x[props.label]
                    }
                }))
            })
        }
        else {
            setData([]);
        }
    };

    const handleChange = (value: any) => {
        // setValue(value);
    };

    return (
        <>
            {
                data!.map((d: any, i: number) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)
            }
        </>

    )


}

/** @SelectRemote */
/** select ajax remote component
 *  build-in with love <3
 *  value was props into child-component automatically
 */
export const SelectRemote = (props: {
    name: string, service: IDataRemote, id: string, label: string, placeholder: string, disabled: boolean, value?: any,
    //onChangeHandle: (name: string, value: any) => any 
    onChange?: Function//(name: string, value: any) => any 
}) => {

    const [domId, setDomId] = useState(uuid());

    let timeout: any;

    let currentValue: any;


    const [data, setData] = useState<any>([]);

    const [value, setValue] = useState<any>(undefined);

    useEffect(() => {

        let isMounted = true; // note this flag denote mount status
        // first time

        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response: any) => {

                let _tmp: any;

                if (response == null || response == undefined || response.length == 0) {

                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };

                } else {

                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label],
                    }

                }

                if (isMounted) {
                    setData([_tmp]);

                    setValue(props.value)
                }

            });

        return () => { isMounted = false };

    }, []);


    const handleSearch = (value: any) => {

        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }

        timeout = setTimeout(() => {
            currentValue = value;

            if (value) {
                props.service(currentValue).then((response: any) => {

                    //console.log(response);
                    setData(response.map((x: any) => {
                        return {
                            id: x[props.id],
                            label: x[props.label]
                        }
                    }))
                })
            }
            else {
                setData([]);
            }
        }, 500);
    };

    const handleChange = (value: any) => {
        setValue(value);

        //props.onChangeHandle(props.name, value);
        props.onChange!(value);

    };


    return (
        <Select
            style={{ width: '100%' }}
            disabled={props.disabled}
            showSearch
            value={value}
            placeholder={props.placeholder}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={NotFoundItem}
            allowClear={true}
        >
            {
                data!.map((d: any, i: number) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)
            }
        </Select>
    )

}

/** @MultipleInput */
/**
 * default data source model : 
 * {
 *      value : string,
 *      checked : boolean,
 *      prefixValue : string
 * }
 */
export const MultipleInput = (props: {
    name?: string, value?: any, onChange?: any,
    dataSource?: Object[],
    defaultPrefix?: string,
    label: string,
    required?: boolean
}) => {


    let default_value = props.value ?? [];

    let stable_stored: any = undefined;

    const dummy = { value: "", checked: false, prefixValue: "" };

    const lastFocus = useRef<any>(null);

    if (default_value.length == 0) {
        if (props.required === true)
            default_value = [dummy];
    }

    const [value, setValue] = useState<{ value: string, checked: boolean, prefixValue: string }[]>(default_value);

    useEffect(() => {
        // clear stable store
        stable_stored = undefined;
    }, [value])


    if (value == [] && props.required == true) {
        setValue([dummy]);
    }

    const insert = () => {

        let _ = value.concat(dummy);

        setValue(_);

        //props.onChange(_);

    }

    const removeLineHander = (index: number) => {

        if (props.required == true && value.length <= 1)
            return;

        let _ = value;

        if (_[index].checked == true) {
            _[0].checked = true;
        }

        _.splice(index, 1)

        setValue([]); // only god know why

        setTimeout(() => {

            setValue(_);

        }, 0);

        props.onChange(_);


    }

    const onChangeHandleSecondary = (_value: string, index: number, isUpdate2Stable: boolean) => {

        // debugger;

        let _ = stable_stored == undefined ? value : stable_stored;

        if (_[index].value == _value)
            return;

        _[index].value = _value;

        if (isUpdate2Stable) {

            stable_stored = _;

        } else {

            setValue(_);

            props.onChange(_);
        }


    }

    const onChangeHandlePrefix = (_value: string, index: number) => {
        let _ = value;

        _[index].prefixValue = _value;

        setValue(_);

        props.onChange(_);
    }

    const onChangePrimaryHandle = (_value: boolean, index: number) => {

        let _current = value[index].checked;

        if (_value) {
            for (let i = 0; i < value.length; i++) {
                value[i].checked = false;
            }

        }

        let _ = value;

        _[index].checked = _value;

        setValue(_);

        props.onChange(_);


    }

    const [groupName] = useState(uuid());

    const definedClassName = uuid();

    return (
        <React.Fragment>
            <div>

                <Input.Group >


                    <Radio.Group name={groupName} defaultValue={0}>
                        {
                            value.map((item: { value: string, checked: boolean, prefixValue: string }, index: number) =>

                                <Space style={{ marginTop: '5px' }} key={uuid()}>
                                    <Radio value={index} onChange={(e: any) => {
                                        onChangePrimaryHandle(e.target.checked, index);
                                    }}></Radio>


                                    {
                                        props.dataSource != undefined && props.dataSource.length > 0 ?
                                            <Select value={item.prefixValue} onChange={(e: any) => onChangeHandlePrefix(e, index)} defaultValue={'+84'} style={{ minWidth: '100px' }}>
                                                {
                                                    props.dataSource.map((item: any) =>
                                                        <Option value={item.value} key={uuid()}>
                                                            {item.image} {item.value}
                                                        </Option>
                                                    )
                                                }

                                            </Select>
                                            : null
                                    }

                                    <Input style={{ paddingTop: '4px', paddingBottom: '4px' }} className={definedClassName}
                                        //ref={lastFocus}
                                        // onChange={(e: any) => {

                                        //     onChangeHandleSecondary(e.target.value, index);

                                        // }}
                                        onFocus={(e) => {
                                            console.log(this);
                                        }}
                                        onBlur={(e: any) => {

                                            let update2Stable = false;

                                            if (e.relatedTarget != undefined && e.relatedTarget.className != undefined) {

                                                if (e.relatedTarget.parentElement == undefined) {
                                                    if (e.relatedTarget.className.indexOf(definedClassName) > -1)
                                                        update2Stable = true;//return;
                                                } else {
                                                    if (e.relatedTarget.parentElement.className.indexOf(definedClassName) > -1)
                                                        update2Stable = true;//return;
                                                }


                                            }
                                            //console.log(e.target);
                                            //debugger;
                                            onChangeHandleSecondary(e.target.value, index, update2Stable);
                                        }}

                                        defaultValue={item.value ?? ""}

                                        suffix={

                                            (props.required == true && value.length == 1) ? <></> :

                                                <Button size='small' type="link" onClick={() => removeLineHander(index)} style={{ padding: '0px', margin: '0px' }}>
                                                    <CloseCircleOutlined />
                                                </Button>

                                        }
                                    />

                                </Space>

                            )
                        }
                    </Radio.Group>
                </Input.Group>


            </div>
            <Button style={{ border: 'none', marginTop: '5px' }} onClick={() => insert()}>+ Thêm {props.label}</Button>
        </React.Fragment>
    )
}


/** @SelectMultipleRemote */
export const SelectMultipleRemote = (props: {
    name: string,
    service: IDataRemote,
    id: string,
    label: string,
    placeholder: string,
    disabled: boolean,
    value?: any,
    //onChangeHandle: (name: string, value: any) => any
    onChange?: Function //(name: string, value: any) => any
}) => {
    const [domId, setDomId] = useState(uuid());

    let timeout: any;

    let currentValue: any;

    const [data, setData] = useState<any>([]);

    const [value, setValue] = useState<any>(undefined);

    useEffect(() => {

        let isMounted = true; // note this flag denote mount status
        // first time

        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response: any) => {


                let _tmp: any;

                if (response == null || response == undefined || response.length == 0) {

                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };

                } else {

                    _tmp = response.map((item: any) => {
                        return {
                            id: item[props.id],
                            label: item[props.label],
                        }
                    });
                    // response.forEach((item : any) => {
                    //     _tmp.push()
                    // })

                    // _tmp = {
                    //     id: response[0][props.id],
                    //     label: response[0][props.label],
                    // }

                }

                if (isMounted) {
                    setData(_tmp);

                    setValue(props.value)
                }

            });

        return () => { isMounted = false };

    }, []);

    const handleSearch = (value: any) => {

        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }

        timeout = setTimeout(() => {
            currentValue = value;

            if (value) {
                props.service(currentValue).then((response: any) => {

                    // console.log(response);
                    setData(response.map((x: any) => {
                        return {
                            id: x[props.id],
                            label: x[props.label]
                        }
                    }))
                })
            }
            else {
                setData([]);
            }
        }, 500);


    };

    const handleChange = (value: any) => {
        setValue(value);

        //props.onChangeHandle(props.name, value);

        props.onChange!(value);

    };

    return (
        <Select
            mode="multiple"
            style={{ width: '100%' }}
            disabled={props.disabled}
            // showSearch
            value={value}
            placeholder={props.placeholder}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={NotFoundItem}
            allowClear={true}
        >
            {
                data!.map((d: any, i: number) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)
            }
        </Select>
    )
}

export default FormManager;