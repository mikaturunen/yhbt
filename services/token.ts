// TODO typing!
var Hapi = require("hapi");
var jwt = require("jsonwebtoken");
var tokenAuth = require("hapi-auth-jwd");

var server = new Hapi.Server();

server.connection({ port: 3001 });

var accounts = {
    123: {
        id: 123,
        user: 'john',
        fullName: 'John Doe',
        scope: ['a', 'b']
    }
};

// Use this token to build your request with the 'Authorization' header.
// Ex:
//     Authorization: Bearer <token>
var token = jwt.sign({ accountId: 123 }, privateKey);

const validate = (decodeToken: any, callback: Function) => {
    var error: string = undefined;
    var credentials = (<any>accounts)[<any>decodeToken.accountId] || { };

    if (!credentials) {
        // USER NOT FOUND
        console.log("User not found!");
        return callback(error, false, credentials);
    }

    console.log("User found");
    return callback(error, true, credentials);
};

var privateKey = "BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc";

server.register(tokenAuth, (error: any) => {
    server.auth.strategy("token", "jwt", {
        key: privateKey,
        validateFunc: validate
    });

    server.route({
        method: "GET",
        path: "/",
        config: {
            auth: "token"
        }
    });

    // With scope requirements
    server.route({
        method: "GET",
        path: "/withScope",
        config: {
            auth: {
                strategy: "token",
                scope: ["a"]
            }
        }
    });
});

server.start();
