import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  name: string,
  date: string,
  time: string,
) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM as string,
      to,
      subject: 'Appointment Confirmed',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #16a34a;">✔ Appointment Confirmed</h2>
          
          <p>Hi ${name},</p>
          
          <p>Your booking has been confirmed.</p>
          
          <div style="background: #f3f4f6; padding: 12px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>

          <p>Thank you for choosing JOM AUTO.</p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}
