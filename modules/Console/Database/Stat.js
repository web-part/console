
const File = require('@definejs/file');

module.exports = {

    init(dir, clear) { 
        let file = `${dir}/stat.json`;

        if (!clear && File.exists(file)) {
            let stat = File.readJSON(file);
            return stat;
        }

        let stat = {
            count: 0,
            latest: '',
            date$info: {},
        };

        File.writeJSON(file, stat);

        return stat;

    },

    add({ dir, date, type, }) { 
        let file = `${dir}/stat.json`;
        let stat = File.readJSON(file);
        let { date$info, } = stat;
        let info = date$info[date];

        if (!info) {
            info = date$info[date] = {
                count: 0,
                type$count: { },
            };
        }
        
        stat.count++;
        stat.latest = date;
        info.count++;
        info.type$count[type] = (info.type$count[type] || 0) + 1;

        File.writeJSON(file, stat);

        return stat;

    },


};