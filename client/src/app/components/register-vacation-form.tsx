import { revalidateTag } from "next/cache";
import { Button,Label } from "../components/flowbite-components";

let messageErrors: any[] = [];

async function registerVacation(formData: FormData) {
    'use server';
    messageErrors = []
    const startDate = formData.get('start_date')
    const endDate = formData.get('end_date')
    const userId = formData.get('user_id')

    const response = await fetch(`http://localhost:8000/user/register_vacation/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            'start_date': startDate,
            'end_date': endDate,
        })
    })
    revalidateTag(`user-${userId}`)
    if(response.status !== 201) {
        const messageError =JSON.parse(await response.text()).message
        messageErrors.push(messageError)
    }
}

export function RegisterVacationForm(props: {user_id: string}) {
    return(
        <div>
            <form action={registerVacation}>
                <input name="user_id" type="hidden" defaultValue={props.user_id}/>
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="start_date">Data de inicio das ferias</label>
                    </div>
                        <input id="start_date" name="start_date" type="text" placeholder="MM/DD/AAAA"/>
                </div>
                <br />
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="end_date">Data de termino das ferias</label>
                    </div>
                        <input id="end_date" name="end_date" type="text" placeholder="MM/DD/AAAA"/>
                </div>
                <br />    
                <Button type="submit" color='success'>Registrar</Button>
            </form>
            {messageErrors.map((msg,key) => (<h1 key={key} color="red">{msg}</h1>))}
        </div>
    )
}