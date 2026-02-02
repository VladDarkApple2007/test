/**
 * news route
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/news',
      handler: 'news.find',
      config: {
        auth: false,
      },
    },
  ],
};
