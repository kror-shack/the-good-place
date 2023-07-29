import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./BookTable.scss";
import "firebase/firestore";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import app from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { addReservation } from "../../utils/services/addReservation";

const styles = {
  radioGroup: {
    display: "flex",
    flexDirection: "row",
  },
};

const BookTable = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const navigate = useNavigate();

  const [people, setPeople] = useState<number>(1);
  const [time, setTime] = useState<string>("");
  const [optionalNumber, setOptionalNumber] = useState<number | null>(null);
  const [specialRequest, setSpecialRequest] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handlePeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPeople = parseInt(event.target.value, 10);
    if (selectedPeople < 1 || !selectedPeople) setPeople(1);
    else if (selectedPeople > 15) setPeople(15);
    else setPeople(selectedPeople);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    setTime(selectedTime);
  };

  const handleOptionalNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedOptionalNumber = parseInt(event.target.value, 10);
    setOptionalNumber(selectedOptionalNumber);
  };

  const handleSpecialRequestChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const selectedSpecialRequest = event.target.value;
    setSpecialRequest(selectedSpecialRequest);
  };

  const handleDateChange = (e: string) => {
    setSelectedDate(e);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const reservationMade = await addReservation(
      user.email,
      user.displayName,
      time,
      selectedDate,
      people,
      user.uid,
      optionalNumber,
      specialRequest
    );
    if (reservationMade) navigate("/");
  }

  return (
    <main className="Book-table">
      <Container>
        <Grid container spacing={2}>
          {/* <img src={require(`../../assets/images/Group 16(1).png`)} alt="" /> */}
          <Grid item xs={12} sm={12}>
            <Typography variant="h2">Book A Table</Typography>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ gridColumn: "2 / span 9" }}>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    id="people"
                    name="people"
                    label="People"
                    variant="outlined"
                    value={people}
                    onChange={handlePeopleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    id="date"
                    name="date"
                    // label="Select a date"
                    value={selectedDate}
                    inputProps={{ min: today }}
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth component="fieldset">
                  <FormLabel component="legend">Time</FormLabel>
                  <RadioGroup
                    sx={styles.radioGroup}
                    value={time}
                    onChange={handleTimeChange}
                  >
                    <FormControlLabel
                      value="5:30 PM"
                      control={<Radio />}
                      label="5:30 PM"
                    />
                    <FormControlLabel
                      value="6:30 PM"
                      control={<Radio />}
                      label="6:30 PM"
                    />
                    <FormControlLabel
                      value="7:30 PM"
                      control={<Radio />}
                      label="7:30 PM"
                    />
                    <FormControlLabel
                      value="8:30 PM"
                      control={<Radio />}
                      label="8:30 PM"
                    />
                    <FormControlLabel
                      value="9:30 PM"
                      control={<Radio />}
                      label="9:30 PM"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    id="optionalNumber"
                    value={optionalNumber || ""}
                    label="Phone Number"
                    placeholder="Optional"
                    onChange={handleOptionalNumberChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    multiline
                    rows={4}
                    id="specialRequest"
                    value={specialRequest || ""}
                    label="Special Request"
                    placeholder="Optional"
                    onChange={handleSpecialRequestChange}
                  />
                </FormControl>
                <div>
                  {!user.displayName && (
                    <div>
                      <Typography>Please sign in to continue!</Typography>{" "}
                      <Link to="/SignInPage">Login</Link>
                    </div>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!user.email}
                    type="submit"
                  >
                    Reserve
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default BookTable;
