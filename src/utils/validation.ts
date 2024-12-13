const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const validateUsername = (username: string) => {
  return username.length >= 6;
};

export { validateEmail, validatePassword };
