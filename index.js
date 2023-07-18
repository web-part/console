
const Console = require('./modules/Console');


//创建默认的，以便快捷使用。
let console = null;

function invoke(name, ...args) {
    console = console || new Console({
        'dir': exports.defaults.dir,
    });

    return console[name](...args);
}


module.exports = exports = {
    Console,

    defaults: {
        dir: '',
    },

    /**
    * 绑定事件。
    */
    on(...args) {
        return invoke('on', ...args);
    },

    /**
    * 获取统计信息。
    * @returns {}
    *   如果不存在，则返回 undefined。
    */
    stat() { 
        return invoke('stat');
    },
    
   
    /**
    * 读取指定日期中的日志列表。
    * @param {string} date 必选，要读取的日期。
    * @param {string} [type] 可选，要过滤出来的类型。
    * @returns {Array} 返回日志列表。
    *   如果不存在，则返回 undefined。
    */
    read(date, type) {
        return invoke('read', date, type);
    },

    /**
    * 写入消息内容到文件中。
    * @param {string} type 必选，消息的类型，只能是 `log|error|warn|info`。
    * @param {string|Array} args 必选，消息的内容，可以是一个数组。
    * @returns { time, type, msg, }
    */
    write(type, args) {
        return invoke('write', type, args);
    },


    /**
    * 清空整个数据库。
    */
    clear() {
        return invoke('clear');
    },
   
    /**
    * 对应于 console.log() 方法。
    * @param  {...any} args
    */
    log(...args) {
        return invoke('log', ...args);
    },

    /**
    * 对应于 console.error() 方法。
    * @param  {...any} args
    */
    error(...args) {
        return invoke('error', ...args);
    },

    /**
    * 对应于 console.warn() 方法。
    * @param  {...any} args
    */
    warn(...args) {
        return invoke('warn', ...args);
    },

    /**
    * 对应于 console.info() 方法。
    * @param  {...any} args
    */
    info(...args) {
        return invoke('info', ...args);
    },
};