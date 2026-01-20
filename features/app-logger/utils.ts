import { LogLevel } from "./types";

export function formatLogTime(logTime: string) {
    const dateTime = new Date(logTime);
    const formatted = dateTime.toLocaleString("en-US", { timeZone: "America/Chicago" });
    return formatted;
}

export function parseJsonMessage(value: string): { isJson: boolean; formatted: string } {
    const trimmed = value.trim();

    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
        return { isJson: false, formatted: value };
    }

    try {
        const parsed = JSON.parse(trimmed);
        return { isJson: true, formatted: JSON.stringify(parsed, null, 2) };
    } 
    catch {
        return { isJson: false, formatted: value };
    }
};

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