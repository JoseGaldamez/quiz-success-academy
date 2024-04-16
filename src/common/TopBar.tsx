import React from 'react'

import { ImLocation2, ImMail4, ImPhone } from "react-icons/im";


import styles from "./Common.module.css";

export const TopBar = () => {
    return (
        <div className={styles['top-orange']}>
            <ul className={styles['list']}>
                <li className={styles['menu-item']}>
                    <ImMail4 />
                    info.cursos@successacademyhn.com</li>
                <li className={styles['menu-item']}>
                    <ImPhone />
                    +504 9518-2139</li>
                <li className={styles['menu-item']}>
                    <ImPhone />
                    +504 9767-2191</li>
            </ul>
        </div>
    )
}
