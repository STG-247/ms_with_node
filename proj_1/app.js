// loading standard packages
const seneca = require("seneca")();
const SenecaWeb = require("seneca-web");
const Express = require("express");
const Router = Express.Router;
const app = Express();
const context = new Router();
const bodyParser = require('body-parser');
const senecaExpressAdaptor = require('seneca-web-adapter-express');

// loading custom plugins
const api_plugin = require('./plugins/api_plugin.js');

/// add router and use express adaptor
const senecaWebConfig = {
    context: context,
    adapter: senecaExpressAdaptor,
    options: { parseBody: false }  // we will use body-parser middleware
};

app.use(bodyParser.json())
    .use(context);

seneca
.use(SenecaWeb, senecaWebConfig)
.use(api_plugin)
.client({type: 'tcp', pin: {role: 'api_stg'}});

//https://senecajs.org/getting-started/#writing-microservices

app.listen(process.env.EXPRESS_PORT||3900);





