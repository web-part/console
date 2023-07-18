
const $Date = require('@definejs/date');
const File = require('@definejs/file');

const Args = require('./List/Args');


module.exports = {

    add({ dir, type, args, }) {
        let msg = Args.stringify(args);
        let time = Date.now();
        let date = $Date.format(time, 'yyyy-MM-dd');
        let file = `${dir}/${date}.log`;

        let item = { time, type, msg, };
        let json = JSON.stringify(item);  //避免换行。 因为换行在 sse 的格式里有特殊含义。
        let line = json + '\n';

        File.append(file, line);

        return { date, time, msg, };
    },

    read({ dir, date, type, }) {
        date = $Date.format(date, 'yyyy-MM-dd');

        let file = `${dir}/${date}.log`;
        let content = File.read(file);
        let lines = content.split('\n');

        let list = [];

        lines.slice(0, -1).forEach((line) => {
            let item = JSON.parse(line);
            if (!item) {
                return;
            }

            if (!type) {
                list.push(item);
                return;
            }

            if (item.type == type) {
                list.push(item);
            }
        });

        return list;
    },


    clear({ dir, date, }) { 
        let file = `${dir}/${date}.log`;
        File.delete(file);
    },
};