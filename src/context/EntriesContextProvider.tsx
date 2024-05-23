import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ToDoEntryResponse } from "../services/api-responses.interface";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EntriesContextValue {
  entries: ToDoEntryResponse[];
  setEntries: Dispatch<SetStateAction<ToDoEntryResponse[]>>;
}

const defaultContextValue: EntriesContextValue = {
  entries: [],
  setEntries: () => [],
};

export const EntriesContext =
  createContext<EntriesContextValue>(defaultContextValue);

interface EntriesContextProviderProps {
  children: ReactNode;
}

const EntriesContextProvider = ({ children }: EntriesContextProviderProps) => {
  const [entries, setEntries] = useState<ToDoEntryResponse[]>([]);

  const providedValues: EntriesContextValue = {
    entries,
    setEntries,
  };

  return (
    <EntriesContext.Provider value={providedValues}>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </EntriesContext.Provider>
  );
};

export default EntriesContextProvider;
