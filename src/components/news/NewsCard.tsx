import { Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewsCardProps {
    title?: string;
    source?: string;
    date?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    url?: string;
}

export function NewsCard({
    title,
    source,
    date,
    description,
    imageUrl,
    category,
    url,
}: NewsCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg h-full">
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                {imageUrl && !imageError ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-secondary text-secondary-foreground">
                        <span className="text-4xl">📰</span>
                    </div>
                )}
                <Badge className="absolute top-2 right-2" variant="secondary">
                    {category}
                </Badge>
            </div>
            <CardHeader className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Badge variant="outline" className="rounded-sm font-normal">
                        {source}
                    </Badge>
                    <div className="flex items-center text-xs">
                        <Calendar className="mr-1 h-3 w-3" />
                        {date}
                    </div>
                </div>
                <CardTitle className="line-clamp-2 leading-tight">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {description}
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="ghost" className="w-full justify-between group" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
