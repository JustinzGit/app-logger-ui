'use client'

import { ILog, LogLevel } from "@/features/app-logger/types";
import { formatLogTime, levelConfig, parseJsonMessage } from "@/features/app-logger/utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface LogDialogProps {
    logs: ILog[];
    selectedIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function LogDialog({ logs, selectedIndex, onClose, onNavigate }: LogDialogProps) {
    const currentLog = logs[selectedIndex];
    const totalLogs = logs.length;

    const handlePrevious = () => {
        if (selectedIndex > 0) onNavigate(selectedIndex - 1);
    };

    const handleNext = () => {
        if (selectedIndex < totalLogs - 1) onNavigate(selectedIndex + 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
    };

    const { isJson: isJsonMessage, formatted: formattedMessage } = parseJsonMessage(currentLog.message);

    return (
        <div
            tabIndex={0}
            onClick={onClose}
            ref={(el) => el?.focus()}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-[80vw] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {currentLog.sourceContext || 'N/A'}
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {[
                                { label: 'Application', value: currentLog.app, title: currentLog.app },
                                { label: 'Date Time', value: formatLogTime(currentLog.logTime) },
                                { label: 'Server', value: currentLog.server, title: currentLog.server },
                                { label: 'Account', value: currentLog.account || 'N/A', title: currentLog.account || 'N/A' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="relative isolate flex flex-col items-center gap-1 rounded-lg border border-cyan-500/25 bg-slate-900 px-3 py-3 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.8)] text-gray-100">
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
                                        {item.label}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${item.label === 'Source Context' ? 'whitespace-pre-wrap break-all leading-snug text-center' : 'truncate'} text-gray-100`}
                                        title={item.title ?? item.value}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center gap-2">
                                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Message</label>
                                <div className="w-px h-4 bg-gray-400 dark:bg-gray-600"></div>
                                <span className={`font-semibold rounded-md px-2 py-0.5 text-xs ${levelConfig[currentLog.level as LogLevel]?.badgeColor}`}>
                                    {levelConfig[currentLog.level as LogLevel]?.label ?? currentLog.level}
                                </span>
                            </div>
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
                                            <pre className="text-sm text-cyan-200/90 dark:text-white whitespace-pre-wrap wrap-break-word font-mono bg-[#202124] dark:bg-gray-900 p-3 pr-12 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
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
                <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handlePrevious}
                        disabled={selectedIndex === 0}
                        className="cursor-pointer px-3 py-2 text-white bg-baylor-blue-400 rounded hover:bg-baylor-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={selectedIndex === totalLogs - 1}
                        className="cursor-pointer px-3 py-2 text-white bg-baylor-blue-400 rounded hover:bg-baylor-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}
