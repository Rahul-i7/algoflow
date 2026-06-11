"use client"
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between py-2 px-6 border-b border-border-primary bg-bg-primary/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <BarChart3 size={16} className="text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-text-primary tracking-tight">
                        Algo<span className="text-primary">Flow</span>
                    </h1>
                </Link>
                <nav className="flex items-center gap-1">
                    <Link
                        href="/sorting"
                        className="text-sm font-medium text-text-secondary hover:text-primary px-3 py-1.5 rounded-md hover:bg-primary-muted transition-colors"
                    >
                        Sorting
                    </Link>
                </nav>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle expand={false} />
            </div>
        </header>
    );
}