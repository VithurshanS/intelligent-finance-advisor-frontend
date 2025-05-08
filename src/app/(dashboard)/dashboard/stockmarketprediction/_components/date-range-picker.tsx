"use client"

import {cn} from "@/lib/utils"
import {Input} from "@/components/ui/input";

interface DateRange {
    from: Date | null;
    to: Date | null;
}

interface DateRangePickerProps {
    date: DateRange;
    setDate: (date: DateRange) => void;
    className?: string;
}

export function DateRangePicker({date, setDate, className}: DateRangePickerProps) {
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value ? new Date(e.target.value) : null;
        setDate({...date, from: newDate});
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value ? new Date(e.target.value) : null;
        setDate({...date, to: newDate});
    };

    const formatForInput = (date: Date | null) => {
        return date ? date.toISOString().split('T')[0] : '';
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <div className="flex space-x-2 items-center">
                <div className="flex items-center gap-2">
                    <label htmlFor="date-from" className="text-sm mb-1">From</label>
                    <Input
                        id="date-from"
                        type="date"
                        value={formatForInput(date.from)}
                        onChange={handleFromChange}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        max={formatForInput(new Date())}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="date-to" className="text-sm mb-1">To</label>
                    <Input
                        id="date-to"
                        type="date"
                        value={formatForInput(date.to)}
                        onChange={handleToChange}
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                        max={formatForInput(new Date())}
                    />
                </div>
            </div>
        </div>
    )
}