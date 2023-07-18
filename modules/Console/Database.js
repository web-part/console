
const List = require('./Database/List');
const Stat = require('./Database/Stat');

const mapper = new Map();


class Database {

    constructor(dir) { 
        
        let stat = Stat.init(dir);

        let meta = {
            dir,
            stat,
        };


        mapper.set(this, meta);
    }

    stat() {
        let meta = mapper.get(this);
        return meta.stat;
    }

    add(type, args) { 
        let meta = mapper.get(this);
        let { dir, } = meta;
        let { date, time, msg, } = List.add({ dir, type, args, });
       
        meta.stat = Stat.add({ dir, date, type, });

        return { time, type, msg, };
    }

    read(date, type) {
        // global.console.log(date, type);

        let meta = mapper.get(this);
        let { dir, } = meta;
        let list = List.read({ dir, date, type, });

        return list;
    }

    clear() { 
        let meta = mapper.get(this);
        let { dir, stat, } = meta;

        Object.keys(stat.date$info).forEach((date) => {
            List.clear({ dir, date, });
        });

        meta.stat = Stat.init(dir, true);

    }

    




}

module.exports = Database;