'use client';

import {NewsArticle, SentimentAnalysisResponse} from '../_utils/definitions';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {AlertCircle, ExternalLink, Clock, Newspaper, Rss, ScanText} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import GeminiLogo from './GeminiLogo'
import {formatDistanceToNow, parseISO} from 'date-fns';


interface NewsSectionProps {
    loadingNews: boolean;
    loadingSentiment: boolean;
    errorNews: string | null;
    errorSentiment: string | null;
    newsArticles: NewsArticle[];
    newsSentiment: SentimentAnalysisResponse | null;
}

const NewsSection = ({
                         loadingNews,
                         loadingSentiment,
                         errorNews,
                         errorSentiment,
                         newsArticles,
                         newsSentiment
                     }: NewsSectionProps) => {
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Unknown date';
        try {
            const date = parseISO(dateString);
            return formatDistanceToNow(date, {addSuffix: true});
        } catch (error) {
            console.error('Error parsing date:', error);
            return 'Invalid date';
        }
    };

    // Sort news articles by publish date in descending order
    const sortedNewsArticles = newsArticles?.sort((a, b) => {
        const dateA = new Date(a.publish_date || 0);
        const dateB = new Date(b.publish_date || 0);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News Articles Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Rss size={18}/> News Articles</h3>

                {errorNews && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorNews}</AlertDescription>
                    </Alert>
                )}

                {loadingNews ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="overflow-hidden">
                                <CardHeader className="p-4 pb-2">
                                    <Skeleton className="h-4 w-5/6 mb-2"/>
                                    <Skeleton className="h-3 w-1/3"/>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <Skeleton className="h-16 w-full"/>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : sortedNewsArticles && sortedNewsArticles.length > 0 ? (
                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                        {sortedNewsArticles.map((article, idx) => (
                            <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
                                <div className="flex">
                                    <div className="flex-1">
                                        <CardHeader className="p-4 pb-2 class flex items-start gap-3">
                                            {article.thumbnail_url && (
                                                <div className="w-24 h-24 p-3 flex-shrink-0">
                                                    <div className="relative w-full h-full">
                                                        <Image
                                                            src={article.thumbnail_url}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover rounded-md"
                                                            sizes="(max-width: 768px) 96px, 96px"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <CardTitle className="text-base">
                                                        <Link href={article.canonical_url || '#'} target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="hover:text-blue-600 flex items-start gap-1">
                                                            {article.title}
                                                            <ExternalLink size={16}
                                                                          className="shrink-0 text-blue-600 hover:text-blue-800"/>
                                                        </Link>
                                                    </CardTitle>
                                                </div>
                                                <div
                                                    className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                    {article.provider_name && (
                                                        <span className="flex items-center gap-1">
                                                            <Newspaper size={12}/>
                                                            {article.provider_name}
                                                        </span>
                                                    )}
                                                    {article.publish_date && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12}/>
                                                            {formatDate(article.publish_date)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-2">
                                            {article.summary && (
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {article.summary}
                                                </p>
                                            )}
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-6 border rounded-md">
                        <p className="text-muted-foreground">No news articles found.</p>
                    </div>
                )}
            </div>

            {/* News Sentiment Analysis Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ScanText size={18}/>
                    Sentiment Analysis
                    <GeminiLogo width="1.4rem" height="1.4rem"/>
                </h3>

                {errorSentiment && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorSentiment}</AlertDescription>
                    </Alert>
                )}

                {loadingSentiment ? (
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-4 w-2/3"/>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-5/6"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : newsSentiment ? (
                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">Security Assessment</CardTitle>
                                    <Badge className={`
                                            ${newsSentiment.stability_label === 'High Risk' ? 'bg-red-500 text-white dark:bg-red-900 dark:text-red-300' :
                                        newsSentiment.stability_label === 'Moderate Risk' ? 'bg-orange-500 text-white dark:bg-orange-900 dark:text-orange-300' :
                                            newsSentiment.stability_label === 'Slight Risk' ? 'bg-yellow-500 text-white dark:bg-yellow-900 dark:text-yellow-300' :
                                                newsSentiment.stability_label === 'Stable' ? 'bg-green-500 text-white dark:bg-green-900 dark:text-green-300' : 'bg-gray-500 text-white dark:bg-gray-900 dark:text-gray-300'}
                                            `}>
                                        {newsSentiment.stability_label}
                                    </Badge>
                                </div>
                                <CardDescription className={'flex items-center gap-1'}>
                                    Stability Score: {newsSentiment.stability_score !== undefined ?
                                    newsSentiment.stability_score.toFixed(1) : 'N/A'}/10
                                    {newsSentiment.updated_at && (
                                        <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                                            <Clock size={12}/>
                                            Updated {formatDate(newsSentiment.updated_at)}
                                        </span>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm mb-4">{newsSentiment.security_assessment}</p>
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium mb-2">Key Risk Factors:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {newsSentiment.key_risks?.legal_risks && newsSentiment.key_risks.legal_risks.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-red-600">Legal Risks:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.legal_risks.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {newsSentiment.key_risks?.governance_risks && newsSentiment.key_risks.governance_risks.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-orange-600">Governance Risks:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.governance_risks.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {newsSentiment.key_risks?.operational_risks && newsSentiment.key_risks.operational_risks.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-yellow-600">Operational
                                                    Risks:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.operational_risks.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {newsSentiment.key_risks?.financial_stability_issues && newsSentiment.key_risks.financial_stability_issues.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-blue-600">Financial
                                                    Stability:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.financial_stability_issues.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {newsSentiment.key_risks?.fraud_indicators && newsSentiment.key_risks.fraud_indicators.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-purple-600">Fraud Indicators:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.fraud_indicators.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {newsSentiment.key_risks?.political_exposure && newsSentiment.key_risks.political_exposure.length > 0 && (
                                            <div>
                                                <p className="text-xs font-medium text-amber-600">Political
                                                    Exposure:</p>
                                                <ul className="text-xs list-disc pl-4">
                                                    {newsSentiment.key_risks.political_exposure.map((risk, idx) => (
                                                        <li key={idx}>{risk}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs grid grid-cols-2 gap-4">
                                    <div className={'flex flex-row gap-2 items-center'}>
                                        <p className="font-medium">Customer Suitability:</p>
                                        <Badge variant={
                                            newsSentiment.customer_suitability === 'Unsuitable' ? 'destructive' :
                                                newsSentiment.customer_suitability === 'Cautious Inclusion' ? 'outline' : 'default'
                                        }>
                                            {newsSentiment.customer_suitability}
                                        </Badge>
                                    </div>

                                    <div className={'flex flex-row gap-2 items-center'}>
                                        <p className="font-medium">Suggested Action:</p>
                                        <Badge variant={
                                            newsSentiment.suggested_action === 'Immediate Action Required' ? 'destructive' :
                                                newsSentiment.suggested_action === 'Flag for Removal' ? 'destructive' :
                                                    newsSentiment.suggested_action === 'Flag for Review' ? 'outline' :
                                                        newsSentiment.suggested_action === 'Review' ? 'outline' : 'default'
                                        }>
                                            {newsSentiment.suggested_action}
                                        </Badge>
                                    </div>
                                </div>

                                {newsSentiment.news_highlights && newsSentiment.news_highlights.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium mb-2">Key News Highlights:</h4>
                                        <ul className="text-xs list-disc pl-4">
                                            {newsSentiment.news_highlights.map((highlight, idx) => (
                                                <li key={idx}>{highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {newsSentiment.risk_rationale && newsSentiment.risk_rationale.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium mb-2">Risk Rationale:</h4>
                                        <ul className="text-xs list-disc pl-4">
                                            {newsSentiment.risk_rationale.map((rationale, idx) => (
                                                <li key={idx}>{rationale}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {newsSentiment.risk_score !== undefined && (
                                    <div className="mt-4">
                                        <p className="text-xs font-medium">
                                            Risk Score: {newsSentiment.risk_score.toFixed(1)}/10
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-6 border rounded-md">
                        <p className="text-muted-foreground">No sentiment analysis available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsSection;