'use client';

import React from 'react';
import { NavMain } from "@/app/(dashboard)/_components/nav-main";
import { NavGuides } from "@/app/(dashboard)/_components/nav-guides";
import { Role } from "@/lib/types/user";
import { SidebarData } from "@/app/(dashboard)/_utils/types";
import {
    ChartCandlestickIcon,
    Earth,
    FolderGit2,
    LayoutGrid,
    PieChart,
    Users
} from "lucide-react";

const userSidebar: SidebarData = {
    navMain: [
        {
<<<<<<< HEAD
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutGrid,
        },
        {
            title: "Market Prediction",
            url: "/group-37",
            icon: Bot,
            items: [
                {
                    title: "Price Forecast",
                    url: "/group-37/forecast",
                },
                {
                    title: "Model Metrics",
                    url: "/group-37/metrics",
                },
            ],
        },
        {
            title: "Budget Tracking",
            url: "/budget-tracking",
            icon: DollarSign,
            items: [
                // {
                //     title: "Categorization",
                //     url: "/group-38/categorization",
                // },
                // {
                //     title: "Budget Analysis",
                //     url: "/group-38/analysis",
                // },
            ],
        },
        {
=======
>>>>>>> 7e1c06d04c3623d078713cf405ffcf32490feb2e
            title: "Portfolio Optimization",
            url: "/dashboard/portfolio",
            icon: PieChart,
        },
    ],
    guides: [
        {
            name: "ML Model Notebook",
            url: "/notebooks",
            icon: FolderGit2,
        },
        {
            name: "Documentation",
            url: "/docs",
            icon: Users,
        },
    ],
}

const adminSidebar: SidebarData = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutGrid,
        },
        {
            title: "Global Assets",
            url: '/assets',
            icon: Earth,
            initiallyExpanded: true,
            items: [
                {
                    title: "Discover",
                    url: "/global-assets/lookup",
                },
                {
                    title: "Top Screens",
                    url: "/global-assets/top-screens",
                },
                {
                    title: "Sectors",
                    url: "/global-assets/sectors",
                },

            ]
        },
        {
            title: "System Assets",
            url: '/assets/db',
            icon: ChartCandlestickIcon,
        }
    ],
    guides: [
        {
            name: "ML Model Notebook",
            url: "/notebooks",
            icon: FolderGit2,
        },
        {
            name: "Documentation",
            url: "/docs",
            icon: Users,
        },
    ],
}

const AppSidebarLinks = ({ role }: { role: Role }) => {
    const sidebar = role === 'admin' ? adminSidebar : userSidebar;
    return (
        <>
            <NavMain items={sidebar.navMain} />
            <NavGuides projects={sidebar.guides} />
        </>
    );
};

export default AppSidebarLinks;