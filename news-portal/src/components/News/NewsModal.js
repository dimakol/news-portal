import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Modal window that shows the full article of the latest news.
 * @param {*} props
 */
const NewsModal = (props) => {
  return (
    <Modal size="lg" scrollable show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      {props.description || props.url || props.urlToImage ? (
        <Modal.Body>
          <p>{props.description}</p>
          <p className="center-text">
            <a href={props.url} target="_blank" rel="noopener noreferrer">
              The direct URL to the article.
            </a>
          </p>
          {props.urlToImage ? (
            <img
              src={props.urlToImage}
              alt="Article Img"
              className="medium center-image"
            ></img>
          ) : null}
        </Modal.Body>
      ) : null}
      <Modal.Footer>
        <Button variant="primary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
