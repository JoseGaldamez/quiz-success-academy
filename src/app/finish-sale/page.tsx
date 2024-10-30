import { MenuBar } from '@/common/MenuBar'
import { TopBar } from '@/common/TopBar'
import { FinishSale } from '@/components/sale/finishSale'
import React from 'react'

const RequestAccessPage = () => {
    return (
        <div>
            <TopBar />
            <MenuBar />
            <FinishSale/>
        </div>
    )
}

export default RequestAccessPage