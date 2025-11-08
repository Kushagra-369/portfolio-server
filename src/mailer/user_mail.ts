const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.NodeMailerUser,
    pass: process.env.NodeMailerPassword,
  },
});

export const otpVerificationAdmin = async (
  name: string,
  email: string,
  randomOTP: string
): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: '"Your App Name" <kushagra100chhabra@gmail.com>',
      to: email,
      subject: "🔐 Admin OTP Verification Code",
      text: `Hello ${name},\n\nYour One-Time Password (OTP) for admin access verification is: ${randomOTP}\n\nThis OTP is valid for 10 minutes. If you didn't request this, please report immediately.\n\n– The Your App Name Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #2c3e50;">Hello ${name} 👋</h2>
          <p>You are receiving this email because an admin verification was requested using your email address.</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="background-color: #f1f1f1; padding: 15px 25px; font-size: 22px; font-weight: bold; border-radius: 8px; display: inline-block; margin: 10px 0;">
            ${randomOTP}
          </div>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p>If you did not initiate this request, please secure your account and contact support immediately.</p>
          <hr style="margin: 30px 0;"/>
          <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply.</p>
          <p style="font-size: 14px; color: #888;">– The Your App Name Team</p>
        </div>
      `,
    });

    console.log("✅ OTP email sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
  }
};