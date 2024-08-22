export const generarNumeroFactura = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Número aleatorio de 4 dígitos
  
    return `INV${year}${month}${day}${randomNum}`;
};



