import React, {JSX} from "react";
import {Badge} from "@/components/ui/badge";

const RiskBadge = ({risk}: { risk: string | null }): JSX.Element => {
    if (risk === null) {
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Unknown</Badge>;
    }

    const getColorByRisk = (risk: string): string => {
        switch (risk.toLowerCase()) {
            case "low":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
            case "high":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    return (
        <Badge className={getColorByRisk(risk)}>
            {risk}
        </Badge>
    );
};

export default RiskBadge;