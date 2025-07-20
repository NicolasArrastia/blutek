/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bluttek.com/', // Reemplazá con tu dominio real
  generateRobotsTxt: true,        // Genera también robots.txt automáticamente
  sitemapSize: 5000,              // Opcional: cantidad máxima de URLs por sitemap
  changefreq: 'monthly',
  priority: 0.7,
  trailingSlash: false,
};