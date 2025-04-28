// Status badge component
import {AlertTriangle, Ban, CheckCircle2, Clock, Info} from "lucide-react";
import {Badge} from "@/components/ui/badge";

const StatusBadge = ({status}: { status?: string }) => {
    if (!status) return null;

    const statusConfig = {
        'ACTIVE': {color: 'bg-green-100 text-green-800', icon: <CheckCircle2 className="w-4 h-4 mr-1"/>},
        'PENDING': {color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-4 h-4 mr-1"/>},
        'WARNING': {color: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="w-4 h-4 mr-1"/>},
        'BLACKLIST': {color: 'bg-red-100 text-red-800', icon: <Ban className="w-4 h-4 mr-1"/>}
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
        color: 'bg-gray-100 text-gray-800',
        icon: <Info className="w-4 h-4 mr-1"/>
    };

    return (
        <Badge variant="outline" className={`flex items-center ${config.color}`}>
            {config.icon}
            {status}
        </Badge>
    );
};

export default StatusBadge;