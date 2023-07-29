import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.scss";
import { Typography, Container, TextField, Button } from "@mui/material";

const styles = {
  input: {
    maxWidth: "24rem",
  },
};
export const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current && serviceId && templateId && publicKey) {
      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
        (result) => {
          console.log(result.text);
          formRef?.current?.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
    }
  };

  return (
    <main className="Contact-page">
      <Container maxWidth="lg" className="content-container">
        <div>
          <Typography variant="h2">Let's Get In Touch!</Typography>
          <Typography variant="body1">
            Or reach us through our contact number:{" "}
            <a href="tel:+90535654688">+90535654688</a>{" "}
          </Typography>
        </div>
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="input-container">
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_name"
              sx={styles.input}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              fullWidth
              name="user_email"
              sx={styles.input}
            />
          </div>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="message"
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Container>
    </main>
  );
};

export default ContactPage;
