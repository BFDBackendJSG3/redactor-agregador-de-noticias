function extractEstadoFromUrl(url) {
  const ESTADOS = [
    "ac",
    "al",
    "ap",
    "am",
    "ba",
    "ce",
    "df",
    "es",
    "go",
    "ma",
    "mt",
    "ms",
    "mg",
    "pa",
    "pb",
    "pr",
    "pe",
    "pi",
    "rj",
    "rn",
    "rs",
    "ro",
    "rr",
    "sc",
    "sp",
    "se",
    "to",
  ];

  const sections = url.split("/");
  const possibleEstado = sections[3];

  if (ESTADOS.includes(possibleEstado)) {
    return possibleEstado;
  }

  return null;
}

extractEstadoFromUrl(
  "https://g1.globo.com/pb/paraiba/videos-jpb1/video/natal-sem-fome-mobiliza-doacoes-em-campina-grande-14185555.ghtml"
);

module.exports = {
  extractEstadoFromUrl,
};
