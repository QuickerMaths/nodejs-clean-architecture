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
    cookies: req.cookies,
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
      if (httpResponse?.headers) {
        res.set(httpResponse.headers);
      }

      if (httpResponse?.cookies) {
        httpResponse.cookies.forEach((cookie) => {
          res.cookie(cookie.name, cookie.value, cookie.options);
        });
      }

      return res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch(next);
};
