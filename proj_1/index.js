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

srv.act({ role: 'math', cmd: 'sum', left: 1, right: 2 }, (err, data) => {
    if (err) {
        return console.error(err);
    }
    console.log(data);
});
srv.act({ role: 'math', cmd: 'product', left: 3, right: 4 }, console.log);

srv.act({ component: 'greeter', name: 'Shashwat' },
    (error, response) => {
        if (error) return console.log(error);
        console.log(response.message);
    });



