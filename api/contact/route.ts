import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { user_name, user_email, message } = await req.json();

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      throw new Error("Missing environment variables!");
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Message from ${user_name}`,
      replyTo: user_email,
      text: message,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("EMAIL ERROR ❌:", err);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}