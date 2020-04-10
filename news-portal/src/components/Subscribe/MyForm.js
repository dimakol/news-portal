import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * The form of the subscription.
 * @param {*} props 
 */
const MyForm = props => {
    return (
        <form className="padding-top-10" onSubmit={props.handleSubmit}>
            <input className="col-md-12" 
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={props.email}
                    onChange={props.handleUserInput} />
            <Button variant="outline-primary"
                    size="sm"
                    className="offset-5 margin-top-20"
                    type="submit"> SEND
            </Button>
        </form> 
    );
}

export default MyForm;
