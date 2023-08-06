import { RegisterUserForm } from "../components/register-user-form";
import UsersComponent from "../components/users-component";

export default async function UsersPage() {
    return (
        <main className="container mx-auto px-2">
            <h1>Registrar Usuarios</h1>
            <RegisterUserForm />
            <br />
            <UsersComponent />
        </main>
    )
}