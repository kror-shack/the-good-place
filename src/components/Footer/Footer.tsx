import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "100vh",
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: "#333",
            color: "#fff",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import "./Footer.scss";

// const Footer = () => {
//   return (
//     <footer>
//       <div>
//         <div>
//           <nav>
//             <Link to="/">About</Link>
//             <Link to="/">Health And Safety</Link>
//             <Link to="/">Reservation Policy</Link>
//             <Link to="/">Privacy Policy</Link>
//             <Link to="/">Terms Of Use</Link>
//             <Link to="/">Jobs</Link>
//           </nav>
//         </div>
//         <div>
//           <ul>
//             <li>
//               <Link to="/">
//                 <InstagramIcon />
//                 <span className="screen-reader-text">instagram</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/">
//                 <FacebookIcon />
//                 <span className="screen-reader-text">facebook</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/">
//                 <TwitterIcon />
//                 <span className="screen-reader-text">twitter</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//         <p>All Rights Reserved</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
