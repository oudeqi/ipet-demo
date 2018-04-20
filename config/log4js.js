const log4js = require('log4js')

let appenders = process.env.NODE_ENV === 'production' ? ['err'] : ['stdout']

log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        req: {//请求日志
            type: 'dateFile',
            filename: 'logs/reqlog/',
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err: {//错误日志
            type: 'dateFile',
            filename: 'logs/errlog/',
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['stdout', 'req'], level: 'debug' },
        err: { appenders: appenders, level: 'error' }
    }
})

 
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
}
 
exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'
    }))
}