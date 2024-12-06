const nodemailer = require("nodemailer");

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const transporter = createTransporter();

const verifyConnection = async () => {
  try {
    await transporter.verify();
    console.log("SMTP server verified successfully.");
  } catch (error) {
    console.error("SMTP connection failed:", error.message);
    throw new Error("Could not connect to SMTP server");
  }
};

const sendEmail = async ({ to, subject, text, html }) => {
  if (!to || !subject || (!text && !html)) {
    throw new Error(
      "Missing required fields: to, subject, and at least one of text or html"
    );
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail sent: %s", info.messageId);

    return { messageId: info.messageId, to: mailOptions.to };
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

module.exports = { verifyConnection, sendEmail };
