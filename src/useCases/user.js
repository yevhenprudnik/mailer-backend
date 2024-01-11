/** @type {import('./types/user.d.ts').init} */
export const init = ({ userRepo }) => ({
  me: {
    handler: async (session) => {
      const { user } = session;

      return user;
    },
    access: 'common',
  },

  search: {
    handler: async (_, params) => {
      return userRepo.findMany(params);
    },
  },
});
