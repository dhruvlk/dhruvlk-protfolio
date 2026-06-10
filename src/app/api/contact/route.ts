import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Site Owner
    const ownerMailOptions = {
      from: `"Portfolio Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Transmission: ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; padding: 60px; border-radius: 20px; border: 1px solid #10b98133; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; padding: 10px 20px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 100px; color: #10b981; font-size: 10px; font-weight: 900; letter-spacing: 5px; text-transform: uppercase;">
              Incoming Signal // Secure Line
            </div>
          </div>
          
          <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin-bottom: 30px; text-align: center;">
            New <span style="font-style: italic; color: #10b981; text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);">Transmission</span> Received.
          </h1>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <div style="margin-bottom: 20px;">
              <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin: 0 0 5px 0;">Source_Name</p>
              <p style="font-size: 16px; font-weight: 600; color: #f8fafc; margin: 0;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin: 0 0 5px 0;">Source_Email</p>
              <p style="font-size: 16px; font-weight: 600; color: #10b981; margin: 0;">${email}</p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin: 0 0 5px 0;">Trans_Subject</p>
              <p style="font-size: 16px; font-weight: 600; color: #f8fafc; margin: 0;">${subject}</p>
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 15px;">
            <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin: 0 0 15px 0;">Raw_Message_Log</p>
            <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; font-style: italic;">"${message}"</p>
          </div>

          <div style="text-align: center; margin-top: 40px;">
            <p style="font-size: 9px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 3px;">System Integrity: Optimized // Session Log: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
    };

    // Confirmation Email to User
    const userMailOptions = {
      from: `"Dhruv Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Signal Received: ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; background-color: #020617; color: #f8fafc; padding: 60px; border-radius: 20px; border: 1px solid #10b98133; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; padding: 10px 20px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 100px; color: #10b981; font-size: 10px; font-weight: 900; letter-spacing: 5px; text-transform: uppercase;">
              Connection Established // Secure Feedback
            </div>
          </div>
          
          <h1 style="font-size: 32px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin-bottom: 30px; text-align: center;">
            Thank you, <span style="font-style: italic; color: #10b981; text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);">${name}</span>.
          </h1>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin: 0;">
              Your message has been successfully transmitted to my system. I have received your inquiry regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.
            </p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 15px;">
            <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin: 0 0 15px 0;">Transmission_Receipt</p>
            <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; font-style: italic;">
              "I generally respond within 24-48 hours. Stay tuned."
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 30px;">
            <p style="font-size: 14px; font-weight: 600; color: #f8fafc; margin-bottom: 5px;">Dhruv</p>
            <p style="font-size: 12px; color: #10b981; margin: 0;">Full Stack Developer & Cybersecurity Enthusiast</p>
          </div>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ message: 'Signal Transmitted Successfully' }, { status: 200 });
  } catch (error) {
    console.error('Email Transmission Error:', error);
    return NextResponse.json({ error: 'Signal Interrupted' }, { status: 500 });
  }
}
