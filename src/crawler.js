const cheerio = require("cheerio");
const { fetchHtml } = require(".."); // index.js
const { scrape } = require(".."); // index.js

async function crawler(html) {
  const $ = cheerio.load(html);
  const links = [];

  $("a").each((_, el) => {
    if (links.length >= 20) return false;

    const href = $(el).attr("href");
    if (!href) return;
    if (!href.includes(".ghtml")) return;

    const url = href.startsWith("http") ? href : `https://g1.globo.com${href}`;

    if (!links.includes(url)) {
      links.push(url);
    }
  });

  return links;
}

async function printNews(links){
    for(const link of links){
        const html = await fetchHtml(link)
        scrape(html);
        console.log("################")
    }

}

async function main() {
  const url = "https://g1.globo.com/";

  try {
      const html = await fetchHtml(url);
      if (!html) return;
    
      const links = await crawler(html);
    
      await printNews(links);
    
  } catch (error) {
    console.log("Ocoreu o erro: ", error)
  }
}

main();
