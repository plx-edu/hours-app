// import * as ReactDOM from 'react-dom';

// function render() {
//   ReactDOM.render(<h2>Hello React from Electron!</h2>, document.body);
// }

// render();

import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import React from 'react';
import HomeView from './views/HomeView';
import ClipboardView from './views/ClipboardView';
import TodoView from './views/TodoView';

const container =  document.getElementById('root');
const root = createRoot(container); // createRoot(container!) for TypeScript
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="*" element={<HomeView />} />
        <Route path="/" element={<HomeView />} />
        <Route path="/clip" element={<ClipboardView />} />
        <Route path="/todo" element={<TodoView />} />
      </Routes>
    </>
  )
}
