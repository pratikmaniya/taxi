module.exports = (function () {
  let data = {
    db: {
      host: "13.57.91.34",
      user: "postgres",
      password: "Upwork@taxi2021",
      database: "taxi"
    },
    JWTSecretKey: "hjsba#huygh5%ijn*@sacismsygsygadydgsmayd$ahciadhbi",
    default_auth_token: "%!DyVNgw4x%MOBpwHgEeG&glJRsN3wlC4p4yMpHkmv^NW7BK%Z",
    host: "localhost",
    port: 3004,
    logoLink: "https://taxi-review.s3-us-west-1.amazonaws.com/logo.png",
    mailerEmail: "karlonincoognito@gmail.com",
    mailerPassword: "Upwork2021!",
    awsAccesskey: "AKIAXTG4E23EFUPKC67Z",
    awsSecretkey: "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",
    s3bucketName: "taxi-review",
    s3uploadURL: "https://taxi-review.s3-us-west-1.amazonaws.com",
    resetPasswordURLPrefix: "http://localhost:3000/resetPassword",
    limit: 10,
    daily_review_limit: 4
  }
  if (process.env.NODE_ENV === "production") {
    data.resetPasswordURLPrefix = "https://www.ridesafett.com/admin-panel/resetPassword"
  }
  return data;
})();
