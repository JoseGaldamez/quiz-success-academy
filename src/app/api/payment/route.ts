import axios from "axios";
import { NextApiResponse } from "next";

export async function POST(request: Request, response: NextApiResponse) {
    if (request.method !== "POST") {
        return response
            .status(400)
            .json({ error: true, description: "Invalid Method" });
    }

    const POWERTRANZ_API_URL = "https://staging.ptranz.com/api/spi";
    const bodyMessage = await request.json();
    const spiToken = bodyMessage.spiToken;

    try {
      const response = await axios.post(`${POWERTRANZ_API_URL}/payment`, `${spiToken}`, {
      headers: {
        'Content-Type': 'application/json'
      }});

      console.log(response);
      if(response.status === 200){
        if(response.data.Approved){
            return Response.json({ error: false, data: response.data });
        }
        else{
            return Response.json({ error: true, data: {error: "Pago no aprobado"} });
        }
      }
    } catch (error) {
      return Response.json({ error: true, desciption: error});
    }
}

