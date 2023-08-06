import Link from "next/link";
import { Table,TableBody, TableHead, TableHeadCell, TableRow,TableCell } from "../components/flowbite-components";
import { User } from "../users/interfaces/user.interface";

async function getUsers(): Promise<User[]> {
    const response = await fetch(`http://localhost:8000/user`, {
        //cache: 'no-store',
        next: {tags: [`users`], revalidate: 1}
    })
    const data: User[] = await response.json();
    return data
}

export default async function UsersComponent() {
    const users = await getUsers()
    return (
        <Table>
        <TableHead>
          <TableHeadCell>Nome</TableHeadCell>
          <TableHeadCell>Cargo</TableHeadCell>
          <TableHeadCell>Data de Contrataçao</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Ferias</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users!.map((user, key) => (
            <TableRow className="border-gray-700 bg-gray-800" key={key}>
              <TableCell className="whitespace-nowrap font-medium text-white">
                {user.id} {user.name}
              </TableCell>
              <TableCell>{user.job_role}</TableCell>
              <TableCell>{user.recruitment_date}</TableCell>
              <TableCell>
                <Link
                  className="font-medium hover:underline text-cyan-500"
                  href={`/users/register-vacation/${user.id}`}
                >
                  Registrar Ferias
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}