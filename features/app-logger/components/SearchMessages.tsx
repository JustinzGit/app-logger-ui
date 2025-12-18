'use client'

import { useEffect, useState } from 'react';

interface SearchMessagesProps {
    isPending: boolean;
}

const PROCESSING_MESSAGES = [
    "🔬 Analyzing logs for patterns...",
    "🧬 Cross-referencing genetic markers...",
    "⚛️ Quantum tunneling through data...",
    "🧪 Running CRISPR analysis...",
    "📊 Calculating probability curves...",
    "🔍 Searching for the meaning of logs...",
    "💡 Decoding the universe one log at a time...",
    "🚀 Launching into the log stratosphere...",
    "🎯 Pinpointing the exact moment everything made sense...",
    "⏰ Rewinding the spacetime log continuum...",
];

export function SearchMessages({ isPending }: SearchMessagesProps) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    // Set random initial message when search starts
    useEffect(() => {
        if (isPending) {
            setMessageIndex(Math.floor(Math.random() * PROCESSING_MESSAGES.length));
            setDisplayedText('');
        }
    }, [isPending]);

    // Typewriter effect
    useEffect(() => {
        if (!isPending) {
            setDisplayedText('');
            return;
        }

        const currentMessage = PROCESSING_MESSAGES[messageIndex];
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < currentMessage.length) {
                setDisplayedText(currentMessage.substring(0, charIndex + 1));
                charIndex++;
            } else {
                // Message complete, move to next random message after a delay
                setTimeout(() => {
                    setMessageIndex(Math.floor(Math.random() * PROCESSING_MESSAGES.length));
                    setDisplayedText('');
                }, 1500);
                clearInterval(typeInterval);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [isPending, messageIndex]);

    if (!isPending) return null;

    return (
        <div className="mt-4 p-4 bg-linear-to-r from-baylor-blue-100/10 to-transparent rounded-md min-h-12 flex items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                {displayedText}
                <span className="animate-blink">▌</span>
            </div>
        </div>
    );
}
