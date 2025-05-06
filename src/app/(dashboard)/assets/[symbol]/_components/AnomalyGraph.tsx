// Fixed AnomalyGraph component
import {AnomalyFlag, HistoricalDataPoint} from "@/app/(dashboard)/assets/[symbol]/_utils/definitions";
import {useMemo} from "react";
import {AlertOctagon} from "lucide-react";
import {motion} from "framer-motion";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ReferenceDot,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export const AnomalyGraph = ({
                                 historicalData,
                                 flags
                             }: {
    historicalData: HistoricalDataPoint[] | null | undefined;
    flags: AnomalyFlag[] | null | undefined;
}) => {
    // Process data to ensure it's in chronological order
    const sortedData = useMemo(() => {
        if (!historicalData || historicalData.length === 0) return [];
        return [...historicalData].sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    }, [historicalData]);

    // Format data for better display
    const formattedData = useMemo(() => {
        if (sortedData.length === 0) return [];
        return sortedData.map(item => ({
            ...item,
            close: Number(item.close.toFixed(2)),
            volume: Math.round(item.volume / 1000000), // Convert to millions
            percent_change: item.percent_change ? Number(item.percent_change.toFixed(2)) : null,
            // Check if this date has an anomaly flag
            hasAnomaly: flags?.some(flag => flag.date === item.date) || false
        }));
    }, [sortedData, flags]);

    // Format date for x-axis
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    };

    // Return early if no data (after all hooks are defined)
    if (!historicalData || historicalData.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 border rounded-lg bg-card/50">
                <p className="text-muted-foreground">No historical data available</p>
            </div>
        );
    }

    // Custom tooltip component with proper TypeScript typing
    type TooltipProps = {
        active?: boolean;
        payload?: Array<{
            payload: {
                date: string;
                close: number;
                volume: number;
                percent_change: number | null;
                hasAnomaly: boolean;
            };
        }>;
        label?: string;
    };

    const CustomTooltip = ({active, payload, label}: TooltipProps) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-popover border rounded-md p-3 shadow-md">
                    <p className="font-medium">{label ? formatDate(label) : ''}</p>
                    <p className="text-sm text-primary">Price: ${data.close}</p>
                    <p className="text-sm text-chart-2">Volume: {data.volume}M</p>
                    {data.percent_change !== null && (
                        <p className={`text-sm ${data.percent_change >= 0 ? 'text-okay' : 'text-destructive'}`}>
                            Change: {data.percent_change >= 0 ? '+' : ''}{data.percent_change}%
                        </p>
                    )}
                    {data.hasAnomaly && (
                        <div className="mt-1 pt-1 border-t text-warning flex items-center gap-1">
                            <AlertOctagon size={14}/>
                            <span className="text-xs font-medium">Anomaly detected</span>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            className="mt-6 mb-4"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
        >
            <h4 className="text-sm font-medium mb-2">Historical Performance</h4>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={formattedData} margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4}/>
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            tick={{fontSize: 12}}
                            stroke="var(--muted-foreground)"
                        />
                        <YAxis
                            yAxisId="price"
                            orientation="right"
                            domain={['auto', 'auto']}
                            tick={{fontSize: 12}}
                            stroke="var(--muted-foreground)"
                            tickFormatter={(value) => `$${value}`}
                        />
                        <YAxis
                            yAxisId="volume"
                            orientation="left"
                            domain={[0, 'auto']}
                            tick={{fontSize: 12}}
                            stroke="var(--muted-foreground)"
                            tickFormatter={(value) => `${value}M`}
                        />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend/>

                        {/* Using solid colors instead of gradients */}
                        <Bar
                            dataKey="volume"
                            yAxisId="volume"
                            fill="var(--chart-2)"  // Solid color from chart colors
                            name="Volume (M)"
                            barSize={20}
                            opacity={0.5}
                        />
                        <Line
                            type="monotone"
                            dataKey="close"
                            yAxisId="price"
                            stroke="var(--primary)"  // Primary color for the line
                            name="Price"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{r: 6, fill: "var(--primary)", stroke: "var(--background)"}}
                        />

                        {/* Anomaly markers */}
                        {formattedData.map(point =>
                            point.hasAnomaly ? (
                                <ReferenceDot
                                    key={point.date}
                                    x={point.date}
                                    y={point.close}
                                    yAxisId="price"
                                    r={8}
                                    fill="var(--destructive)"
                                    stroke="var(--background)"
                                    strokeWidth={2}
                                />
                            ) : null
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {flags && flags.length > 0 && (
                <motion.div
                    className="flex items-center mt-2 text-xs text-muted-foreground"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.4, delay: 0.5}}
                >
                    <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                    <span>Anomaly detected</span>
                </motion.div>
            )}
        </motion.div>
    );
};