const resMessage = (success, message, data) => {
  return {
    ok: success,
    message: message,
    body: data,
  };
};

module.exports = { resMessage };
