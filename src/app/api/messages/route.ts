import { sendMessage } from "@/services/messages.service";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(request: Request, response: NextApiResponse) {
    if (request.method !== "POST") {
        return response
            .status(400)
            .json({ error: true, description: "Invalid Method" });
    }

    const bodyMessage = await request.json();

    if (!bodyMessage || !bodyMessage.message || !bodyMessage.email) {
        return Response.json({
            error: true,
            description: "Bad Request, some props are missing.",
        });
    }

    try {
        await sendMessage(bodyMessage.message, bodyMessage.email);
        return Response.json({ error: false, description: "Message sent" });
    } catch (error) {
        return Response.json({ error: true, description: error });
    }
}
