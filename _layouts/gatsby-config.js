const path = require('path')

const PATH_PREFIX = process.env.PATH_PREFIX

module.exports = {
  // pathPrefix: PATH_PREFIX || `/foam-template-gatsby-kb`, // a. If you are using github pages, this should be the name of your repo
  pathPrefix: PATH_PREFIX || `/`, // b. If you are using Netlify/Vercel, your can keep it this way
  siteMetadata: {
    title: `Sugan`,
    author: `Sugan`,
    description: `My personal knowledge base`,
    siteUrl: `https://rgksugan.github.io/knowledge`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-primer-wiki`,
      options: {
        nav: [
          {
            title: 'Projects',
            url: '/1-projects/',
          },
          {
            title: 'Areas',
            url: '/2-areas/',
          },
          {
            title: 'Resources',
            url: '/3-resources/',
          },
        ],
        editUrl: 'https://github.com/rgksugan/knowledge/edit/main/',
      },
    },
    {
      // this plugin makes sure your static files will be served by gatsby,
      //   but of course you need to reference them by absolute path, e.g. '/assets/img.png'.
      // if you have multiple directories, copy this plugin section and specify other directory
      // check https://github.com/csath/gatsby-plugin-copy-files-enhanced to find docs for this plugin
      resolve: 'gatsby-plugin-copy-files-enhanced',
      options: {
        source: path.resolve(__dirname, `../assets`),
        destination: '/assets',
        purge: false,
      },
    },
  ],
}
