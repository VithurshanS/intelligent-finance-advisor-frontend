import {TrendingDown, TrendingUp} from "lucide-react";


const PriceChange = ({ current, previous }: { current?: number; previous?: number }) => {
    if (!current || !previous) return <div className="text-gray-500">N/A</div>;

    const change = current - previous;
    const percentChange = (change / previous) * 100;
    const isPositive = change >= 0;

    return (
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="font-medium">
        {change.toFixed(2)} ({percentChange.toFixed(2)}%)
      </span>
        </div>
    );
};

export default PriceChange;