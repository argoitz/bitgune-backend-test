# Simple API REST with JWT Auth

## Description

This is a example code of how to buid a JWT authentication API. This APi is connected to [mongodb](https://cloud.mongodb.com/) in cloud.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

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

    https://github.com/argoitz/node-simple-jwt-auth.git

Create .env file from .env.example and set your own credentials

    cp .env.example .env

If this is your first time deploying this environment and the database is empty, run this command to populate the database with the required tables and data.

    npm run seed

Run this command to start server in **dev enviroment**. This command will use _nodemon_ to reload server when changues are detected.

    npm run dev

Run this command to build server in production enviroment.

    npm start

## Usage

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

Then you can access to a private routes setting 'auth-token' header with your token value

    GET REQUEST: http://localhost:3001/api/dashboard

    Headers:
    {
        auth-token: "ACCESS TOKEN"
    }

    Response:
    {
        "error": null,
        "data": {
            "title": "Protected route",
            "user": {
                "name": "Your name",
                "id": "DB Id",
                "iat": Time at which the JWT token was issued
            }
        }
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

![badmath](https://img.shields.io/github/languages/top/argoitz/node-simple-jwt-auth)

## Authors

- [Argoitz Estebanez Barrado](https://github.com/argoitz)
