import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {BadgeCheck} from "lucide-react";

const RiskWatchListBadge = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <BadgeCheck className="h-4 w-4 text-primary"/>
                </TooltipTrigger>
                <TooltipContent className={'bg-muted w-fit max-w-[15rem] text-sm'} side={'right'}>
                    This stock is on the Risk Watchlist actively monitored by
                    our system and team for safety and stability.
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default RiskWatchListBadge;