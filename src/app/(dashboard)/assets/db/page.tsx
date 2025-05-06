import React, {Suspense} from 'react';
import {getStocksCount} from "@/app/(dashboard)/assets/db/_utils/actions";
import {AssetsTable, AssetsTableSkeleton} from "@/app/(dashboard)/assets/db/_components/Assets";
import Pagination from "@/app/(dashboard)/global-assets/[type]/_components/Pagination";

// Make sure the searchParams has the correct type
const Page = async ({
                        searchParams,
                    }: {
    searchParams: Promise<{
        page?: string;
    }>;
}) => {
    // Example of excluding certain screener types if needed
    const page = parseInt((await searchParams).page as string) || 1;
    const count = await getStocksCount();
    const result_per_page = 15;


    return (
        <div className="flex flex-col px-5 py-4 items-center justify-center">
            <div className="flex items-center justify-between mb-5 w-full max-w-[64rem]">
                <h1 className="text-2xl font-semibold">System Assets</h1>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-[64rem]">
                <Suspense key={page} fallback={<AssetsTableSkeleton/>}>
                    <AssetsTable page={page} result_per_page={result_per_page}/>
                </Suspense>
                <Pagination page={page} itemsPerPage={result_per_page} totalItems={count ? count : undefined}/>
            </div>
        </div>
    );
};

export default Page;