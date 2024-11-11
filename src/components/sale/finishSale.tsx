
interface IPropsFinishSale {
    error: boolean
}


export const FinishSale = async (responseData: IPropsFinishSale) => {


    return (
        <div className='text-center mt-20'>
            <h1 className={
                responseData.error ? "text-red-600" : "text-green-600"
            }>{
                    responseData.error ? "El pago no pudo realizarse" : "El pago se realizo con éxito"
                }
            </h1>

            {
                !responseData.error && (
                    <div className="mt-5">
                        <p className='text-slate-700'><span className="font-bold">No recargue esta página </span> o podría perderse la información de su compra.</p>
                        <p className='text-slate-700'>Gracias por confiar en nosotros</p>
                    </div>
                )
            }

        </div>
    )
}
