


module.exports = {


    stringify(args) {
        
        if (!Array.isArray(args)) {
            args = [args];
        }

        args = args.map((item) => {
            if (typeof item == 'string') {
                return item;
            }

            if (item === undefined) {
                return 'undefined';
            }

            if (typeof item == 'number' && isNaN(item)) {
                return 'NaN';
            }

            if (item instanceof Error) {
                return item.stack;
            }

            if (item instanceof Date) {
                return item.toString();
            }


            try {
                let json = JSON.stringify(item, null, 4);

                return json;
            }
            catch (ex) {
                return Object.prototype.toString.call(item);
            }
        });

        let msg = args.join(' ');

        return msg;
    },
};