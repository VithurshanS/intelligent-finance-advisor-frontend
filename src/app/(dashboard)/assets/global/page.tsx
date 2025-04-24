import React from 'react';
import {ScreenerSelector} from "@/app/(dashboard)/assets/global/_components/SelectorTabs";
import {ScreenerType} from "@/app/(dashboard)/assets/global/_utils/definitions";

// Make sure the searchParams has the correct type
const Page = async ({
                        searchParams,
                    }: {
    searchParams: {
        filter?: string;
        page?: string;
    };
}) => {
    // No need to await searchParams as it's not a Promise in the actual Next.js implementation
    const filter = searchParams.filter || ScreenerType.MOST_ACTIVES;

    // Example of excluding certain screener types if needed
    const include = [ScreenerType.MOST_ACTIVES, ScreenerType.DAY_GAINERS, ScreenerType.DAY_LOSERS, ScreenerType.PORTFOLIO_ANCHORS];

    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto px-6 py-2">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-xl font-semibold">Stocks</h1>
            </div>
            <div className="w-full">
                <ScreenerSelector
                    filter={filter}
                    include={include}
                />
            </div>

            {/* You can add the content that displays based on the selected filter below */}
            <div className="mt-4">
                {/* Content based on selected filter */}
            </div>
        </div>
    );
};

export default Page;