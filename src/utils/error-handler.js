import logger from "./logger";
import { IS_PRODUCTION } from "./secrets";

export function loadErrorHandlers(app) {
    app.use((_req, _res, next) => {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    app.use((err, _req, res, _next) => {
        if (err.name === "ValidationError") {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors, key) {
                    errors[key] = err.errors[key].message;

                    return errors;
                }, {}),
            });
        }

        logger.error(err);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: !IS_PRODUCTION ? err : {},
            },
        });
    });
}
