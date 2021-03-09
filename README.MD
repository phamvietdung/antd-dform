<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Antd-dform</h3>

  <p align="center">
    Simple form manager for antdesign
    <br />
    <a href="https://phamvietdung.github.io/antd-dform/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="">Report Bug</a>
    ·
    <a href="">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a>
    <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

There are many great Form manager package available on GitHub, however, I didn't find one that really suit my needs so I created this enhanced one. I want to create a form manager package so amazing that it'll be the last one you ever need -- I think this is it.

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install antd-dform --save-dev
  ```

### Installation

1. Import package
   ```JS
   import FormManager  from 'antd-dform';
   import {IField} from 'antd-dform/dist/interface'
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. Create instance and event inside your component
   ```JS

    const fields: IField[] = [
        {
            type: 'input',
            label: 'Simple input filed',
            name: 'field',
            required: true,
            placeholder : "Insert your name here"
        },
        // ... other field setting goes here
    ]

    export default (props : any) => {

        const default_form_data = {
            field : "hello world"
        }

        const form = React.createRef<FormInstance>();

        const onResetHandler = () => {
            form.current?.resetFields();
        }

        const onSubmitHandlerSuccess = () => {
            form.current?.validateFields()
            .then((values: any) => {
                // success form submit
            }, () => {
                // fail form submit
            }).finally(() => {
                // what ever
            })
        }

        return (
            <>
                <FormManager fields={fields} default={default_form_data} form={form} layout='vertical' />
                <Button onClick={onSubmitHandlerSuccess} type="primary">Submit</Button>
                <Button onClick={onResetHandler} >Reset</Button>
            <>
        )
    }
   ```


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Pham Viet Dung - dungpv.khtn@gmail.com

Project Link: [https://github.com/phamvietdung/antd-dform](https://github.com/phamvietdung/antd-dform)