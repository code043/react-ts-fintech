import { Dispatch, createContext, useContext, useState } from "react";
import useFetch from "../Hooks/useFetch";

type IDataContext = {
  data: IVenda[] | null;
  loading: boolean;
  error: string | null;
  inicio: string;
  final: string;
  setInicio: React.Dispatch<React.SetStateAction<string>>;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
};
export type IVenda = {
  id: string;
  nome: string;
  preco: number;
  status: "pago" | "processando" | "falha";
  pagamento: "boleto" | "pix" | "cartao";
  data: string;
  parcelas: number | null;
};

const DataContext = createContext<IDataContext | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useData precisa estar em DataContextProvider ");
  return context;
};

function getData(n: number) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyyy = date.getFullYear();
  //console.log(`${yyyyy}-${mm}-${dd}`);
  return `${yyyyy}-${mm}-${dd}`;
}

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [inicio, setInicio] = useState(getData(14));
  const [final, setFinal] = useState(getData(0));
  const { data, loading, error } = useFetch<IVenda[]>(
    "https://data.origamid.dev/vendas/?inicio=" + inicio + "&final=" + final
  );
  return (
    <DataContext.Provider
      value={{ data, loading, error, inicio, setInicio, final, setFinal }}
    >
      {children}
    </DataContext.Provider>
  );
};
