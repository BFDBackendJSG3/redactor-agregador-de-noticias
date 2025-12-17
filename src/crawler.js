const cheerio = require("cheerio");
const { fetchHtml } = require(".."); // index.js
const { scrape } = require(".."); // index.js

// async function crawler(html) {
//   const $ = cheerio.load(html);
//   const links = [];

//   $("a").each((_, el) => {
//     if (links.length >= 20) return false;

//     const href = $(el).attr("href");
//     if (!href) return;
//     if (!href.includes(".ghtml")) return;

//     const url = href.startsWith("http") ? href : `https://g1.globo.com${href}`;

//     if (!links.includes(url)) {
//       links.push(url);
//     }
//   });

//   return links;
// }

async function crawler(html, baseUrl, limit = 20) {
  const $ = cheerio.load(html);
  const links = new Set(); // evita duplicados automaticamente

  $("a[href]").each((_, el) => {
    if (links.size >= limit) return false;

    const href = $(el).attr("href");

    if (!href.includes(".ghtml")) return;
    if (
      href.includes("/videos/") ||
      href.includes("/infografico") ||
      href.includes("/ao-vivo")
    )
      return;

    const url = href.startsWith("http") ? href : `${baseUrl}${href}`;

    links.add(url);
  });

  return [...links];
}

async function printNews(links) {
  for (const link of links) {
    const html = await fetchHtml(link);
    console.log("URL da notícia: ", link);
    scrape(html);
    console.log("################");
  }
}

async function main() {
  const url = "https://g1.globo.com";

  try {
    const html = await fetchHtml(url);
    if (!html) return;

    const links = await crawler(html, url);

    await printNews(links);
  } catch (error) {
    console.log("Ocoreu o erro: ", error);
  }
}

main();
