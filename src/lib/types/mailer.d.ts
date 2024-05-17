import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Config } from '../../../types/config';

interface Deps {
  config: Config['smtp'];
}

export class Mailer {
  send(options: Mail.Options): Promise<SentMessageInfo>;
}

export function init(deps: Deps): Mailer;
