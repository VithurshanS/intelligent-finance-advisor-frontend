"use client";

// ----- Search Bar Component ----- //
import {redirect} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

function SearchBar({initialQuery = ''}: { initialQuery?: string }) {
    return (
        <form
            action={(formData) => {
                const query = formData.get('query')?.toString() || '';
                if (query) {
                    redirect(`?query=${encodeURIComponent(query)}`);
                }
            }}
            className="flex w-full max-w-lg mx-auto gap-2"
        >
            <Input
                name="query"
                placeholder="Search stocks, news, companies..."
                defaultValue={initialQuery}
                className="flex-1"
            />
            <Button type="submit">
                <Search className="h-4 w-4 mr-2"/>
                Search
            </Button>
        </form>
    );
}

export default SearchBar