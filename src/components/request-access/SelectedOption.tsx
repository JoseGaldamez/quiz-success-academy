import React from 'react'
import { WhatsappContact } from './WhatsappContact'
import { CallContact } from './CallContact'
import { EmailContact } from './EmailContact'

export const SelectedOption = ({ selected }: { selected: number | null }) => {

    const renderSelectedOption = () => {
        switch (selected) {
            case 0:
                return <WhatsappContact />
            case 1:
                return <CallContact />
            case 2:
                return <EmailContact />
            case 3:
                return <div>Formulario</div>
            default:
                return <div>Selecciona una opción</div>
        }
    }
    return renderSelectedOption()
}
