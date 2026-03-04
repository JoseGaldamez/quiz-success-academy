import React from 'react'
import Link from 'next/link';
import { ImFacebook, ImInstagram, ImLocation2, ImMail4, ImPhone, ImYoutube } from "react-icons/im";
import styles from "./Common.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                
                {/* Brand & description column */}
                <div className={styles.footerCol}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        className={styles.footerLogo} 
                        src="https://successacademyhn.com/wp-content/uploads/2023/02/logo_succress-blanco-copia.png" 
                        alt="Success Academy Logo" 
                    />
                    <p className={styles.footerDesc}>
                        Ayudando a estudiantes a alcanzar su máximo potencial a través del aprendizaje interactivo del idioma inglés.
                    </p>
                    <div className={styles.socialLinks}>
                        <a href="https://facebook.com/successacademyhn" target="_blank" rel="noopener noreferrer"><ImFacebook /></a>
                        <a href="https://instagram.com/successacademyhn" target="_blank" rel="noopener noreferrer"><ImInstagram /></a>
                        <a href="https://youtube.com/successacademyhn" target="_blank" rel="noopener noreferrer"><ImYoutube /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className={styles.footerCol}>
                    <h4 className={styles.footerTitle}>Enlaces Rápidos</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/request-access">Solicitar Acceso</Link></li>
                        <li><a href="https://successacademyhn.com/" target="_blank" rel="noopener noreferrer">Plataforma Principal</a></li>
                    </ul>
                </div>

                {/* Contact info column */}
                <div className={styles.footerCol}>
                    <h4 className={styles.footerTitle}>Contáctanos</h4>
                    <ul className={styles.footerContactList}>
                        <li><ImLocation2 /> <span>San Pedro Sula, Honduras</span></li>
                        <li><ImPhone /> <span>+504 9518-2139</span></li>
                        <li><ImPhone /> <span>+504 9767-2191</span></li>
                        <li><ImMail4 /> <span>info.cursos@successacademyhn.com</span></li>
                    </ul>
                </div>

            </div>
            
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Success Academy. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
