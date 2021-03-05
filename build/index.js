"use strict";
/** @module AntDesignDFormManager */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const TextArea_1 = __importDefault(require("antd/lib/input/TextArea"));
const uuid_1 = require("uuid");
const icons_1 = require("@ant-design/icons");
/** @todo localization */
let INPUT_MAX_VALUE = 999999999999999;
let SELECT_DEFAULT_ID_NAME = 'id';
let SELECT_DEFAULT_LABEL_NAME = 'label';
let SELECT_DEFAULT_PLACEHOLDER = '';
let INPUT_DATE_TIME_SHORT_FORMAT = 'DD/MM/YYYY';
let INPUT_DATE_TIME_LONG_FORMAT = 'DD/MM/YYYY HH:mm:ss';
let NotFoundItem = (props) => <>Not Found, but it's update from npm link</>;
const { RangePicker } = antd_1.DatePicker;
const { Option } = antd_1.Select;
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
const FormManager = (props) => {
    const [formId, setFormId] = react_1.useState("");
    const [fields, setFields] = react_1.useState(props.fields);
    const [values, setValues] = react_1.useState(props.default);
    const formRef = props.form; //useRef(props.form);
    react_1.useEffect(() => {
        setValues(props.default);
        formRef.current ? .setFieldsValue(props.default) : ;
        formRef.current.resetFields();
        setFields(props.fields);
    }, [props.default, props.fields]);
    react_1.useEffect(() => {
        setFormId(uuid_1.v4());
    }, []);
    let layout;
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
    const onFinish = (values) => {
        //console.log(values);
    };
    /** @onChangeHandler manual update value to correct property */
    const onChangeHandler = (name, value) => {
        let _o = Object.create({});
        _o[name] = value;
        formRef.current.setFieldsValue(_o);
    };
    /** @getDefaultValue */
    const getDefaultValue = (propertyName) => (obj) => obj[propertyName] ?  ? undefined :  : ;
    /** @getDefaultArray */
    const getDefaultArray = (propertyName) => (obj) => obj[propertyName] ?  ? [] :  : ;
    /** @getDefaultValueGeneric */
    const getDefaultValueBoolean = (propertyName) => (obj) => Boolean(obj[propertyName]);
    let timeout = undefined;
    /** @onValueChange */
    const onValueChange = (value, values) => {
        // if (timeout !== undefined)
        //     clearTimeout(timeout);
        // timeout = setTimeout(() => {
        //     setValues(values);
        // }, 350);
    };
    const onFieldChange = (field, fields) => {
        // console.log(field, fields);
    };
    const isDisabled = (disabled, field) => {
        let result = false;
        if (typeof (disabled) == 'boolean') {
            result = disabled;
        }
        else if (typeof (disabled) == 'function') {
            result = values == undefined ? result : disabled(values);
        }
        return result;
    };
    const isHidden = (visible, field) => {
        // console.log(visible, field)
        let result = true;
        if (typeof (visible) == 'boolean') {
            result = visible;
        }
        else if (typeof (visible) == 'function') {
            result = values == undefined ? result : visible(values);
        }
        return !result;
    };
    const defaultFieldOnChangeHandle = () => {
        /** @defaultFieldOnChangeHandle  */
        /** nothing to do here */
    };
    const propsWrapperHandle = (field, index) => {
        return {
            span: field.span ?  ? 24 :  : ,
            key: `${formId}-fields-${field.name}-${index}`
        };
    };
    const propsFormItemHandle = (field) => {
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
    const propsFormItemHandleWithoutRule = (field) => {
        return {
            name: field.name,
            hidden: isHidden(field.visible, field.name),
            label: field.label
        };
    };
    const propsItemHandle = () => {
        return {
            id: uuid_1.v4(),
            name: `checkbox-group-${uuid_1.v4()}`
        };
    };
    return (<antd_1.ConfigProvider>
            <antd_1.Form validateMessages={{
        required: "${label} là trường thông tin bắt buộc",
    }} id={formId} {...layout} ref={formRef} name="control-ref" onFinish={onFinish} initialValues={props.default} layout={props.layout ?  ? "horizontal" :  : } onValuesChange={onValueChange} onFieldsChange={onFieldChange}>
                <antd_1.Row gutter={16}>
                    {fields.map((field, index) => {
        switch (field.type) {
            case 'hidden':
                return (<antd_1.Form.Item name={field.name} key={`hidden-field-${index}`} hidden={true}>
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
                                                <TextArea_1.default {...propsItemHandle()} rows={field.rows ?  ? 1 :  : } placeholder={field.placeholder ?  ? "" :  : } maxLength={field.maxLength} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } style={{ width: '100%' }}/>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'number':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <antd_1.Form.Item {...propsFormItemHandle(field)}>
                                                <antd_1.InputNumber {...propsItemHandle()} formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={(value) => value.replace(/\$\s?|(,*)/g, '')} style={{ width: '100%' }} max={INPUT_MAX_VALUE} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : }/>
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
                                                        <antd_1.Select {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } showSearch style={{ width: '100%' }} placeholder={field.placeholder ?  ? "" :  : } defaultActiveFirstOption={false} optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} allowClear={true}>
                                                            {field.dataSource != undefined
                            && field.dataSource.data != undefined
                            && field.dataSource.data.map((select_data, select_index) => (<Option value={field.dataSource.id !== undefined ? select_data[field.dataSource.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${index}-${select_index}`}>
                                                                        {field.dataSource.label !== undefined ? select_data[field.dataSource.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>))}
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
                        style={{ width: '100%' }} placeholder={field.placeholder ?  ? "" :  : } defaultActiveFirstOption={false} optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} allowClear={true}>
                                                            {field.dataSource != undefined
                            && field.dataSource.data != undefined
                            && field.dataSource.data.map((select_data, select_index) => (<Option value={field.dataSource.id !== undefined ? select_data[field.dataSource.id] : select_data[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${index}-${select_index}`}>
                                                                        {field.dataSource.label !== undefined ? select_data[field.dataSource.label] : select_data[SELECT_DEFAULT_LABEL_NAME]}
                                                                    </Option>))}
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
                    : field.dataSource.data.map((radio_item, radio_item_index) => (<antd_1.Radio value={field.dataSource.id !== undefined ? radio_item[field.dataSource.id] : radio_item[SELECT_DEFAULT_ID_NAME]} key={`${formId}-fields-${field.name}-${radio_item_index}-${radio_item}`}>
                                                                    {field.dataSource.label !== undefined ? radio_item[field.dataSource.label] : radio_item[SELECT_DEFAULT_LABEL_NAME]}
                                                                </antd_1.Radio>))}
                                                </antd_1.Radio.Group>
                                            </antd_1.Form.Item>
                                        </antd_1.Col>);
            case 'checkbox':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>

                                            <antd_1.Form.Item {...propsFormItemHandle(field)} getValueProps={(value) => {
                    return value ?  ? [] :  : ;
                }}>



                                                <antd_1.Checkbox.Group {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } defaultValue={getDefaultValue(field.name)(props.default) ?  ? [] :  : } options={field.dataSource ? .data.map((checkbox_value) => {
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
                                                
                                                <antd_1.Switch {...propsItemHandle()} disabled={isDisabled(field.disabled, field.name) ?  ? false :  : } defaultChecked={getDefaultValueBoolean(field.name)(props.default)} checkedChildren={<icons_1.CheckOutlined />} unCheckedChildren={<icons_1.CloseOutlined />}/>
                                            </antd_1.Form.Item>

                                        </antd_1.Col>);
            case 'heading':
                return (<antd_1.Col {...propsWrapperHandle(field, index)}>
                                            <h3 {...propsItemHandle()} key={`${formId}-fields-${field.name}-${index}`}>{field.label}</h3>
                                        </antd_1.Col>);
            case 'multiple-value':
                return (<>
                                            <antd_1.Col {...propsWrapperHandle(field, index)}>
                                                <antd_1.Form.Item 
                // cause rule were defined bellow
                {...propsFormItemHandleWithoutRule(field)} normalize={(value, prevValue, prevValues) => {
                    return value;
                }} rules={[
                    {
                        validator: (rule, value) => {
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
                        message: `${field.label} là trường thông tin bắt buộc`,
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
exports.SelectRemote2 = (props) => {
    const [domId] = react_1.useState(uuid_1.v4());
    let timeout;
    let currentValue;
    const [data, setData] = react_1.useState([]);
    // const [value, setValue] = useState<any>(undefined);
    react_1.useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response) => {
                let _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label],
                    };
                }
                if (isMounted) {
                    setData([_tmp]);
                    // setValue(props.value)
                }
            });
        return () => { isMounted = false; };
    }, []);
    const handleSearch = (value) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        if (value) {
            props.service(currentValue).then((response) => {
                //console.log(response);
                setData(response.map((x) => {
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
    const handleChange = (value) => {
        // setValue(value);
    };
    return (<>
            {data.map((d, i) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)}
        </>);
};
/** @SelectRemote */
/** select ajax remote component
 *  build-in with love <3
 *  value was props into child-component automatically
 */
exports.SelectRemote = (props) => {
    const [domId, setDomId] = react_1.useState(uuid_1.v4());
    let timeout;
    let currentValue;
    const [data, setData] = react_1.useState([]);
    const [value, setValue] = react_1.useState(undefined);
    react_1.useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response) => {
                let _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = {
                        id: response[0][props.id],
                        label: response[0][props.label],
                    };
                }
                if (isMounted) {
                    setData([_tmp]);
                    setValue(props.value);
                }
            });
        return () => { isMounted = false; };
    }, []);
    const handleSearch = (value) => {
        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }
        timeout = setTimeout(() => {
            currentValue = value;
            if (value) {
                props.service(currentValue).then((response) => {
                    //console.log(response);
                    setData(response.map((x) => {
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
    const handleChange = (value) => {
        setValue(value);
        //props.onChangeHandle(props.name, value);
        props.onChange(value);
    };
    return (<antd_1.Select style={{ width: '100%' }} disabled={props.disabled} showSearch value={value} placeholder={props.placeholder} defaultActiveFirstOption={false} showArrow={false} filterOption={false} onSearch={handleSearch} onChange={handleChange} notFoundContent={NotFoundItem} allowClear={true}>
            {data.map((d, i) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)}
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
exports.MultipleInput = (props) => {
    let default_value = props.value ?  ? [] :  : ;
    let stable_stored = undefined;
    const dummy = { value: "", checked: false, prefixValue: "" };
    const lastFocus = react_1.useRef(null);
    if (default_value.length == 0) {
        if (props.required === true)
            default_value = [dummy];
    }
    const [value, setValue] = react_1.useState(default_value);
    react_1.useEffect(() => {
        // clear stable store
        stable_stored = undefined;
    }, [value]);
    if (value == [] && props.required == true) {
        setValue([dummy]);
    }
    const insert = () => {
        let _ = value.concat(dummy);
        setValue(_);
        //props.onChange(_);
    };
    const removeLineHander = (index) => {
        if (props.required == true && value.length <= 1)
            return;
        let _ = value;
        if (_[index].checked == true) {
            _[0].checked = true;
        }
        _.splice(index, 1);
        setValue([]); // only god know why
        setTimeout(() => {
            setValue(_);
        }, 0);
        props.onChange(_);
    };
    const onChangeHandleSecondary = (_value, index, isUpdate2Stable) => {
        // debugger;
        let _ = stable_stored == undefined ? value : stable_stored;
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
    const onChangeHandlePrefix = (_value, index) => {
        let _ = value;
        _[index].prefixValue = _value;
        setValue(_);
        props.onChange(_);
    };
    const onChangePrimaryHandle = (_value, index) => {
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
    };
    const [groupName] = react_1.useState(uuid_1.v4());
    const definedClassName = uuid_1.v4();
    return (<react_1.default.Fragment>
            <div>

                <antd_1.Input.Group>


                    <antd_1.Radio.Group name={groupName} defaultValue={0}>
                        {value.map((item, index) => <antd_1.Space style={{ marginTop: '5px' }} key={uuid_1.v4()}>
                                    <antd_1.Radio value={index} onChange={(e) => {
        onChangePrimaryHandle(e.target.checked, index);
    }}></antd_1.Radio>


                                    {props.dataSource != undefined && props.dataSource.length > 0 ?
        <antd_1.Select value={item.prefixValue} onChange={(e) => onChangeHandlePrefix(e, index)} defaultValue={'+84'} style={{ minWidth: '100px' }}>
                                                {props.dataSource.map((item) => <Option value={item.value} key={uuid_1.v4()}>
                                                            {item.image} {item.value}
                                                        </Option>)}

                                            </antd_1.Select>
        : null}

                                    <antd_1.Input style={{ paddingTop: '4px', paddingBottom: '4px' }} className={definedClassName} 
    //ref={lastFocus}
    // onChange={(e: any) => {
    //     onChangeHandleSecondary(e.target.value, index);
    // }}
    onFocus={(e) => {
        console.log(this);
    }} onBlur={(e) => {
        let update2Stable = false;
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
        <antd_1.Button size='small' type="link" onClick={() => removeLineHander(index)} style={{ padding: '0px', margin: '0px' }}>
                                                    <icons_1.CloseCircleOutlined />
                                                </antd_1.Button>}/>

                                </antd_1.Space>)}
                    </antd_1.Radio.Group>
                </antd_1.Input.Group>


            </div>
            <antd_1.Button style={{ border: 'none', marginTop: '5px' }} onClick={() => insert()}>+ Thêm {props.label}</antd_1.Button>
        </react_1.default.Fragment>);
};
/** @SelectMultipleRemote */
exports.SelectMultipleRemote = (props) => {
    const [domId, setDomId] = react_1.useState(uuid_1.v4());
    let timeout;
    let currentValue;
    const [data, setData] = react_1.useState([]);
    const [value, setValue] = react_1.useState(undefined);
    react_1.useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        // first time
        if (props.value !== undefined)
            props.service(currentValue, props.value).then((response) => {
                let _tmp;
                if (response == null || response == undefined || response.length == 0) {
                    _tmp = {
                        id: 0,
                        label: 'Không tìm thấy hoặc thông tin đã bị xóa, vui lòng chọn lại!'
                    };
                }
                else {
                    _tmp = response.map((item) => {
                        return {
                            id: item[props.id],
                            label: item[props.label],
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
        return () => { isMounted = false; };
    }, []);
    const handleSearch = (value) => {
        if (timeout !== undefined) {
            clearTimeout(timeout);
            //timeout = null;
        }
        timeout = setTimeout(() => {
            currentValue = value;
            if (value) {
                props.service(currentValue).then((response) => {
                    // console.log(response);
                    setData(response.map((x) => {
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
    const handleChange = (value) => {
        setValue(value);
        //props.onChangeHandle(props.name, value);
        props.onChange(value);
    };
    return (<antd_1.Select mode="multiple" style={{ width: '100%' }} disabled={props.disabled} 
    // showSearch
    value={value} placeholder={props.placeholder} defaultActiveFirstOption={false} showArrow={false} filterOption={false} onSearch={handleSearch} onChange={handleChange} notFoundContent={NotFoundItem} allowClear={true}>
            {data.map((d, i) => <Option value={d.id} key={`${domId}-${i}`}>{d.label}</Option>)}
        </antd_1.Select>);
};
exports.default = FormManager;
