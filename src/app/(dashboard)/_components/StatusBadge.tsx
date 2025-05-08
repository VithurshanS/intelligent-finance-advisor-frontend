import {Badge} from "@/components/ui/badge";
import {CheckCircle, Clock, AlertCircle, Ban, HourglassIcon, X} from "lucide-react";
import {AssetStatus} from "@/app/(dashboard)/assets/[symbol]/_utils/definitions";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type StatusBadgeProps = {
    status?: AssetStatus | null;
    showIcon?: boolean;
    showLabel?: boolean;
};

const StatusBadge = ({
                         status,
                         showIcon = true,
                         showLabel = true
                     }: StatusBadgeProps) => {
    // Handle undefined or null status
    if (status === undefined || status === null) {
        return (
            <Badge variant="outline"
                   className="flex items-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                {showIcon && <Clock className="w-4 h-4 mr-1"/>}
                {showLabel ? "Unknown" : ""}
            </Badge>
        );
    }

    // Define style configurations based on status
    let badgeStyle: string;
    let StatusIcon;

    switch (status) {
        case 'Active':
            badgeStyle = "bg-green-500 text-white dark:bg-green-900 dark:text-green-300";
            StatusIcon = CheckCircle;
            break;
        case 'Pending':
            badgeStyle = "bg-blue-500 text-white dark:bg-blue-900 dark:text-blue-300";
            StatusIcon = Clock;
            break;
        case 'Warning':
            badgeStyle = "bg-yellow-500 text-white dark:bg-yellow-900 dark:text-yellow-300";
            StatusIcon = AlertCircle;
            break;
        case 'BlackList':
            badgeStyle = "bg-red-500 text-white dark:bg-red-900 dark:text-red-300";
            StatusIcon = Ban;
            break;
        default:
            badgeStyle = "bg-gray-500 text-white dark:bg-gray-900 dark:text-gray-300";
            StatusIcon = Clock;
    }

    return (
        <Badge className={`flex items-center ${badgeStyle}`}>
            {showIcon && <StatusIcon className="w-4 h-4 mr-1"/>}
            {showLabel ? status : ""}
        </Badge>
    );
};

const UserStatusBadge = ({
                             status,
                             showIcon = true,
                             showLabel = true
                         }: StatusBadgeProps) => {
    // Handle undefined or null status
    if (status === undefined || status === null) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        {showLabel ? (
                            <Badge variant="outline"
                                   className="flex items-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                                {showIcon && <Clock className="w-4 h-4 mr-1"/>}
                                Unknown
                            </Badge>
                        ) : (
                            <Clock className="w-4 h-4 text-gray-500"/>
                        )}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-muted">
                        Status information unavailable
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    // Define style configurations based on status
    let badgeStyle: string;
    let StatusIcon;
    let displayText;
    let tooltipText;
    let iconColor;

    switch (status) {
        case 'Active':
            badgeStyle = "bg-green-500 text-white dark:bg-green-900 dark:text-green-300";
            iconColor = "text-green-500";
            StatusIcon = CheckCircle;
            displayText = "Healthy";
            tooltipText = "Asset not showing any Risk Signs";
            break;
        case 'Pending':
            badgeStyle = "bg-blue-500 text-white dark:bg-blue-900 dark:text-blue-300";
            iconColor = "text-blue-500";
            StatusIcon = HourglassIcon;
            displayText = "Training";
            tooltipText = "Prediction model will be available soon";
            break;
        case 'Warning':
            badgeStyle = "bg-yellow-500 text-white dark:bg-yellow-900 dark:text-yellow-300";
            iconColor = "text-yellow-500";
            StatusIcon = AlertCircle;
            displayText = "Warning";
            tooltipText = "Our team suggests caution when dealing with this asset";
            break;
        case 'BlackList':
            badgeStyle = "bg-red-500 text-white dark:bg-red-900 dark:text-red-300";
            iconColor = "text-red-500";
            StatusIcon = X;
            displayText = "Removed";
            tooltipText = "Our team marked this asset as inappropriate for transactions";
            break;
        default:
            badgeStyle = "bg-gray-500 text-white dark:bg-gray-900 dark:text-gray-300";
            iconColor = "text-gray-500";
            StatusIcon = Clock;
            displayText = status;
            tooltipText = "Status information";
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {showLabel ? (
                        <Badge className={`flex items-center ${badgeStyle}`}>
                            {showIcon && <StatusIcon className="w-4 h-4 mr-1"/>}
                            {displayText}
                        </Badge>
                    ) : (
                        <StatusIcon className={`w-4 h-4 ${iconColor}`}/>
                    )}
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs bg-muted">
                    {tooltipText}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export {UserStatusBadge};

export default StatusBadge;