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
import warningIcon from "./assets/icons/warning-icon.svg";
import transactionIcon from "./assets/icons/transaction-icon.svg";
import calenderIcon from "./assets/icons/calender-icon.svg";

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
      <div className="container my-10">
        <div className="flex items-center mt-6 p-6 text-white rounded-lg bg-slate-400">
          <img
            alt="transaction-icon"
            src={transactionIcon}
            width="25px"
            height="25px"
          />
          <div className="text-xl font-bold pr-2">تمام تراکنش ها</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sticky top-0 bg-white py-5">
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
              <label className="text-xs">پیک</label>
              <input
                placeholder="نام پیک را وارد کنید"
                type="text"
                className="w-full p-2 border border-indigo-700 rounded-lg"
                value={searchTerm}
                onChange={handleSearchList}
              />
            </div>
          )}
        </div>
        <div className="mt-5">
          {showValue?.length ? (
            showValue?.map((value) => {
              const dateTime =
                value?.request_datetime || value?.datetime || value?.created_at;
              const amount = value?.final_price || value?.amount;
              //
              return (
                <div
                  className="my-4 bg-slate-100 rounded-md overflow-hidden"
                  key={value?.id}
                >
                  <div className="flex items-center bg-slate-200 px-6 py-2 text-lg">
                    <img
                      className="pl-1"
                      alt=""
                      src={calenderIcon}
                      width="25px"
                      height="25px"
                    />
                    {dateConverter(dateTime).weekendDate}{" "}
                    {dateConverter(dateTime).titleDate}
                  </div>
                  <div className="mx-8 mt-2 text-sm px-3 py-4">
                    <div>
                      {dateConverter(dateTime).shortTime} ،
                      {dateConverter(dateTime).shortDate}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between lg:items-center mt-3 ">
                      <div>
                        <div
                          className={`font-bold mb-2 ${
                            amount < 0 ? "text-rose-500" : "text-green-500"
                          }`}
                        >
                          {
                            TransactionTypes?.find(
                              (item) => item.value === value.transactionType
                            )?.label
                          }
                        </div>
                        {value?.transactionType !== "trip_financials" ? null : (
                          <div>
                            <div className="flex mb-1">
                              <div className="w-10">پیک:</div>
                              <div> {value?.driver}</div>
                            </div>
                            <div className="flex">
                              <div className="w-10">شعبه: </div>
                              <div>{value?.hub?.title}</div>
                            </div>
                          </div>
                        )}
                        {value?.transactionType !==
                        "concurrency_costs" ? null : (
                          <div>
                            از تاریخ {dateConverter(value?.end_date).shortDate}{" "}
                            تا {dateConverter(value?.start_date).shortDate}
                          </div>
                        )}
                      </div>
                      <div
                        className={`text-sm font-bold ${
                          amount < 0 ? "text-rose-500" : "text-green-500"
                        }`}
                        style={{
                          direction: "ltr",
                        }}
                      >
                        {amount}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center font-bold bg-red-200 p-5 rounded-lg">
              <img alt="" src={warningIcon} width="25px" height="25px" />
              <div className="px-2">داده ای وجود ندارد!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
