class ExpressError extends Error {
  constructor(code = 500, display = "Internal Server Error") {
    super();
    this.code = code;
    this.display = display;
  }
}

module.exports = ExpressError;
