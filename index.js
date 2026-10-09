//loginTracker
//Problem: Allows login upto 3 attempts then locks account

const MAX_ATTEMPTS = 3;

/**
 * creates login handler for one user.
 * @param {{username: string, password: string}} userinfo
 * @returns {(passwordAttempt: string) => string} function to call on each login attempt
 */
const createLoginTracker = (userinfo) => {
  // error: reject bad user data upfront.
  if (
    !userinfo ||
    typeof userinfo.username !== "string" ||
    typeof userinfo.password !== "string" ||
    userinfo.username === "" ||
    userinfo.password === ""
  ) {
    throw new TypeError(
      "userInfo must be an object with non-empty string username and password"
    );
  }

  let attempts = 0;

  // inner arrow function: runs once per login attempt.
  const loginAttempt = (passwordAttempt) => {
    // count this attempt.
    attempts++;
    // lockout check: more than 3 attempts locks the account.
    // even if password is correct.
    if (attempts > MAX_ATTEMPTS) {
      return "Account locked due to too many failed login attempts";
    }

    // Error handling (input): a non-string attempt can never match,
    // is treated as a failed attempt (and still counts toward the limit).
    const isMatch =
      typeof passwordAttempt === "string" &&
      passwordAttempt === userinfo.password;

    // correct password within allowed attempts.
    if (isMatch) {
      return "Login successful";
    }

    // wrong password within allowed attempts.
    return `Attempt ${attempts}: Login failed`;
  };

  return loginAttempt;
};

module.exports = {
  ...(typeof createLoginTracker !== "undefined" && { createLoginTracker }),
}; 