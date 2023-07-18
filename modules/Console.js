const Emitter = require('@definejs/emitter');
const Database = require('./Console/Database');
const Raw = require('./Console/Raw');


const mapper = new Map();

let idCounter = 0;


class Console {

    /**
    * 构造器。
    * @param {object} config 
    *   config = {
    *       dir: '',        //要保存到的文件路径，如 `./output/console/`。
    *       clear: false,   //如果目标文件已存在，是否清空里面的内容。
    *   };
    */
    constructor(config) {
        config = Object.assign({}, config);

        let { dir, clear, } = config;
        let db = dir ? new Database(dir) : null;
        let emitter = new Emitter(this);
        let id = `Console-${idCounter++}`;

        let meta = {
            id,
            db,
            emitter,
            'this': this,
        };

        mapper.set(this, meta);

        //暴露只读的属性。
        Object.assign(this, { id, });

        //指定了要清空已存在的文件。
        if (clear && db) {
            db.clear();
        }
        
    }

    //id = ''

    /**
    * 绑定事件。
    * 已重载 on({...}); 批量绑定。
    * 已重载 on(name, fn); 单个绑定。
    */
    on(...args) {
        let meta = mapper.get(this);
        meta.emitter.on(...args);
    }

    /**
    * 获取统计信息。
    * @returns {}
    *   如果不存在，则返回 undefined。
    */
    stat() { 
        let meta = mapper.get(this);
        let { db, } = meta;

        if (!db) {
            return;
        }

        return db.stat();
    }
    

    /**
    * 读取指定日期中的日志列表。
    * @param {string} date 必选，要读取的日期。
    * @param {string} [type] 可选，要过滤出来的类型。
    * @returns {Array} 返回日志列表。
    *   如果不存在，则返回 undefined。
    */
    read(date, type) {
        let meta = mapper.get(this);
        let { db, } = meta;

        if (!db) {
            return;
        }

        let list = db.read(date, type);
        return list;
    }

    /**
    * 写入消息内容到文件中。
    * @param {string} type 必选，消息的类型，只能是 `log|error|warn|info`。
    * @param {string|Array} args 必选，消息的内容，可以是一个数组。
    * @returns { time, type, msg, }
    */
    write(type, args) {
        let meta = mapper.get(this);
        let { db, emitter, } = meta;

        if (!db) {
            return;
        }

        let item = db.add(type, args);

        emitter.fire('add', type, [item]);
        emitter.fire('add', [item]);
        emitter.fire('change', [item]);

        return item;
    }

    /**
    * 清空整个数据库。
    */
    clear() {
        let meta = mapper.get(this);
        Raw.call('clear');

        meta.db.clear();
        emitter.fire('change', []);
        emitter.fire('clear', []);
        
    }

    /**
    * 对应于 console.log() 方法。
    * @param  {...any} args 
    */
    log(...args) {
        Raw.call('log', args);
        return this.write('log', args);
    }

    /**
    * 对应于 console.error() 方法。
    * @param  {...any} args
    */
    error(...args) {
        Raw.call('error', args);
        return this.write('error', args);
    }

    /**
    * 对应于 console.warn() 方法。
    * @param  {...any} args
    */
    warn(...args) {
        Raw.call('warn', args);
        return this.write('warn', args);
    }

    /**
    * 对应于 console.info() 方法。
    * @param  {...any} args
    */
    info(...args) {
        Raw.call('info', args);
        return this.write('info', args);
    }

}

module.exports = Console;