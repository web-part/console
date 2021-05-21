

const $console = {
    log: console.log.bind(console),
    error: console.error.bind(console),
    warn: console.warn.bind(console),
    info: console.info.bind(console),
    clear: console.clear.bind(console),
};


module.exports = {

    call(name, args = []) {
        let fn = $console[name];
        fn(...args);
    },


};