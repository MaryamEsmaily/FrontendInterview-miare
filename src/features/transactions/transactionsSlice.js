import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  original: null,
  show: null,
  sort: null,
  search: null,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setOriginalValue: (state, action) => {
      const list = Object.entries(action?.payload)
        .reduce((prev, [transactionType, value]) => {
          return [
            ...prev,
            ...value.map((item) => ({ ...item, transactionType })),
          ];
        }, [])
        .map((item) => ({
          ...item,
          date: item?.request_datetime || item?.datetime || item?.created_at,
        }))
        ?.sort((a, b) => new Date(b.date) - new Date(a.date));

      state.original = list;
      state.show = list;
    },
    setSortedValue: (state, action) => {
      console.log(action);
      const sortedList = state.show?.filter(
        (item) => item.transactionType !== action?.payload
      );
    },
  },
});

export const { setOriginalValue, setSortedValue } = transactionsSlice.actions;

export default transactionsSlice.reducer;
