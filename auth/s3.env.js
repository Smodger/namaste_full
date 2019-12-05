const env = {
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  REGION : 'eu-west-1',
  Bucket: process.env.S3_BUCKET
};

module.exports = env;
