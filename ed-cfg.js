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
        .option('-l, --list', 'list npm config')
        .option('-u, --use <source>', 'set npm registry,eg: npm|taobao|huawei', parseListArgv)
        .option('-rec, --recommend', 'set recommend npm config')
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
    } else if (program.list) {
        child.exec(`npm config ls -l`, { stdio: 'inherit' }, function (err, sto) {
            console.log(`${sto}`);
        })
    } else if (program.recommend) {
        let recommend = {
            "progress": false,
            "logleval": "http",
            "registry": "https://mirrors.huaweicloud.com/repository/npm/"
        }
        Object.keys(recommend).forEach(type => {
            child.exec(`npm config set ${type}=${recommend[type]}`, function (err, sto) {
                // child.exec(`npm config get ${type}`, function (err, sto) {
                console.log(`set success, ${type} value is ${recommend[type]}`);
                // })
            })
        })

    } else if (program.use) {
        let use = program.use[0]
        let source = {
            "npm": "https://registry.npmjs.org/",
            "taobao": "https://registry.npm.taobao.org/",
            "huawei": "https://mirrors.huaweicloud.com/repository/npm/"
        }
        if (!Object.keys(source).includes(use)) {
            return
        }
        child.exec(`npm config set registry=${source[use]}`, { stdio: 'inherit' }, function (err, sto) {
            console.log(`set success, registry value is ${source[use]}`);
        })
    }
}()

