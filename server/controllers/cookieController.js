const cookieController = {};

/**
 * setSSIDCookie - store the user id in a cookie
 */
cookieController.setSSIDCookie = (req, res, next) => {
  console.log("running cookieController.setSSIDCookie");

  res.cookie("ssid", res.locals.user._id.toString(), {
    // secure: true,
    // httpOnly: true,
  });
  return next();
};

module.exports = cookieController;
