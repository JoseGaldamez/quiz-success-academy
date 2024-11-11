import { MenuBar } from '@/common/MenuBar'
import { TopBar } from '@/common/TopBar'
import { FinishSale } from '@/components/sale/finishSale'
import { FormCreateUser } from '@/components/sale/FormCreateUser'
import { makePaymentService } from '@/services/payment.service'

interface IPropsFinishSale {
    params: Promise<{ id: string }>
}

const FinishSalePage = async ({ params }: IPropsFinishSale) => {

    const { id } = await params;
    const responseData = await makePaymentService(id);

    return (
        <div>
            <TopBar />
            <MenuBar />
            <FinishSale {...responseData} />

            {
                !responseData.error && (
                    <FormCreateUser />
                )
            }

            <div className='max-w-4xl mx-auto text-center bg-slate-100 p-10 rounded my-10 text-gray-800'>
                Dudas o consultas a: <strong>evaluaciones.academicas@successacademyhn.com</strong>
            </div>
        </div>
    )
}

export default FinishSalePage