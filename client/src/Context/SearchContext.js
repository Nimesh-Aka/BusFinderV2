import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  departureStation: undefined, // Starting point of the journey
  arrivalStation: undefined, // Destination of the journey
  journeyDate: undefined, // Date of travel
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        departureStation: action.payload.departureStation,
        arrivalStation: action.payload.arrivalStation,
        journeyDate: action.payload.journeyDate,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        departureStation: state.departureStation,
        arrivalStation: state.arrivalStation,
        journeyDate: state.journeyDate,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
