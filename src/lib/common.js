import jsonwebtoken from 'jsonwebtoken';
import { ApiException } from './utils.js';

const jwt = {
  /**
   * @param {object} payload
   * @param {string} secret
   * @returns {string}
   */
  sign: (payload, secret) => {
    return jsonwebtoken.sign(payload, secret, {
      expiresIn: '7d',
    });
  },

  /**
   * @param {string} token
   * @param {string} secret
   * @returns {{[key: string]: any} | string}
   */
  verify: (token, secret) => {
    return jsonwebtoken.verify(token, secret);
  },
};

/** @type {import('./types/common.d.ts').init}   */
const init = ({ userRepo, utils, config }) => ({
  async generateSession(user) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      config.secret
    );

    return { user, token };
  },

  async validateSession(headers) {
    try {
      const token = headers.authorization;
      if (!token) throw utils.exception.unauthorized('No token provided.');
      const payload = jwt.verify(token, config.secret);
      if (typeof payload !== 'object' || !Object.hasOwn(payload, 'userId'))
        throw utils.exception.unauthorized('Invalid token payload.');
      const user = await userRepo.findOne({ id: payload.userId });
      if (!user) throw utils.exception.unauthorized('User not found.');

      return { user, token };
    } catch (err) {
      if (err instanceof ApiException) throw err;
      console.log('resolveSession error', err);
      throw utils.exception.unauthorized();
    }
  },
});

export default { init };
