'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User } from "next-auth"
import Image from "next/image"
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user as User;
    const firstNameChar = user?.name?.[0] ?? '';
    const imageSrc = session?.user?.image ?? "https://github.com/shadcn.png";

    return (
        <nav className="p-4 md:p-6 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Image src={"/logo.svg"} width={30} height={30} alt="Logo" />
                    <a className="text-xl font-bold mb-4 md:mb-0" href="#">
                        Simply Share
                    </a>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={imageSrc} />
                                <AvatarFallback>{firstNameChar}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-52 bg-gradient-to-r from-violet-100 to-blue-100">
                            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator className="h-1" />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>
                                {
                                    session ? (
                                        <Button className="w-full" onClick={() => signOut()}>{"Logout"}</Button>
                                    ) : (
                                        <Link href="/sign-in">
                                            <Button className="w-full">{"Log In"}</Button>
                                        </Link>
                                    )
                                }
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>
        </nav>
    )
}
