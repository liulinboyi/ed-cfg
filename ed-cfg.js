#!/usr/bin/env node

const program = require('commander');
var child = require('child_process');
const packageJson = require('./package.json');
function parseListArgv(val) {
    if (val) {
        return val.split(',');
    } else {
        return [];
    }
}
void async function () {
    program
        .version(packageJson.version, '-v, --version')
        .option('-s, --set <type> <value>',
            'type: proxy|progress|loglevel|registry; \r\neg: \r\nproxy socks5://127.0.0.1:1080\r\nprogress false\r\nloglevel http\r\nregistry https://mirrors.huaweicloud.com/repository/npm/', parseListArgv)
        .option('-d, --delete <type>', 'delete npm proxy', parseListArgv)
        .option('-e, --edit', 'edit npm config by hand')
        .parse(process.argv);
    if (program.set && program.args[0] && !program.args[0].match(/'+|"+/g)) {
        let type = program.set[0]
        let args = program.args[0]
        let input = `npm config set ${type}=${args}`
        child.exec(input, function (err, sto) {
            child.exec(`npm config get ${type}`, function (err, sto) {
                console.log(`set success, ${type} value is ${sto}`);
            })
        })
    } else if (program.delete) {
        let type = program.delete[0]
        child.exec(`npm config delete ${type}`, function (err, sto) {
            console.log(`${type} delete success`);
        })
    } else if (program.edit) {
        child.exec(`npm config edit`, function (err, sto) {
            console.log(`${sto}`);
        })
    }
}()

