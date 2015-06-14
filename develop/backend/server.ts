// ES5 specific modules
import * as Hapi from "hapi";

// Project modules

var server = new Hapi.Server();
server.connection({
    host: process.env.HOST,
    port: process.env.PORT
});

server.route({
    method: "GET",
    path: "/hello",
    handler: (request: any, reply: any) => {

    }
});

server.start();
