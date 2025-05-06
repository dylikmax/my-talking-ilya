import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Root from "./routes/root/Root.jsx";
import Game from "./routes/game/Game.jsx";
import Labs from "./routes/labs/Labs.jsx";
import Happiness from "./routes/happiness/Happiness.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Outlet/></>,
    children: [
      {
        path: "/",
        element: <Root/>,
      },
      {
        path: "/game",
        element: <Game/>,
      },
      {
        path: "/labs",
        element: <Labs/>,
      },
      {
        path: "/happiness",
        element: <Happiness/>,
      },
    ]
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <div className="app-layout"><RouterProvider router={router} /></div>;
}

export default App;
