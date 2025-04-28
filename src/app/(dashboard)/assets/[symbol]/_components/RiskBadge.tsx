import {AlertTriangle, CheckCircle2, ShieldAlert} from "lucide-react";
import {Badge} from "@/components/ui/badge";


const RiskBadge = ({score}: { score?: number }) => {
    if (score === undefined) return null;

    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (score >= 7) riskLevel = 'High';
    else if (score >= 4) riskLevel = 'Medium';

    const badgeStyles = {
        'Low': 'bg-green-100 text-green-800 hover:bg-green-100',
        'Medium': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
        'High': 'bg-red-100 text-red-800 hover:bg-red-100'
    };

    const icons = {
        'Low': <CheckCircle2 className="w-4 h-4 mr-1"/>,
        'Medium': <AlertTriangle className="w-4 h-4 mr-1"/>,
        'High': <ShieldAlert className="w-4 h-4 mr-1"/>
    };

    return (
        <Badge variant="outline" className={`flex items-center ${badgeStyles[riskLevel]}`}>
            {icons[riskLevel]}
            Risk: {riskLevel} ({score.toFixed(1)})
        </Badge>
    );
};

export default RiskBadge;