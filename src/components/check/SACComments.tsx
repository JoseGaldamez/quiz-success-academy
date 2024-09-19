import { StudentInformation } from '@/models/student.model'
import { useState } from 'react';

export const SACComments = ({ user }: { user: StudentInformation }) => {

    const [called, setCalled] = useState(false);
    const [registered, setRegistered] = useState('1');
    const [comment, setComment] = useState('');

    const saveSACInformation = async () => {
        console.log({
            code: user.code,
            registered,
            comment
        });


    }


    return (
        <div className='mb-40'>
            <h2 className='my-10 text-xl font-bold border-b-2 border-orange-500'>SAC</h2>

            {
                !called && (
                    <div>
                        <button type="button" onClick={() => { setCalled(true) }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Llamada realizada</button>
                    </div>
                )
            }

            {
                called && (
                    <section>

                        <div>
                            <h3 className='my-5 font-bold'>¿El estudiante se registró?</h3>
                            <select value={registered} onChange={(e) => { setRegistered(e.target.value) }} className='border p-2 rounded' name="registred" id="registred">
                                <option value="1">Si, usuario registrado</option>
                                <option value="0">No, usuario no registrado</option>
                            </select>

                            <textarea value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder='Observaciones' className='p-5 my-5 border w-full' name="commentRegistered" rows={4} cols={50} id="commentRegistered"></textarea>
                        </div>

                        <button type="button" onClick={saveSACInformation} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-full mb-10'>Guardar cambios</button>

                    </section>
                )
            }

        </div>
    )
}
