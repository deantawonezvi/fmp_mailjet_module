The `sendEmail` method takes 3 arguments :

- The email adress(es) that will receive your Mailjet email. This can be either a string or an array of string.
- The Mailjet's template you wish to use for this email. This can be specified using the exported enum of the `templates.enum.ts` file.
- The variables you want to provide for the specified template. Check out how to use variables in Mailjet using [Mailjet's developer documentation](https://dev.mailjet.com/email/template-language/reference/#variables).