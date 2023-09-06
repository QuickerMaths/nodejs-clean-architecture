export default (controller) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    user: req.user,
    logger: req.logger,
    source: {
      ip: req.ip,
      browser: req.get("User-Agent"),
    },
    headers: {
      "Content-Type": req.get("Content-Type"),
      Referer: req.get("referer"),
      "User-Agent": req.get("User-Agent"),
    },
  };

  controller(httpRequest)
    .then((httpResponse) => {
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch((err) => {
      if (err.isOperational) {
        res.status(err.statusCode).send({
          statusCode: err.statusCode,
          body: {
            error: err.message,
          },
        });
      } else {
        res.status(500).send({
          statusCode: 500,
          body: {
            error: "Internal Server Error",
          },
        });
      }
    });
};
