
import nodemailer from "nodemailer";


export async function POST(req: Request) {
  try {
    console.log("API HIT");

    const body = await req.json();
    console.log("BODY:", body);

    console.log("ENV CHECK:", {
      user: process.env.SMTP_USER,
      passExists: !!process.env.SMTP_PASS,
    });

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
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: "Portfolio message",
      text: body.message,
    });

    console.log("EMAIL SENT ✅");

    return Response.json({ ok: true });
  } catch (err) {
    console.error("EMAIL ERROR ❌:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     console.log("Contact API hit");

//     const body = await req.json();
//     console.log(body);

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: process.env.SMTP_SECURE === "true",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Portfolio" <${process.env.SMTP_USER}>`,
//       to: process.env.CONTACT_EMAIL,
//       subject: "New message",
//       text: body.message,
//     });

//     console.log("Email sent");

//     return Response.json({ ok: true });
//   } catch (err) {
//     console.error("EMAIL ERROR:", err);
//     return Response.json({ ok: false }, { status: 500 });
//   }
// }