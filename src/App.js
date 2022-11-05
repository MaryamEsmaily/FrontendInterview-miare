import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("/data.json").then((res) => console.log(res));
  }, []);
  return (
    <div className="App" dir="rtl">
      <div>
        <p>تمام تراکنش ها</p>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </div>
  );
}

export default App;
