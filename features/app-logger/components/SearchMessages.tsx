'use client'

import { useEffect, useState } from 'react';

interface SearchMessagesProps {
    isPending: boolean;
}

const PROCESSING_MESSAGES = [
    "🤐 No AI to see here...",
    "👻 These aren't the logs you're looking for...",
    "😬 Oh jeez, what's broken?...",
    "🧬 Baylor Genetics huh? Nice place ya got here...",
    "📊 How many apps you guys got?...",
    "⏳ This is taking a while...",
    "🔍 Still searching the void...",
    "💻 Turning it off and on again...",
    "🎯 Almost there... maybe...",
    "🐌 Slow and steady wins the race...",
    "🧠 Using all my brain cells here...",
    "⚡ Generating sparks...",
    "🎭 This is fine...",
    "😴 Definitely not sleeping...",
    "🎸 Playing sick beats while I search...",
    "📧 Getting that answer to Andrew for you...",
    "🙄 It's always SLIMS...",
    "👀 You're checking the logs right?...",
    "🧬 I got this...it's in my genes 😉...",
    "🌙 Sorry I don't have a dark mode yet...",
    "🎫 Just send it to GT Support...",
    "⭐ If I had to story point you, you'd be a ten 😉...",
    "☕ One more coffee and I'll find it...",
    "🐛 Not a bug, it's a feature!...",
    "📝 Debugging is like being a detective...",
    "⌨️ Ctrl+Alt+Find your logs...",
    "🖱️ Clicking faster won't make it go faster...",
    "💾 Saving the day... slowly...",
    "📡 Transmitting thoughts into the void...",
    "🔐 Nobody will ever know what went wrong...",
    "👨‍💻 Stack overflow? More like stack of logs!...",
    "🤖 I'm not a real AI... yet...",
    "🔧 Have you tried a hard refresh?...",
];

export function SearchMessages({ isPending }: SearchMessagesProps) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [shouldShow, setShouldShow] = useState(false);

    // Set random initial message when search starts
    useEffect(() => {
        if (isPending) {
            setShouldShow(true);
            setMessageIndex(Math.floor(Math.random() * PROCESSING_MESSAGES.length));
            setDisplayedText('');
        } else {
            // Delay hiding for 1 second after isPending becomes false
            const hideTimeout = setTimeout(() => {
                setShouldShow(false);
            }, 1000);
            return () => clearTimeout(hideTimeout);
        }
    }, [isPending]);

    // Typewriter effect
    useEffect(() => {
        if (!isPending) {
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
                }, 2000);
                clearInterval(typeInterval);
            }
        }, 25);

        return () => clearInterval(typeInterval);
    }, [isPending, messageIndex]);

    if (!shouldShow) return null;

    return (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-md min-h-12 flex items-center">
            <div className="text-sm text-baylor-blue-400 dark:text-white font-mono">
                {displayedText}
                <span className="animate-blink">▌</span>
            </div>
        </div>
    );
}
