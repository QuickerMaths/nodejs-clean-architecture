/* The code is exporting a middleware function that takes in a `controller` function as a parameter.
This middleware function is used to handle HTTP requests and responses. */

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
      browser: req.get("User-Agent")
    },
    headers: {
      "Content-Type": req.get("Content-Type"),
      Referer: req.get("referer"),
      "User-Agent": req.get("User-Agent")
    }
  };

  controller(httpRequest)
    .then((httpResponse) => {
      if (httpResponse?.cookies) {
        httpResponse.cookies.forEach(({ name, value, options }) => {
          res.cookie(name, value, options);
        });
      }

      if (httpRequest?.path === "/logout") {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
      }

      return res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch(next);
};
