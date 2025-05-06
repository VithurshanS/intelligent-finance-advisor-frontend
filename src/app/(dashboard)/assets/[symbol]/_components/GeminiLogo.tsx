import React from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeminiLogoProps {
    width?: number;
    height?: number;
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
                        className={`flex justify-center items-center cursor-pointer ${className}`}
                        style={{width, height}}
                    >
                        <motion.div
                            animate={{rotate: 360}}
                            transition={{
                                duration: 10,
                                ease: [0.22, 1, 0.36, 1],
                                repeat: Infinity,
                                repeatType: "loop",
                                times: [0, 0.3, 1],
                            }}
                        >
                            <Image
                                src="/google-gemini-icon.svg"
                                alt="Gemini Logo"
                                width={width}
                                height={height}
                                priority
                            />
                        </motion.div>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] text-center p-3 bg-muted" side="right">
                    <div>
                        <div className="font-semibold text-[0.9rem] text-primary mb-1">
                            Powered by Google {model}
                        </div>
                        <div className="text-[0.75rem] text-muted-foreground">
                            AI can make mistakes. Use with caution.
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default GeminiLogo;