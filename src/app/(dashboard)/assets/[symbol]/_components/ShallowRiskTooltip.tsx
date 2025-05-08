import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"
import {Info} from "lucide-react"

export function RiskScoreTooltip() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-primary cursor-pointer"/>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm text-sm leading-snug bg-popover text-popover-foreground">
                    <p>
                        <strong>Shallow Risk Score</strong> is a preliminary risk assessment on a 0–10 scale (10 =
                        highest risk),
                        using basic market indicators:
                    </p>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5">
                        <li><strong>Market Cap:</strong> Basic size evaluation</li>
                        <li><strong>Price Volatility:</strong> Recent price movement patterns</li>
                        <li><strong>Basic Ratios:</strong> Simplified P/E and debt metrics</li>
                        <li><strong>Market Beta:</strong> General market correlation</li>
                    </ul>
                    <p className="mt-1">
                        <em>Note:</em> Shallow risk provides a quick assessment with readily available data.
                        Advanced risk scores incorporate additional financial metrics, comprehensive historical
                        analysis,
                        and sector-specific risk factors.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}