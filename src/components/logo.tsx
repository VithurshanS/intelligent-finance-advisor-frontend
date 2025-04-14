// components/ui/logo.tsx
"use client"

import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
    withText?: boolean
    animateText?: boolean
    className?: string
}

export function Logo({ withText = true, animateText = false, className }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
                <Wallet className="size-4" />
            </div>
            {withText && (
                <div
                    className={cn(
                        "flex flex-col",
                        animateText && "overflow-hidden"
                    )}
                >
                    {animateText ? (
                        <div className="grid flex-1 text-left min-w-0">
                            <span className="font-bold text-base truncate">Spend Wise</span>
                            <span className="text-xs text-muted-foreground truncate">Smart money management</span>
                        </div>
                    ) : (
                        <>
                            <span className="font-bold text-base">Spend Wise</span>
                            <span className="text-xs text-muted-foreground">Smart money management</span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
