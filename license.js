
// license.js
const OWNER_NUMBER = "+255719632816"; // Namba yako tu

function isLicensed(userNumber) {
  return userNumber === OWNER_NUMBER;
}

module.exports = { isLicensed };
