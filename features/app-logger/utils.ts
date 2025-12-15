export function formatLogTime(logTime: string) {
    const dateTime = new Date(logTime);
    const formatted = dateTime.toLocaleString("en-US", { timeZone: "America/Chicago" });
    return formatted;
}