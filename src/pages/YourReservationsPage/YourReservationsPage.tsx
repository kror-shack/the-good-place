import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import app from "../../firebase";
import { RootState } from "../../store/store";
import "./YourReservationsPage.scss";
import { ReservationData } from "../../types/types";
import { getUserResevations } from "../../utils/services/getUserResevations";

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
        <h2>Reservations</h2>
        {reservations ? (
          <table>
            <thead>
              <tr>
                {user.isAdmin && <th>Name</th>}
                {user.isAdmin && <th>Email</th>}
                {user.isAdmin && <th>Phone No.</th>}

                <th>No. of Guests</th>
                <th>Time</th>
                <th>Date</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(
                (item: Partial<ReservationData>, index: number) => (
                  <tr className="reservation" key={index}>
                    {user.isAdmin && <td>{item.name}</td>}
                    {user.isAdmin && <td>{item.email}</td>}
                    {user.isAdmin && <td>{item.number}</td>}
                    <td>{item.people}</td>
                    <td>{item.time}</td>
                    <td>{item.date}</td>
                    <td>{item.request || "none"}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </main>
  );
};

export default YourReservationsPage;
