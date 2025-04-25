import React, {Suspense} from 'react';
import {ScreenerSelector} from "@/app/(dashboard)/assets/global/_components/SelectorTabs";
import {ScreenerType} from "@/app/(dashboard)/assets/global/_utils/definitions";
import {ScreenTable} from "@/app/(dashboard)/assets/global/_components/ScreenTable";
import SkeletonTable from "@/app/(dashboard)/assets/global/_components/SkeletonTable";
import ScreenerPagination from "@/app/(dashboard)/assets/global/_components/ScreenerPagination";

// Make sure the searchParams has the correct type
const Page = async ({
                        searchParams,
                    }: {
    searchParams: Promise<{
        filter?: string;
        page?: string;
    }>;
}) => {
    const filter = (await searchParams).filter as ScreenerType || ScreenerType.MOST_ACTIVES;
    const page = parseInt((await searchParams).page as string) || 1;

    // Example of excluding certain screener types if needed
    const include = [ScreenerType.MOST_ACTIVES, ScreenerType.DAY_GAINERS, ScreenerType.DAY_LOSERS, ScreenerType.PORTFOLIO_ANCHORS, ScreenerType.AGGRESSIVE_SMALL_CAPS, ScreenerType.GROWTH_TECHNOLOGY_STOCKS];

    return (
        <div className="flex flex-col flex-grow px-5 py-4">
            <div className="w-full flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Global Screens</h1>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <ScreenerSelector
                    filter={filter}
                    include={include}
                />
                <Suspense key={`${filter}-${page}`} fallback={<SkeletonTable/>}>
                    <ScreenTable filter={filter} page={page}/>
                </Suspense>
                <ScreenerPagination page={page}/>
            </div>
        </div>
    );
};

export default Page;