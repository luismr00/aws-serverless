# AWS Serverless Multi-Region API Deployment

This project demonstrates how to build and deploy serverless APIs using AWS Lambda, configured to run in multiple regions. The purpose of this project is to explore the AWS Serverless framework, focusing on splitting APIs into different Lambda functions and deploying them across various regions.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [AWS IAM Configurations](#aws-iam-configurations)
  - [Project Initialization](#project-initialization)
  - [Folder Structure](#folder-structure)
  - [Serverless Framework Configuration](#serverless-framework-configuration)
  - [Coding the Lambda Function](#coding-the-lambda-function)
- [Multi-Region Deployment](#multi-region-deployment)
  - [Deploying to Different Regions](#deploying-to-different-regions)
  - [Domain and SSL Setup](#domain-and-ssl-setup)
  - [Custom Domain Configuration](#custom-domain-configuration)
  - [Route 53 Setup](#route-53-setup)
  - [Testing and Validation](#testing-and-validation)
  - [DynamoDB Replication](#dynamodb-replication)
  - [Amplify App Configuration](#amplify-app-configuration)

## Project Overview

This repository serves as a guide for setting up and deploying serverless APIs using AWS Lambda, with the goal of learning how to manage and deploy these APIs across different AWS regions. The project covers the setup of AWS IAM permissions, configuring the serverless framework, creating the necessary folder structure, coding the Lambda functions, and pushing these Lambdas to multiple regions to server as a backend for an application.

## Prerequisites

Before starting, ensure you have the following:

- An AWS account with the necessary permissions to create and manage IAM roles, Lambda functions, API Gateway, Route 53, and DynamoDB.
- Node.js and npm installed on your local machine.
- The Serverless Framework installed globally via npm.

## Setup Instructions

### AWS IAM Configurations

1. Create the necessary IAM roles and policies to allow Lambda execution, DynamoDB access, and API Gateway management.
2. Assign the IAM roles to the respective Lambda functions during deployment.

### Project Initialization

Once the project folder is set up:

1. Initialize the project with npm:
   ```bash
   npm init -y
   ```
2. Install the required dependencies:
   ```bash
   npm install aws-sdk express jsonwebtoken serverless-http
   ```
3. Find and install an id increment generator for DynamoDB of your choice (optional)

### Folder Structure

Organize your project with a similar following structure that fits your needs.

Example:

```bash
/your-project-folder
│
├── /src
│   ├── /yourLambda
│       ├── yourHandler.js
│       ├── route.js
│       ├── controller.js
│   ├── /yourLambda
│       ├── yourHandler.js
│       ├── route.js
│       ├── controller.js
│   ├── /yourLambda
│       ├── yourHandler.js
│       ├── route.js
│       ├── controller.js
│   ├── /middleware
│   └── /dynamodb
│
├── serverless.yml
└── package.json
```

### Serverless Framework Configuration

1. Configure the serverless.yml file with the necessary service, provider, functions, and custom settings.
2. Extend the configuration to deploy your Lambda functions to multiple AWS regions:

```yaml
provider:
  name: aws
  runtime: nodejs14.x
  region: us-east-1 # or ${opt:region, 'us-east-1'} and set the region flag upon deploying
  stage: dev # or ${opt:stage, 'dev'}  and set the stage flag upon deploying

functions:
  api:
    handler: src/yourLambda/yourHandler.handler
    events:
      - http:
          path: /
          method: get
```

### Coding the Lambda Function

Describe the structure and function of one Lambda:

1. Handlers: The entry point for your Lambda functions.
2. Routes: Define API endpoints.
3. Controllers: Manage the logic for each route.
4. Middleware: Handle request/response processing.
5. DynamoDB Setup: Configure and interact with DynamoDB.

Example:

```javascript
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

module.exports.handler = serverless(app);
```

## Multi-Region Deployment

### Deploying to Different Regions

1. Use the Serverless Framework to deploy your Lambda functions to different AWS regions via terminal commands:
```bash
serverless deploy --region us-east-1 --stage dev
serverless deploy --region eu-west-1 --stage prod
```

### Domain and SSL Setup

1. Purchase a domain through Route 53 or any other source of your choice, e.g., example.com.
2. Obtain SSL certificates through ACM:
    - example.com for frontend
    - *.example.com for backend APIs in each region (e.g. api.example.com)
3. Set certification name and values in your hosted zone's DNS records through Route 53.

### Custom Domain Configuration
1. Add the custom domain name to all API Gateway regions using the wildcard domain.
2. Set up API Mapping in the API Gateway.

### Route 53 Setup
1. Create Route 53 records to route traffic to the appropriate regional APIs.

### Testing and Validation
1. Test the deployed APIs in different regions to ensure functionality.
2. Use Postman or curl for testing the endpoints.

### DynamoDB Replication
1. Caution: Best to replicate your DynamoDB tables manually instead of configuring your db creations in the yaml file.
2. Set up exports and streams for global state management.

### Amplify App Configuration
1. Go to your AWS console and search for AWS Amplify.
2. Create your app with your method of choice (i.e. GitHub, BitBucket, etc.).
3. Once your app is deployed, search for the hosting settings and click on custom domains.
4. Click on add domain and select the domain you purchased.
5. Next, click on configure domain. Add any subdomains and any certfications necessary.
6. Click on add domain and then wait for your amplify to finish configuring your app before attempting to visit your domain in the browser.