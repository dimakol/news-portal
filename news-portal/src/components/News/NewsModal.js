import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * Modal window that shows the full article of the latest news.
 * @param {boolean} show - show/hide modal.
 * @param {function} handleClose - function that hide the modal.
 * @param {string} title - The headline or title of the article.
 * @param {string} description - A description or snippet from the article.
 * @param {string} url - The direct URL to the article.
 * @param {string} urlToImage - The URL to a relevant image for the article.
 */
const NewsModal = ({
  show,
  handleClose,
  title,
  description,
  url,
  urlToImage,
}) => (
  <Modal size="lg" scrollable show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    {(description?.length || url?.length || urlToImage?.length) && (
      <Modal.Body>
        <p>{description}</p>
        <p className="center-text">
          <a href={url} target="_blank" rel="noopener noreferrer">
            The direct URL to the article.
          </a>
        </p>
        {urlToImage?.length && (
          <img
            src={urlToImage}
            alt="Article Img"
            className="medium center-image"
          ></img>
        )}
      </Modal.Body>
    )}
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default NewsModal;
