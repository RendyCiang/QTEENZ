import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinarySignature = async (req, res) => {
  try {
    const { folder, fileName, vendorName } = req.query;
    console.log(req);

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
