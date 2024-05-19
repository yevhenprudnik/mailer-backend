/** @type {import('./types/topic.d.ts').init} */
export const init = ({ topicRepo, subscriptionRepo, userRepo, utils }) => ({
  create: {
    handler: async (session, params) => {
      const { user } = session;

      return topicRepo.create({
        ...params,
        authorId: user.id,
      });
    },
    access: 'common',
  },

  update: {
    handler: async (session, params) => {
      const { user } = session;
      const { id, ...definition } = params;

      const topic = await topicRepo.findOne({ id });
      if (!topic || topic.authorId !== user.id)
        throw utils.exception.forbidden();

      return topicRepo.update(id, definition);
    },
    access: 'common',
  },

  search: {
    handler: async (_, params) => {
      const topics = await topicRepo.findMany(params);

      for (const topic of topics) {
        topic.author = await userRepo.findOne({ id: topic.authorId });
      }

      return topics;
    },
  },

  delete: {
    handler: async (session, params) => {
      const { user } = session;
      const { id } = params;

      const topic = await topicRepo.findOne({ id });
      if (!topic || topic.authorId !== user.id)
        throw utils.exception.forbidden();
      const deleted = await topicRepo.remove(id);

      return { deleted };
    },
    access: 'common',
  },

  subscribe: {
    handler: async (session, params) => {
      const { user } = session;
      const { id } = params;

      const topic = await topicRepo.findOne({ id });
      if (!topic) throw utils.exception.notFound();
      const subscription = await subscriptionRepo.findOne({
        topicId: id,
        userId: user.id,
      });
      if (subscription)
        throw utils.exception.badRequest(
          'You are already subscribed to this topic.',
        );
      const subscribed = await subscriptionRepo.create({
        topicId: id,
        userId: user.id,
      });

      return { subscribed: !!subscribed };
    },
    access: 'common',
  },

  unsubscribe: {
    handler: async (session, params) => {
      const { user } = session;
      const { id } = params;

      const topic = await topicRepo.findOne({ id });
      if (!topic) throw utils.exception.notFound();
      const subscription = await subscriptionRepo.findOne({
        topicId: id,
        userId: user.id,
      });
      if (!subscription)
        throw utils.exception.badRequest(
          'You are not subscribed to this topic.',
        );
      const unsubscribed = await subscriptionRepo.remove(subscription.id);

      return { unsubscribed };
    },
    access: 'common',
  },
});
