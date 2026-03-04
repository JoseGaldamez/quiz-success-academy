'use client';

import { TopAdminBar } from "@/common/TopAdminBar";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { SET_AUTH_STATE, SET_AUTH_USER } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const authState = useAppSelector((state) => state.auth.authState);
    const dispatch = useAppDispatch(); // Need dispatch to restore state
    const router = useRouter();

    useEffect(() => {
        const isLogged = localStorage.getItem('authState');
        const savedUser = localStorage.getItem('authUser');

        if (isLogged === 'true' && savedUser) {
            // Restore session if not already in Redux
            if (!authState) {
                const user = JSON.parse(savedUser);
                dispatch(SET_AUTH_USER(user));
                dispatch(SET_AUTH_STATE(true));
            }
        } else {
            // Redirect to login if explicitly logged out or no valid session
            navigateToLogin();
        }
    }, [authState, dispatch]);

    const navigateToLogin = () => {
        router.push('/success-admin-login');
    }


    return (
        <div>
            <TopAdminBar />
            {children}
        </div>
    );

}