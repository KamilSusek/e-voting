import { opendir } from "fs";
import React, { useState } from "react";
import LoginDialog from "./login-dialog/LoginDialog";
import Navbar from "./navbar/Navbar";

function LoginPage() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Navbar handleOpen={handleOpen} />
      <LoginDialog handleClose={handleClose} open={open} />
    </div>
  );
}

export default LoginPage;
