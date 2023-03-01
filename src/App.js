import { Provider } from "react-redux";
import store from "./redux";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
