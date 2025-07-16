import cloudinary from "cloudinary";
import dotenv from "dotenv";

const nodemailer = require("nodemailer");

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const getCloudinarySignature = async (req, res) => {
  try {
    const { folder, fileName, vendorName } = req.query;

    if (!folder || !fileName) {
      return res.status(400).json({ error: "Missing folder or fileName" });
    }

    // If the folder is "vendor", append the vendorName to the folder path
    const finalFolder =
      folder === "vendor" && vendorName
        ? `uploads/vendor/${vendorName}`
        : `uploads/${folder}`;

    // Set timestamp to expire in 60 seconds
    const timestamp = Math.floor(Date.now() / 1000) + 60;

    const paramsToSign = {
      timestamp,
      folder: finalFolder,
    };

    // Generate short-lived signature
    const signature = cloudinary.v2.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET ||
        (() => {
          throw new Error(
            "CLOUDINARY_API_SECRET is not defined in environment variables"
          );
        })()
    );

    return res.json({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      signature,
      timestamp,
      folder: paramsToSign.folder,
    });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return res.status(500).json({ error: "Error generating signature" });
  }
};

export const deleteFile = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: "Missing public_id" });
  }

  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    // result = { result: 'ok' } OR { result: 'not found' }
    res.json(result);
  } catch (error) {
    // console.error("Cloudinary delete error:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
};

export const sendPortfolioEmail = async (req, res) => {
  const {
    name,
    email,
    organizationName,
    service,
    aboutProject,
    aboutClient,
    message,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASS,
    },
  });

  const html = `<p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${
      organizationName
        ? `<p><strong>Organization:</strong> ${organizationName}</p>`
        : ""
    }
    <p><strong>Looking for:</strong> ${service}</p>
    <p><strong>About the Project:</strong> ${aboutProject}</p>
    ${aboutClient ? `<p><strong>About Client:</strong> ${aboutClient}</p>` : ""}
    ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}`;

  const mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: "michaelk.projects@gmail.com",
    subject: "New Inquiry from Contact Form",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email" });
  }
};

export default sendPortfolioEmail;
