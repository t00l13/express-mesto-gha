class NotFoundError extends Error {
  constructor(){
    super();

    this.name = "NotFoundError";
  }
}

class ValidationError extends Error {}

module.exports = {
  NotFoundError,
  ValidationError,
};