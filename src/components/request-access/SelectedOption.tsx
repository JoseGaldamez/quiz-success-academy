import React from 'react'
import { WhatsappContact } from './WhatsappContact'
import { CallContact } from './CallContact'
import { EmailContact } from './EmailContact'
import SaleForm from '../sale/SaleFrom'

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
                return <SaleForm amount={300.00} />
            default:
                return <div>Selecciona una opción</div>
        }
    }
    return renderSelectedOption()
}
