import transporter from "../config/mail.js";

export const sendEmail = async (email, subject, template, context) => {
  let mailOptions = {
    from: process.env.email,
    to: email,
    subject,
    template,
    context,
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};


export async function sendMailPlainText (To, Subject, PlainText){
  try{  
    const msg = {
      from:   process.env.email, 
      to: To, 
      subject: Subject, 
      text: PlainText, 
    };
  
    const info = await transporter.sendMail(msg);
    console.log(info)
  }catch(err){
    console.error(err)
  }
  
  };


/**
 * @example 
 * 
 *   await sendEmail(email, "Welcome to Kurio App", "confirmation", {
    token: data.data.token,
    name,
  });
 */