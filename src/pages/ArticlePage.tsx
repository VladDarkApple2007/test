import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ArticlePage() {
    const { id } = useParams();

    // Mock data fetching based on ID
    const article = {
        title: "Example News Headline That Is Quite Long and Engaging",
        source: "CNN",
        author: "Jane Doe",
        date: "2024-05-20",
        content: `
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p class="mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <h2 class="text-xl font-bold mt-6 mb-4">Key Takeaways</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Important point number one regarding the news story.</li>
        <li>Another crucial detail that adds context to the situation.</li>
        <li>Final observation and potential future implications.</li>
      </ul>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
        imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80",
        category: "Technology"
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link to="/">
                    <Button variant="ghost" size="sm" className="pl-0 gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Feed
                    </Button>
                </Link>
            </div>

            <article className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge>{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">{article.source}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                        {article.title} {id} (ID: {id})
                    </h1>

                    <div className="flex items-center justify-between border-y py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {article.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {article.date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div
                    className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}
