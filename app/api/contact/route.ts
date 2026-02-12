import { Resend } from "resend";

if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
  throw new Error("Missing environment variables!");
}
if (!process.env.CONTACT_EMAIL) throw new Error("CONTACT_EMAIL not defined!");
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { user_name, user_email, message } = await req.json();

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "custombasewelds@yahoo.com", 
      subject: `Message from ${user_name}`,
      replyTo: user_email,
      text: message,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}
