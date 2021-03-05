"use strict";
/** @module AntDesignDFormManager */
var _this = this;
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var TextArea_1 = require("antd/lib/input/TextArea");
var uuid_1 = require("uuid");
var icons_1 = require("@ant-design/icons");
/** @todo localization */
var INPUT_MAX_VALUE = 999999999999999;
var SELECT_DEFAULT_ID_NAME = 'id';
var SELECT_DEFAULT_LABEL_NAME = 'label';
var SELECT_DEFAULT_PLACEHOLDER = '';
var INPUT_DATE_TIME_SHORT_FORMAT = 'DD/MM/YYYY';
var INPUT_DATE_TIME_LONG_FORMAT = 'DD/MM/YYYY HH:mm:ss';
var NotFoundItem = function (props) { return <>Not Found, but it's update from npm link</>; };
var RangePicker = antd_1.DatePicker.RangePicker;
var Option = antd_1.Select.Option;
var tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
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
var FormManager = function (props) {
    var _a = react_1.useState(""), formId = _a[0], setFormId = _a[1];
    var _b = react_1.useState(props.fields), fields = _b[0], setFields = _b[1];
    var _c = react_1.useState(props["default"]), values = _c[0], setValues = _c[1];
    var formRef = props.form; //useRef(props.form);
    react_1.useEffect(function () {
        setValues(props["default"]);
        formRef.current ? .setFieldsValue(props["default"]) : ;
        formRef.current.resetFields();
        setFields(props.fields);
    }, [props["default"], props.fields]);
    react_1.useEffect(function () {
        setFormId(uuid_1.v4());
    }, []);
    var layout;
    switch (props.layout) {
        case undefined:
            layout = {
                layout: 'vertical',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            };
            break;
        case 'horizontal':
            layout = {
                layout: 'horizontal',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            };
            break;
        case 'horizontal':
            layout = {
                layout: 'vertical',
                labelCol: { span: 8 },
                wrapperCol: { span: 16 }
            };
            break;
        // case 'inline' : 
        //     layout = {
        //         layout : 'inline',
        //         labelCol : {span : 24},
        //         wrapperCol : {span : 24}
        //     }
        //     break;
    }
    var onFinish = function (values) {
        //console.log(values);
    };
    /** @onChangeHandler manual update value to correct property */
    var onChangeHandler = function (name, value) {
        var _o = Object.create({});
        _o[name] = value;
        formRef.current.setFieldsValue(_o);
    };
    /** @getDefaultValue */
    var getDefaultValue = function (propertyName) { return function (obj) { return obj[propertyName] ?  ? undefined :  : ; }; };
    /** @getDefaultArray */
    var getDefaultArray = function (propertyName) { return function (obj) { return obj[propertyName] ?  ? [] :  : ; }; };
    /** @getDefaultValueGeneric */
    var getDefaultValueBoolean = function (propertyName) { return function (obj) { return Boolean(obj[propertyName]); }; };
    var timeout = undefined;
    /** @onValueChange */
    var onValueChange = function (value, values) {
        // if (timeout !== undefined)
        //     clearTimeout(timeout);
        // timeout = setTimeout(() => {
        //     setValues(values);
        // }, 350);
    };
    var onFieldChange = function (field, fields) {
        // console.log(field, fields);
    };
    var isDisabled = function (disabled, field) {
        var result = false;
        if (typeof (disabled) == 'boolean') {
            result = disabled;
        }
        else if (typeof (disabled) == 'function') {
            result = values == undefined ? result : disabled(values);
        }
        return result;
    };
    var isHidden = function (visible, field) {
        // console.log(visible, field)
        var result = true;
        if (typeof (visible) == 'boolean') {
            result = visible;
        }
        else if (typeof (visible) == 'function') {
            result = values == undefined ? result : visible(values);
        }
        return !result;
    };
    var defaultFieldOnChangeHandle = function () {
        /** @defaultFieldOnChangeHandle  */
        /** nothing to do here */
    };
    var propsWrapperHandle = function (field, index) {
        return {
            span: field.span ?  ? 24 :  : ,
            key: formId + "-fields-" + field.name + "-" + index
        };
    };
    var propsFormItemHandle = function (field) {
        return {
            name: field.name,
            hidden: isHidden(field.visible, field.name),
            label: field.label,
            rules: [
                {
                    required: field.required ?  ? false
                        :
                        :
                }
            ]
        };
    };
    var propsFormItemHandleWithoutRule = function (field) {
        return {
            name: field.name,
            hidden: isHidden(field.visible, field.name),
            label: field.label
        };
    };
    var propsItemHandle = function () {
        return {
            id: uuid_1.v4(),
            name: "checkbox-group-" + uuid_1.v4()
        };
    };
    return (<antd_1.ConfigProvider>
            <antd_1.Form validateMessages={{
        required: "${label} là trường thông tin bắt buộc"
    }} id={formId} {...layout} ref={formRef} name="control-ref" onFinish={onFinish} initialValues={props["default"]} layout={props.layout ?  ? "horizontal" :  : } onValuesChange={onValueChange} onFieldsChange={onFieldChange}>
                <antd_1.Row gutter={16}>
                    {fields.map(function (field, index) {
        switch (field.type) {
            case 'hidden':
                return (<antd_1.Form.Item name={field.name} key={"hidden-field-" + index} hidden={true}>
                                            <antd_1.Input autoComplete={undefined} {...propsItemHandle()} placeholder={field.placeholder ?  ? "" :  : } disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } style={{ width: '100%' }}/>
                                        </antd_1.Form.Item>);
            case 'input':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.Input autoComplete={undefined} {...propsItemHandle()} placeholder={field.placeholder ?  ? "" :  : } maxLength={field.maxLength ?  ? undefined :  : } disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } style={{ width: '100%' }}/>
                                            </antd_1.Form.Item>

                                        </antd_1.Col>);
            case 'password':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.Input.Password {...propsItemHandle()} placeholder={field.placeholder ?  ? "" :  : } disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } style={{ width: '100%' }}/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'textarea':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <TextArea_1["default"] {...propsItemHandle()} rows={field.rows ?  ? 1 :  : } placeholder={field.placeholder ?  ? "" :  : } maxLength={field.maxLength} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } style={{ width: '100%' }}/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'number':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.InputNumber {...propsItemHandle()} formatter={function (value) { return ("" + value).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }} parser={function (value) { return value.replace(/\$\s?|(,*)/g, ''); }} style={{ width: '100%' }} max={INPUT_MAX_VALUE} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : }/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'datetime':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.DatePicker {...propsItemHandle()} style={{ width: '100%' }} showToday={true} showTime={field.showTime ?  ? false :  : } disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } format={field.showTime ? INPUT_DATE_TIME_LONG_FORMAT : INPUT_DATE_TIME_SHORT_FORMAT}/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'time':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.TimePicker {...propsItemHandle()} style={{ width: '100%' }} showNow={true} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : }/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'datetimeRange':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <RangePicker {...propsItemHandle()} style={{ width: '100%' }} showTime={field.showTime ?  ? false :  : } disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } format={field.showTime ? INPUT_DATE_TIME_LONG_FORMAT : INPUT_DATE_TIME_SHORT_FORMAT}/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'select':
                if (field.dataSource == undefined)
                    return (<> Component register failed! </>);
                else {
                    if (field.dataSource.data != undefined)
                        return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                                    <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                        <antd_1.Select {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } showSearch style={{ width: '100%' }} placeholder={field.placeholder ?  ? "" :  : } defaultActiveFirstOption={false} optionFilterProp="children" filterOption={function (input, option) {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }} allowClear={true}>
                                                            {field.dataSource != undefined
                            && field.dataSource.data != undefined
                            && field.dataSource.data.map(function (select_data, select_index) { return (<Option value={field.dataSource.id !== undefined ? select_data[field.dataSource.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={formId + "-fields-" + field.name + "-" + index + "-" + select_index}>
                                                                        {field.dataSource.label !== undefined ? select_data[field.dataSource.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>); })}
                                                        </antd_1.Select>
                                                    </antd_1.Form.Item>
                                                </antd_1.Col>);
                    else {
                        return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                                    <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                        <exports.SelectRemote disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } service={field.dataSource.dataRemote} id={field.dataSource.id ?  ? SELECT_DEFAULT_ID_NAME :  : } label={field.dataSource.label ?  ? SELECT_DEFAULT_LABEL_NAME :  : } placeholder={field.placeholder ?  ? SELECT_DEFAULT_PLACEHOLDER :  : } 
                        //onChangeHandle={onChangeHandler}
                        name={field.name}/>
                                                    </antd_1.Form.Item>
                                                </antd_1.Col>);
                    }
                }
            case 'selectMultiple':
                if (field.dataSource == undefined)
                    return (<> Component register failed! </>);
                else {
                    if (field.dataSource.data != undefined)
                        return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                                    <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                        <antd_1.Select {...propsItemHandle()} mode="multiple" disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } 
                        // showSearch
                        style={{ width: '100%' }} placeholder={field.placeholder ?  ? "" :  : } defaultActiveFirstOption={false} optionFilterProp="children" filterOption={function (input, option) {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }} allowClear={true}>
                                                            {field.dataSource != undefined
                            && field.dataSource.data != undefined
                            && field.dataSource.data.map(function (select_data, select_index) { return (<Option value={field.dataSource.id !== undefined ? select_data[field.dataSource.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={formId + "-fields-" + field.name + "-" + index + "-" + select_index}>
                                                                        {field.dataSource.label !== undefined ? select_data[field.dataSource.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>); })}
                                                        </antd_1.Select>
                                                    </antd_1.Form.Item>
                                                </antd_1.Col>);
                    else {
                        return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                                    <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                        <exports.SelectMultipleRemote disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } service={field.dataSource.dataRemote} id={field.dataSource.id ?  ? SELECT_DEFAULT_ID_NAME :  : } label={field.dataSource.label ?  ? SELECT_DEFAULT_LABEL_NAME :  : } placeholder={field.placeholder ?  ? SELECT_DEFAULT_PLACEHOLDER :  : } 
                        //onChangeHandle={onChangeHandler}
                        name={field.name}/>
                                                    </antd_1.Form.Item>
                                                </antd_1.Col>);
                    }
                }
            case 'radio':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.Radio.Group {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : }>
                                                    {field.dataSource == undefined || field.dataSource.data == undefined
                    ? <>Undefined</>
                    : field.dataSource.data.map(function (radio_item, radio_item_index) { return (<antd_1.Radio value={field.dataSource.id !== undefined ? radio_item[field.dataSource.id] : radio_item[SELECT_DEFAULT_ID_NAME]} key={formId + "-fields-" + field.name + "-" + radio_item_index + "-" + radio_item}>
                                                                    {field.dataSource.label !== undefined ? radio_item[field.dataSource.label] : radio_item[SELECT_DEFAULT_LABEL_NAME]}
                                                                </antd_1.Radio>); })}
                                                </antd_1.Radio.Group>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'checkbox':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>

                                            <antd_1.Form.Item {...propsFormItemHandle(field)} getValueProps={function (value) {
                    return value ?  ? [] :  : ;
                }}>



                                                <antd_1.Checkbox.Group {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } defaultValue={getDefaultValue(field.name)(props["default"]) ?  ? [] :  : } options={field.dataSource ? .data.map(function (checkbox_value) {
                    return {
                        value: field.dataSource.id !== undefined ? checkbox_value[field.dataSource.id] : checkbox_value[SELECT_DEFAULT_ID_NAME],
                        label: field.dataSource.label !== undefined ? checkbox_value[field.dataSource.label] : checkbox_value[SELECT_DEFAULT_LABEL_NAME]
                    };
                }) : }/>

                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'confirm':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)} valuePropName="checked">
                                                
                                                <antd_1.Switch {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } defaultChecked={getDefaultValueBoolean(field.name)(props["default"])} checkedChildren={<icons_1.CheckOutlined />} unCheckedChildren={<icons_1.CloseOutlined />}/>
                                            </antd_1.Form.Item>

                                        </antd_1.Col>);
            case 'heading':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <h3 {...propsItemHandle()} key={formId + "-fields-" + field.name + "-" + index}>{field.label}</h3>
                                        </antd_1.Col>);
            case 'multiple-value':
                return (<>
                                            <antd_1.Col {...propsWrapperHandle(field, index)}>
                                                <antd_1.Form.Item 
                // cause rule were defined bellow
                {...propsFormItemHandleWithoutRule(field)} normalize={function (value, prevValue, prevValues) {
                    return value;
                }} rules={[
                    {
                        validator: function (rule, value) {
                            // override all
                            if (field.required == undefined || field.required == false)
                                return Promise.resolve();
                            if (field.rule == undefined)
                                return Promise.resolve();
                            else {
                                if (field.rule(value))
                                    return Promise.resolve();
                            }
                            return Promise.reject();
                        },
                        message: field.label + " l\u00E0 tr\u01B0\u1EDDng th\u00F4ng tin b\u1EAFt bu\u1ED9c",
                        required: field.required
                    }
                ]}>
                                                    <exports.MultipleInput label={field.label} dataSource={field.dataSource ? .data : } defaultPrefix={field.defaultPrefix} required={field.required}/>

                                                </antd_1.Form.Item>

                                            </antd_1.Col>

                                        </>);
        }
    })}
                </antd_1.Row>
            </antd_1.Form>
        </antd_1.ConfigProvider>);
};
/** @SelectRemote2 */
exports.SelectRemote2 = function (props) {
    var domId = react_1.useState(uuid_1.v4())[0];
    var timeout;
    var currentValue;
    var _a = react_1.useState([]), data = _a[0], setData = _a[1];
    // const [value, setValue] = useState<any>(undefined);
    react_1.useEffect(function () {
        var isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then(function (response) {
                var _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label]
                    };
                }
                if (isMounted) {
                    setData([_tmp]);
                    // setValue(props.value)
                }
            });
        return function () { isMounted = false; };
    }, []);
    var handleSearch = function (value) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        if (value) {
            props.service(currentValue).then(function (response) {
                //console.log(response);
                setData(response.map(function (x) {
                    return {
                        id: x[props.id],
                        label: x[props.label]
                    };
                }));
            });
        }
        else {
            setData([]);
        }
    };
    var handleChange = function (value) {
        // setValue(value);
    };
    return (<>
            {data.map(function (d, i) { return <Option value={d.id} key={domId + "-" + i}>{d.label}</Option>; })}
        </>);
};
/** @SelectRemote */
/** select ajax remote component
 *  build-in with love <3
 *  value was props into child-component automatically
 */
