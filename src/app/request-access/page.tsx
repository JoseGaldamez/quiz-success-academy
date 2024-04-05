import { MenuBar } from '@/common/MenuBar'
import { TopBar } from '@/common/TopBar'
import { OptionsContact } from '@/components/request-access/OptionsContact'
import React from 'react'

const RequestAccessPage = () => {
    return (
        <div>
            <TopBar />
            <MenuBar />
            <OptionsContact />
        </div>
    )
}

export default RequestAccessPage