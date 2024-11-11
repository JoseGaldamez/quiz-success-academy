import axios from "axios";

export const makePaymentService = async (spiToken: string) => {
    if (spiToken == "null") {
        return {
            error: true,
            data: "El pago no pudo realizarse",
        };
    }

    const POWERTRANZ_API_URL = "https://staging.ptranz.com/api/spi";
    try {
        const response = await axios.post(
            `${POWERTRANZ_API_URL}/payment`,
            `${spiToken}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            if (response.data.Approved) {
                return {
                    error: false,
                    data: response.data,
                };
            } else {
                return {
                    error: true,
                    data: "Pago no aprobado",
                };
            }
        } else {
            return {
                error: true,
                data: response.data,
            };
        }
    } catch (error) {
        return { error: true, data: error };
    }
};
