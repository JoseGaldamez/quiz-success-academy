import { MenuBar } from '@/common/MenuBar'
import { TopBar } from '@/common/TopBar'
import { FinishSale } from '@/components/sale/finishSale'
import React, { useEffect } from 'react'

const FinishSalePage = () => {

    return (
        <div>
            <TopBar />
            <MenuBar />
            <FinishSale/>
        </div>
    )
}

export default FinishSalePage