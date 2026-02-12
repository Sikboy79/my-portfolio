import { Resend } from "resend";
import { NextResponse } from "next/server";

if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
  throw new Error("Missing environment variables!");
}
if (!process.env.CONTACT_EMAIL) throw new Error("CONTACT_EMAIL not defined!");
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { user_name, user_email, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!, // safe now
      subject: `Message from ${user_name}`,
      replyTo: user_email,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("EMAIL ERROR ❌:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
