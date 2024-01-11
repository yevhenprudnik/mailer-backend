/** @type {import('./types/mail.d.ts').init} */
export const init = ({ mailRepo, topicRepo, utils }) => ({
  create: {
    handler: async (session, params) => {
      const { user } = session;

      const topic = await topicRepo.findOne({ id: params.topicId });
      if (!topic || topic.authorId !== user.id)
        throw utils.exception.forbidden();

      return mailRepo.create({
        ...params,
        published: false,
      });
    },
    access: 'common',
  },

  update: {
    handler: async (session, params) => {
      const { user } = session;
      const { id, ...definition } = params;

      const mail = await mailRepo.findOne({ id });
      if (!mail) throw utils.exception.notFound();
      const topic = await topicRepo.findOne({ id: mail.topicId });
      if (topic.authorId !== user.id) throw utils.exception.forbidden();

      return mailRepo.update(id, definition);
    },
    access: 'common',
  },

  search: {
    handler: async (_, params) => {
      return mailRepo.findMany(params);
    },
  },

  delete: {
    handler: async (session, params) => {
      const { user } = session;
      const { id } = params;

      const mail = await mailRepo.findOne({ id });
      if (!mail) throw utils.exception.notFound();
      const topic = await topicRepo.findOne({ id: mail.topicId });
      if (!topic || topic.authorId !== user.id)
        throw utils.exception.forbidden();
      const deleted = await mailRepo.remove(id);

      return { deleted };
    },
    access: 'common',
  },

  publish: {
    handler: async (session, params) => {
      const { user } = session;
      const { id } = params;

      const mail = await mailRepo.findOne({ id });
      if (!mail) throw utils.exception.notFound();
      const topic = await topicRepo.findOne({ id: mail.topicId });
      if (!topic || topic.authorId !== user.id)
        throw utils.exception.forbidden();
      // To do...
      await mailRepo.update(id, { published: true });
      return { published: true };
    },
    access: 'common',
  },
});
