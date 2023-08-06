import { Button } from "../components/flowbite-components";
import { revalidateTag } from "next/cache";

const messageErrors: any[] = []

async function registerUser(formData: FormData) {
    'use server';
    const name = formData.get('name')
    const jobRole = formData.get('job_role')
    const recruitmentDate = formData.get('recruitment_date')

    const response = await fetch(`http://localhost:8000/user`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            'name': name,
            'job_role': jobRole,
            'recruitment_date': recruitmentDate,
        })
    })
    revalidateTag(`users`)
    if(response.status !== 201) {
        const messageError =JSON.parse(await response.text()).message
        messageErrors.push(messageError)
    }
}

export function RegisterUserForm() {
    return(
        <div>
            <form action={registerUser}>
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="name">Nome</label>
                    </div>
                        <input id="name" name="name" type="text" placeholder="Nome"/>
                </div>
                <br />
                <div>
                    <div className="mb-2 block ">
                        <label htmlFor="job_role">Cargo</label>
                    </div>
                        <input id="job_role" name="job_role" type="text" placeholder="Cargo"/>
                </div>
                <br />
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="recruitment_date">Data de contrataçao</label>
                    </div>
                        <input id="recruitment_date" name="recruitment_date" type="text" placeholder="MM/DD/AAAA"/>
                </div>
                <br />    
                <Button type="submit" color='success'>Register</Button>
            </form>
            {messageErrors.map((msg,key) => (<h1 key={key} color="red">{msg}</h1>))}
        </div>
    )
}