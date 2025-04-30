'use client';

import {AnomalyDetectionResponse} from '../_utils/definitions';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {AlertCircle, AlertTriangle, Calendar, CircleAlert} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import RiskBadge from "@/app/(dashboard)/_components/RiskBadge";

interface AnomalySectionProps {
    loading: boolean;
    error: string | null;
    anomalyRisk: AnomalyDetectionResponse | null;
}

const AnomalySection = ({
                            loading,
                            error,
                            anomalyRisk
                        }: AnomalySectionProps) => {

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getSeverityBadge = (severity: number | null | undefined) => {
        if (!severity) return <Badge variant="outline">Unknown</Badge>;

        return <RiskBadge score={severity} showLabel={false}/>
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={18}/>
                Anomaly Detection
            </h3>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {loading ? (
                <Card>
                    <CardHeader>
                        <Skeleton className="h-4 w-2/3"/>
                        <Skeleton className="h-3 w-1/2"/>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full"/>
                            <Skeleton className="h-10 w-full"/>
                            <Skeleton className="h-10 w-full"/>
                        </div>
                    </CardContent>
                </Card>
            ) : anomalyRisk ? (
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-base">Anomaly Findings</CardTitle>
                            {anomalyRisk.anomaly_score !== undefined && anomalyRisk.anomaly_score !== null && (
                                <RiskBadge score={Number(anomalyRisk.anomaly_score.toFixed(1))}/>
                            )}
                        </div>
                        <CardDescription>
                            Unusual patterns or events that may indicate risk
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {anomalyRisk.flags && anomalyRisk.flags.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Severity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anomalyRisk.flags.map((flag, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">
                                                {flag.type || 'Unknown'}
                                            </TableCell>
                                            <TableCell className="flex items-center gap-1">
                                                <Calendar size={14}/>
                                                {flag.date ? formatDate(flag.date) : 'N/A'}
                                            </TableCell>
                                            <TableCell>{flag.description || 'No description available'}</TableCell>
                                            <TableCell>{getSeverityBadge(flag.severity)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex items-center justify-center p-6 text-center">
                                <div>
                                    <CircleAlert className="h-10 w-10 text-green-500 mx-auto mb-2"/>
                                    <p className="text-muted-foreground">No anomalies detected in the analyzed
                                        period.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="flex items-center justify-center p-6 border rounded-md">
                    <p className="text-muted-foreground">No anomaly detection data available.</p>
                </div>
            )}
        </div>
    );
};

export default AnomalySection;