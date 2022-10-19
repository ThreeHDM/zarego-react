import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { Flights } from "./components/FlightsList";


function App() {
  
  return (
    <Provider store={store}>
      <div>
        <h1 className="text-3xl font-bold underline">APP</h1>
        <Flights />
      </div>
    </Provider>
  );
}

export default App;
