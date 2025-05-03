const validator = {
  // Validate email format
  isEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate password strength
  isStrongPassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  },

  // Validate username
  isValidUsername: (username) => {
    // Alphanumeric with underscores and periods, 3-20 chars
    const re = /^[a-zA-Z0-9_.]{3,20}$/;
    return re.test(username);
  },
};

export default validator;
