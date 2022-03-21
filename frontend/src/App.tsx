import './App.scss';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";

import MainApp from './components/MainApp';

function App() {
  return <Provider store={store}>
    <div className="App d-flex justify-content-center align-items-center">
      <MainApp/>
    </div>
    </Provider>;
}

export default App;
