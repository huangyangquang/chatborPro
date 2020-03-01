const http = require('http');
const url = require('url');
const fs = require('fs');
const globalConf = require('./config');
const userController = require('./web/userController');


http.createServer(function(request, response) {
    let pathName = url.parse(request.url).pathname;
    if(pathName == '/') {
        pathName = '/index.html';
    }
    // console.log(pathName);
    // console.log(isStaticFile(pathName));
    if(isStaticFile(pathName)) {//请求静态文件
        try {
            const file = fs.readFileSync('./' + globalConf["page_path"] + pathName);
            if(file != null) {
                response.writeHead(200);
                response.write(file.toString());
                response.end();
            }
        } catch(e) {
            const file = fs.readFileSync('./page/NotFound.html');
            response.writeHead(404);
            response.write(file);
            response.end();
        }
    } else {// 请求动态文件
        const pathName = url.parse(request.url).pathname;
        // console.log('pathName=', pathName);
        userController.path.get(pathName)(request, response);
    }

}).listen(globalConf["port"]);

function isStaticFile(pathName) {
    const arr = ['.js', '.html', '.css', '.jpg', '.png', '.ico', '.jpeg'];
    const len = arr.length;
    for(let i = 0; i < len; i ++) {
        if(pathName.indexOf(arr[i]) > -1 && pathName.indexOf(arr[i]) == pathName.length - arr[i].length) {
            // console.log(i, arr[i], pathName.indexOf(arr[i]));
            return true;
        }
    }
    return false;
}