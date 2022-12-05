import { FC } from "react";

import "./App.css";
import { Home } from "./components/Home";

interface IAppProps {}

export const App: FC = (props: IAppProps) => {
  return (
    <div>
      <Home />
      <h2>APP</h2>
    </div>
  );
};
