import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

type Props = {
  showSidebar: boolean;
};

const Sidebar = ({ showSidebar }: Props) => {
  const [componentHasMounted, setComponentHasMounted] = useState(false);

  useEffect(() => {
    //to prevent it on running on first load
    if (showSidebar) setComponentHasMounted(true);
  }, [showSidebar]);
  return (
    <aside
      className={
        showSidebar ? "Sidebar" : componentHasMounted ? "Sidebar close" : "hide"
      }
    >
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Menu</Link>
        <Link to="/orderDashboard">Order</Link>
        <Link to="/">About</Link>
        <Link to="/">Events</Link>
        <Link to="/">Reservation</Link>
        <Link to="/">Contact</Link>
        <Link to="/">FAQ</Link>
        <Link to="/">Reviews</Link>
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
