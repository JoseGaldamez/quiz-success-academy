import { MenuBar } from '@/common/MenuBar'
import { TopBar } from '@/common/TopBar'
import { FinishSale } from '@/components/sale/finishSale'
import React, { Suspense } from 'react'

const FinishSalePage = () => {

    return (
        <div>
            <TopBar />
            <MenuBar />
            <Suspense><FinishSale/></Suspense>
        </div>
    )
}

export default FinishSalePage