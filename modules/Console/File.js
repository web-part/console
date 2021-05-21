
const File = require('@definejs/file');


module.exports = {
    /**
    * 写入消息内容到文件中。
    * 已重载 write(file);                       //清空文件的内容，如果存在。
    * 已重载 write(file, name, msg, time);      //写入指定的消息到文件中。
    * @param {string} file 必选，文件名。 
    * @param {string} name 必选，消息的名称。 只能是 `log|error|warn|info`。
    * @param {string} msg 必选，消息的内容。 
    * @param {number} time 可选，时间戳。
    * @returns { time, name, msg, }
    */
    write(file, name, msg, time) {
        if (!file) {
            return;
        }

        //未指定，则清空。
        if (!name) {
            File.write(file, '', null);
            return;
        }
    
        time = time || Date.now();

        let item = { time, name, msg, };
        let json = JSON.stringify(item);  //避免换行。 因为换行在 sse 的格式里有特殊含义。
        let line = json + '\n';

        File.append(file, line, null);

        return item;
    },


    /**
    * 读取文件中的日志列表。
    * @param {string} file 必选，文件名。
    * @param {string} [name] 可选，要过滤出来的名称。
    * @returns {Array} 返回日志列表。
    */
    read(file, name) {
        if (!file) {
            return;
        }


        let content = File.read(file);
        let lines = content.split('\n');
        let list = [];

        lines.forEach((line) => {
            let item = null;

            try {
                item = JSON.parse(line);
            }
            catch (ex) {

            }

            if (!item) {
                return;
            }

            let { time, name, msg, } = item;

            let valid =
                typeof time == 'number' &&
                typeof name == 'string' && 
                typeof msg == 'string';

            if (valid) {
                list.push(item);
            }
        });

        if (name) {
            list = list.filter((item) => {
                return item.name == name;
            });
        }

        return list;
    },

};