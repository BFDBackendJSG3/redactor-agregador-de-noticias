export function getApiError(err) {
  if (err.response?.data?.message) {
    return err.response.data.message;
  }

  if (err.message) {
    return err.message;
  }

  return 'Erro inesperado ao comunicar com o servidor';
}
