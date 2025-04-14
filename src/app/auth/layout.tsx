import React from "react";
import { Wallet } from "lucide-react"
import Image from "next/image";

export default function AuthLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-start gap-2">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
                            <Wallet className="size-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base">Spend Wise</span>
                            <span className="text-xs text-muted-foreground">Smart money management</span>
                        </div>
                    </a>
                </div>
                {children}
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image src={'/login-image.jpg'} alt={'Login Image'} fill className="object-cover" />
            </div>
        </div>
    )
}
