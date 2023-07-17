import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.scss";

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
      <div className="content-container">
        <h1>Contact Us</h1>
        <div>
          <h3>Let's Get In Touch!</h3>
          <p>
            Or reach us through our contact number:{" "}
            <a href="tel:+90535654688">+90535654688</a>{" "}
          </p>
        </div>
        <form ref={formRef} onSubmit={sendEmail}>
          <label>
            Name
            <input type="text" name="user_name" />
          </label>
          <label>
            Email
            <input type="email" name="user_email" />
          </label>
          <label>
            Message
            <textarea name="message" />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
