import React, { useState } from 'react'
import { StudentInformation } from '@/models/student.model'
import { StudentStates } from '@/types/studentStates.types'

export const ExamCallAndComment = ({ user }: { user: StudentInformation }) => {
    const [called, setcalled] = useState(false);

    return (
        <div>
            {
                (user.state === StudentStates.TO_CALL && called === false) && (
                    <div>
                        <button type="button" onClick={() => { setcalled(true) }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Llamada realizada</button>
                    </div>
                )
            }

            {
                (user.state === StudentStates.TO_CALL && called === true) && (
                    <div>

                        <p className='m-5'>
                            <strong>Oral Production:</strong>
                            <input className='p-2 border ml-3' type="number" placeholder='50' />
                        </p>

                        <p className='m-5'>
                            <textarea placeholder='Observaciones' className='p-2 border ml-3 w-full' name="commentCallExam" rows={4} cols={50} id="commentCallExam"></textarea>
                        </p>


                        <button type="button" onClick={() => { setcalled(true) }} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Guardar cambios</button>
                    </div>
                )
            }
        </div>
    )
}
