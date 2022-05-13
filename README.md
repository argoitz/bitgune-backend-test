# Bitgune technical test - Backend

## Description

This is a example code For Bitgune technical test. This APi is connected to [mongodb](https://cloud.mongodb.com/) in cloud.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Libraries](#libraries)
- [Badges](#badges)
- [License](#license)
- [Authors](#authors)

## Requirements

- [Node ^16](https://nodejs.org/es/download/)
- [Cloud Mongodb](https://cloud.mongodb.com) clouster

## Installation

Clone this repository in your server:

    https://github.com/argoitz/bitgune-backend-test

Create .env file from .env.example and set your own credentials

    cp .env.example .env

install all the dependencies

    npm install

If this is your first time deploying this environment and the database is empty, run this command to populate the database with the required tables, relations and data.

    npm run seed

Run this command to start server in **dev enviroment**. This command will use _nodemon_ to reload server when changues are detected.

    npm run dev

Run this command to build server in production enviroment.

    npm start

## Usage

You can import this collection to test api in your postman:

    https://www.getpostman.com/collections/8de6385fec5d043a2687

Regiter endpoint:

    POST REQUEST: http://localhost:3001/api/user/register

    Request:
    {
        "name":"Your name",
        "email":"your@email.com",
        "password":"Password"
    }

Login endpoint:

    POST REQUEST: http://localhost:3001/api/user/login

    Request: {
        "email":"your@email.com",
        "password":"Password"
    }

    Response:
    {
        "error": null,
        "data": {
                "token": "ACCESS TOKEN"
        }
    }

Then you can access to a private routes setting 'auth-token' header with your token value. This route provide form select with types and subtypes.

    GET REQUEST: http://localhost:3001/api/dashboard/request-form

    Headers:
    {
        auth-token: "ACCESS TOKEN"
    }

    Response:
    {
        "error": null,
            "types": [
        {
            "_id": ...,
            "name": "Información",
            "subtypes": [
                {
                    "_id": ...,
                    "name": "Promociones",
                    "date": "2022-05-12T11:54:12.903Z",
                },
            ]
        }
    }

Form submit endpoint

    POST REQUEST: http://localhost:3001/api/dashboard/request-form

    Request: {
        name: 'test', //Required
        surname: 'Test test',
        email: 'test@test.com', //Required
        phone: 666555444,
        birth: '1987-11-15',
        sex: 'male',
        type: 'Incidencia Técnica', //Required
        subtype: 'Instalación', //Required
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
        terms: true //Required
    }

    Response:
    {
        "error": (if an error occurs in the validation, it will return a message specifying the error),
        "message": "Form successfully saved"
    }

## Libraries

- express
- body-parser
- mongoose
- bcrypt
- dotenv
- jsonwebtoken
- hapi/joi
- g nodemon
- cors

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Argoitz Estebanez Barrado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![badmath](https://img.shields.io/github/languages/top/argoitz/bitgune-backend-test)

## Authors

- [Argoitz Estebanez Barrado](https://github.com/argoitz)
