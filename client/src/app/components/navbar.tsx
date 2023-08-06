"use client";

import { Navbar } from "flowbite-react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

export default function DefaultNavbar() {
  const params = useParams();
  
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gerenciador de Ferias
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          href={`/users`}
        >
          Ver Usuarios
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2 text-white">Olá {params.wallet_id}</div>
    </Navbar>
  );
}