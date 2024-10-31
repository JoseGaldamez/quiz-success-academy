import { redirect } from 'next/navigation';
export async function POST(request: Request) {
 
    const formData = await request.text()
    const params = new URLSearchParams(formData)
    const response = JSON.parse(params.get('Response')?.toString() || "")

    const redirectURL = response.IsoResponseCode 
                        !== "3D0" ? "/redirect-sale?spiToken=null" 
                        : "/redirect-sale?spiToken="+response.SpiToken

    redirect(redirectURL);
}