import * as sgMail from "@sendgrid/mail";
import { ExtendedError } from "../error";
import * as env from "dotenv";
env.config();

/*
* Sender INIT
* */
sgMail.setApiKey(process.env.SENDRID_API_KEY);

export interface MailOptions {
    to: string;
    from: string;
    subject: string;
    html: string;
}

class MailSender {
    private mailOptions: MailOptions;

    public constructor(
        mailOptions: Omit<MailOptions, "from">,
    ) {
        this.mailOptions = {
            ...mailOptions,
            from: "s.ducak@gmail.com",
        };
    }

    /*
    * Send email method
    * */
    public async sendMail(): Promise<true | ExtendedError> {
        try {
            await sgMail.send(this.mailOptions);
            return true;
        } catch (e) {
            console.log(e);
            return new ExtendedError("Email was't sent successfully.", 500);
        }
    }
}

export default MailSender;
