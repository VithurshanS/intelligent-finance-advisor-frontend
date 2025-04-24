import React, {JSX} from "react";

const RiskBadge = ({risk}: { risk: string | null }): JSX.Element => {
    if (risk === null) {
        return (
            <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
        Unknown
      </span>
        );
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
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorByRisk(risk)}`}>
      {risk}
    </span>
    );
};

export default RiskBadge;