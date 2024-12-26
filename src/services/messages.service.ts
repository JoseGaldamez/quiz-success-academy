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

export const sendMessage = async (mesageBody: string) => {
    const messageOptions = {
        from: `"Success Academy Quiz" <${process.env.EMAIL_USERNAME}>`,
        to: "coordinacion.academica@successacademyhn.com,josegaldamez1991@gmail.com,Successacademy0101@gmail.com",
        subject: "Student has finished the quiz",
        text: mesageBody,
    };

    return await transporter.sendMail(
        messageOptions,
        (error: any, info: any) => {
            return { error, info };
        }
    );
};
