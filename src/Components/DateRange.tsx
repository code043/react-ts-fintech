import DateInput from "./DateInput";
import { useData } from "../Context/DataContext";

const DateRange = () => {
  const { data, inicio, final, setInicio, setFinal } = useData();
  console.log(data);

  return (
    <form className="box flex" onSubmit={(e) => e.preventDefault}>
      <DateInput
        label="Inicio"
        value={inicio}
        onChange={({ target }) => setInicio(target.value)}
      />
      <DateInput
        label="Final"
        value={final}
        onChange={({ target }) => setFinal(target.value)}
      />
    </form>
  );
};

export default DateRange;
