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

      if (httpResponse.body.hasOwnProperty("tokenPair")) {
        //TODO: check why its not setting new accessCookie after generating it in refresh route
        const { refreshToken, accessToken } = httpResponse.body.tokenPair;

        res.clearCookie("accessToken");

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
        });

        delete httpResponse.body;
      }

      return res.status(httpResponse.statusCode).send(httpResponse.body);
    })
    .catch(next);
};
