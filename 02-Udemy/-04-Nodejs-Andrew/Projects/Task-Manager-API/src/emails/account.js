const sgMail = require("@sendgrid/mail");

const sendGridAPIKey =
  "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";

sgMail.setApiKey(sendGridAPIKey);

sgMail
  .send({
    to: "abdallahelnashar480@gmail.com",
    from: "abdallahelnashar480@tech.com",
    subject: "hi ",
    text: "hi hi",
  })
  .then((res) => console.log("ff"))
  .catch((err) => console.log(err.response.body));
