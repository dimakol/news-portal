import React from "react";
import Button from "react-bootstrap/Button";

/**
 * The form of the subscription.
 * @param {function} handleSubmit
 * @param {function} handleUserInput
 * @param {string} email
 */
const MyForm = ({ handleSubmit, handleUserInput, email }) => (
  <form className="padding-top-10" onSubmit={handleSubmit}>
    <input
      className="col-md-12"
      type="email"
      placeholder="your@email.com"
      required
      value={email}
      onChange={handleUserInput}
    />
    <Button
      variant="outline-primary"
      size="sm"
      className="offset-5 margin-top-20"
      type="submit"
    >
      {" "}
      SEND
    </Button>
  </form>
);

export default MyForm;
