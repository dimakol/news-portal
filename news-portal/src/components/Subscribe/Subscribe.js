import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import MyForm from './MyForm';
import axios from 'axios';

/**
 * Users can subscribe to news updates using their emails. 
 * After the email is validated, it is being sent to the server. 
 * When the user will visit the app again, he wouldn’t be able to subscribe again
 * (The subscription is limited per browser session).
 */
class Subscribe extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false,
            isSubscribed: false
        }
    }
    
    // Checking if user already subscribed
    componentDidMount() {
        // retrieve session
        if (sessionStorage.getItem("email"))
            this.setState({ isSubscribed: true });
    }

    // Input handling
    handleUserInput = (event) => this.setState({ email: event.target.value });
    
    // Form submit
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        // post request to the server with the validated email as the body.
        axios.post( 'http://localhost:80/',
                    { email: this.state.email },
                    { headers: { 'Content-Type': 'application/json' } } )
            .then( response => {
                this.setState({ isLoading: false });
                if (response.data.responseStatus === 'done') {
                    alert('The email was submitted: ' + this.state.email);
                    this.setState({ isSubscribed: true });
                    // set session in Window sessionStorage.
                    this.sessionStore(response.data.email);
                }
            } )
            .catch( error => {
                this.setState({ isLoading: false });
                alert('An error was occured during the submission of the email');
            } );
    }

    // Storing session for user subscription
    sessionStore = (email) => {
        // check browser support for storage
        if (typeof(Storage) !== "undefined") 
            sessionStorage.setItem("email", email); // store session of the email
        else 
            alert("Sorry, your browser does not support Web Storage...");
    }

    render() {
        //console.log("[Subscribe.js] render");    // Dima debug

        const { email, isLoading, isSubscribed } = this.state;

        return(
            <Card className="col-md-4" border="dark">
                <Card.Body>
                    <Card.Title><b>Subscribe for updates</b></Card.Title>
                    { isLoading ? <Card.Text>Waiting for approval...</Card.Text> : isSubscribed ?
                        <Card.Text>You have been already subscribed</Card.Text> :
                            <MyForm handleSubmit={this.handleSubmit}
                                    handleUserInput={this.handleUserInput}
                                    email={email}/>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Subscribe;