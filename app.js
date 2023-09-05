const express = require('express');
const request = require('request');
var IotApi = require('@arduino/arduino-iot-client');
var rp = require('request-promise');

const optionsa = {
    url: 'https://jsonplaceholder.typicode.com/todos',
    json: true
}

optionsARD = {
    method: 'POST',
    url: 'https://api2.arduino.cc/iot/v1/clients/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    json: true,
    form: {
        grant_type: 'client_credentials',
        client_id: 'gYYitWw7bKZutkpZx1pXzvDqwHaaSvpj',
        client_secret: 'vID3JdyhWTW5dolT1NP20PcMBUutNzXEZOrgaSE1MxIG84fCp9DxsGniLbq1gNon',
        audience: 'https://api2.arduino.cc/iot'
    }
}

async function getToken() {
    var options = {
        method: 'POST',
        url: 'https://api2.arduino.cc/iot/v1/clients/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        json: true,
        form: {
            grant_type: 'client_credentials',
            client_id: 'gYYitWw7bKZutkpZx1pXzvDqwHaaSvpj',
            client_secret: 'vID3JdyhWTW5dolT1NP20PcMBUutNzXEZOrgaSE1MxIG84fCp9DxsGniLbq1gNon',
            audience: 'https://api2.arduino.cc/iot'
        }
    };

    try {
        const response = await rp(options);
        return response['access_token'];
    }
    catch (error) {
        console.error("Failed getting an access token: " + error)
    }
}

async function listProperties() {
    var client = IotApi.ApiClient.instance;
    // Configure OAuth2 access token for authorization: oauth2
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new IotApi.PropertiesV2Api(client)
    var id = "d5e29c5a-6e77-437b-a88c-c616a9ea9b92"; // {String} The id of the thing

    var opts = {
      'showDeleted': true // {Boolean} If true, shows the soft deleted properties
    };
    api.propertiesV2List(id, opts).then(function(data) {
      console.log(data); 
    });
}

listProperties();

const app = express();

app.use('/', (req, res, next) => {
    request.post(optionsARD,
    (error, response) => {
        if(error){
            return res.send('Error occured');
        }
    return res.send(response);
    });
})

app.listen(8080);