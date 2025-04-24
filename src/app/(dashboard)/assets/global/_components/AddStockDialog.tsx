'use client'

import {MinimalStockInfo} from "@/app/(dashboard)/assets/global/_utils/actions";
import React, {JSX} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import RiskBadge from "@/app/(dashboard)/assets/global/_components/RiskBadge";
import {formatMarketCap} from "@/app/(dashboard)/assets/global/_utils/utils";

const AddStockDialog = ({ stock }: { stock: MinimalStockInfo }): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleAddStock = async () => {
        // Here you would implement your logic to add the stock
        console.log(`Adding stock ${stock.symbol} to the system`);
        setIsOpen(false);
        // Add API call to add stock to system
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8">
                    <PlusCircle className="h-4 w-4 mr-1" /> Add
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Stock to System</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to add {stock.symbol} ({stock.name}) to the system?
                        This will make it available for risk analysis and monitoring.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Symbol</p>
                        <p className="font-medium">{stock.symbol}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Risk Level</p>
                        <RiskBadge risk={stock.riskLevel} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Market Cap</p>
                        <p>{formatMarketCap(stock.marketCap)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Price</p>
                        <p>${stock.price.toFixed(2)}</p>
                    </div>
                    {stock.exchange && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Exchange</p>
                            <p>{stock.exchange}</p>
                        </div>
                    )}
                    {stock.peRatio !== null && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">P/E Ratio</p>
                            <p>{stock.peRatio.toFixed(2)}</p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddStock}>Add Stock</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default AddStockDialog;