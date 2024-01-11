/** @type {import('./types/auth.d.ts').init} */
export const init = ({ userRepo, common, utils }) => ({
  signIn: {
    handler: async (_, params) => {
      const { email, password } = params;

      const user = await userRepo.findOne({ email });
      if (!user) throw utils.exception.badRequest('Wrong credentials.');
      const validPassword = utils.checkPassword(password, user.password);
      if (!validPassword)
        throw utils.exception.badRequest('Wrong credentials.');

      return common.generateSession(user);
    },
  },

  signUp: {
    handler: async (_, params) => {
      const { email, username, password } = params;

      const exist = await userRepo.findOne({ email });
      if (exist)
        throw utils.exception.badRequest('User with such email already exist.');
      const hashed = utils.hashPassword(password);
      const user = await userRepo.create({
        email,
        username,
        password: hashed,
      });

      return common.generateSession(user);
    },
  },
});
