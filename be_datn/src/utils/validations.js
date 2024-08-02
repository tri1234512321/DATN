/** @format */

const isValidLengthPassword = (newPassword, length) => {
      if (!newPassword) return false;
      return newPassword.length >= length;
};

module.exports = {
      isValidLengthPassword: isValidLengthPassword,
};
