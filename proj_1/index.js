const seneca = require('seneca');
const srv = seneca({ log: 'silent' });

srv.add({ role: 'math', cmd: 'sum' }, (msg,
    respond) => {
    const sum = msg.left + msg.right;
    respond(null, { answer: sum });
});
srv.add({ role: 'math', cmd: 'product' }, (msg, respond) => {
    const product = msg.left * msg.right;
    respond(null, { answer: product });
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



// actions



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

