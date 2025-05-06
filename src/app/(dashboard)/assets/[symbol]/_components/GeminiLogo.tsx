// GeminiLogoWithTooltip.tsx
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeminiLogoProps {
    width?: number | string;
    height?: number | string;
    className?: string;
    model?: string;
}

const GeminiLogo: React.FC<GeminiLogoProps> = ({
                                                   width = 100,
                                                   height = 100,
                                                   className = '',
                                                   model = 'Gemini',
                                               }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`gemini-logo-container ${className}`}
                        style={{width, height}}
                    >
                        <svg
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className="gemini-logo-svg"
                        >
                            <path
                                d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                                fill="url(#prefix__paint0_radial_980_20147)"
                                className="gemini-animated-path"
                            />
                            <defs>
                                <radialGradient
                                    id="prefix__paint0_radial_980_20147"
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                                >
                                    <stop offset=".067" stopColor="#9168C0"/>
                                    <stop offset=".343" stopColor="#5684D1"/>
                                    <stop offset=".672" stopColor="#1BA1E3"/>
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="gemini-tooltip-content" side={'right'}>
                    <div>
                        <div className="gemini-gradient-text">Powered by Google {model}</div>
                        <div className="gemini-caution-text">AI can make mistakes. Use with caution.</div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default GeminiLogo;