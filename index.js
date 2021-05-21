
const Console = require('./modules/Console');


//创建默认的，以便快捷使用。
let console = null;

function invoke(name, ...args) {
    console = console || new Console({
        'file': exports.file,
    });

    return console[name](...args);
}


module.exports = exports = {
    Console,

    file: '',
    
    /**
    * 写入消息到文件中。
    * 已重载 write();                   //清空文件的内容，如果存在。
    * 已重载 write(name, msg, time);    //写入指定的消息到文件中。
    * @param {string} name 必选，消息的名称。 只能是 `log|error|warn|info`。
    * @param {string|Array} msg 必选，消息的内容。 可以是一个数组。
    * @param {number} time 可选，时间戳。
    * @returns { time, name, msg, }
    */
    write(name, msg, time) {
        return invoke('write', name, msg, time);
    },

    /**
    * 读取文件中的日志列表。
    * @param {string} [name] 可选，要过滤出来的名称。
    * @returns {Array} 返回日志列表。
    */
    read(name) {
        return invoke('read', name);
    },

    /**
    * 清空。
    * 包括清空文件中的内容。
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