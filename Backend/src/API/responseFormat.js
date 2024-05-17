const response = (success, message, data) => {
  return {
    ok: success,
    message: message,
    body: data,
  };
};

module.exports = response;
