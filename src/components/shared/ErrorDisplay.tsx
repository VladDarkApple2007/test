import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
    error?: Error | null;
    message?: string;
    onRetry?: () => void;
}

export function ErrorDisplay({ error, message, onRetry }: ErrorDisplayProps) {
    const errorMessage = message || error?.message || "An unknown error occurred";

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-destructive/5 rounded-lg border border-destructive/20 mt-8">
            <AlertCircle className="h-10 w-10 text-destructive mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
                Something went wrong
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
                {errorMessage}
            </p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                </Button>
            )}
        </div>
    );
}
