const fs = require('fs');

const config = fs.readFileSync('./server.conf').toString().split('\n');
const len = config.length;
let globalConf = {};
// console.log(config);

for(var i = 0; i < len; i ++) {
    var item = config[i].split('=');
    globalConf[item[0]] = item[1].trim();
}
// console.log(globalConf);

module.exports = globalConf;