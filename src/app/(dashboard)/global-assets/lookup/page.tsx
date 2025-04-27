import React from 'react';
import {searchYahooFinance} from './_utils/actions';
import {Separator} from '@/components/ui/separator';
import SearchBar from "./_components/Searchbar";
import QuotesSection from "./_components/QuotesSection";
import NewsSection from "./_components/NewsSection";

interface PageProps {
    searchParams: Promise<{
        query?: string;
    }>;
}

const Page = async ({searchParams}: PageProps) => {
    const query = (await searchParams).query || '';
    const searchResults = query ? await searchYahooFinance({
        query: query,
        newsCount: 8,
        quoteCount: 10
    }) : null;

    return (
        <div className="container mx-auto py-6 px-5 space-y-8">
            <h1 className="text-2xl font-semibold">Yahoo Finance Lookup</h1>

            <SearchBar initialQuery={query}/>

            {query && searchResults && (
                <div className="space-y-8">
                    <QuotesSection quotes={searchResults.success ? searchResults.data.quotes : []}
                                   error={searchResults.success ? null : searchResults.error}/>
                    <Separator className="my-8"/>
                    <NewsSection news={searchResults.success ? searchResults.data.news : []}
                                 error={searchResults.success ? null : searchResults.error}/>
                </div>
            )}

            {query && !searchResults && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
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