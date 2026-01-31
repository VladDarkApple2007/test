
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAllowSources, fetchTopics } from "@/api/cms";
import { fetchNews, type Article, type NewsResponse } from "@/api/newsService";
import { useMemo } from "react";

export function useNewsAggregator(searchQuery: string = "") {
    const { data: sourcesConfig, isLoading: isLoadingSources } = useQuery({
        queryKey: ["cms", "sources"],
        queryFn: fetchAllowSources,
        staleTime: 5 * 60 * 1000,
    });

    const { data: topicsConfig, isLoading: isLoadingTopics } = useQuery({
        queryKey: ["cms", "topics"],
        queryFn: fetchTopics,
        staleTime: 5 * 60 * 1000,
    });

    const allowedSourceIds = useMemo(() => {
        return sourcesConfig?.map((s) => s.apiId) || [];
    }, [sourcesConfig]);

    const {
        data: newsData,
        isLoading: isLoadingNews,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<NewsResponse, Error>({
        queryKey: ["news", allowedSourceIds, searchQuery],
        queryFn: ({ pageParam = 1 }) => fetchNews(allowedSourceIds, searchQuery, pageParam as number),
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.flatMap(p => p.articles).length;
            if (totalFetched < lastPage.totalResults) {
                return allPages.length + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        enabled: allowedSourceIds.length > 0 || !!searchQuery,
    });

    const articles = useMemo(() => {
        if (!newsData?.pages) return [];
        
        const allArticles = newsData.pages.flatMap(page => page.articles);

        if (!topicsConfig) return allArticles;

        return allArticles.map((article: Article) => {
            const textToAnalyze = `${article.title} ${article.description || ""}`.toLowerCase();
            
            const matchedTopic = topicsConfig.find((topic) => {
                return topic.keywords.some((keyword) => textToAnalyze.includes(keyword));
            });

            return {
                ...article,
                category: matchedTopic ? matchedTopic.name : "General",
            };
        });
    }, [newsData, topicsConfig]);

    const availableSources = useMemo(() => {
        if (!articles) return [];
        return Array.from(new Set(articles.map((a) => a.source.name).filter(Boolean))).sort();
    }, [articles]);

    const availableCategories = useMemo(() => {
         if (!topicsConfig) return [];
         return topicsConfig.map(t => t.name).sort();
    }, [topicsConfig]);

    return {
        articles,
        isLoading: isLoadingSources || isLoadingTopics || isLoadingNews,
        error,
        availableSources,
        availableCategories,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
}
