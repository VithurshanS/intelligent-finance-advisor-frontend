"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { FormEvent } from "react";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";
    const router = useRouter();
    const searchParams = useSearchParams();

    const backgroundImage = "/search-backdrop-light.jpg";

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query')?.toString() || '';

        if (query) {
            // Create a new URLSearchParams object
            const params = new URLSearchParams(searchParams.toString());
            params.set('query', query);

            // Update the URL with the new query parameter
            router.push(`?${params.toString()}`);
        }
    };

    return (
        <section className="w-full bg-gradient-to-r from-blue-900 to-purple-900">
            <div className="relative w-full h-64 md:h-80">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt="Search background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay - lighter for light mode, darker for dark mode */}
                    <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/40'}`}></div>
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center px-4 py-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Discover Stocks & Market Insights
                    </h2>

                    {/* Search Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full max-w-2xl gap-2"
                    >
                        <Input
                            name="query"
                            placeholder="Search stocks, news, companies..."
                            defaultValue={initialQuery}
                            className="flex-1 h-12 bg-white/90 dark:bg-gray-800/90 border-0 focus-visible:ring-2 focus-visible:ring-offset-0 text-base"
                        />
                        <Button
                            type="submit"
                            className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;