
export default class RequestError extends Error {
  constructor(params) {
    const { code, message } = params || {};
    super(message || "Bad request");
    this._code = code || 400;
    this._context = params?.context || {};
  }

  get error() {
    return { message: this.message, context: this._context };
  }

  get statusCode() {
    return this._code;
  }
}
