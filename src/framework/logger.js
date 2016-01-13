import winston from 'winston';
import path from 'path';
import fs from 'fs';

let logDir = path.join(__dirname, '../../logs');

try {
    fs.mkdirSync(logDir);
} catch (e) {
    if (e.code !== 'EEXIST') throw e;
}

const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.File)({
            name: 'info-file',
            filename: logDir + '/' + 'info.log',
            level: 'info',
            maxsize: 20 * 1024 * 1024 // 20MB for each file
        }),
        new(winston.transports.Console)({
            name: 'info-console',
            level: 'info',
            timestamp: true
        }),
        new(winston.transports.File)({
            name: 'error-file',
            filename: logDir + '/' + 'error.log',
            level: 'error',
            maxsize: 20 * 1024 * 1024 // 20MB for each file
        })
    ]
});

export default logger;