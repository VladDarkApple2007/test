# Dynamic News Aggregator

**A responsive React/TypeScript app delivering real-time news via NewsAPI. Integrated with a Headless CMS to dynamically manage allowed sources and auto-categorize articles by topic. Features include infinite scrolling, source filtering, and a polished UI built with TailwindCSS and shadcn/ui. Clean architecture avoiding hardcoded rules.**

## Features

- **Dynamic Feed**: Fetches real-time headlines using the [NewsAPI](https://newsapi.org/).
- **CMS Integration**: Dynamically loads permitted sources and keyword-based topic definitions from an external CMS (Strapi/Sanity).
- **Smart Categorization**: Automatically tags articles with topics based on CMS-defined rules.
- **Advanced Filtering**: Client-side filtering by source and category with infinite scrolling (lazy loading).
- **Polished UI**: Clean, responsive interface built with **TailwindCSS** and **shadcn/ui**, featuring image fallbacks and skeleton loading states.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **State Management**: TanStack Query (React Query)
- **Styling**: TailwindCSS, shadcn/ui
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18+)
- NPM
- A running instance of your chosen CMS (Strapi or Sanity)
- NewsAPI Key

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/news-aggregator.git
    cd news-aggregator
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory and add your environment variables:

    ```env
    VITE_NEWS_API_KEY=your_news_api_key
    VITE_CMS_URL=your_cms_api_url
    VITE_NEWS_BASE_URL=https://newsapi.org/v2
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## Configuration

The application relies on the CMS to provide configuration. Ensure your CMS exposes the following endpoints/data structures:

- **/sources**: Returns a list of allowed news sources.
  - Schema: `{ apiId: string, name: string }`
- **/topics**: Returns topic definitions with keywords.
  - Schema: `{ name: string, keywords: string[] }`

## Build

To build the project for production:

```bash
npm run build
```

## License

[MIT](LICENSE)
