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
    androidAppVerision: "1.0.0",
    iosAppVerision: "1.0.0",
    logoLink: "",
    mailerEmail: "",
    mailerPassword: "",
    awsAccesskey: "",
    awsSecretkey: "",
    s3bucketName: "",
    s3uploadURL: "",
    resetPasswordURLPrefix:"http://localhost:3000/resetPassword"
  }
  if (process.env.NODE_ENV === "production") {
    
  }
  return data;
})();
