import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EmailPayload } from "./types";

dotenv.config();

const { MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC } = process.env;

// console.info({ MAIL_HOST, MAIL_PORT, MAIL_USER_FROM, MAIL_PASS_FROM, MAIL_USER_TO_CC });
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

  async sendFeedbackEmail(data: {
    name: string;
    email: string;
    whatsapp: string;
    birthday: string;
    howDidYouKnowUs: string;
    socialMediaSource?: string;
    branchVisited: string;
    waiterName?: string;
    experienceRating: number;
    improvementSuggestions?: string;
    clientCode: string;
    createdAt: Date;
  }) {
    const {
      name,
      email,
      whatsapp,
      birthday,
      howDidYouKnowUs,
      socialMediaSource,
      branchVisited,
      waiterName,
      experienceRating,
      improvementSuggestions,
      clientCode,
      createdAt,
    } = data;

    // 🧑‍💼 Admin message
    const adminBody = `
📬 Nuevo feedback recibido:

🕒 Fecha: ${createdAt.toLocaleString("es-PE")}
🏷️ Código cliente: ${clientCode}

👤 Nombre: ${name}
📧 Correo: ${email}
📱 WhatsApp: ${whatsapp}
🎂 Cumpleaños: ${birthday}
📍 Sede: ${branchVisited}
👨‍🍳 Mesero: ${waiterName || "No especificado"}

🗣️ ¿Cómo nos conoció?: ${howDidYouKnowUs}
🔗 Fuente (Red social): ${socialMediaSource || "N/A"}

⭐ Calificación: ${experienceRating}/5
📝 Sugerencias: ${improvementSuggestions || "Ninguna"}
`;

    const adminMessage = {
      from: `"Sistema Feedback" <${MAIL_USER_FROM}>`,
      to: MAIL_USER_TO_CC || "brownseb379@gmail.com",
      subject: `📩 Nuevo Feedback de ${name}`,
      text: adminBody,
    };

    // 👤 Cliente message
    const userBody = `
¡Gracias por compartir tu experiencia con nosotros, ${name}! 🎉

🎁 Mira lo que has ganado: queremos invitarte a unos deliciosos **deditos de queso**.  
Solo muestra este código al cajero y disfruta de esta delicia:

👉 *${clientCode}*

Nos alegra saber de ti y esperamos verte pronto.

Atentamente,  
Equipo de atención al cliente.
`;

    const clientMessage = {
      from: `"Equipo de Atención" <${MAIL_USER_FROM}>`,
      to: email,
      subject: "🎁 ¡Gracias por tu opinión! Este es tu premio",
      text: userBody,
    };

    // Enviar ambos correos
    await this.transporter.sendMail(adminMessage);
    await this.transporter.sendMail(clientMessage);
  }
}
