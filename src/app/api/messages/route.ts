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
            error: true,
            description: "Bad Request, some props are missing.",
        });
    }

    try {
        const result = await sendMessage(bodyMessage.message);
        console.log("====================================");
        console.log(result);
        console.log("====================================");
        Response.json(result);
    } catch (error) {
        return Response.json({ error: true, description: error });
    }
}
