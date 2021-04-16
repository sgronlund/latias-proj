import socketClient from "socket.io-client";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://localhost:8080");

/**
 * @function
 * @summary Initializes socket listeners for checking for login
 * success or failure and removes the listeners
 * @param {Object} navigation navigator that redirects to other screens
 */
let initLoginSockets = (navigation) => {
  Socket.on("loginRoot", () => {
    Socket.off("loginRoot");
    navigation.navigate("Developer");
  });
  Socket.on("loginSuccess", () => {
    Socket.off("loginSuccess");
    navigation.navigate("Guest");
  });
  Socket.on("loginFailure", () => {
    Socket.off("loginFailure");
    alert("Login failed!");
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

export default Socket;
export {
  initLoginSockets,
  initResetSockets,
  initSignupSockets,
  initVerifyResetSockets,
  Socket,
};
