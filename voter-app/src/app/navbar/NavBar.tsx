import React from "react";
import { useDispatch } from "react-redux";
import { setOpen } from "../../services/loginSlice";

function NavBar({ children }: any) {
  const dispatch = useDispatch();

  const openLoginPopup = () => {
    dispatch(setOpen(true));
  };

  return (
    <nav className="landing-nav">
      <div className="links-container">{children}</div>
      <button onClick={openLoginPopup}>Login</button>
    </nav>
  );
}

export default NavBar;
