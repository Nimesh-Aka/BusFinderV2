export const createError = (statusCode, msg) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = msg;

  return err;
};
