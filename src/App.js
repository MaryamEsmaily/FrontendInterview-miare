import axios from "axios";
import { useEffect, useState } from "react";
import Select from "./components/core/Select";
import TransactionTypes from "./constant/TransactionTypes";
import { useSelector, useDispatch } from "react-redux";
import { setOriginalValue } from "./features/transactions/transactionsSlice";
import { dateConverter } from "./utils/dateConverter";

function App() {
  //
  const dispatch = useDispatch();
  //
  useEffect(() => {
    axios.get("/data.json").then((res) => dispatch(setOriginalValue(res.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  const [selectedTransaction, setSelectedTransaction] = useState();
  //
  const showValue = useSelector((state) => state.counter.show);
  //
  return (
    <div className="App" dir="rtl">
      <div className="container">
        <div className="text-xl my-5">تمام تراکنش ها</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="w-full ">
            <label className="text-xs">نوع تراکنش</label>
            <Select
              options={TransactionTypes}
              onChange={setSelectedTransaction}
              value={selectedTransaction}
              placeholder="انتخاب کنید"
            />
          </div>
          {selectedTransaction?.value !== "trip_financials" ? null : (
            <div>
              <label className="text-xs">کوریر</label>
              <input
                placeholder="نام کوریر را وارد کنید"
                type="text"
                className="w-full p-2 border border-indigo-700 rounded-lg "
              />
            </div>
          )}
        </div>
        <div className="mt-5">
          {showValue?.map((value) => {
            const dateTime =
              value?.request_datetime || value?.datetime || value?.created_at;

            const amount = value?.final_price || value?.amount;
            return (
              <div className="my-4">
                <div className="bg-slate-300 px-6 py-1 text-lg">
                  {dateConverter(dateTime).weekendDate}{" "}
                  {dateConverter(dateTime).titleDate}
                </div>
                <div className="mx-8 mt-4 text-sm">
                  <div>
                    {dateConverter(dateTime).shortTime} ،
                    {dateConverter(dateTime).shortDate}
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-center mt-3 ">
                    <div>
                      <div>خسارت</div>
                      {value?.transactionType !== "trip_financials" ? null : (
                        <div>
                          <div className="flex">
                            <div className="w-10">کوریر:</div>
                            <div> {value?.driver}</div>
                          </div>
                          <div className="flex">
                            <div className="w-10">شعبه: </div>
                            <div>{value?.hub?.title}</div>
                          </div>
                        </div>
                      )}
                      {value?.transactionType !== "concurrency_costs" ? null : (
                        <div>
                          از تاریخ {dateConverter(value?.end_date).shortDate} تا{" "}
                          {dateConverter(value?.start_date).shortDate}
                        </div>
                      )}
                    </div>
                    <div
                      className="text-xs"
                      style={{
                        direction: "ltr",
                        color: amount < 0 ? "red" : "green",
                      }}
                    >
                      {amount}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
