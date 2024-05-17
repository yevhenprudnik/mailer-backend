import nodemailer from 'nodemailer';

/** @type {import('./types/mailer').init}  */
const init = ({ config }) => {
  const { host, port, secure, auth } = config;
  const transporter = nodemailer.createTransport({ host, port, secure, auth });

  return {
    send: (options) => transporter.sendMail(options),
  };
};

export default { init };
