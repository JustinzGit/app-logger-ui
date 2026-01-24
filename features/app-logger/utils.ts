import { LogLevel } from "./types";

export function formatLogTime(logTime: string) {
    const dateTime = new Date(logTime);
    const formatted = dateTime.toLocaleString("en-US", { timeZone: "America/Chicago" });
    return formatted;
}

export function extractJsonFromMessage(message: string): { text: string; json: string | null } {
    const trimmed = message.trim();
    
    let match;
    const bracketIndex = trimmed.indexOf('[');
    const braceIndex = trimmed.indexOf('{');
    
    if (bracketIndex !== -1 && (braceIndex === -1 || bracketIndex < braceIndex)) {
        match = trimmed.match(/\[\s*\{[\s\S]*\]/);
    } 
    else if (braceIndex !== -1) {
        match = trimmed.match(/\{[\s\S]*\}/);
    }
    else {
        match = trimmed.match(/\[\s*\{[\s\S]*\]/) || trimmed.match(/\{[\s\S]*\}/);
    }
    
    if (match) {
        try {
            const parsed = JSON.parse(match[0]);
            const formatted = JSON.stringify(parsed, null, 2);
            return { text: message, json: formatted };
        } 
        catch {
            return { text: message, json: null };
        }
    }
    return { text: message, json: null };
}

export function parseDateTime(datetime: string | null): { date: string; time: string } | null {
    if (!datetime) return null;
    const parts = datetime.split('T');
    if (parts.length !== 2) return null;
    const date = parts[0];
    const time = parts[1].substring(0, 5); 
    return { date, time };
}

export const levelConfig: Record<LogLevel, { label: string; badgeColor: string }> = {
    Debug: {
        label: "DEBUG",
        badgeColor: "text-orange-700 bg-orange-100 dark:bg-orange-400/10 dark:text-orange-400",
    },
    Information: {
        label: "INFO",
        badgeColor: "text-blue-700 bg-blue-100 dark:bg-blue-400/10 dark:text-blue-400",
    },
    Warning: {
        label: "WARN",
        badgeColor: "text-yellow-700 bg-yellow-100 dark:bg-yellow-400/10 dark:text-yellow-400",
    },
    Error: {
        label: "ERROR",
        badgeColor: "text-red-700 bg-red-100 dark:bg-red-400/10 dark:text-red-400",
    },
};