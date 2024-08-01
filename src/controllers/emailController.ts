import { Request, Response } from "express";
import { EmailService } from "../service/emailService";
import { promises as fs } from "fs";
import * as path from "path";

export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  public async sendEmail(req: Request, res: Response): Promise<void> {
    const { to } = req.body;

    try {
      const subject = "Solicitação de Redefinição de senha";
      const html = await this.loadEmailTemplate();

      await this.emailService.sendEmail(to, html, subject);
      res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Erro ao enviar email: ${error.message}` });
      }
    }
  }

  private async loadEmailTemplate(): Promise<string> {
    const filePath = path.join(__dirname, "../template/templateEmail.html");
    try {
      const html = await fs.readFile(filePath, "utf-8");
      return html;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro ao carregar o template de email: ${error.message}`);
        return "<p>Erro ao carregar o template de email</p>";
      }
      return "<p>Erro desconhecido ao carregar o template de email</p>";
    }
  }
}
