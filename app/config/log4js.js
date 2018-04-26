const log4js = require('log4js')

let appenders = process.env.NODE_ENV === 'production' ? ['dateFile'] : ['stdout', 'dateFile'];
let level = process.env.NODE_ENV === 'production' ? 'error' : 'info';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {
            type: 'stdout'
        },
        dateFile: {
            type: 'dateFile',
            filename: 'logs/',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout: {
				type: 'pattern', // 设置日志的格式
				pattern: '[%d] [%p] %c - %m'
			}
        },
        file: {
            type: 'file', 
            filename: 'logs/application.log'
        }
    },
    categories: {
    	// 手动打印出的信息
        default: {
        	appenders: appenders, 
        	level: level
        },
        // 给 express 框架捕获的异常，存放在logs/application.log文件里
        // app: {
        // 	appenders: ['file'], 
        // 	level: 'error'
        // }
    }
})
 
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
}
 
exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems]--[:referrer HTTP/:http-version :user-agent]',
        // 整合express设置日志内容的格式[express框架对应的url]
        level:log4js.levels.INFO
        // 整合express设置日志的颜色[express框架对应的url]
    }))
}