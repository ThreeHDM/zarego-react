import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { FlightsList } from "./components/FlightsList";


function App() {
  
  return (
    <Provider store={store}>
        <FlightsList />
    </Provider>
  );
}

export default App;
