import axios from "axios";
import { NextApiResponse } from "next";


export async function POST(request: Request, response: NextApiResponse) {
    if (request.method !== "POST") {
        return response
            .status(400)
            .json({ error: true, description: "Invalid Method" });
    }

    const POWERTRANZ_API_URL = process.env.POWERTRANZ_API_URL || "https://staging.ptranz.com/api/spi/sale";
    const POWERTRANZ_ID = process.env.POWERTRANZ_ID || "77700358";
    const POWERTRANZ_PASSWORD = process.env.POWERTRANZ_PASSWORD || "BHjvFjogBJcN63Diq5iRyGJwVfPcB60tPJxdBKVmt17SF8geIIdvj7";

    const bodyMessage = await request.json();

    try {

      const response = await axios.post(POWERTRANZ_API_URL, bodyMessage, {
      headers: {
        'Powertranz-PowertranzId': POWERTRANZ_ID,
        'Powertranz-PowertranzPassword': POWERTRANZ_PASSWORD,
      }});

      console.log("DATA API");
      console.log(response.data);

      return Response.json({ error: false, data: response.data });

    } catch (error) {

      return Response.json({ error: true, desciption: error});
  }

}

