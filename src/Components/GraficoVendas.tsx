import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IVenda } from "../Context/DataContext";

const dadosGrafico = [
  {
    data: "2023-03-03",
    pago: 394,
    processando: 3000,
    falha: 2000,
  },
  {
    data: "2023-03-03",
    pago: 7763,
    processando: 5000,
    falha: 1000,
  },
  {
    data: "2023-04-04",
    pago: 7784,
    processando: 3000,
    falha: 1000,
  },
];

type VendaDia = {
  data: string;
  pago: number;
  processando: number;
  falha: number;
};

function transformData(data: IVenda[]): VendaDia[] {
  const dias = data.reduce((acc: { [key: string]: VendaDia }, item) => {
    const dia = item.data.split(" ")[0];
    if (!acc[dia]) {
      acc[dia] = {
        data: dia,
        pago: 0,
        falha: 0,
        processando: 0,
      };
    }

    acc[dia][item.status] += item.preco;

    return acc;
  }, {});

  return Object.values(dias).map((dia) => ({
    ...dia,
    data: dia.data.substring(5),
  }));

  // return [
  //   {
  //     data: "2023-04-04",
  //     pago: 7784,
  //     processando: 3000,
  //     falha: 1000,
  //   },
  // ];
}

const GraficoVendas = ({ data }: { data: IVenda[] }) => {
  const transformedData = transformData(data);
  //console.log(transformedData);

  return (
    <ResponsiveContainer width={"99%"} height={400}>
      <LineChart data={transformedData}>
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pago" stroke="#a36af9" strokeWidth={3} />
        <Line
          type="monotone"
          dataKey="processando"
          stroke="#fbcb21"
          strokeWidth={3}
        />
        <Line type="monotone" dataKey="falha" stroke="#000" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraficoVendas;
