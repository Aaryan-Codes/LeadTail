require('dotenv').config();

const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

const verificationEmail = async (user, link) => {
  try {
    const config = {
      host: "smtppro.zoho.in",
      secure: true,
      port: 465,
      auth: {
        user: "aaryandev.test@zohomail.in",
        pass: process.env.ZOHO_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    let transporter = nodemailer.createTransport(config);

    const mailGenerator = new Mailgen({
      theme: "cerberus", // also ['salted', 'neopolitan', 'cerberus']
      product: {
        name: "LeadTail",
        link:'https://discdigi.com/home/'
      },
    });

    const response = {
      body: {
        name: `${user.name}`, // the person you're sending to
        intro: "Welcome to LeadTail!",
        action: {
          instructions: "Click the button to confirm your account.",
          button: {
            color: "#47C6E4",
            text: "Confirm",
            link: `${link}`,
          },
        },
      },
    };

    const Mail = mailGenerator.generate(response);

    let message = {
      from: "aaryandev.test@zohomail.in",
      to: user.email,
      subject: "Confirm your email at LeadTail",
      html: Mail,
    };

    // Send email

    let info = await transporter.sendMail(message);
    // console.log(info);
    console.log("Confirmation email sent!");
  } catch (error) {
    console.log(error);
  }
};


module.exports = verificationEmail;
