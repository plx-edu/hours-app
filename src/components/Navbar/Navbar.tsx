import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between bg-slate-500">
      <NavLink to="/" className="text-white">Home</NavLink>
      <NavLink to="/todo" className="text-white">Todo</NavLink>
      <NavLink to="/clip" className="text-white">Clipboard</NavLink>
      {/* <NavLink to="/404" className="text-white">404</NavLink> */}
    </nav>
  )
}
