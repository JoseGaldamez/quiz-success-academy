'use client';

import { TopAdminBar } from "@/common/TopAdminBar";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const authState = useAppSelector((state) => state.auth.authState);
    const router = useRouter();

    useEffect(() => {
        const isLogged = localStorage.getItem('authState');
        if (isLogged === 'false' && !authState) {
            navigateToLogin();
        }
    }, [authState]);

    const navigateToLogin = () => {
        router.push('/success-admin-login');
    }


    return (
        <html lang="es">
            <body>
                <TopAdminBar />
                {children}
            </body>
        </html>
    );

}