exports.SelectRemote = function (props) {
    var _a = react_1.useState(uuid_1.v4()), domId = _a[0], setDomId = _a[1];
    var timeout;
    var currentValue;
    var _b = react_1.useState([]), data = _b[0], setData = _b[1];
    var _c = react_1.useState(undefined), value = _c[0], setValue = _c[1];
    react_1.useEffect(function () {
        var isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then(function (response) {
                var _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label]
                    };
                }
                if (isMounted) {
                    setData([_tmp]);
                    setValue(props.value);
                }
            });
        return function () { isMounted = false; };
    }, []);
    var handleSearch = function (value) {
        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }
        timeout = setTimeout(function () {
            currentValue = value;
            if (value) {
                props.service(currentValue).then(function (response) {
                    //console.log(response);
                    setData(response.map(function (x) {
                        return {
                            id: x[props.id],
                            label: x[props.label]
                        };
                    }));
                });
            }
            else {
                setData([]);
            }
        }, 500);
    };
    var handleChange = function (value) {
        setValue(value);
        //props.onChangeHandle(props.name, value);
        props.onChange(value);
    };
    return (<antd_1.Select style={{ width: '100%' }} disabled={props.disabled} showSearch value={value} placeholder={props.placeholder} defaultActiveFirstOption={false} showArrow={false} filterOption={false} onSearch={handleSearch} onChange={handleChange} notFoundContent={NotFoundItem} allowClear={true}>
            {data.map(function (d, i) { return <Option value={d.id} key={domId + "-" + i}>{d.label}</Option>; })}
        </antd_1.Select>);
};
/** @MultipleInput */
/**
 * default data source model :
 * {
 *      value : string,
 *      checked : boolean,
 *      prefixValue : string
 * }
 */
