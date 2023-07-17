import { useEffect, useState } from "react";
import "./HamburgerMenu.scss";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({ showSidebar, setShowSidebar }: Props) => {
  const [sidebarShown, setSidebarShown] = useState(false);
  function openSidebar() {
    setShowSidebar((prev) => !prev);
    setSidebarShown((prev) => !prev);
  }

  useEffect(() => {
    if (!showSidebar) setSidebarShown(false);
  }, [showSidebar]);

  return (
    <div className="HamburgerMenu">
      <div className="container">
        <button
          onClick={openSidebar}
          id="menu-toggle"
          className={sidebarShown ? "menu-toggle nav-open" : "menu-toggle"}
        >
          <span className="menu-toggle-bar menu-toggle-bar--top"></span>
          <span className="menu-toggle-bar menu-toggle-bar--middle"></span>
          <span className="menu-toggle-bar menu-toggle-bar--bottom"></span>
        </button>
      </div>
    </div>
  );
};

export default HamburgerMenu;
