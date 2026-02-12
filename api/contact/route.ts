import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { user_name, user_email, message } = await req.json();

    // ✅ THIS is where transporter goes (server only)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Message from ${user_name}`,
      text: `${message}\n\nFrom: ${user_email}`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false }, { status: 500 });
  }
}