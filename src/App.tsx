import HomePage from "./pages/HomePage/HomePage";
import EntriesContextProvider from "./context/EntriesContextProvider";

function App() {
  return (
    <>
      <EntriesContextProvider>
        <HomePage />
      </EntriesContextProvider>
    </>
  );
}

export default App;
