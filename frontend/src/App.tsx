import Header from "./components/Header";
import { FC } from "react";
import Register from "./components/Register";

const App:FC = () => {
  return (
    <Header>
      <main>
        <Register/>
      </main>
    </Header>
  );
}

export default App;
