exports.handleError = function(err, req, res, next) {
    console.error(err);
    res.send(500, {error: "Internal server error"});
    return next(err);
}
