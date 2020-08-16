require("dotenv").config();

exports.handler = (event, context, callback) => {
  const mailgun = require("mailgun-js");

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
    console.log("ERROR", error);
    console.log("RESPONSE", response);
    if (error) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(response),
      });
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  });
};
