const Session = require("../models/sessionModel");

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
      username: req.session.username,
      email: req.session.email,
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

// OLD AUTH CODE
// sessionController.isLoggedIn = (req, res, next) => {
//   console.log("running sessionControlled.isLoggedIn");
//   // get SSID from cookie on request
//   console.log("ssid cookie_id: ", req.cookies.ssid);

//   // query the DB for a matching cookieID in the session document
//   Session.findOne({ cookieId: req.cookies.ssid })
//     .then((session) => {
//       console.log('query returned: ', session)
//       // if there is a match - We're LOGGED IN - return next();
//       if (session && session.cookieId === req.cookies.ssid) {
//         console.log('Session.cookie matches req.cookies.ssid.  User isLoggedIn.  Moving on to next middleware')
//         return next();
//       }
//       else {
//         return next('No Session.cookie matches req.cookies.ssid.  User NOT logged in.');
//       }
//     })
//     // if no match, redirect or something.  FAIL.
//     .catch((err) => {
//       return next({
//         log: "error in sessionController.isLoggedIn",
//         message: { err: "sessionController.isLoggedIn" + err },
//       });
//     });

// Session.findOne({ cookieId: req.cookies.ssid}, (err, session) => {
//   if (err) {
//     // DB error
//     return next('Error in sessionController.isLoggedIn: ' + JSON.stringify(err));
//   }
//   else if (!session) {
//     // no session found (session = null)
//     res.redirect('/signup');
//   }
//   else {
//     // session found
//     return next();
//   }
// })
// };

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  console.log("running sessionController.startSession");
  console.log("user: ", res.locals.user);
  Session.create({ cookieId: res.locals.user._id.toString() })
    .then((data) => {
      console.log("created new session: ", data);
      return next();
    })
    .catch((err) => {
      return next({
        log: "error in sessionController.startSession",
        message: { err: "sessionController.startSession" + err },
      });
    });
};

module.exports = sessionController;
