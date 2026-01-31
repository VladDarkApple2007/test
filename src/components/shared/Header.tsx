import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center space-x-2">
                    <Newspaper className="h-6 w-6" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        NewsAggregator
                    </span>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Link to="/">
                        <Button variant="ghost">Home</Button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
