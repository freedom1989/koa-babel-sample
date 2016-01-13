import path from 'path';
import fs from 'fs';
import winston from 'winston';

const DEFAULT_CONFIG_FILE = path.join(__dirname, '..', '../conf/config.prod.json');
const DEFAULT_CONFIG_FILE_FOR_DEV = path.join(__dirname, '..', '../conf/config.dev.json');

const config = (function _getConfig() {
    let configFile = DEFAULT_CONFIG_FILE;
    if(process.env.NODE_ENV === 'development') {
        configFile = DEFAULT_CONFIG_FILE_FOR_DEV;
    }
    for(let arg of process.argv) {
        if(arg.indexOf('--config=') === 0) {
            configFile = arg.split('=')[1];
            if(!path.isAbsolute(configFile)) {
                // convert the path that relative to app.js 
                configFile = path.join(process.cwd(), configFile);
            }
        }
    }
    winston.info('using config file: %s', configFile);
    let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    winston.info('configuration data', config);
    return config;
})();

export default config;


