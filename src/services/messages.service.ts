// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// });

export const sendMessage = async (mesageBody: string) => {
    const messageOptions = {
        from: `"Success Academy Quiz" <${process.env.EMAIL_USERNAME}>`,
        to: "coordinacion.academica@successacademyhn.com,josegaldamez1991@gmail.com,Successacademy0101@gmail.com,sac@successacademyhn.com",
        subject: "Student has finished the quiz",
        content: mesageBody,
    };

    await fetch("https://send-mails-api-next-js.vercel.app/api/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageOptions),
    });

    // return await transporter.sendMail(
    //     messageOptions,
    //     (error: any, info: any) => {
    //         return { error, info };
    //     }
    // );

    return { success: true, message: "Message sent" };
};
