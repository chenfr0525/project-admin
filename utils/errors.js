/**
 * 自定义 400 错误类
 */
class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.status = 400;
  }
}

/**
 * 自定义 401 错误类
 */
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.status = 401;
  }
}

/**
 * 自定义 404 错误类
 */
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.status = 404;
  }
}

module.exports={
  BadRequest,
  Unauthorized,
  NotFound
}
