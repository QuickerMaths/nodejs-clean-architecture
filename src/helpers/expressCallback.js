export default (controller) => (req, res) => {
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
      res.set("Content-Type", "application/json");
      res.type("json");
      const body = {
        success: true,
        code: httpResponse.statusCode,
        data: httpResponse.body,
      };
      res.status(200).send(body);
    })
    .catch((e) => {
      console.log(e);

      res.status(400).send({
        success: false,
        code: 400,
        error: {
          description: e.message,
        },
      });
    });
};
