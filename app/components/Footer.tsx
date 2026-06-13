import Link from "next/link"

export default function Footer() {
    return(
        <footer className="flex flex-col sm:flex-row items-center justify-between mt-5 py-6 px-6 sm:px-10 gap-4 sm:gap-0 border-t border-border-primary bg-bg-primary/80 backdrop-blur-md">
            <p className="text-xs text-text-tertiary text-center sm:text-left">© 2026 AlgoFlow. All rights reserved.</p>
            <Link href="https://github.com/rahul-i7/algoflow" target="_blank" className="text-xs text-text-tertiary hover:text-primary transition-colors">Github</Link>
        </footer>
    )
}