import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import "./YourReservationsPage.scss";
import { ReservationData } from "../../types/types";
import { getUserResevations } from "../../utils/services/getUserResevations";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

const styles = {
  tableHeader: {
    "&>th": {
      fontWeight: 900,
      fontSize: "1.2rem",
    },
  },
};

const YourReservationsPage = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const [reservations, setReservations] =
    useState<Partial<ReservationData>[]>();

  async function getYourReservations() {
    if (user.isAdmin) {
      const fetchedReservations = await getUserResevations("", true);
      if (fetchedReservations) setReservations(fetchedReservations);
    } else {
      const fetchedReservations = await getUserResevations(user.uid);
      if (fetchedReservations) setReservations(fetchedReservations);
    }
  }

  useEffect(() => {
    if (!reservations) getYourReservations();
  }, []);

  return (
    <main className="Your-reservations">
      <div>
        <Typography variant="h2">Reservations</Typography>
        {reservations ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeader}>
                  {user.isAdmin && <TableCell>Name</TableCell>}
                  {user.isAdmin && <TableCell>Email</TableCell>}
                  {user.isAdmin && <TableCell>Phone No.</TableCell>}
                  <TableCell>No. of Guests</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Request</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map((item, index) => (
                  <TableRow key={index} className="reservation">
                    {user.isAdmin && <TableCell>{item.name}</TableCell>}
                    {user.isAdmin && <TableCell>{item.email}</TableCell>}
                    {user.isAdmin && <TableCell>{item.number}</TableCell>}
                    <TableCell>{item.people}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.request || "none"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </div>
    </main>
  );
};

export default YourReservationsPage;

// const YourReservationsPage = () => {
//   const user = useSelector((state: RootState) => state.rootReducer.user);
//   const [reservations, setReservations] =
//     useState<Partial<ReservationData>[]>();

//   async function getYourReservations() {
//     if (user.isAdmin) {
//       const fetchedReservations = await getUserResevations("", true);
//       if (fetchedReservations) setReservations(fetchedReservations);
//     } else {
//       const fetchedReservations = await getUserResevations(user.uid);
//       if (fetchedReservations) setReservations(fetchedReservations);
//     }
//   }

//   useEffect(() => {
//     if (!reservations) getYourReservations();
//   }, []);
//   return (
//     <main className="Your-reservations">
//       <div>
//         <h2>Reservations</h2>
//         {reservations ? (
//           <table>
//             <thead>
//               <tr>
//                 {user.isAdmin && <th>Name</th>}
//                 {user.isAdmin && <th>Email</th>}
//                 {user.isAdmin && <th>Phone No.</th>}

//                 <th>No. of Guests</th>
//                 <th>Time</th>
//                 <th>Date</th>
//                 <th>Request</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map(
//                 (item: Partial<ReservationData>, index: number) => (
//                   <tr className="reservation" key={index}>
//                     {user.isAdmin && <td>{item.name}</td>}
//                     {user.isAdmin && <td>{item.email}</td>}
//                     {user.isAdmin && <td>{item.number}</td>}
//                     <td>{item.people}</td>
//                     <td>{item.time}</td>
//                     <td>{item.date}</td>
//                     <td>{item.request || "none"}</td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         ) : (
//           <h3>Loading...</h3>
//         )}
//       </div>
//     </main>
//   );
// };

// export default YourReservationsPage;
