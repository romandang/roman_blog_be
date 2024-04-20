export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const ERROR_MESSAGE = {
  AUTH: {
    LOGIN_FAIL: 'Your username or password is incorrect!',
    REGISTER_FAIL:
      "We can't creating your account at the moment! Please try again later.",
  },
};

export const MESSAGE = {
  AUTH: {
    REGISTER_SUCCESS:
      "Hey! Your account has been created. Let's enjoying your journey.",
  },
};
