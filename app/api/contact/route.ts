import { Resend } from "resend";
import { NextResponse } from "next/server"; // ✅ use NextResponse

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ success: false }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { user_name, user_email, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "custombasewelds@yahoo.com",
      subject: `Message from ${user_name}`,
      replyTo: user_email,
      text: message,
    });

    return NextResponse.json({ success: true }); // ✅ guaranteed valid JSON
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
