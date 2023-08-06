import { RegisterVacationForm } from "@/app/components/register-vacation-form"
import { Table,TableBody, TableHead, TableHeadCell, TableRow,TableCell, TabsGroup, TabsItem, Card } from "../../../components/flowbite-components";
import Link from "next/link";
import { OneUser, User } from "../../interfaces/user.interface";

async function getUser(userId: string): Promise<OneUser> {
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
        //cache: 'no-store',
        next: {tags: [`user-${userId}`], revalidate: 1}
    })
    const data: OneUser = await response.json();
    return data
}

async function calculateDays(start:string, end: string) {
  const start_date: any = new Date(start);
  const end_date: any = new Date(end);
  const daysInMs = Math.abs(end_date - start_date);
  const totalDays = Math.ceil(daysInMs / (1000 * 60 * 60 * 24));
  return totalDays
}

export default async function RegisterVacationPage({params}: {params: {user_id: string}}) {
    const user = await getUser(params.user_id)
    return (
        <main className="flex flex-grow flex-col container mx-auto p-2">
          <article className="format format-invert">
            <h1>Registrar Ferias de {user.name}</h1>
          </article>
          <div className="grid grid-cols-5 flex-grow gap-2 mt-2">
            <div className="col-span-2">
              <div>
                <Card
                  theme={{
                    root: {
                      children:
                        "flex h-full flex-col justify-center gap-4 py-4 px-2",
                    },
                  }}
                >
                    <RegisterVacationForm user_id={params.user_id} />                    
                </Card>
              </div>
              <div className="mt-2">
                <Card
                  theme={{
                    root: {
                      children:
                        "flex h-full flex-col justify-center gap-4 py-4 px-2",
                    },
                  }}
                >
                    <Table>
                        <TableHead>
                        <TableHeadCell>Inicio das Ferias</TableHeadCell>
                        <TableHeadCell>Termino das Ferias</TableHeadCell>
                        <TableHeadCell>Total de Dias</TableHeadCell>
                        </TableHead>
                        <TableBody className="divide-y">
                        {user.vacations.map((vacation, key) => (
                            <TableRow key={key}>
                            <TableCell>
                                {vacation.start_date}
                            </TableCell>
                            <TableCell>{vacation.end_date}</TableCell>
                            <TableCell>
                                {calculateDays(vacation.start_date,vacation.end_date)}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Card>
              </div>
            </div>
            <div className="col-span-2">
              <div className="mt-2">
                  <Card
                    theme={{
                      root: {
                        children:
                          "flex h-full flex-col justify-center gap-4 py-4 px-2",
                      },
                    }}
                  >
                      <Table>
                          <TableHead>
                          <TableHeadCell>Nome</TableHeadCell>
                          <TableHeadCell>Cargo</TableHeadCell>
                          <TableHeadCell>Data de contrataçao</TableHeadCell>
                          </TableHead>
                          <TableBody className="divide-y">
                              <TableRow>
                              <TableCell>
                                  {user.name}
                              </TableCell>
                              <TableCell>{user.job_role}</TableCell>
                              <TableCell>
                                  {user.recruitment_date}
                              </TableCell>
                              </TableRow>
                         
                          </TableBody>
                      </Table>
                  </Card>
                </div>
            </div>
          </div>
        </main>
      );
}