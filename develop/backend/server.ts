import Hapi from "hapi";

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
