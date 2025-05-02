'use client';

import React, {useEffect, useState} from 'react';
import PriceChange from "@/app/(dashboard)/assets/[symbol]/_components/PriceChange";
import {AssetFastInfo, fetchAssetFastInfo} from "@/app/(dashboard)/assets/[symbol]/_utils/actions";

const PriceSection = ({ticker, initial}: { ticker: string, initial: AssetFastInfo }) => {
    const [asset, setAsset] = useState<AssetFastInfo>(initial);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Set up polling
    useEffect(() => {
        // Define fetchAssetInfo inside useEffect
        const fetchAssetInfo = async () => {
            try {
                setLoading(true);
                const response = await fetchAssetFastInfo(ticker);
                if (!response) {
                    setError("No data received");
                    return;
                }
                setAsset(response);
                setError(null);
            } catch (err) {
                // When error occurs, revert to initial values
                setAsset(initial);
                setError("Failed to fetch latest price data");
                console.error("Error fetching asset info:", err);
            } finally {
                setLoading(false);
            }
        };

        // Fetch immediately on mount
        fetchAssetInfo().then(() => console.log("Initial fetch completed"));

        // Set up polling interval (every 10 seconds)
        const intervalId = setInterval(fetchAssetInfo, 30000);

        // Clean up on unmount
        return () => clearInterval(intervalId);
    }, [ticker, initial]);

    return (
        <div className="price-section">
            {loading && !asset.last_price && <div className="text-sm text-gray-500">Loading...</div>}

            <div className="text-3xl font-extrabold">
                {asset.last_price
                    ?
                    <span>{asset.last_price.toFixed(2)} <span
                        className="text-xl font-semibold">{asset.currency || '$'}</span> </span>
                    : 'Price Unavailable'}
            </div>

            {asset.last_price && asset.prev_close && (
                <PriceChange current={asset.last_price} previous={asset.prev_close}/>
            )}

            {error && <div className="text-sm text-red-500">{error}</div>}
        </div>
    );
};

export default PriceSection;