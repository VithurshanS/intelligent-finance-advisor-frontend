// StatusBadge.tsx
import { AlertTriangle, Ban, CheckCircle2, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }: { status?: string }) => {
    if (!status) return null;

    const statusConfig = {
        Active: {
            color:
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            icon: <CheckCircle2 className="w-4 h-4 mr-1" />,
        },
        Pending: {
            color:
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            icon: <Clock className="w-4 h-4 mr-1" />,
        },
        Warning: {
            color:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            icon: <AlertTriangle className="w-4 h-4 mr-1" />,
        },
        BlackList: {
            color:
                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            icon: <Ban className="w-4 h-4 mr-1" />,
        },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
        color: "bg-gray-100 text-gray-800 dark:bg-gray-400 dark:text-gray-900",
        icon: <Info className="w-4 h-4 mr-1" />,
    };

    return (
        <Badge variant="outline" className={`flex items-center ${config.color}`}>
            {config.icon}
            {status}
        </Badge>
    );
};

export default StatusBadge;
