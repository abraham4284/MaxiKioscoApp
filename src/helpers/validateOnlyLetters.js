export const validateOnlyLetters = (text) => {
  if (typeof text !== "string") return false;
  const limpio = text.trim();
  if (!limpio) return false;
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ' -]+$/;
  return soloLetras.test(limpio);
};
