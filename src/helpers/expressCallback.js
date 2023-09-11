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
      res.set(httpResponse.headers);

      //FIXME: Everything works good but only when cookies are set for the first time, later accessToken that is generated from refreshToken route is not being overwritten

      if (httpResponse?.cookies) {
        httpResponse.cookies.forEach(({ name, value, options }) => {
          res.cookie(name, value, options);
        });
      }

      return res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch(next);
};
