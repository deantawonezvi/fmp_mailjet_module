import { Controller, Post, Body } from "@nestjs/common";
import { MailerService } from "../../shared/mailer/mailer.service";

import { Template } from "../../shared/mailer/templates.enum";

@Controller("auth")
export class AuthController {
  constructor(private mailerService: MailerService) {}

  @Post("forgotten-password")
  async sendForgottenPasswordEmail(@Body() body: any) {
    // ...

    await this.mailerService.sendMail(
      body.email,
      Template.FORGOTTEN_PASSWORD,
      {}
    );

    // ...
    return {
      success: true,
    };
  }
}
