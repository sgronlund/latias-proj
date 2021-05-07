import socketClient from "socket.io-client";
import bigInt from "big-integer";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://localhost:8080");

/**
 * @summary the shared symmetric key to exchange data with the server
 */
let sharedKey;

Socket.on("connection", () => {
  Socket.emit("startKeyExchange");
});

Socket.on("serverPublic", (server_public, g, p) => {
  server_public = bigInt(server_public);
  g = bigInt(g);
  p = bigInt(p);
  var private_key = bigInt(1337420); //TODO generera på annat sätt
  var my_public_key = g.modPow(private_key, p);
  sharedKey = server_public.modPow(private_key, p);
  Socket.emit("clientPublic", Number(my_public_key));
});

/**
 * @function
 * @summary Initializes socket listeners for checking for login
 * success or failure and removes the listeners
 * @param {Object} navigation navigator that redirects to other screens
 */
let initLoginSockets = (navigation) => {
  Socket.on("blankDetails", () => {
    alert("Du har lämnat blanka fält!");
  });
  Socket.on("loginRoot", () => {
    navigation.navigate("Developer");
  });
  Socket.on("alreadyLoggedIn", () => {
    alert("Du är redan inloggad på en annan enhet!");
  });
  Socket.on("loginSuccess", () => {
    navigation.navigate("GameScreen", { headerLeft: () => null });
  });
  Socket.on("invalidUserDetails", () => {
    alert("Felaktiga inloggningsuppgifter!");
  });
  Socket.on("loginFailure", () => {
    alert("Inlogg misslyckades!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking for email
 * @param {Object} navigation navigator that redirects to other screens
 * @param {String} email email of user
 * success or failure and removes the listeners
 */
let initResetSockets = (navigation, email) => {
  Socket.on("emailSuccess", () => {
    Socket.off("emailSuccess");
    navigation.navigate("VerifyReset", {
      email: email,
    });
  });
  Socket.on("emailFailure", () => {
    Socket.off("emailFailure");
    alert("Felaktig mail!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking for register
 * @param {Object} navigation navigator that redirects to other screens
 * success or failure and removes the listeners
 */
let initSignupSockets = (navigation) => {
  Socket.on("registerSuccess", () => {
    Socket.off("registerSuccess");
    navigation.navigate("Home");
  });
  Socket.on("registerFailure", () => {
    Socket.off("registerFailure");
    alert("Användarnamnet eller mail-addressen är upptagen!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking for code
 * success or failure and removes the listeners
 * @param {Object} navigation navigator that redirects to other screens
 * @param {String} email email of user
 */
let initVerifyResetSockets = (navigation, email) => {
  Socket.on("codeFailure", () => {
    Socket.off("codeFailure");
    alert("Fel kod!");
  });
  Socket.on("codeSuccess", () => {
    Socket.off("codeSuccess");
    navigation.navigate("UpdatePassword", { email: email });
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking if a question
 * was successfully added
 */
let initDeveloperNewsQSockets = () => {
  Socket.on("addQuestionSuccess", () => {
    Socket.off("addQuestionSuccess");
    alert("Fråga tillagd!");
  });
  Socket.on("addQuestionFailure", () => {
    Socket.off("addQuestionFailure");
    alert("Det gick ej att lägga till frågan!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking if a question
 * was successfully added
 */
let initDeveloperArtQSockets = () => {
  Socket.on("addQuestionArticleSuccess", () => {
    Socket.off("addQuestionArticleSuccess");
    alert("Fråga tillagd!");
  });
  Socket.on("addQuestionArticleFailure", () => {
    Socket.off("addQuestionArticleFailure");
    alert("Det gick ej att lägga till frågan!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking if a coupon
 * was successfully added
 */
let initDeveloperCouponSockets = () => {
  Socket.on("addCouponSuccess", () => {
    Socket.off("addCouponSuccess");
    alert("Kupong tillagd!");
  });
  Socket.on("addCouponFailure", () => {
    Socket.off("addCouponFailure");
    alert("Det gick ej att lägga till kupongen!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking if an article
 * was successfully added
 */
let initDeveloperArticlesSockets = () => {
  Socket.on("addArticleSuccess", () => {
    Socket.off("addArticleSuccess");
    Socket.off("addArticleFailure");
    alert("Artikel tillagd!");
  });
  Socket.on("addArticleFailure", () => {
    Socket.off("addArticleSuccess");
    Socket.off("addArticleFailure");
    alert("Det gick ej att lägga till artikeln!");
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking for logout
 * success or failure and removes the listeners
 * @param {Object} navigation navigator that redirects to other screens
 */
let initLogoutSockets = (navigation) => {
  Socket.on("logoutSuccess", () => {
    Socket.off("logoutSuccess");
    navigation.navigate("Home");
  });
  Socket.on("logoutFailure", () => {
    Socket.off("logoutFailure");
    alert("Du är ej inloggad!");
  });
};

export default Socket;
export {
  initLoginSockets,
  initResetSockets,
  initSignupSockets,
  initVerifyResetSockets,
  initDeveloperNewsQSockets,
  initDeveloperArtQSockets,
  initDeveloperCouponSockets,
  initDeveloperArticlesSockets,
  initLogoutSockets,
  sharedKey,
  Socket,
};
