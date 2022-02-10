import { JWT_SECRET } from "./secrets";

const jwt = require("express-jwt");

const getTokenFromHeader = (req) => {
    const headerAuth = req.headers.authorization;

    if (headerAuth !== undefined && headerAuth !== null) {
        if (Array.isArray(headerAuth)) {
            return splitToken(headerAuth[0]);
        } else {
            return splitToken(headerAuth);
        }
    }

    return null;
};

const splitToken = (authString) => {
    if (authString.split(" ")[0] === "Token") {
        return authString.split(" ")[1];
    }

    return null;
};

const auth = {
    required: jwt({
        credentialsRequired: true,
        secret: JWT_SECRET,
        getToken: getTokenFromHeader,
        userProperty: "payload",
        algorithms: ["HS256"],
    }),

    optional: jwt({
        credentialsRequired: false,
        secret: JWT_SECRET,
        getToken: getTokenFromHeader,
        userProperty: "payload",
        algorithms: ["HS256"],
    }),
};

export default auth;
