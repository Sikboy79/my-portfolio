import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { user_name, user_email, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // default allowed sender
      to: process.env.CONTACT_EMAIL!,
      subject: `New message from ${user_name}`,
      replyTo: user_email,
      text: message,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false }, { status: 500 });
  }
}