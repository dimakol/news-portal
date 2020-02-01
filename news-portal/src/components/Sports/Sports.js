import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import Matches from '../Sports/Matches';

/**
 * The Sports component widget displays the current score of a sports match. 
 * This tile should update every 1 second.
 */
class Sports extends PureComponent {
    render() {
        //console.log("[Sports.js] render");   // Dima debug

        return(
            <Card className="col-md-4" border="dark">
                <Card.Body>
                    <Card.Title><b>Sports</b></Card.Title>
                    {!this.props.response ? <Card.Text>Loading...</Card.Text> :
                        this.props.response.count === 0 ? <Card.Text>There are no games currently</Card.Text> :
                            <Matches matches={this.props.response.matches} />                        
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Sports;