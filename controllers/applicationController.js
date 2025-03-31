const Application = require("../models/Application");
const sendMail = require("../utils/emailService");

const applyJob = async (req, res) => {
  try {
    const { fullName, email, mobile, service, message } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const newApplication = new Application({
      fullName,
      email,
      mobile,
      service,
      message,
      resumePath,
    });

    await newApplication.save();

    // Email to company
    await sendMail({
      from: "careers@gsvrtalent.com",
      to: "info@gsvrtalent.com",
      subject: `📩 New Job Application Received - ${fullName}`,
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #0073e6;">New Job Application Received</h2>
            <p style="font-size: 16px;"><strong>Dear Hiring Team,</strong></p>
            <p>A new job application has been received. Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>📛 Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>📧 Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>📞 Mobile:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>💼 Service Applied:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>📝 Message:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
              </tr>
            </table>
            <br />
            ${resumePath ? `<p><strong>📎 Resume Attached:</strong> <a href="cid:${req.file.filename}">Download</a></p>` : ""}
            <p style="margin-top: 20px;">Best regards,<br><strong>GSVR Talent</strong></p>
          </div>
        `,
      attachments: resumePath
        ? [{ filename: req.file.originalname, path: resumePath }]
        : [],
    });

    // Email to applicant
    await sendMail({
      from: "info@gsvrtalent.com",
      to: email,
      subject: "📩 Application Received - GSVR Talent",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #0073e6;">Thank You for Your Application!</h2>
        <p style="font-size: 16px;"><strong>Dear ${fullName},</strong></p>
        <p>We have received your application for the <strong>${service}</strong> role. Our team will review your submission and contact you if shortlisted.</p>
        <p><strong>Application Details:</strong></p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📛 Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📧 Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📞 Mobile:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>💼 Service Applied:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>📝 Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <br />
        <p>We appreciate your interest in GSVR Talent. If you have any questions, feel free to reply to this email.</p>
        <p style="margin-top: 20px;">Best regards,<br><strong>GSVR Talent Team</strong></p>
      </div>
    `,
    });

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { applyJob };
