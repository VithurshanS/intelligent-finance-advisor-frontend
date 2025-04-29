'use client';

import {OverallRiskResponse} from '../_utils/definitions';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {AlertCircle, ShieldAlert} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';

interface OverallRiskSectionProps {
    loading: boolean;
    error: string | null;
    overallRisk: OverallRiskResponse | null;
}

const OverallRiskSection = ({
                                loading,
                                error,
                                overallRisk
                            }: OverallRiskSectionProps) => {

    const getRiskColor = (score: number | null | undefined) => {
        if (score === null || score === undefined) return 'bg-gray-200';
        return score >= 7 ? 'bg-red-500' : score >= 4 ? 'bg-yellow-500' : 'bg-green-500';
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldAlert size={18}/>
                Overall Risk Assessment
            </h3>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex items-center justify-center p-6">
                    <div className="space-y-4 w-full max-w-xl">
                        <Skeleton className="h-6 w-full"/>
                        <Skeleton className="h-4 w-5/6"/>
                        <Skeleton className="h-8 w-3/4"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-12 w-full"/>
                            <Skeleton className="h-12 w-full"/>
                        </div>
                    </div>
                </div>
            ) : overallRisk?.overall_risk_score !== undefined && overallRisk?.risk_level ? (
                <Card>
                    <CardHeader className={`pb-2 ${
                        overallRisk.risk_level === 'High' ? 'border-l-4 border-red-500' :
                            overallRisk.risk_level === 'Medium' ? 'border-l-4 border-yellow-500' :
                                'border-l-4 border-green-500'
                    }`}>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Risk Level: {overallRisk.risk_level}</CardTitle>
                            <Badge className={getRiskColor(overallRisk.overall_risk_score)}
                                   className="text-lg px-3 py-1">
                                {overallRisk.overall_risk_score.toFixed(1)}/10
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-4">
                            {overallRisk.components && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* News Sentiment Component */}
                                    {overallRisk.components.news_sentiment?.score !== undefined && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">News & Sentiment</span>
                                                <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Weight: {overallRisk.components.news_sentiment.weight || 0}
                          </span>
                                                    <span className="text-sm">
                            {overallRisk.components.news_sentiment.score.toFixed(1)}
                          </span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={overallRisk.components.news_sentiment.score * 10}
                                                className={getRiskColor(overallRisk.components.news_sentiment.score)}
                                            />
                                        </div>
                                    )}

                                    {/* Quantitative Risk Component */}
                                    {overallRisk.components.quant_risk?.score !== undefined && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Quantitative Metrics</span>
                                                <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Weight: {overallRisk.components.quant_risk.weight || 0}
                          </span>
                                                    <span className="text-sm">
                            {overallRisk.components.quant_risk.score.toFixed(1)}
                          </span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={overallRisk.components.quant_risk.score * 10}
                                                className={getRiskColor(overallRisk.components.quant_risk.score)}
                                            />
                                        </div>
                                    )}

                                    {/* ESG Risk Component */}
                                    {overallRisk.components.esg_risk?.score !== undefined && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">ESG</span>
                                                <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Weight: {overallRisk.components.esg_risk.weight || 0}
                          </span>
                                                    <span className="text-sm">
                            {overallRisk.components.esg_risk.score.toFixed(1)}
                          </span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={overallRisk.components.esg_risk.score * 10}
                                                className={getRiskColor(overallRisk.components.esg_risk.score)}
                                            />
                                        </div>
                                    )}

                                    {/* Anomaly Detection Component */}
                                    {overallRisk.components.anomaly_detection?.score !== undefined && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Anomalies</span>
                                                <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            Weight: {overallRisk.components.anomaly_detection.weight || 0}
                          </span>
                                                    <span className="text-sm">
                            {overallRisk.components.anomaly_detection.score.toFixed(1)}
                          </span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={overallRisk.components.anomaly_detection.score * 10}
                                                className={getRiskColor(overallRisk.components.anomaly_detection.score)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="flex items-center justify-center p-6 border rounded-md">
                    <p className="text-muted-foreground">Overall risk assessment not available.</p>
                </div>
            )}
        </div>
    );
};

export default OverallRiskSection;