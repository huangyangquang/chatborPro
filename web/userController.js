const url = require('url');
const req = require('request-promise');

let path = new Map();

function sendMsg(request, response) {
    const query = url.parse(request.url).query;
    // console.log('query:', query);
    let params = {
        "reqType":0,
        "perception": {
            "inputText": {
                "text": query.text
            },
            "inputImage": {
                "url": "imageUrl"
            },
            "selfInfo": {
                "location": {
                    "city": "北京",
                    "province": "北京",
                    "street": "信息路"
                }
            }
        },
        "userInfo": {
            "apiKey": "6f40366170074873b39860afbb1c0711",
            "userId": "huang"
        }
    }
    let options = {
        method: 'POST',
        uri: 'http://openapi.tuling123.com/openapi/api/v2',
        body: JSON.stringify(params),
        headers: {
            "content-type": "application/json"
        }
    };

    req(options)
        .then(function (body) {
            // console.log('body', body);
            const head = {
                'Access-Control-Allow-Origin': '*',//主要是这个属性
                'Access-Control-Allow-Method': 'GET',
                'Access-Control-Allow-headers': 'x-requested-with, content-type',
                'Server': 'hfq Server'
            }
            const mbody = JSON.parse(body);
            if(mbody && mbody.results && mbody.results.length > 0 && mbody.results[0].values && mbody.results[0].values.text) {
                // console.log(typeof _body.results[0].values.text);
                response.writeHead(200, head);
                response.write(mbody.results[0].values.text);
                response.end();
            } else {
                response.writeHead('404');
                response.write(mbody.results[0].values.text);
                response.end();
            }

        })
        .catch(function (err) {
            console.log(err);
            throw new Error(err);
        });
}
path.set('/sendMsg', sendMsg);

module.exports.path = path;