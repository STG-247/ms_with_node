function api(options) {

    const valid_ops = { sum: 'sum', product: 'product' }

    this.add({ role: "api", path: "calculate" }, calc);
    this.add({ init: "api" }, init);


    function calc(msg, respond) {
        const operation = msg.args.params.operation
        const left = msg.args.query.left
        const right = msg.args.query.right
        this.act({ role: "math" },
            {
                cmd: valid_ops[operation],
                left: left,
                right: right,
            }, respond)
    }

    function init(msg, respond) {
        this.act({ role: "web" }, {
            routes: {
                prefix: '/api',
                pin: 'role:api,path:*',
                map: {
                    calculate: { GET: true, suffix: '/:operation' }
                }
            }
        }, respond)
    }



}

module.exports = { api_plugin: api };