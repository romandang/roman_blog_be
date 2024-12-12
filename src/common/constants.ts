export const jwtConstants = {
  secret:
    '123456',
};

export const ACCESS_TOKEN = "access_token"

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
    UPDATE_PROFILE_FAIL:
      "We can't update your profile! Please ensure all information is valid.",
  },
  GENERAL: {
    INVALID_REQUEST: 'Your request is invalid!',
    OTHER: 'Something went wrong! Please try again later',
  },
};

export const MESSAGE = {
  AUTH: {
    REGISTER_SUCCESS:
      "Hey! Your account has been created. Let's enjoying your journey.",
    UPDATE_PROFILE_SUCCESS: 'Your profile has been updated!',
  },
  INTERACTIVE: {
    COMMENT_SENT: 'Your comment has been sent already!',
    ACTION_SENT: 'Your interactive has been sent already!',
  },
};
