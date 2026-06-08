import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <div className="flex items-center justify-between py-1 px-7 border-b border-border-primary">
            <div>
                <h1 className="text-xl font-semibold text-text-primary">AlgoFlow</h1>
            </div>
            <div className="flex items-center gap-2 p-2">
                <ThemeToggle expand={false} />
            </div>
        </div>
    );
}