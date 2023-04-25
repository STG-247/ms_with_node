const seneca = require('seneca');
const { console_log } = require('./plugins/minimal_plugin');
const { sen_math } = require('./plugins/math_plugin');
const srv = seneca({ log: 'silent' });

// patterns added
srv.add({ role: 'math', cmd: 'sum', integer: true }, (msg, respond) => {
    srv.act({ role: 'math', cmd: 'sum', left: Math.floor(msg.left), right: Math.floor(msg.right)}, respond);
});
srv.add({ component: 'greeter' }, (msg, respond) => {
    respond(null, { message: 'Hello ' + msg.name });
});
srv.add({ cmd: 'wordcount' }, (msg, respond) => {
    const length = msg.phrase.split(' ').length;
    respond(null, { words: length });
});
srv.add({ cmd: 'wordcount', skipShort: true }, (msg, respond) => {
    const words = msg.phrase.split(' ');
    const validWords = words.filter(a => a.length > 3).length;
    respond(null, { words: validWords });
});



// plugins used
srv.use(console_log, {foo: 'bar'});
const sen_mat = srv.use(sen_math); // options: {logfile:'./math.log'}
sen_mat.tag = "STG";
sen_mat.act('role: math, cmd: sum, left: 1, right: 12', console.log);
sen_mat.act('role: math, cmd: product, left: 3, right: 12', console.log);

// actions to take

srv.act({ role: 'math', cmd: 'sum', left: 1, right: 2 }, (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log(data);
});
srv.act({ role: 'math', cmd: 'product', left: 3, right: 4 }, console.log);

srv.act({ component: 'greeter', name: 'Shashwat' }, (error, response) => {
    if (error) return console.log(error);
    console.log(response.message);
});


srv.act({ cmd: 'wordcount', phrase: 'Hello world this is Seneca' }, (err, response) => {
    console.log(response);
});

srv.act({ cmd: 'wordcount', skipShort: true, phrase: 'Hello world this is Seneca' }, (err, response) => {
    console.log(response);
});

srv.act({ role: 'math', cmd: 'sum', left: 1.5, right: 2.5, integer: true }, console.log);
srv.act({ role: 'math', cmd: 'product', left: 1.5, right: 2.5 }, console.log);



