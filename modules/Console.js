const Args = require('./Console/Args');
const File = require('./Console/File');
const Origin = require('./Console/Origin');



const mapper = new Map();

let idCounter = 0;


class Console {

    /**
    * 构造器。
    * @param {object} config 
    *   config = {
    *       file: '',       //要保存到的文件路径，如 `./output/console.log`。
    *       clear: false,   //如果目标文件已存在，是否清空里面的内容。
    *   };
    */
    constructor(config) {
        config = Object.assign({}, config);

        let meta = {
            'id': `Console-${idCounter++}`,
            'file': config.file,
            'this': this,
        };

        mapper.set(this, meta);

        //暴露只读的属性。
        Object.assign(this, {
            'id': meta.id,
            'file': meta.file,
        });

        //指定了要清空已存在的文件。
        if (config.clear && meta.file) {
            this.write('');
        }
        
    }

    //id = ''
    //file = ''


    /**
    * 写入消息内容到文件中。
    * 已重载 write();                   //清空文件的内容，如果存在。
    * 已重载 write(name, msg, time);    //写入指定的消息到文件中。
    * @param {string} name 必选，消息的名称。 只能是 `log|error|warn|info`。
    * @param {string|Array} msg 必选，消息的内容。 可以是一个数组。
    * @param {number} time 可选，时间戳。
    * @returns { time, name, msg, }
    */
    write(name, msg, time) {
        let meta = mapper.get(this);
        msg = Args.stringify(msg);
        return File.write(meta.file, name, msg, time);
    }

    /**
    * 读取文件中的日志列表。
    * @param {string} [name] 可选，要过滤出来的名称。
    * @returns {Array} 返回日志列表。
    */
    read(name) {
        let meta = mapper.get(this);
        return File.read(meta.file, name);
    }

    /**
    * 清空。
    * 包括清空文件中的内容。
    */
    clear() {
        Origin.call('clear');
        return this.write('');
    }

    /**
    * 对应于 console.log() 方法。
    * @param  {...any} args 
    */
    log(...args) {
        Origin.call('log', args);
        return this.write('log', args);
    }

    /**
    * 对应于 console.error() 方法。
    * @param  {...any} args
    */
    error(...args) {
        Origin.call('error', args);
        return this.write('error', args);
    }

    /**
    * 对应于 console.warn() 方法。
    * @param  {...any} args
    */
    warn(...args) {
        Origin.call('warn', args);
        return this.write('warn', args);
    }

    /**
    * 对应于 console.info() 方法。
    * @param  {...any} args
    */
    info(...args) {
        Origin.call('info', args);
        return this.write('info', args);
    }

}

module.exports = Console;