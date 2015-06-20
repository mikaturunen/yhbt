/**
 * Simple CDN service that for now just provides the static content and other
 * public files. Such as the JS, HTML, IMG and the likes.
 */

// TODO fix Hapi typing
var Hapi: any = require("hapi");

// ES5 specific modules
import * as path from "path";

// ES6 specific modules

// Using HAPI for the CDN front
var server = new Hapi.Server();
server.connection({
    host: process.env.HOST || "127.0.0.1",
    port: process.env.PORT || 3000
});

// Setting up static coures for CDN like behavior when we want to serve our files
server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
        directory: {
            path: path.join(__dirname, "../frontend/")
        }
    }
});

server.route({
    method: "GET",
    path: "*",
    handler: (request: any, reply: any) => {
        let indexPath = path.join(__dirname, "../../youhavebeentasked/release/frontend/index.html");
        console.log("Attempting to get index.html from:", indexPath);
        reply.file(indexPath);
    }
});

// TODO start rabbitmq for communication

server.start();
