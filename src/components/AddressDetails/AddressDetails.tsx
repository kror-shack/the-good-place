import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AddressData } from "../../types/types";
import { fetchUserAddress } from "../../utils/services/fetchUserAddress";
import { fetchUserPhoneNumber } from "../../utils/services/fetchUserPhoneNumber";
import "./AddressDetails.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  updateAddress,
  updateFirstName,
  updateLastName,
  updatePhoneNumber,
} from "../../features/userSlice";

const AddressDetails = () => {
  const user = useSelector((state: RootState) => state.rootReducer.user);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: number | string;
    addressLineOne: string;
    city: string;
    addressLineTwo: string;
    district: string;
  }>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLineOne: "",
    city: "",
    addressLineTwo: "",
    district: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("handling change");
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  async function getUserAddress() {
    const addressArr = await fetchUserAddress(user.uid);
    const address = addressArr[0];
    for (const key in address) {
      if (
        key in formState &&
        address[key as keyof typeof address] !== null &&
        address[key as keyof typeof address] !== undefined
      ) {
        setFormState((prevFormState) => ({
          ...prevFormState,
          [key]: address[key as keyof typeof address],
        }));
      }
    }
  }

  function getUserName() {
    const name = user.displayName;
    const nameParts = name.split(" ");
    const userFirstName = nameParts[0];
    const userLastName = nameParts.slice(1).join(" ");
    setFormState((prevFormState) => ({
      ...prevFormState,
      firstName: userFirstName,
      lastName: userLastName,
    }));
  }

  async function getUserNumber() {
    const number = await fetchUserPhoneNumber(user.uid);
    if (!number) return;
    setFormState((prevFormState) => ({
      ...prevFormState,
      phoneNumber: number[0],
    }));
  }
  function updateUser() {
    if (formState.firstName && formState.firstName !== "") {
      console.log(formState.firstName);
      console.log("dispatching for the firstName");
      dispatch(updateFirstName(formState.firstName));
    }
    if (formState.lastName) dispatch(updateLastName(formState.lastName));
    if (formState.phoneNumber)
      dispatch(updatePhoneNumber(formState.phoneNumber));
    if (
      formState.addressLineOne &&
      formState.addressLineTwo &&
      formState.city &&
      formState.district
    )
      dispatch(
        updateAddress({
          addressLineOne: formState.addressLineOne,
          addressLineTwo: formState.addressLineTwo,
          city: formState.city,
          district: formState.district,
        })
      );
  }
  useEffect(() => {
    getUserAddress();
    getUserNumber();
    getUserName();
  }, []);

  useEffect(() => {
    updateUser();
  }, [
    formState.firstName,
    formState.lastName,
    formState.phoneNumber,
    formState.addressLineOne,
    formState.addressLineTwo,
    formState.city,
    formState.district,
  ]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formState.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={formState.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="addressLineOne"
            name="addressLineOne"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={formState.addressLineOne}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="addressLineTwo"
            name="addressLineTwo"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={formState.addressLineTwo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="standard"
            value={formState.phoneNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={formState.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="district"
            name="district"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={formState.district}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressDetails;
