"use client"
import { motion, AnimatePresence } from "motion/react"
import { TerminalSquare, Trash2 } from "lucide-react"
import { useVisualizerStore } from "../../store/visualizerStore"
import { useEffect, useState, useRef } from "react"

type LogEntry = {
    id: number;
    timestamp: string;
    badge?: {
        text: string;
        type: 'active' | 'swapping' | 'sorted';
    };
    content: React.ReactNode;
}

export default function LiveLog() {
    const { events, currentStep } = useVisualizerStore()
    const [logs, setLogs] = useState<LogEntry[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (events.length === 0) {
            setLogs([])
            return;
        }

        setLogs(prevLogs => {
            let newLogs = [...prevLogs];
            
            if (currentStep === 0) {
                newLogs = [];
            } else if (currentStep < newLogs.length - 1) {
                newLogs = newLogs.slice(0, currentStep + 1);
            }
            
            for (let i = newLogs.length; i <= currentStep; i++) {
                const event = events[i];
                if (!event) continue;
                
                const now = new Date();
                const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
                
                let badge: LogEntry['badge'] = undefined;
                let content: React.ReactNode = event.message;

                if (event.type === 'compare') {
                    badge = { text: "COMPARE", type: 'active' }
                    content = <><span className="font-semibold text-comparing">Comparing</span> {event.message.replace(/^Comparing /i, '')}</>
                } else if (event.type === 'swap') {
                    badge = { text: "SWAP", type: 'swapping' }
                    content = <><span className="font-semibold text-swapping">Swapping</span> {event.message.replace(/^Swapping /i, '')}</>
                } else if (event.type === 'sorted') {
                     badge = { text: "SORTED", type: 'sorted' }
                     content = <>{event.message.replace("sorted", '')}<span className="font-semibold text-sorted">sorted</span></>
                }

                newLogs.push({
                    id: i,
                    timestamp,
                    badge,
                    content
                });
            }
            return newLogs;
        })
    }, [events, currentStep])

    // Auto-scroll to top (newest entries shown first)
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0
        }
    }, [logs.length])

    const clearLogs = () => {
        setLogs([])
    }

    const badgeStyles = {
        active: 'bg-comparing/15 text-comparing',
        swapping: 'bg-swapping/15 text-swapping',
        sorted: 'bg-sorted/15 text-sorted',
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 30, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 360 }}
            exit={{ opacity: 0, x: 30, width: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="bg-[#2c2c3a] rounded-xl border border-border-primary h-[calc(65vh+40px)] p-5 flex flex-col shrink-0 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <TerminalSquare strokeWidth={2.5} size={18} className="text-red-400" />
                    <h2 className="text-slate-100 font-bold text-base tracking-wide">Execution Log</h2>
                </div>
                {logs.length > 0 && (
                    <button
                        onClick={clearLogs}
                        className="flex items-center gap-1 text-text-tertiary hover:text-warning text-xs cursor-pointer transition-colors"
                    >
                        <Trash2 size={12} />
                        Clear
                    </button>
                )}
            </div>
            <p className="text-slate-400 font-semibold text-[10px] tracking-wider uppercase mb-3">
                Real-time status updates
            </p>
            
            <div className="border-t border-gray-600 mb-3" />

            <div ref={scrollRef} className="overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar flex-1">
                <AnimatePresence initial={false}>
                    {[...logs].reverse().map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-0.5"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-text-tertiary text-[10px] font-mono">{log.timestamp}</span>
                                {log.badge && (
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-wider ${badgeStyles[log.badge.type]}`}>
                                        {log.badge.text}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-300 text-[13px] leading-relaxed">
                                {log.content}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {logs.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-text-tertiary text-sm text-center">No execution logs yet.<br/>Start sorting!</p>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
