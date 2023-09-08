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

      if (
        httpResponse.body.user.accessToken &&
        httpResponse.body.user.refreshToken
      ) {
        res.cookie("refreshToken", httpResponse.body.user.refreshToken, {
          httpOnly: true,
          secure: false,
        });
        delete httpResponse.body.user.refreshToken;

        res.cookie("accessToken", httpResponse.body.user.accessToken, {
          httpOnly: true,
          secure: false,
        });
        delete httpResponse.body.user.accessToken;
      }

      return res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch(next);
};
