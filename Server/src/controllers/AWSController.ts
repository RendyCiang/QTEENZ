import { RequestHandler } from "express";

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const generatePresignedUrl: RequestHandler = async (req, res) => {
  const { fileName, fileType } = req.body;

  const params = {
    Bucket: "your-bucket-name",
    Key: fileName,
    Expires: 60, // URL expires in 1 minute
    ContentType: fileType,
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: "Error generating pre-signed URL" });
  }
};
