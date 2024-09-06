import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendMessage = async (mesageBody: string, email: string) => {
    const messageOptions = {
        from: `"Success Academy" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: "Points.",
        text: mesageBody,
    };

    return await transporter.sendMail(
        messageOptions,
        (error: any, info: any) => {
            return { error, info };
        }
    );
};
