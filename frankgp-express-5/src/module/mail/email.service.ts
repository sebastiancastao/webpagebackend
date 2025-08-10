import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailPayload } from "./types";

dotenv.config();

const { MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC } = process.env;

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: true,
    auth: {
      user: MAIL_USER_FROM,
      pass: MAIL_PASS_FROM,
    },
    // tls: {
    //   rejectUnauthorized: false, // ⚠️ Solo usar temporalmente si tienes error de certificado
    // },
  });

  async sendContactEmail(data: EmailPayload) {
    const { name, email, subject, message, currentUrl } = data;

    const bodyMessage = `\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}\nEnviado desde: ${currentUrl}`;

    const userMessage = {
      from: `"${name}" <${MAIL_USER_FROM}>`,
      to: email,
      subject: subject || "Gracias por contactarnos",
      text: `Gracias por escribirnos, te responderemos pronto.${bodyMessage}`,
    };

    const ccMessage = {
      from: `"${name}" <${MAIL_USER_FROM}>`,
      to: MAIL_USER_TO_CC || "brownseb379@gmail.com",
      subject: "Tienes un nuevo formulario",
      text: `Un usuario ha enviado un nuevo formulario.${bodyMessage}`,
    };

    // Enviar ambos correos
    await this.transporter.sendMail(userMessage);
    await this.transporter.sendMail(ccMessage);
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    const mailOptions = {
      from: MAIL_USER_FROM,
      to: email,
      subject: "🔐 Restablece tu contraseña",
      text: `Recibimos una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste esto, ignora este mensaje.`,
      html: `
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p><a href="${resetLink}">Haz clic aquí para restablecerla</a></p>
        <p>Si no solicitaste esto, puedes ignorar este mensaje.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
