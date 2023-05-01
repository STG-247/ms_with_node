const fs = require('fs')


module.exports = function maths(options) {

    var log;

    // this is the special initialization pattern

    this.add({ role: 'maths', cmd: 'sum' }, sum);
    this.add({ role: 'maths', cmd: 'product' }, product);
    this.add('init:maths', init);

    function init(msg, respond) {
        console.log("############################");
        console.log(msg);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
        if (options.logfile)
            fs.open(options.logfile, 'a', (err, fd) => {
                if (err) return respond(err);
                log = make_log(fd);
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

    
    this.wrap('role:maths', function (msg, respond) {
        msg.left  = Number(msg.left).valueOf()
        msg.right = Number(msg.right).valueOf()
        this.prior(msg, respond);
      });

}
