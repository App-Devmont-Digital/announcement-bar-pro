import nodemailer from "nodemailer";


export async function sendEmail(
  customerEmailHtml,
  supportTeamEmailHtml,
  email,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "devmontdigital.io",
      port: 465,
      secure: true,
      auth: {
        user: "support@devmontdigital.io",
        pass: "Omxo!vsjaxd7",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const customer = await transporter.sendMail({
      from: "support@devmontdigital.io",
      to: email,
      subject: "Support Request Acknowledgment",
      html: customerEmailHtml,
    });

    const support = await transporter.sendMail({
      from: "support@devmontdigital.io",
      to: "support@devmontdigital.io",
      subject: "New Support Request",
      html: supportTeamEmailHtml,
    });
    return { message: "success" };
  } catch (error) {
    console.error("Error sending email:", error);
  }
}