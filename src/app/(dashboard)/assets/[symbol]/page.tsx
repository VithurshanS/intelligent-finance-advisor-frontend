import {getAssetByTicker} from './_utils/actions';
import {Accordion} from '@/components/ui/accordion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    AlertCircle,
    ExternalLink,
} from 'lucide-react';
import {Separator} from '@/components/ui/separator';
import {Skeleton} from '@/components/ui/skeleton';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import Link from 'next/link';
import {StockStatus} from "./_utils/definitions";
import StatusBadge from "./_components/StatusBadge";
import RiskBadge from "./_components/RiskBadge";
import PriceChange from "./_components/PriceChange";
import StatusManager from "./_components/StatusManager";
import {Add} from "@/app/(dashboard)/assets/[symbol]/_components/Buttons";
import {MarketDataSection, FinancialDataSection, CompanyInfoSection} from "./_components/AccordionItems";

// Main page component
const StockDetailPage = async ({params}: { params: Promise<{ symbol: string }> }) => {
    const {symbol} = await params;
    const {data: asset, error} = await getAssetByTicker(symbol);


    // Handle status change (server action would go here in a real implementation)
    const handleStatusChange = async (status: StockStatus) => {
        // This would call a server action to update the status
        console.log(`Changing status to ${status}`);
    };

    // Handle remove (server action would go here in a real implementation)
    const handleRemove = async () => {
        // This would call a server action to remove the asset from DB
        console.log('Removing from DB');
    };


    // Error state
    if (error) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error.statusCode === 404
                            ? `Stock with symbol "${symbol}" not found.`
                            : `An error occurred: ${error.detail}`}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Loading state or no data
    if (!asset) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full"/>
                            <Skeleton className="h-20 w-full"/>
                            <Skeleton className="h-32 w-full"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header Section */}
            <Card className="mb-6">
                <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-2xl">{asset.name || symbol}</CardTitle>
                                {asset.company_url && (
                                    <Link href={asset.company_url} target="_blank" rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800">
                                        <ExternalLink size={16}/>
                                    </Link>
                                )}
                            </div>
                            <div className="text-gray-500">
                                {asset.ticker} • {asset.exchange || 'Unknown Exchange'} • {asset.currency || 'Unknown Currency'}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {asset.db?.status && <StatusBadge status={asset.db.status}/>}
                            {asset.db?.risk_score !== undefined && <RiskBadge score={asset.db.risk_score}/>}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <div className="text-3xl font-bold">
                                {asset.last_price
                                    ? `${asset.currency || '$'}${asset.last_price.toFixed(2)}`
                                    : 'Price Unavailable'}
                            </div>
                            {asset.last_price && asset.prev_close && (
                                <PriceChange current={asset.last_price} previous={asset.prev_close}/>
                            )}
                        </div>

                        {/* DB Action Buttons */}
                        <div>
                            {asset.db?.in_db ? (
                                <StatusManager
                                    asset={asset}
                                    onStatusChange={handleStatusChange}
                                    onRemove={handleRemove}
                                />
                            ) : (
                                <Add/>
                            )}
                        </div>
                    </div>

                    <Separator className="my-4"/>

                    {/* Asset Details Accordion */}
                    <Accordion type="single" collapsible className="w-full">
                        <MarketDataSection asset={asset}/>
                        <FinancialDataSection asset={asset}/>
                        <CompanyInfoSection asset={asset}/>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
};

export default StockDetailPage;