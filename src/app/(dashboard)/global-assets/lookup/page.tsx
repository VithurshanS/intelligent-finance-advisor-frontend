import React, {Suspense} from 'react';
import SearchBar from "./_components/Searchbar";
import {ResultsSection, ResultsSkeleton} from "./_components/ResultsSection";

interface PageProps {
    searchParams: Promise<{
        query?: string;
    }>;
}

const Page = async ({searchParams}: PageProps) => {
    const query = (await searchParams).query || '';

    return (
        <div className="container mx-auto pb-6 space-y-8">
            <SearchBar initialQuery={query}/>

            {query && (
                <Suspense fallback={<ResultsSkeleton/>} key={query}>
                    <ResultsSection query={query}/>
                </Suspense>
            )}


            {!query && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>Enter a search term to get started</p>
                </div>
            )}
        </div>
    );
};

export default Page;