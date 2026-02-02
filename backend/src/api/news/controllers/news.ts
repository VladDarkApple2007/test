/**
 * news controller
 */

export default {
  async find(ctx) {
    const { sources, q, page, pageSize } = ctx.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return ctx.badRequest('NEWS_API_KEY is not configured on the server');
    }

    const params = new URLSearchParams();
    if (sources) params.append('sources', sources as string);
    if (q) params.append('q', q as string);
    if (page) params.append('page', page as string);
    if (pageSize) params.append('pageSize', pageSize as string);
    params.append('apiKey', apiKey);

    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return ctx.send(errorData, response.status as any);
      }

      const data = await response.json();
      ctx.send(data);
    } catch (err) {
      ctx.throw(500, err instanceof Error ? err.message : 'Failed to fetch news');
    }
  }
};
