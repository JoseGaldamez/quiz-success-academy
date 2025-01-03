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

    if (!bodyMessage || !bodyMessage.message) {
        return Response.json({
            success: false,
            description: "Bad Request, some props are missing.",
        });
    }

    try {
        await sendMessage(bodyMessage.message);
        return Response.json({
            success: true,
            description: "Message sent",
            bodyMessage,
        });
    } catch (error) {
        return Response.json({ success: false, description: error });
    }
}
