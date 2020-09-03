import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("Correct Form Fields are rendered by <ContactForm />", async () => {
  // render the element
  render(<ContactForm />);
  // see if all the elements exist
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButton = screen.queryByTestId(/submit/i);
  // change the values of all the elements, and submit the form
  fireEvent.change(firstNameInput, { target: {value: 'Foobar' } })
  fireEvent.change(lastNameInput, { target: {value: 'Baz' } })
  fireEvent.change(emailInput, { target: {value: 'foo@bar.com' } })
  fireEvent.change(messageInput, { target: {value: 'Some Message' } })
  fireEvent.click(submitButton)
  // wait for the info to show up 
  await waitFor(() => screen.getByText(/firstName.*Foobar.*lastName.*Baz.*email.*foo@bar.com.*message.*Some Message/i));

});

test("See if we get Error Codes", async () => {
  // render the element again
  render(<ContactForm />);
  // add a single character, setup for minlength error message
  fireEvent.change(screen.getByLabelText(/first name/i),
    {target: {value: 'd' } }
  )
  // submit form to trigger errors
  fireEvent.click(screen.queryByTestId(/submit/i))
  
  await waitFor(() => {
    screen.getByText(/Minlength/i)})
  await waitFor(() => {
    expect(screen.getAllByText(/required/i)).toHaveLength(2)});
})

