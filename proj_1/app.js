const seneca = require("seneca")();
const SenecaWeb = require("seneca-web");
const Express = require("express");
const Router = Express.Router;
const context = new Router()

const senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }  // we will use body-parser middleware
};
const app = Express()
            .use(require('body-parse').json())
            .use(context)
            .listen(process.env.EXPRESS_PORT||3400);


seneca
.use(SenecaWeb, senecaWebConfig)
.use('api_plugin')
.client({type: 'tcp', pin: {role: math}});


//https://senecajs.org/getting-started/#writing-microservices



app.use(srv.export('web'));

app.listen(3900);





