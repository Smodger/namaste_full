export const API_URL = process.env.REACT_APP_MONGODB_URI || "http://localhost:1234";

export const s3env = {
  bucket : process.env.REACT_APP_S3_BUCKET,
  region : process.env.REACT_APP_S3_REGION
}
