import axios from "axios";

export interface TopicConfig {
    name: string;
    keywords: string[];
}

export interface SourceConfig {
    name: string;
    apiId: string;
}

const CMS_URL = import.meta.env.VITE_CMS_URL;

export const fetchAllowSources = async (): Promise<SourceConfig[]> => {
    const response = await axios.get(`${CMS_URL}/sources`)
    return response.data.data.map((sources: any): SourceConfig => {
        return {
            name: sources.name,
            apiId: sources.apiId
        }
    })
}

export const fetchTopics = async (): Promise<TopicConfig[]> => {
    const response = await axios.get(`${CMS_URL}/topics`)
    return response.data.data.map((topics: any): TopicConfig => {
        return {
            name: topics.name,
            keywords: topics.keywords ? topics.keywords.split(',').map((k: string) => 
                k.trim().toLowerCase()) : []
        }
    })
}

