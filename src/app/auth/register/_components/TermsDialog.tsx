import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";

type TermsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAccept: () => void;
    onDecline: () => void;
};

export function TermsAndConditionsDialog({
                                             open,
                                             onOpenChange,
                                             onAccept,
                                             onDecline
                                         }: TermsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Privacy Policy & Terms of Service</DialogTitle>
                    <DialogDescription>
                        Please read and accept our terms before continuing
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4 text-sm">
                        <h3 className="font-semibold text-base">Terms and Conditions</h3>
                        <p>By using this platform, you agree to the following terms:</p>

                        <div className="space-y-3">
                            <div>
                                <h4 className="font-medium">1. Informational Use Only</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>The platform provides stock analysis, trends, and insights for informational
                                        purposes only.
                                    </li>
                                    <li>We do not guarantee profits or returns based on our recommendations.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">2. No Financial Guarantees</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>All financial data, forecasts, or recommendations shown are subject to change
                                        and not guaranteed.
                                    </li>
                                    <li>Users are responsible for making their own investment decisions.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">3. User Authentication Required</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>You must create an account and log in to access full features.</li>
                                    <li>You agree not to share your credentials or allow others to access your
                                        account.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">4. Prohibited Use of AI Bots or Automated Scripts</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>Automated logins, scraping, or bot-driven activity is strictly prohibited.</li>
                                    <li>Users caught using bots may have accounts suspended or banned.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">5. CAPTCHA and Human Verification</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>The platform may use CAPTCHA systems to verify that you are human.</li>
                                    <li>You must complete these verifications to access certain services.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">6. IP Address Tracking</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>Your IP address and device metadata may be collected and logged for security,
                                        fraud prevention, and analytics.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">7. Data Collection</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>We collect personal data including:</li>
                                    <ul className="list-circle pl-8 text-muted-foreground">
                                        <li>Email address</li>
                                        <li>Name</li>
                                        <li>Login timestamps</li>
                                        <li>Device (Login IP address)</li>
                                    </ul>
                                    <li>All data is stored securely and used only to operate and improve the service.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">8. Data Usage and Sharing</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>We do not sell or share your personal data with third-party advertisers.</li>
                                    <li>Your data may be shared with regulatory or legal authorities if required by
                                        law.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">9. Consent to Monitoring</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>You consent to us monitoring your use of the platform for security and
                                        compliance purposes.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">10. Platform Availability</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>The platform may experience downtime or service interruptions.</li>
                                    <li>We are not liable for any losses due to downtime or data inaccessibility.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">11. Account Termination</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>We reserve the right to suspend or terminate any account that violates these
                                        terms.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">12. Legal Jurisdiction</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>Any disputes will be governed by the applicable laws.</li>
                                    <li>By using the platform, you consent to jurisdiction in these courts.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">13. Changes to Terms</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>Terms and Privacy Policy may be updated at any time. If changed we will inform
                                        you for get the acceptance.
                                    </li>
                                    <li>Continued use of the platform implies acceptance of the updated terms.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium">14. Contact</h4>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    <li>For any questions about these terms, please contact:
                                        intellifinance.grouj@gmail.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={onDecline} className="sm:w-auto w-full">
                        Decline
                    </Button>
                    <Button onClick={onAccept} className="sm:w-auto w-full">
                        Accept Terms
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}