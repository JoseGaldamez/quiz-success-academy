import { NextApiResponse } from "next";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME, // your domain email address
        pass: process.env.EMAIL_PASSWORD, // your password
    },
});

export const sendMessage = async (mesageBody: string) => {
    const messageOptions = {
        from: `"Success Academy" <${process.env.EMAIL_USERNAME}>`,
        to: "josegaldamez1991@gmail.com",
        subject: "Points.",
        text: mesageBody,
    };

    let finished = false;
    let result = {};

    transporter.sendMail(messageOptions, function (error: any, info: any) {
        console.log("====================================");
        console.log({ error, info });
        console.log("====================================");
        if (error) {
            result = {
                error: true,
                description: "Error sending email.",
                result: error,
            };
        } else {
            console.log("Email sent: " + info.response);
            result = {
                error: false,
                description: "Message sent.",
                result: info.response,
            };
        }

        finished = true;
    });

    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log("====================================");
    console.log(result);
    console.log("====================================");

    return result;
};
