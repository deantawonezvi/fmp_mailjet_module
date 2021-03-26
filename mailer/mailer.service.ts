import { Injectable } from '@nestjs/common';
import { connect, Email } from 'node-mailjet';
import { Template } from './templates.enum';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailerService {
  private mailjet: Email.Client;
  constructor(private config: ConfigService) {
    this.mailjet = connect(
      this.config.environment.mailjet.apiKey,
      this.config.environment.mailjet.secretKey,
    );
  }

  async sendMail(
    to: string | string[],
    template: Template,
    variables: Record<string, string | any[]>,
    options: Record<string, any> = {},
  ) {
    let recipients = Array.isArray(to) ? to : [to];
    console.log('[MAIL SENT] MAIL TO ', to);
    console.log('[MAIL SENT] TEMPLATE ', template);
    console.log('[MAIL SENT] variables', JSON.stringify(variables));
    return await this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          To: recipients.map(email => ({ Email: email })),
          TemplateID: parseInt(template as any),
          TemplateLanguage: true,
          Variables: variables,
          ...options,
        },
      ],
    });
  }
}
