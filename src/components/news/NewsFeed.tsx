
import { useState, useMemo } from "react";
import { useNewsAggregator } from "@/hooks/useNewsAggregator";
import { NewsLoading } from "./NewsLoading";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";
import { NewsCard } from "./NewsCard";
import { FilterBar } from "./FilterBar";

import { Button } from "@/components/ui/button";

export function NewsFeed() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSource, setSelectedSource] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Use the new aggregator hook
    const { 
        articles, 
        isLoading, 
        error, 
        availableSources, 
        availableCategories,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useNewsAggregator(searchQuery);

    const filteredArticles = useMemo(() => {
        if (!articles) return [];

        return articles.filter((article) => {
            const matchesSource = selectedSource && selectedSource !== "all" ? article.source.name === selectedSource : true;
            const matchesCategory = selectedCategory && selectedCategory !== "all" ? article.category === selectedCategory : true;

            return matchesSource && matchesCategory;
        });
    }, [articles, selectedSource, selectedCategory]);

    if (isLoading) return <NewsLoading />;

    if (error) {
        return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-64 flex-shrink-0">
                <FilterBar 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedSource={selectedSource}
                    onSourceChange={setSelectedSource}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sources={availableSources}
                    categories={availableCategories}
                />
            </aside>

            <div className="flex-1">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold tracking-tight">Latest News</h1>
                    <p className="text-muted-foreground">
                        Showing {filteredArticles.length} results
                    </p>
                </div>

                {filteredArticles.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                            {filteredArticles.map((article, index) => (
                                <NewsCard
                                    key={`${article.url}-${index}`}
                                    title={article.title}
                                    source={article.source.name}
                                    date={new Date(article.publishedAt).toLocaleDateString()}
                                    description={article.description}
                                    imageUrl={article.urlToImage || undefined}
                                    category={article.category}
                                    url={article.url}
                                />
                            ))}
                        </div>

                        {hasNextPage && (
                            <div className="flex justify-center pb-8">
                                <Button 
                                    variant="secondary" 
                                    size="lg"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="min-w-[200px]"
                                >
                                    {isFetchingNextPage ? "Loading more..." : "Load More Articles"}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-dashed">
                        <h3 className="text-lg font-semibold">No articles found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters or search terms.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}