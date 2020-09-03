import React from "react";
import { render as rtl, screen, fireEvent } from "@testing-library/react";
import {toBe} from '@testing-library/jest-dom';
import ContactForm from "./ContactForm";

test("Correct Form Fields are rendered by <ContactForm />", () => {
  rtl(<ContactForm />);

  // see if all the elements exist
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.queryByTestId(/submit/i);

  fireEvent.change(firstNameInput, { target: {value: 'Foobar' } })
  fireEvent.change(lastNameInput,  { target: {value: 'Baz' } })
  fireEvent.change(emailInput,  { target: {value: 'bar@baz.com' } })
  fireEvent.change(messageInput,  { target: {value: 'foo\nbar\nbaz' } })


  fireEvent.submit(submitButton);
  fireEvent.change(firstNameInput, { target: {value: '' } } )
  expect(document.querySelectorAll('Foobar'))
});