exports.MultipleInput = function (props) {
    var default_value = props.value ?  ? [] :  : ;
    var stable_stored = undefined;
    var dummy = { value: "", checked: false, prefixValue: "" };
    var lastFocus = react_1.useRef(null);
    if (default_value.length == 0) {
        if (props.required === true)
            default_value = [dummy];
    }
    var _a = react_1.useState(default_value), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        // clear stable store
        stable_stored = undefined;
    }, [value]);
    if (value == [] && props.required == true) {
        setValue([dummy]);
    }
    var insert = function () {
        var _ = value.concat(dummy);
        setValue(_);
        //props.onChange(_);
    };
    var removeLineHander = function (index) {
        if (props.required == true && value.length <= 1)
            return;
        var _ = value;
        if (_[index].checked == true) {
            _[0].checked = true;
        }
        _.splice(index, 1);
        setValue([]); // only god know why
        setTimeout(function () {
            setValue(_);
        }, 0);
        props.onChange(_);
    };
    var onChangeHandleSecondary = function (_value, index, isUpdate2Stable) {
        // debugger;
        var _ = stable_stored == undefined ? value : stable_stored;
        if (_[index].value == _value)
            return;
        _[index].value = _value;
        if (isUpdate2Stable) {
            stable_stored = _;
        }
        else {
            setValue(_);
            props.onChange(_);
        }
    };
    var onChangeHandlePrefix = function (_value, index) {
        var _ = value;
        _[index].prefixValue = _value;
        setValue(_);
        props.onChange(_);
    };
    var onChangePrimaryHandle = function (_value, index) {
        var _current = value[index].checked;
        if (_value) {
            for (var i = 0; i < value.length; i++) {
                value[i].checked = false;
            }
        }
        var _ = value;
        _[index].checked = _value;
        setValue(_);
        props.onChange(_);
    };
    var groupName = react_1.useState(uuid_1.v4())[0];
    var definedClassName = uuid_1.v4();
    return (<react_1["default"].Fragment>
            <div>

                <antd_1.Input.Group>


                    <antd_1.Radio.Group name={groupName} defaultValue={0}>
                        {value.map(function (item, index) {
        return <antd_1.Space style={{ marginTop: '5px' }} key={uuid_1.v4()}>
                                    <antd_1.Radio value={index} onChange={function (e) {
            onChangePrimaryHandle(e.target.checked, index);
        }}></antd_1.Radio>


                                    {props.dataSource != undefined && props.dataSource.length > 0 ?
            <antd_1.Select value={item.prefixValue} onChange={function (e) { return onChangeHandlePrefix(e, index); }} defaultValue={'+84'} style={{ minWidth: '100px' }}>
                                                {props.dataSource.map(function (item) {
                return <Option value={item.value} key={uuid_1.v4()}>
                                                            {item.image} {item.value}
                                                        </Option>;
            })}

                                            </antd_1.Select>
            : null}

                                    <antd_1.Input style={{ paddingTop: '4px', paddingBottom: '4px' }} className={definedClassName} 
        //ref={lastFocus}
        // onChange={(e: any) => {
        //     onChangeHandleSecondary(e.target.value, index);
        // }}
        onFocus={function (e) {
            console.log(_this);
        }} onBlur={function (e) {
            var update2Stable = false;
            if (e.relatedTarget != undefined && e.relatedTarget.className != undefined) {
                if (e.relatedTarget.parentElement == undefined) {
                    if (e.relatedTarget.className.indexOf(definedClassName) > -1)
                        update2Stable = true; //return;
                }
                else {
                    if (e.relatedTarget.parentElement.className.indexOf(definedClassName) > -1)
                        update2Stable = true; //return;
                }
            }
            //console.log(e.target);
            //debugger;
            onChangeHandleSecondary(e.target.value, index, update2Stable);
        }} defaultValue={item.value ?  ? "" :  : } suffix={(props.required == true && value.length == 1) ? <></> :
            <antd_1.Button size='small' type="link" onClick={function () { return removeLineHander(index); }} style={{ padding: '0px', margin: '0px' }}>
                                                    <icons_1.CloseCircleOutlined />
                                                </antd_1.Button>}/>

                                </antd_1.Space>;
    })}
                    </antd_1.Radio.Group>
                </antd_1.Input.Group>


            </div>
            <antd_1.Button style={{ border: 'none', marginTop: '5px' }} onClick={function () { return insert(); }}>+ Thêm {props.label}</antd_1.Button>
        </react_1["default"].Fragment>);
};
/** @SelectMultipleRemote */
exports.SelectMultipleRemote = function (props) {
    var _a = react_1.useState(uuid_1.v4()), domId = _a[0], setDomId = _a[1];
    var timeout;
    var currentValue;
    var _b = react_1.useState([]), data = _b[0], setData = _b[1];
    var _c = react_1.useState(undefined), value = _c[0], setValue = _c[1];
    react_1.useEffect(function () {
        var isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then(function (response) {
                var _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = response.map(function (item) {
                        return {
                            id: item[props.id],
                            label: item[props.label]
                        };
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
                    setValue(props.value);
                }
            });
        return function () { isMounted = false; };
    }, []);
    var handleSearch = function (value) {
        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }
        timeout = setTimeout(function () {
            currentValue = value;
            if (value) {
                props.service(currentValue).then(function (response) {
                    // console.log(response);
                    setData(response.map(function (x) {
                        return {
                            id: x[props.id],
                            label: x[props.label]
                        };
                    }));
                });
            }
            else {
                setData([]);
            }
        }, 500);
    };
    var handleChange = function (value) {
        setValue(value);
        //props.onChangeHandle(props.name, value);
        props.onChange(value);
    };
    return (<antd_1.Select mode="multiple" style={{ width: '100%' }} disabled={props.disabled} 
    // showSearch
    value={value} placeholder={props.placeholder} defaultActiveFirstOption={false} showArrow={false} filterOption={false} onSearch={handleSearch} onChange={handleChange} notFoundContent={NotFoundItem} allowClear={true}>
            {data.map(function (d, i) { return <Option value={d.id} key={domId + "-" + i}>{d.label}</Option>; })}
        </antd_1.Select>);
};
exports["default"] = FormManager;
