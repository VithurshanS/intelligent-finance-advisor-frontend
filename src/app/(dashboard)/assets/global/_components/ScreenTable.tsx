import React, {JSX} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {getScreenStocks} from "@/app/(dashboard)/assets/global/_utils/actions";
import {ScreenerType} from "@/app/(dashboard)/assets/global/_utils/definitions";
import RiskBadge from "@/app/(dashboard)/assets/global/_components/RiskBadge";
import AddStockDialog from "@/app/(dashboard)/assets/global/_components/AddStockDialog";
import {formatMarketCap, formatPercent} from "@/app/(dashboard)/assets/global/_utils/utils";
import RatingDisplay from "@/app/(dashboard)/assets/global/_components/RatingDisplay";

// Price change component
const PriceChange = ({change}: { change: number | null }): JSX.Element => {
    if (change === null) {
        return <span className="text-gray-500">N/A</span>;
    }

    const isPositive = change >= 0;
    return (
        <div className={isPositive ? "up" : "down"}>
            {formatPercent(change)}
        </div>
    );
};

// Main component type definition
interface ScreenTableProps {
    filter: ScreenerType;
    page: number;
}

// Main component
const ScreenTable = async ({filter, page}: ScreenTableProps): Promise<JSX.Element> => {
    const result_per_page = 7;
    const stocks = await getScreenStocks({result_per_page, filter, page});

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className={'bg-primary/10'}>
                        <TableHead className="w-[100px]">Symbol</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className={'text-right'}>Analyst Rating</TableHead>
                        <TableHead className={'text-right'}>Risk</TableHead>
                        <TableHead className="text-right">Market Cap</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stocks.success ? (
                        stocks.data.quotes.length > 0 ? (
                            stocks.data.quotes.map((stock) => (
                                <TableRow key={stock.symbol}>
                                    <TableCell className="font-bold text-primary">{stock.symbol}</TableCell>
                                    <TableCell className="max-w-[150px] truncate" title={stock.name}>
                                        {stock.name}
                                    </TableCell>
                                    <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <PriceChange change={stock.priceChangePercent}/>
                                    </TableCell>
                                    <TableCell className={'text-right'}>
                                        <RatingDisplay rating={stock.analystRating}/>
                                    </TableCell>
                                    <TableCell className={'text-right'}>
                                        <RiskBadge risk={stock.riskLevel}/>
                                    </TableCell>
                                    <TableCell className="text-right">{formatMarketCap(stock.marketCap)}</TableCell>
                                    <TableCell>
                                        <AddStockDialog stock={stock}/>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                                    No stocks match your criteria
                                </TableCell>
                            </TableRow>
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                                Error: {stocks.error}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export {ScreenTable};