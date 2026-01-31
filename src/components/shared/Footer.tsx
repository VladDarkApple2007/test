export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 px-4 md:h-24 md:flex-row md:py-0 md:px-6">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built for the Junior Frontend Developer Test Task.
                    </p>
                </div>
                <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} NewsAggregator
                </p>
            </div>
        </footer>
    );
}
