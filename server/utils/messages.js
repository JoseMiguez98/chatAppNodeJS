function createMessage(name, message, admin) {
  return {
    admin,
    date: new Date().getTime(),
    from: name,
    message,
  };
}

module.exports = {
  createMessage,
};
