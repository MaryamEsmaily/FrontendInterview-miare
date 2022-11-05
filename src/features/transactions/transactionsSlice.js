import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

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
      const sortedList = state.original?.filter((item) => {
        if (action.payload === null) return true;
        return item.transactionType === action?.payload;
      });
      state.show = sortedList;
    },
  },
});

export const { setOriginalValue, setSortedValue } = transactionsSlice.actions;

export default transactionsSlice.reducer;
