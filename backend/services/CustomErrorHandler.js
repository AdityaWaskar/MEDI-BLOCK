class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  //  4XX error codes
  static badRequest(message) {
    return new CustomErrorHandler(400, message);
  }

  static unAuthorize(message) {
    return new CustomErrorHandler(401, message);
  }

  //  forbidden :- A 403 status code indicates that the client cannot access the requested resource.
  static Forbidden(message) {
    return new CustomErrorHandler(403, message);
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static notFound(message) {
    return new CustomErrorHandler(404, message);
  }

  //   requestTimeout :- 408 — A server is set to only wait a certain amount of time for responses from clients, and a 408 status code indicates that time has passed.
  static requestTimeout(message) {
    return new CustomErrorHandler(408, message);
  }
}

export default CustomErrorHandler;
