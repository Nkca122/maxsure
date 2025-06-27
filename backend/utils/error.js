class ExpressError extends Error {
  constructor(status = 500, display = "Internal Server Error") {
    super();
    this.status = status;
    this.display = display;
  }
}

module.exports = ExpressError;
