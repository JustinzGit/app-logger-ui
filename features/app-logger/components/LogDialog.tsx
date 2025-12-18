'use client'

import { ILog } from "@/features/app-logger/types";
import { formatLogTime } from "@/features/app-logger/utils";

interface LogDialogProps {
    logs: ILog[];
    selectedIndex: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function LogDialog({ logs, selectedIndex, onClose, onNavigate }: LogDialogProps) {
    if (selectedIndex === null) return null;

    const currentLog = logs[selectedIndex];
    const totalLogs = logs.length;

    const handlePrevious = () => {
        if (selectedIndex > 0) {
            onNavigate(selectedIndex - 1);
        }
    };

    const handleNext = () => {
        if (selectedIndex < totalLogs - 1) {
            onNavigate(selectedIndex + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
    };

    const parseJsonMessage = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
            return { isJson: false, formatted: value };
        }

        try {
            const parsed = JSON.parse(trimmed);
            return { isJson: true, formatted: JSON.stringify(parsed, null, 2) };
        } catch {
            return { isJson: false, formatted: value };
        }
    };

    const { isJson: isJsonMessage, formatted: formattedMessage } = parseJsonMessage(currentLog.message);

    return (
        <div
            tabIndex={0}
            onClick={onClose}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-[80vw] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {currentLog.app}
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedIndex + 1} of {totalLogs}
                        </span>

                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Source Context</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white break-all">{currentLog.sourceContext || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Date Time</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatLogTime(currentLog.logTime)}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Server</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{currentLog.server}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Account</label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{currentLog.account || 'N/A'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Message</label>
                            <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                {isJsonMessage ? (
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => navigator.clipboard?.writeText(formattedMessage)}
                                                className="cursor-pointer text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 absolute top-2 right-2">
                                                COPY
                                            </button>
                                            <pre className="text-sm text-baylor-blue-100 dark:text-white whitespace-pre-wrap wrap-break-word font-mono bg-[#202124] dark:bg-gray-900 p-3 pr-12 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
                                                {formattedMessage}
                                            </pre>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap wrap-break-word">{currentLog.message}</p>
                                )}
                            </div>
                        </div>

                        {currentLog.exception && (
                            <div>
                                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Exception</label>
                                <pre className="mt-1 text-xs text-white dark:text-white bg-black dark:bg-gray-800 p-3 rounded overflow-x-auto">
                                    {currentLog.exception}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer with navigation */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handlePrevious}
                        disabled={selectedIndex === 0}
                        className="px-4 py-2 text-sm font-medium text-white bg-baylor-blue-400 rounded hover:bg-baylor-blue-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        ← Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={selectedIndex === totalLogs - 1}
                        className="px-4 py-2 text-sm font-medium text-white bg-baylor-blue-400 rounded hover:bg-baylor-blue-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next →
                    </button>
                </div>
            </div>
        </div>
    )
}
