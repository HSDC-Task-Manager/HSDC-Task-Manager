const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the sessions obj, then
 * verify whether or not the session is still valid.
 */
sessionController.validateSession = (req, res, next) => {
  console.log("validating session with req: ", res.session);
  // if loggedIn on the request session is truthy
  if (req.session.loggedIn) {
    // package information from the session object for front end
    // TODO - check for structure desired for frontend auth / session management
    res.locals = {
      userID: req.session.id,
      loggedIn: req.session.loggedIn,
    };
    // if the session isn't active, send false for loggedIn back to the front end
  } else {
    res.locals.loggedIn = false;
  }
};

/**
 * deleteSession - delete a session from the sessions object
 *
 */
sessionController.deleteSession = (req, res, next) => {
  console.log("deleting session...");
  req.session.destroy(next);
};

module.exports = sessionController;
