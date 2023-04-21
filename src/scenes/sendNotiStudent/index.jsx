import { useState } from "react";
import * as React from 'react';
import emailjs from "@emailjs/browser";
import styled from "styled-components";

export default function SendNotiStudent() {


  const form = useState();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mnxmpzf",
        "template_qfq82gb",
        form.current,
        "BHt6dRNehttGIg0pR"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

 
   
  return (

    <StyledContactForm>
    <div >
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <div class="conmena">
       
      <input type="submit" value="Send" required/>
      </div>
    </form>
    </div>
  </StyledContactForm>
  );
}

const StyledContactForm = styled.div`
  width: 800px;
  margin:auto;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 30%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    .conmena{
      display: flex;
      width: 100%;
      justify-content: space-between
      
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"]{
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;