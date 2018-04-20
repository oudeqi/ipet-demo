const express = require('express');
const log4js= require('./log-config')
//根据需要获取logger
const logger = log4js.getLogger()
const errlogger = log4js.getLogger('err')
const othlogger = log4js.getLogger('oth')

const app = express()
log4js.useLogger(app, logger)//这样会自动记录每次请求信息，放在其他use上面

//手动记录，可以代替console.log
logger.info('test info 1')
errlogger.err('test error 1')
othlogger.info('test info 2')