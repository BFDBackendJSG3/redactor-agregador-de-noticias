const axios = require("axios");
const cheerio = require("cheerio");

async function fetchHtml(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao acessar:", url);
    return null;
  }
}

async function scrape(html) {
  let title = "";
  let dateText = null;
  let author = null;
  paragraphs = [];

  // Carregar o html para manipulação
  const $ = cheerio.load(html);

  const timeEl = $("article time").first();

  if (timeEl.length) {
    date = timeEl.attr("datetime") || timeEl.text().trim();
  }

  author = $(".top__signature__text__author-name").text();

  dateText = $(".content-publication-data__updated").first().text().trim();

  title = $("h1").text();
  $("article p").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 0) {
      paragraphs.push(text);
    }
  });

  const body = paragraphs.join("\n\n");

  console.log("Título: ", title);
  console.log("Data: ", dateText);
  console.log("Autor:", author);
  console.log("Parágrafos:", paragraphs.length);
  console.log("Notícia: ", paragraphs.join(" "));
}

async function main() {
  const url =
    "https://g1.globo.com/politica/blog/octavio-guedes/post/2025/12/16/presidente-alerj-prisao-desembargador.ghtml";

  const html = await fetchHtml(url);
  if (!html) return;

  scrape(html);
}

module.exports = {
  fetchHtml,
  scrape,
};
