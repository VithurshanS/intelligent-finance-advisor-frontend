"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {GuideItem} from "@/app/(dashboard)/_utils/types";

export function NavGuides({
  projects,
}: {
  projects: GuideItem[]
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Guides</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <SidebarMenuAction showOnHover>*/}
            {/*      <MoreHorizontal />*/}
            {/*      <span className="sr-only">More</span>*/}
            {/*    </SidebarMenuAction>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent*/}
            {/*    className="w-48 rounded-lg"*/}
            {/*    side={isMobile ? "bottom" : "right"}*/}
            {/*    align={isMobile ? "end" : "start"}*/}
            {/*  >*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <Folder className="text-muted-foreground" />*/}
            {/*      <span>View Project</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <Forward className="text-muted-foreground" />*/}
            {/*      <span>Share Project</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <Trash2 className="text-muted-foreground" />*/}
            {/*      <span>Delete Project</span>*/}
            {/*    </DropdownMenuItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
