'use strict';
const helloWorld = require('./services/helloWorld');

module.exports.hello = (event, context, callback) => {
    const result = helloWorld(event);

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: result,
            input: event,
        }),
    };

    callback(null, response);
};

const AWS = require('aws-sdk');

module.exports.updateProfile = (event, context, callback) => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const data = JSON.parse(event.body);
    data.updatedAt = new Date().getTime();

    const params = {
        TableName: 'users',
        Item: data
    };

    return dynamoDb.put(params, (error, data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                error: error,
                data: data,
                params: params
            }),
        };
        callback(null, response);
    });

};

module.exports.slackNotify = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            response_type: "in_channel",
            text: '@wojtek.przechodzen 3 kudosy\n v1.0! Your function executed successfully!',
            data: event,
        }),
    };
    callback(null, response);

};