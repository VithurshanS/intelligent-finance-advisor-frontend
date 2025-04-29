"use client";

// Status management component
import {Asset} from "../_utils/actions";
import {StockStatus} from "../_utils/definitions";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

// Handle status change (server action would go here in a real implementation)
const handleStatusChange = async (status: StockStatus) => {
    // This would call a server action to update the status
    console.log(`Changing status to ${status}`);
};

// Handle remove (server action would go here in a real implementation)
const handleRemove = async () => {
    // This would call a server action to remove the asset from DB
    console.log('Removing from DB');
};

const StatusManager = ({
                           asset,
                       }: {
    asset: Asset;
}) => {
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (status: StockStatus) => {
        setLoading(true);
        await handleStatusChange(status);
        setLoading(false);
    };

    const handleRemove = async () => {
        setLoading(true);
        await handleRemove();
        setLoading(false);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Select
                disabled={loading}
                onValueChange={(value) => handleStatusChange(value as StockStatus)}
                defaultValue={asset.db?.status || undefined}
            >
                <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Change Status"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="WARNING">WARNING</SelectItem>
                    <SelectItem value="BLACKLIST">BLACKLIST</SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={loading}
                className="flex items-center gap-2"
            >
                <Trash2 className="w-4 h-4"/> Remove from DB
            </Button>
        </div>
    );
};

export default StatusManager;