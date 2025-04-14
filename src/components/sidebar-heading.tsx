"use client"

import * as React from "react"
import { Wallet } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"

export function SidebarHeading() {
    const { open } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start overflow-hidden"
                >
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shrink-0">
                        <Wallet className="size-4" />
                    </div>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                className="grid flex-1 text-left ml-2 min-w-0"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    opacity: { duration: 0.2 }
                                }}
                            >
                                <span className="font-bold text-base truncate">Spend Wise</span>
                                <span className="text-xs text-muted-foreground truncate">Smart money management</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}