import React, { PureComponent } from "react";
import Card from "react-bootstrap/Card";
import NewsModal from "./NewsModal";
import { formatISODate } from "../../utils/timeUtils";

/**
 * The News component widget displays the latest news break update teaser (that means, not the whole article).
 * Clicking on the tile will show the full article in the modal window.
 * This tile should update every 10 minutes.
 */
class News extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  /**
   * Closes the modal
   */
  handleClose = () => this.setState({ showModal: false });

  /**
   * Opens the modal if data exists
   */
  handleShow = () => {
    if (this.props.response) {
      this.setState({ showModal: true });
    }
  };

  render() {
    //console.log("[News.js] render"); // for debug

    const { showModal } = this.state;
    const { publishedAt, title, description, url, urlToImage } =
      this.props.response;

    return (
      <React.Fragment>
        <Card
          className="col-md-4 cursor-pointer"
          border="dark"
          onClick={this.handleShow}
        >
          <Card.Body>
            <Card.Title>
              <b>News update</b>
            </Card.Title>
            {!this.props.response ? (
              <Card.Text>Loading...</Card.Text>
            ) : (
              <div className="padding-top-20">
                <h5 className="red">
                  Breaking news! {formatISODate(publishedAt)}
                </h5>
                <h4 className="padding-top-10">{title}</h4>
              </div>
            )}
          </Card.Body>
        </Card>

        {this.props.response && (
          <NewsModal
            show={showModal}
            handleClose={this.handleClose}
            title={title}
            description={description}
            url={url}
            urlToImage={urlToImage}
          />
        )}
      </React.Fragment>
    );
  }
}

export default News;
