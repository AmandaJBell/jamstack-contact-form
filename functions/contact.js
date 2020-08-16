require("dotenv").config();

exports.handler = (event, context, callback) => {
  try {
    const mailgun = require("mailgun-js");
    console.log("API KEY", process.env.MAILGUN_API_KEY);
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

    const data = JSON.parse(event.body);

    const email = {
      from: "Excited User <me@samples.mailgun.org>",
      to: `${data.name} <${data.email}>`,
      subject: data.subject,
      text: data.body,
    };

    mg.messages().send(email, (error, response) => {
      callback(error, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    });
  } catch (e) {
    callback(JSON.stringify(e), null);
  }
};
