import crypto from 'node:crypto';

export class ApiException extends Error {
  /** @param {number} code, @param {string} message */
  constructor(code, message) {
    super(message);
    this.statusCode = code;
  }
}

/** @type {import('./types/utils.d.ts').init} */
const init = () => ({
  hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashed = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return `${salt}:${hashed}`;
  },

  checkPassword(password, hash) {
    const [salt, hashed] = hash.split(':');

    return (
      hashed ===
      crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    );
  },

  async receiveArgs(req) {
    try {
      const buffers = [];
      for await (const chunk of req) buffers.push(chunk);
      const data = Buffer.concat(buffers).toString();
      return JSON.parse(data);
    } catch (err) {
      throw this.exception.badRequest(
        `Failed to parse args${err instanceof Error ? ': ' + err.message : ''}.`
      );
    }
  },

  exception: {
    badRequest(message = 'Bad Request') {
      return new ApiException(400, message);
    },

    unauthorized(message = 'Unauthorized') {
      return new ApiException(401, message);
    },

    forbidden(message = 'Forbidden') {
      return new ApiException(403, message);
    },

    notFound(message = 'Not Found') {
      return new ApiException(404, message);
    },
  },
});

export default { init };
