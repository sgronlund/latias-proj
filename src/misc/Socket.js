import { Alert } from "react-native";
import socketClient from "socket.io-client";
import bigInt from "big-integer";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://192.168.0.104:8080");

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
  Socket.on("loginRoot", () => {
    
    navigation.navigate("Developer");
  });
  Socket.on("loginSuccess", () => {
    
    navigation.navigate("GameScreen", { headerLeft: null });
  });
  Socket.on("loginFailure", () => {
    
    alert("Login failed!");
  });
  Socket.on("alreadyLoggedIn", () => {
    Socket.off("alreadyLoggedIn");
    alert("You are already logged in on another device!");
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
    alert("Invalid email!");
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
    alert("Username or email busy!");
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
    alert("Wrong code!");
  });
  Socket.on("codeSuccess", () => {
    Socket.off("codeSuccess");
    navigation.navigate("UpdatePassword", { email: email });
  });
};

/**
 * @function
 * @summary Initializes socket listeners for checking for login
 * success or failure and removes the listeners
 */
let initDeveloperSockets = () => {
  Socket.on("addQuestionSuccess", () => {
    Socket.off("addQuestionSuccess");
    alert("Question added!");
  });
  Socket.on("addQuestionFailure", () => {
    Socket.off("addQuestionFailure");
    alert("Invalid input!");
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
    alert("You are not logged in!");
  });
};

export default Socket;
export {
  initLoginSockets,
  initResetSockets,
  initSignupSockets,
  initVerifyResetSockets,
  initDeveloperSockets,
  initLogoutSockets,
  sharedKey,
  Socket,
};
