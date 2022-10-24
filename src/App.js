import { Provider } from "react-redux";
import store from "./store";
import { FlightsList } from "./components/FlightsList";
import FligthFilterForm from "./components/FligthFilterForm";

function App() {
  return (
    <Provider store={store}>
      <FligthFilterForm />
      <FlightsList />
    </Provider>
  );
}

export default App;
