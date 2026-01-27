export const readingTime = (texto) => {
  const palavrasPorMinuto = 180;
  const totalPalavras = texto?.trim().split(/\s+/).length;
  const minutos = Math.ceil(totalPalavras / palavrasPorMinuto);
  return minutos;
};
