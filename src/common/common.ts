export const customResponse = ({ statusCode, message = '', data = null }) => {
  let currentResponse: any = {
    statusCode,
    response: {},
  };

  if (data)
    currentResponse = {
      ...currentResponse,
      response: { ...currentResponse.response, data },
    };

  if (message) {
    currentResponse = {
      ...currentResponse,
      response: { ...currentResponse.response, message },
    };
  }

  return currentResponse;
};
