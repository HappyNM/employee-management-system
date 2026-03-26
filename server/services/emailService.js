import nodemailer from "nodemailer";

const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST || "smtp.gmail.com",
  port: Number(MAIL_PORT || 587),
  secure: String(MAIL_SECURE).toLowerCase() === "true",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  if (!to || !subject) {
    throw new Error("Email requires both to and subject");
  }

  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error("Missing MAIL_USER or MAIL_PASS in environment");
  }

  return transporter.sendMail({
    from: MAIL_FROM || MAIL_USER,
    to,
    subject,
    text,
    html
  });
};

export const verifyEmailTransport = async () => {
  return transporter.verify();
};