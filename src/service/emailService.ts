import nodemailer from "nodemailer";
import { emailConfig } from "../config";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  public async sendEmail(to: string, html: string, subject: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: emailConfig.auth.user,
        to,
        html,
        subject,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao enviar email: ${error.message}`);
      }
    }
  }
}
