import axios from "axios";
import { useEffect, useState } from "react";
import Select from "./components/core/Select";
import TransactionTypes from "./constant/TransactionTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  setOriginalValue,
  setSearchedValue,
  setSortedValue,
} from "./features/transactions/transactionsSlice";
import { dateConverter } from "./utils/dateConverter";

function App() {
  //
  const dispatch = useDispatch();
  //
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState("");
  //
  useEffect(() => {
    axios.get("/data.json").then((res) => dispatch(setOriginalValue(res.data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
  const showValue = useSelector((state) => state.transaction.show);
  // sort
  const handleSortList = (e) => {
    dispatch(setSortedValue(e?.value));
    setSelectedTransaction(e);
  };
  // search
  const handleSearchList = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setSearchedValue(event.target.value));
  };
  //
  return (
    <div className="App" dir="rtl">
      <div className="container">
        <div className="text-xl my-5">تمام تراکنش ها</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sticky top-0 bg-white py-5">
          <div className="w-full ">
            <label className="text-xs">نوع تراکنش</label>
            <Select
              options={TransactionTypes}
              onChange={(e) => handleSortList(e)}
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
                className="w-full p-2 border border-indigo-700 rounded-lg"
                value={searchTerm}
                onChange={handleSearchList}
              />
            </div>
          )}
        </div>
        <div className="mt-5">
          {showValue?.map((value) => {
            //
            const dateTime =
              value?.request_datetime || value?.datetime || value?.created_at;
            const amount = value?.final_price || value?.amount;
            //
            return (
              <div className="my-4" key={value?.id}>
                <div className="bg-slate-300 px-6 py-1 text-lg">
                  {dateConverter(dateTime).weekendDate}{" "}
                  {dateConverter(dateTime).titleDate}
                </div>
                <div className="mx-8 mt-4 text-sm">
                  <div>
                    {dateConverter(dateTime).shortTime} ،
                    {dateConverter(dateTime).shortDate}
                  </div>
                  <div className="flex flex-col md:flex-row justify-between lg:items-center mt-3 ">
                    <div>
                      <div>
                        {TransactionTypes?.map((item) => {
                          if (item.value === value.transactionType)
                            return item.label;
                        })}
                      </div>
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
