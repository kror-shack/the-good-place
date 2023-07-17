import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

type Props = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: Props) => {
  const [componentHasMounted, setComponentHasMounted] = useState(false);

  useEffect(() => {
    //to prevent it on running on first load
    if (showSidebar) setComponentHasMounted(true);
  }, [showSidebar]);

  function closeSidebar() {
    setShowSidebar((prev) => !prev);
  }
  return (
    <aside
      className={
        showSidebar ? "Sidebar" : componentHasMounted ? "Sidebar close" : "hide"
      }
    >
      <nav>
        <Link to="/" onClick={closeSidebar}>
          Home
        </Link>
        <Link onClick={closeSidebar} to="/">
          Menu
        </Link>
        <Link onClick={closeSidebar} to="/orderDashboard">
          Order
        </Link>
        <Link onClick={closeSidebar} to="/">
          About
        </Link>
        <Link onClick={closeSidebar} to="/">
          Events
        </Link>
        <Link onClick={closeSidebar} to="/bookTable">
          Reservation
        </Link>
        <Link onClick={closeSidebar} to="/contactPage">
          Contact
        </Link>
        <Link onClick={closeSidebar} to="/faqPage">
          FAQ
        </Link>
        <Link onClick={closeSidebar} to="/reviewPage">
          Reviews
        </Link>
      </nav>
      <ul>
        <li>
          <Link to="/">
            <InstagramIcon />
            <span className="screen-reader-text">instagram</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <FacebookIcon />
            <span className="screen-reader-text">facebook-f</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <TwitterIcon />
            <span className="screen-reader-text">twitter</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};
export default Sidebar;
