import { createContext, useContext, useReducer } from "react";

const initialState = { items: [] };

function watchlistReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WATCHLIST": {
      const movie = action.payload;

      // Jangan dobel — kalau sudah ada, biarkan state
      if (state.items.find((m) => m.id === movie.id)) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, { ...movie, addedAt: Date.now() }],
      };
    }

    case "REMOVE_FROM_WATCHLIST": {
      return {
        ...state,
        items: state.items.filter((m) => m.id !== action.payload.id),
      };
    }

    case "CLEAR_WATCHLIST": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  const addToWatchlist = (movie) =>
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });

  const removeFromWatchlist = (id) =>
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: { id } });

  const clearWatchlist = () => dispatch({ type: "CLEAR_WATCHLIST" });

  // Cek apakah film sudah di watchlist
  const isInWatchlist = (id) => state.items.some((m) => m.id === id);

  const totalItems = state.items.length;

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.items,
        totalItems,
        addToWatchlist,
        removeFromWatchlist,
        clearWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist harus dipakai di dalam WatchlistProvider");
  return ctx;
}