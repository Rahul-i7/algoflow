import Link from "next/link"

export default function Footer() {
    return(
        <footer className="flex items-center justify-between mt-5 py-6 px-10 border-t border-border-primary bg-bg-primary/80 backdrop-blur-md">
            <p className="text-xs text-text-tertiary">© 2026 AlgoFlow. All rights reserved.</p>
            <Link href="https://github.com/rahul-i7/AlgoFlow" target="_blank" className="text-xs text-text-tertiary">Github</Link>
        </footer>
    )
}