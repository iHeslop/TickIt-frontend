import HomePage from "./pages/HomePage/HomePage";
import EntriesContextProvider from "./context/EntriesContextProvider";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <>
      <EntriesContextProvider>
        <HomePage />
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
      </EntriesContextProvider>
    </>
  );
}

export default App;
