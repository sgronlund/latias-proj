import { Alert } from "react-native";
import socketClient from "socket.io-client";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("localhost:8080");

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

/**
 * @function
 * @summary Initializes socket listeners for checking for success or
 * failure of getting questions from the database
 * @param {Class} newsQ The class component newsQ (needed since we
 * call it's functions)
 */
let initNewsQSockets = (newsQ) => {
  Socket.on("getQuestionsSuccess", (questions) => {
    Socket.off("getQuestionsSuccess");
    newsQ.setState({ questions: questions });
    newsQ.nextQuestion();
  });
  Socket.on("getQuestionFailure", () => {
    Socket.off("getQuestionsSuccess");
    alert("Could not retrieve questions!");
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
  initNewsQSockets,
  Socket,
};
