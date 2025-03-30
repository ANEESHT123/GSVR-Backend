const Contact = require("../models/Contact");
const sendMail = require("../utils/emailService");

const sendMessage = async (req, res) => {
  try {
    const { fullName, email, mobile, service, message } = req.body;

    const newMessage = new Contact({
      fullName,
      email,
      mobile,
      service,
      message
    });

    await newMessage.save();

    // Send email to business team
    await sendMail({
      from: "info@gsvrtalent.com",
      to: "info@gsvrtalent.com",
      subject: `📩 New Business Inquiry: ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #0073e6;">New Business Inquiry Received</h2>
          <p><strong>Dear Team,</strong></p>
          <p>A new business inquiry has been received. Details are as follows:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📛 Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📧 Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📞 Mobile:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📌 service:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${service}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📝 Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
          </table>
          <p style="margin-top: 20px;">Best regards,<br><strong>GSVR Talent</strong></p>
        </div>
      `
    });

    // Send acknowledgment email to the sender
    await sendMail({
      from: "info@gsvrtalent.com",
      to: email,
      subject: "📩 Thank You for Contacting Us - GSVR Talent",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #0073e6;">Thank You for Reaching Out!</h2>
          <p><strong>Dear ${fullName},</strong></p>
          <p>We have received your message regarding <strong>${service}</strong>. Our team will get back to you as soon as possible.</p>
          <p><strong>Your Inquiry Details:</strong></p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📛 Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📧 Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📞 Mobile:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📌 service:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${service}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>📝 Message:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
          </table>
          <p>We appreciate your interest in GSVR Talent. If you have any further questions, feel free to reply to this email.</p>
          <p style="margin-top: 20px;">Best regards,<br><strong>GSVR Talent Team</strong></p>
        </div>
      `
    });

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sendMessage };
