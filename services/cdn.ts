/**
 * Simple CDN service that for now just provides the static content and other
 * public files. Such as the JS, HTML, IMG and the likes.
 */

// ES5 specific modules
import * as Hapi from "hapi";
import * as path from "path";

// Project modules

// Using HAPI for the CDN front
var server = new Hapi.Server();
server.connection({
    host: process.env.HOST,
    port: process.env.PORT
});

server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
        directory: {
            path: path.join(__dirname, "../")
        }
    }
});

server.start();
