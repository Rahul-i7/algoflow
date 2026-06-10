import { motion } from "motion/react"
import { TerminalSquare } from "lucide-react"
import { useVisualizerStore } from "../../store/visualizerStore"
import { useEffect, useState } from "react"

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
                    badge = { text: "COMPARING", type: 'active' }
                    content = <><span className="font-bold text-[#b4b4d5]">Comparing</span> {event.message.replace(/^Comparing /i, '')}</>
                } else if (event.type === 'swap') {
                    badge = { text: "SWAPPING", type: 'swapping' }
                    content = <><span className="font-bold text-[#e0a69a]">Swapping</span> {event.message.replace(/^Swapping /i, '')}</>
                } else if (event.type === 'sorted') {
                     badge = { text: "SORTED", type: 'sorted' }
                     content = <>{event.message.replace("sorted", '')}<span className="font-bold text-emerald-400/80">sorted</span></>
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

    return(
        <motion.div
            initial={{ opacity: 1, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 1, x: 50 }}   
            className="bg-[#303037] w-96 rounded-2xl h-[70vh] mt-5 p-6 flex flex-col shadow-lg border border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
                <TerminalSquare strokeWidth={2.5} size={22} className="text-[#f4a388]"/>
                <h2 className="text-slate-100 font-bold text-xl tracking-wide">Execution Log</h2>
            </div>
            <p className="text-slate-400/80 font-bold text-[10px] tracking-wider uppercase mb-4">Real-time status updates</p>
            
            <div className="border-t border-white/10 mb-4 w-full"></div>

            <div className="overflow-y-auto flex flex-col gap-5 pr-2 custom-scrollbar">
                {[...logs].reverse().map((log) => (
                    <div key={log.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <span className="text-[#c1866f] text-[11px] font-semibold tracking-wide">{log.timestamp}</span>
                            {log.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider ${
                                    log.badge.type === 'active' 
                                        ? 'bg-[#4f4f5a] text-[#b4b4d5]' 
                                        : log.badge.type === 'swapping'
                                            ? 'bg-[#523d40] text-[#e0a69a]'
                                            : 'bg-emerald-900/30 text-emerald-400/80'
                                }`}>
                                    {log.badge.text}
                                </span>
                            )}
                        </div>
                        <p className="text-slate-300 text-[14px] leading-relaxed">
                            {log.content}
                        </p>
                    </div>
                ))}
                {logs.length === 0 && (
                    <p className="text-slate-500 text-sm text-center mt-10">No execution logs yet. Start sorting!</p>
                )}
            </div>
        </motion.div>
    )
}
