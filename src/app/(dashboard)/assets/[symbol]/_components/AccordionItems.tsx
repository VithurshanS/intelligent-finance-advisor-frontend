import {Asset} from "../_utils/actions";
import {AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {DataItem} from "../_components/DataItem"
import React from "react";


interface MarketDataSectionProps {
    asset: Asset;
}

export const MarketDataSection: React.FC<MarketDataSectionProps> = ({asset}) => {
    return (
        <AccordionItem value="market-data">
            <AccordionTrigger>Market Data</AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DataItem
                        label="Open"
                        value={asset.open_price !== undefined ? `${asset.currency || '$'}${asset.open_price.toFixed(2)}` : 'N/A'}
                    />

                    <DataItem
                        label="Previous Close"
                        value={asset.prev_close !== undefined ? `${asset.currency || '$'}${asset.prev_close.toFixed(2)}` : 'N/A'}
                    />

                    <DataItem
                        label="Day Range"
                        value={
                            asset.day_low !== undefined && asset.day_high !== undefined
                                ? `${asset.currency || '$'}${asset.day_low.toFixed(2)} - ${asset.currency || '$'}${asset.day_high.toFixed(2)}`
                                : 'N/A'
                        }
                    />

                    <DataItem
                        label="Volume"
                        value={asset.volume !== undefined ? asset.volume.toLocaleString() : 'N/A'}
                    />

                    <DataItem
                        label="Average Volume"
                        value={asset.avg_volume !== undefined ? asset.avg_volume.toLocaleString() : 'N/A'}
                    />

                    <DataItem
                        label="Beta"
                        value={asset.beta !== undefined ? asset.beta.toFixed(2) : 'N/A'}
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

interface FinancialDataSectionProps {
    asset: Asset;
}

export const FinancialDataSection: React.FC<FinancialDataSectionProps> = ({asset}) => {
    return (
        <AccordionItem value="financial-data">
            <AccordionTrigger>Financial Data</AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DataItem
                        label="Market Cap"
                        value={
                            asset.market_cap !== undefined
                                ? `${asset.currency || '$'}${(asset.market_cap / 1000000000).toFixed(2)}B`
                                : 'N/A'
                        }
                    />

                    <DataItem
                        label="52-Week Range"
                        value={
                            asset.fifty_two_week_low !== undefined && asset.fifty_two_week_high !== undefined
                                ? `${asset.currency || '$'}${asset.fifty_two_week_low.toFixed(2)} - ${asset.currency || '$'}${asset.fifty_two_week_high.toFixed(2)}`
                                : 'N/A'
                        }
                    />

                    <DataItem
                        label="Trailing P/E"
                        value={asset.trailing_pe !== undefined ? asset.trailing_pe.toFixed(2) : 'N/A'}
                    />

                    <DataItem
                        label="Trailing EPS"
                        value={
                            asset.trailing_eps !== undefined
                                ? `${asset.currency || '$'}${asset.trailing_eps.toFixed(2)}`
                                : 'N/A'
                        }
                    />

                    <DataItem
                        label="Bid"
                        value={
                            asset.bid !== undefined
                                ? `${asset.currency || '$'}${asset.bid.toFixed(2)}`
                                : 'N/A'
                        }
                    />

                    <DataItem
                        label="Ask"
                        value={
                            asset.ask !== undefined
                                ? `${asset.currency || '$'}${asset.ask.toFixed(2)}`
                                : 'N/A'
                        }
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};


interface CompanyInfoSectionProps {
    asset: Asset;
}

export const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({asset}) => {
    return (
        <AccordionItem value="company-info">
            <AccordionTrigger>Company Information</AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DataItem
                        label="Sector"
                        value={asset.sector || 'N/A'}
                    />

                    <DataItem
                        label="Industry"
                        value={asset.industry || 'N/A'}
                    />

                    <DataItem
                        label="Type"
                        value={asset.type || 'N/A'}
                    />

                    {asset.db?.risk_score_updated && (
                        <DataItem
                            label="Risk Score Updated"
                            value={new Date(asset.db.risk_score_updated).toLocaleDateString()}
                        />
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};