'use client';

import {QuantRiskResponse, EsgRiskResponse} from '../_utils/definitions';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {AlertCircle, TrendingUp, Leaf, Users, BarChart3} from 'lucide-react';
import {Progress} from '@/components/ui/progress';
import RiskBadge from "@/app/(dashboard)/_components/RiskBadge";
import GeminiLogo from "@/app/(dashboard)/assets/[symbol]/_components/GeminiLogo";

interface QuantEsgSectionProps {
    loadingQuant: boolean;
    loadingEsg: boolean;
    errorQuant: string | null;
    errorEsg: string | null;
    quantRisk: QuantRiskResponse | null;
    esgRisk: EsgRiskResponse | null;
}

const QuantEsgSection = ({
                             loadingQuant,
                             loadingEsg,
                             errorQuant,
                             errorEsg,
                             quantRisk,
                             esgRisk
                         }: QuantEsgSectionProps) => {

    // Helper function to determine color based on risk level
    const getRiskColor = (value: number | null | undefined, reverse: boolean = false) => {
        if (value === null || value === undefined) return 'bg-gray-200';

        const threshold = reverse ?
            {low: 7, medium: 3} :
            {low: 3, medium: 7};

        if (reverse) {
            return value > threshold.low ? 'bg-green-500 dark:bg-green-600' :
                value > threshold.medium ? 'bg-yellow-500 dark:bg-yellow-600'
                    : 'bg-red-500 dark:bg-red-600';
        } else {
            return value < threshold.low ? 'bg-green-500 dark:bg-green-600' :
                value < threshold.medium ? 'bg-yellow-500 dark:bg-yellow-600'
                    : 'bg-red-500 dark:bg-red-600';
        }
    };

    // Calculate ESG progress percentage (each score is out of 10, total is out of 30)
    const calculateEsgProgress = (score: number | null | undefined, isTotal: boolean = false): number => {
        if (score === null || score === undefined) return 0;

        // For total ESG, max value is 30
        const maxValue = isTotal ? 30 : 10;

        // Direct percentage (higher score = higher progress = higher risk)
        const percentage = (score / maxValue) * 100;

        return Math.min(Math.max(percentage, 0), 100);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantitative Risk Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={18}/>
                    Quantitative Risk
                </h3>

                {errorQuant && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorQuant}</AlertDescription>
                    </Alert>
                )}

                {loadingQuant ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full"/>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : quantRisk ? (
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-base">Risk Metrics</CardTitle>
                                {quantRisk.risk_metrics?.quant_risk_score !== undefined &&
                                    quantRisk.risk_metrics?.quant_risk_score !== null && (
                                        <RiskBadge score={Number(quantRisk.risk_metrics.quant_risk_score.toFixed(1))}/>
                                    )}
                            </div>
                            <CardDescription>
                                {quantRisk.risk_label || 'Quantitative risk assessment'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Volatility */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Volatility</span>
                                        <span className="text-sm">
                                            {quantRisk.volatility !== undefined && quantRisk.volatility !== null
                                                ? quantRisk.volatility.toFixed(2)
                                                : 'N/A'}
                                            {quantRisk.risk_metrics?.volatility_score !== undefined &&
                                                quantRisk.risk_metrics?.volatility_score !== null && (
                                                    <span className="ml-2 text-xs">
                                                        (Risk: {quantRisk.risk_metrics.volatility_score.toFixed(1)})
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                    <Progress
                                        value={quantRisk.risk_metrics?.volatility_score !== undefined &&
                                        quantRisk.risk_metrics?.volatility_score !== null
                                            ? Math.min(quantRisk.risk_metrics.volatility_score * 10, 100)
                                            : 0}
                                        className={getRiskColor(quantRisk.risk_metrics?.volatility_score)}
                                    />
                                </div>

                                {/* Beta */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Beta</span>
                                        <span className="text-sm">
                                            {quantRisk.beta !== undefined && quantRisk.beta !== null
                                                ? quantRisk.beta.toFixed(2)
                                                : 'N/A'}
                                            {quantRisk.risk_metrics?.beta_score !== undefined &&
                                                quantRisk.risk_metrics?.beta_score !== null && (
                                                    <span className="ml-2 text-xs">
                                                        (Risk: {quantRisk.risk_metrics.beta_score.toFixed(1)})
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                    <Progress
                                        value={quantRisk.risk_metrics?.beta_score !== undefined &&
                                        quantRisk.risk_metrics?.beta_score !== null
                                            ? Math.min(quantRisk.risk_metrics.beta_score * 10, 100)
                                            : 0}
                                        className={getRiskColor(quantRisk.risk_metrics?.beta_score)}
                                    />
                                </div>

                                {/* RSI */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">RSI</span>
                                        <span className="text-sm">
                                            {quantRisk.rsi !== undefined && quantRisk.rsi !== null
                                                ? quantRisk.rsi.toFixed(2)
                                                : 'N/A'}
                                            {quantRisk.risk_metrics?.rsi_risk !== undefined &&
                                                quantRisk.risk_metrics?.rsi_risk !== null && (
                                                    <span className="ml-2 text-xs">
                                                        (Risk: {quantRisk.risk_metrics.rsi_risk.toFixed(1)})
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                    <Progress
                                        value={quantRisk.risk_metrics?.rsi_risk !== undefined &&
                                        quantRisk.risk_metrics?.rsi_risk !== null
                                            ? Math.min(quantRisk.risk_metrics.rsi_risk * 10, 100)
                                            : 0}
                                        className={getRiskColor(quantRisk.risk_metrics?.rsi_risk)}
                                    />
                                </div>

                                {/* Volume Change */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Volume Change</span>
                                        <span className="text-sm">
                                            {quantRisk.volume_change_percent !== undefined && quantRisk.volume_change_percent !== null
                                                ? `${(quantRisk.volume_change_percent * 100).toFixed(2)}%`
                                                : 'N/A'}
                                            {quantRisk.risk_metrics?.volume_risk !== undefined &&
                                                quantRisk.risk_metrics?.volume_risk !== null && (
                                                    <span className="ml-2 text-xs">
                                                        (Risk: {quantRisk.risk_metrics.volume_risk.toFixed(1)})
                                                    </span>
                                                )}
                                        </span>
                                    </div>
                                    <Progress
                                        value={quantRisk.risk_metrics?.volume_risk !== undefined &&
                                        quantRisk.risk_metrics?.volume_risk !== null
                                            ? Math.min(quantRisk.risk_metrics.volume_risk * 10, 100)
                                            : 0}
                                        className={getRiskColor(quantRisk.risk_metrics?.volume_risk)}
                                    />
                                </div>

                                {/* Debt to Equity */}
                                {quantRisk.debt_to_equity !== undefined && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Debt to Equity</span>
                                            <span className="text-sm">
                                                {quantRisk.debt_to_equity !== null
                                                    ? quantRisk.debt_to_equity.toFixed(2)
                                                    : 'N/A'}
                                                {quantRisk.risk_metrics?.debt_risk !== undefined &&
                                                    quantRisk.risk_metrics?.debt_risk !== null && (
                                                        <span className="ml-2 text-xs">
                                                            (Risk: {quantRisk.risk_metrics.debt_risk.toFixed(1)})
                                                        </span>
                                                    )}
                                            </span>
                                        </div>
                                        <Progress
                                            value={quantRisk.risk_metrics?.debt_risk !== undefined &&
                                            quantRisk.risk_metrics?.debt_risk !== null
                                                ? Math.min(quantRisk.risk_metrics.debt_risk * 10, 100)
                                                : 0}
                                            className={getRiskColor(quantRisk.risk_metrics?.debt_risk)}
                                        />
                                    </div>
                                )}

                                {/* EPS Risk - Added based on interface */}
                                {quantRisk.risk_metrics?.eps_risk !== undefined &&
                                    quantRisk.risk_metrics?.eps_risk !== null && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Earnings Risk</span>
                                                <span className="text-sm">
                                                    {quantRisk.risk_metrics.eps_risk.toFixed(2)}
                                                </span>
                                            </div>
                                            <Progress
                                                value={Math.min(quantRisk.risk_metrics.eps_risk * 10, 100)}
                                                className={getRiskColor(quantRisk.risk_metrics.eps_risk)}
                                            />
                                        </div>
                                    )}

                                {quantRisk.risk_explanation && (
                                    <div className="mt-4 text-sm">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            Risk Analysis:
                                            <GeminiLogo width="1.4rem" height="1.4rem" model={"Gemini 2.0 Lite"}/>
                                        </h4>
                                        <p className="text-muted-foreground">{quantRisk.risk_explanation}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex items-center justify-center p-6 border rounded-md">
                        <p className="text-muted-foreground">No quantitative risk data available.</p>
                    </div>
                )}
            </div>

            {/* ESG Risk Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Leaf size={18}/>
                    ESG Risk
                </h3>

                {errorEsg && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorEsg}</AlertDescription>
                    </Alert>
                )}

                {loadingEsg ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-full"/>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-24"/>
                                        <Skeleton className="h-3 w-12"/>
                                    </div>
                                    <Skeleton className="h-2 w-full"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : esgRisk ? (
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-base">ESG Metrics</CardTitle>
                                {esgRisk.esg_risk_score !== undefined && esgRisk.esg_risk_score !== null && (
                                    <RiskBadge score={Number(esgRisk.esg_risk_score.toFixed(1))}/>
                                )}
                            </div>
                            <CardDescription>
                                Environmental, Social, and Governance factors
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Total ESG Score */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total ESG Score</span>
                                        <span className="text-sm">
                                            {esgRisk.total_esg !== undefined && esgRisk.total_esg !== null
                                                ? esgRisk.total_esg.toFixed(1)
                                                : 'N/A'}{' '}
                                            <span className="text-xs text-muted-foreground">/30</span>
                                        </span>
                                    </div>
                                    <Progress
                                        value={calculateEsgProgress(esgRisk.total_esg, true)}
                                        className={getRiskColor(esgRisk.total_esg !== undefined && esgRisk.total_esg !== null
                                            ? esgRisk.total_esg / 3 : undefined)}
                                    />
                                </div>

                                {/* Environmental */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium flex items-center gap-1">
                                            <Leaf size={14}/>
                                            Environmental
                                        </span>
                                        <span className="text-sm">
                                            {esgRisk.environmental_score !== undefined && esgRisk.environmental_score !== null
                                                ? esgRisk.environmental_score.toFixed(1)
                                                : 'N/A'}{' '}
                                            <span className="text-xs text-muted-foreground">/10</span>
                                        </span>
                                    </div>
                                    <Progress
                                        value={calculateEsgProgress(esgRisk.environmental_score)}
                                        className={getRiskColor(esgRisk.environmental_score)}
                                    />
                                </div>

                                {/* Social */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium flex items-center gap-1">
                                            <Users size={14}/>
                                            Social
                                        </span>
                                        <span className="text-sm">
                                            {esgRisk.social_score !== undefined && esgRisk.social_score !== null
                                                ? esgRisk.social_score.toFixed(1)
                                                : 'N/A'}{' '}
                                            <span className="text-xs text-muted-foreground">/10</span>
                                        </span>
                                    </div>
                                    <Progress
                                        value={calculateEsgProgress(esgRisk.social_score)}
                                        className={getRiskColor(esgRisk.social_score)}
                                    />
                                </div>

                                {/* Governance */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium flex items-center gap-1">
                                            <BarChart3 size={14}/>
                                            Governance
                                        </span>
                                        <span className="text-sm">
                                            {esgRisk.governance_score !== undefined && esgRisk.governance_score !== null
                                                ? esgRisk.governance_score.toFixed(1)
                                                : 'N/A'}{' '}
                                            <span className="text-xs text-muted-foreground">/10</span>
                                        </span>
                                    </div>
                                    <Progress
                                        value={calculateEsgProgress(esgRisk.governance_score)}
                                        className={getRiskColor(esgRisk.governance_score)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex items-center justify-center p-6 border rounded-md">
                        <p className="text-muted-foreground">No ESG risk data available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuantEsgSection;