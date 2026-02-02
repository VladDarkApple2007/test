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

const CMS_URL = import.meta.env.VITE_CMS_URL;

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
    
    // We no longer need the API_KEY on the client side at all.
    // The Strapi CMS will handle it on the server.
    const url = `${CMS_URL}/news?${params.toString()}`;
    const response = await axios.get(url);
    return response.data;
}
