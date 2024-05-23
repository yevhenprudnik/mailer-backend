/** @type {import('./types/mail.d.ts').init} */
export const init = ({ mailRepo, topicRepo, userRepo, utils }) => ({
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

      const query = `
        WITH topic_subscriptions AS
        (SELECT * FROM "subscription" WHERE "topicId" = $1)
        SELECT * FROM "user" WHERE "id" IN
        (SELECT "userId" FROM topic_subscriptions);
      `;

      const { rows } = await userRepo.query(query, [topic.id]);
      if (!rows.length)
        throw utils.exception.badRequest('No subscribers for such topic');

      const subject = `${topic.name}: ${mail.title ?? ''}`;

      await utils.mailer.send({
        from: user.email,
        to: rows.map((row) => row.email).join(','),
        subject,
        html: mail.content,
      });

      await mailRepo.update(id, { published: true });
      return { published: true };
    },
    access: 'common',
  },
});
