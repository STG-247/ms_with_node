const fs = require('fs')


function math(options) {

    var log;

    // this is the special initialization pattern

    this.add({ role: 'math', cmd: 'sum' }, sum);
    this.add({ role: 'math', cmd: 'product' }, product);
    this.add('init:math', init);

    function init(msg, respond) {
        console.log("############################");
        console.log(msg);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
        if (options.logfile)
            fs.open(options.logfile, 'a', (err, fd) => {
                if (err) return respond(err)
                log = make_log(fd)
                respond();
            });
        else
            respond();
    }

    function sum(msg, respond) {
        const out = { answer: msg.left + msg.right };
        if (!!log)
            log('sum ' + msg.left + '+' + msg.right + '=' + out.answer + '\n');
        respond(null, out);
    }

    function product(msg, respond) {
        const out = { answer: msg.left * msg.right };
        if (!!log)
            log('product ' + msg.left + '*' + msg.right + '=' + out.answer + '\n');
        respond(null, out);
    }

    function make_log(fd) {
        return (entry) => {
            fs.write(fd, new Date().toISOString() + ' ' + entry, null, 'utf8', (err) => {
                if (err) return console.log(err)
                fs.fsync(fd, (err) => {
                    if (err) return console.log(err)
                });
            });
        };
    }

}

module.exports = { sen_math: math };
