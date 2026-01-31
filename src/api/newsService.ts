import axios from "axios";

export interface NewsSource {
    id: number | null;
    name: string;
}

export interface Article {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
    category?: string;
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

export const fetchNews = async (
    sources: string[] = [], 
    searchQuery?: string,
    page: number = 1,
    pageSize: number = 20
): Promise<NewsResponse> => {
    const params = new URLSearchParams();
    
    if (sources.length > 0) {
        params.append("sources", sources.join(","));
    } else {
        params.append("country", "us");
    }
    
    if (searchQuery) {
        params.append("q", searchQuery);
    }
    
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());
    params.append("apiKey", API_KEY);

    const apiNews = `${BASE_URL}/top-headlines?${params.toString()}`;
    const response = await axios.get(apiNews);
    return response.data;
}
