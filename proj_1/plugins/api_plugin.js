module.exports = function api_plugin(options) {

    const valid_ops = { sum: 'sum', product: 'product' }

    this.add({ role: "api", path: "calculate" }, calc);
    this.add({ init: 'api_plugin' }, init);


    function calc(msg, respond) {
        const operation = msg.args.params.operation
        const left = msg.args.query.left
        const right = msg.args.query.right
        this.use(require('./maths.js'))
        .act({ role: "maths" },
            {
                cmd: valid_ops[operation],
                left: left,
                right: right,
            }, respond);
    }

    function init(msg, respond) {
        console.log(JSON.stringify(msg, null, 4));
        this.act(
            { role: 'web' },
            { routes: {
                prefix: '/api',
                pin: 'role:api,path:*',
                map: { calculate: { GET: true, suffix: '/:operation' } }
            }
        }, respond);
    }



}
