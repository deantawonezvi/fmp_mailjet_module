
### Step 1

Create a MailJet account [here](https://fr.mailjet.com). </br>
Create your mail transactional template and publish it. </br>
Keep the ID of your template in a safe place, we'll need it after.

### Step 2

Install the `node-mailjet` dependency in the `backend` directory of your project.

```
npm install node-mailjet@3.3.1
```

### Step 3

Add your mailjet API credentials in your environments files (DEV, STAGING & PROD) found in the `backend/src/environments` directory.

```
export const environment = {
  ...,
  mailjet: {
    apiKey: '%YOUR_API_KEY%',
    secretKey: '%YOUR_SECRET_KEY%',
  },
  ...
};
```

Your credentials can be found using [this link](https://app.mailjet.com/account/api_keys).

### Step 4

Add the `mailer` folder of this module in the `backend/src/shared` directory of your project.

### Step 5

Open the `templates.enum.ts` file in the `mailer` directory of your project.

This file contains an exported enum that will contain each ID of your Mailjet transactionnal templates. These IDs can be obtained after publishing a transactional template.

---

That's it, you have successfully configured the Mailjet module ! :rocket:

Check out the example below to see how you can use this module.

### Example

Let's assume the `auth` folder of this module is inside the `backend/src/api` directory of your project.

In order to send a "Forgotten Password" email, the `auth.controller.ts` file would look like this :

```
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
```

Don't forget to import the `MailerModule` in your api's modules ! In this example, I need to import it in the `AuthModule`.