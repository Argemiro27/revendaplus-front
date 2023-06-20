import { format } from "date-fns";

export const formatarData = (data) => {
    const dataFormatada = format(new Date(data), "dd/MM/yyyy, HH:mm:ss");
    return dataFormatada;
  };