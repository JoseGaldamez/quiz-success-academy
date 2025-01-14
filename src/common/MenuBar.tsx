'use client';
import React, { useEffect, useState } from 'react'

import styles from "./Common.module.css";
import Link from 'next/link';
import { setInterval } from 'timers';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store';

interface IMenuBarProps {
    showRequestAccessButton?: boolean;
    timerInitDate?: Date;
}

export const MenuBar = ({ showRequestAccessButton = true, timerInitDate }: IMenuBarProps) => {

    const router = useRouter();
    const currentStudent = useAppSelector((state) => state.currentStudent);

    const [leftTime, setleftTime] = useState(0);

    let timer: any;

    useEffect(() => {
        if (timerInitDate) {
            startTimer();
        } else {
            clearInterval(timer);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerInitDate]);



    const startTimer = () => {
        timer = setInterval(() => {
            if (timerInitDate) {
                const initedQuizDate = new Date(timerInitDate).getTime();
                const currentDate = new Date().getTime();
                // milisecont from init
                const timer = currentDate - initedQuizDate;

                const admintedTime = 1000 * 60 * 90; //

                const timeLeft = Math.floor((admintedTime - timer) / 1000);
                setleftTime(timeLeft);
            }

        }, 1000);
    }


    const buildTimerString = (miliseconds: number) => {

        if (miliseconds < 0) {
            clearInterval(timer);
            router.push(`/${currentStudent.code}/calendar`);
            return '00:00';
        }

        const minutes = Math.floor(miliseconds / 60);
        const seconds = Math.floor(miliseconds % 60);
        if (seconds < 10) {
            return `Time left: ${minutes}:0${seconds}`;
        }

        return `Time left: ${minutes}:${seconds}`;

    }

    return (
        <div className={styles['menu-blue']} >
            <section className={styles.menu}>
                <span>
                    <Link href={'/'}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.LogoPrincipal} src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" alt="logo" />
                    </Link>
                </span>
                {
                    showRequestAccessButton && (
                        <Link href={'/request-access'} className={styles.contactButton}>
                            Solicitar acceso
                        </Link>
                    )
                }
                {
                    timerInitDate && (
                        <span>{buildTimerString(leftTime)}</span>
                    )
                }
            </section>
        </div>
    )
}
