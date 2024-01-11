/** @type {import('./types/root.d.ts').init} */
export const init = () => ({
  healthcheck: {
    handler: () => {
      return "I'm alive";
    },
    access: 'none',
  },
});
