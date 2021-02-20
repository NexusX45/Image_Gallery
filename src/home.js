import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Modal, Image, CardColumns } from "react-bootstrap";

import "./home.css";

export default function Home() {
  const [pics, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [likes, setLikes] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get(
        ` https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`
      )
      .then((res) => {
        // console.log(res.data);
        setPhotos(res.data);
      });
  }, []);

  const handleItem = (item) => {
    setName(item.user.first_name + " " + item.user.last_name);
    setUrl(item.urls.full);
    setLikes(item.likes);
    setUsername(item.user.username);
    setShow(true);
  };

  const handleSearch = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "") {
      axios
        .get(
          "https://api.unsplash.com/photos/?client_id=" +
            process.env.REACT_APP_ACCESS_KEY
        )
        .then((res) => {
          //   console.log(res.data);
          setPhotos(res.data);
        });
    }
    axios
      .get(
        "https://api.unsplash.com/search/photos/?client_id=" +
          process.env.REACT_APP_ACCESS_KEY +
          "&query=" +
          e.target.value
      )
      .then((res) => {
        // console.log(res.data);
        setPhotos(res.data.results);
      });
  };

  return (
    <div className="container" style={{ minHeight: "980px" }}>
      <div className="display-4 py-4">Gallery</div>
      <div className="text-center mb-4">
        <input
          style={{
            outline: "none",
            border: "none",
            width: "90%",
            height: "40px",
            fontSize: "30px",
          }}
          placeholder="Search"
          className="lead my-3"
          onChange={(e) => {
            handleSearch(e);
          }}
        ></input>
      </div>
      <CardColumns className="mx-2 text-center">
        {pics.map((item) => (
          <div className="my-3 mx-auto">
            <Card
              onClick={() => {
                handleItem(item);
              }}
              className="card-hover"
            >
              <Card.Img src={item.urls.thumb} />
              <Card.Body>
                <div className="row">
                  <div className="col-8 lead">
                    {item.user.first_name + " " + item.user.last_name}{" "}
                  </div>
                  <div className="col d-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28 28"
                      style={{ height: "25px", width: "25px" }}
                    >
                      <path
                        style={{
                          textIndent: 0,
                          textAlign: "start",

                          lineHeight: "normal",
                          textTransform: "none",
                          blockProgression: "tb",
                          InkscapeFontSpecification: "Sans",
                        }}
                        d="M 14.375 4 L 14.09375 4.5625 L 10.375 12 L 5 12 L 4 12 L 4 13 L 4 27 L 4 28 L 5 28 L 22.84375 28 C 24.252639 28 25.485512 27.002126 25.78125 25.625 L 27.9375 15.625 C 28.333399 13.778954 26.888338 12 25 12 L 17.21875 12 C 17.29165 11.37427 17.30917 10.744865 17.78125 9.3125 C 18.086021 8.3886616 18 7.5356644 18 7 C 18 6.2541498 17.698062 5.5648148 17.1875 5 C 16.676938 4.4351852 15.904575 4 15 4 L 14.375 4 z M 15.5 6.25 C 15.5633 6.295815 15.662583 6.281615 15.71875 6.34375 C 15.906938 6.5519352 16 6.8378502 16 7 C 16 7.6503356 16.018229 8.2533384 15.875 8.6875 C 15.129582 10.949238 15 12.9375 15 12.9375 L 14.9375 14 L 16 14 L 25 14 C 25.659662 14 26.106851 14.574796 25.96875 15.21875 L 23.84375 25.21875 C 23.743488 25.685624 23.320861 26 22.84375 26 L 12 26 L 12 13.25 L 15.5 6.25 z M 6 14 L 10 14 L 10 26 L 6 26 L 6 14 z M 8 23 C 7.4477153 23 7 23.447715 7 24 C 7 24.552285 7.4477153 25 8 25 C 8.5522847 25 9 24.552285 9 24 C 9 23.447715 8.5522847 23 8 23 z"
                        overflow="visible"
                        fontFamily="Sans"
                      />
                    </svg>
                    <div className="mx-2 lead">{item.likes}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </CardColumns>
      <div>
        <Modal
          size="xl"
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <div className="lead">{name}</div>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <Image src={url} className="modal-image" />
            </div>

            <div className="col d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                style={{ height: "25px", width: "25px" }}
              >
                <path
                  style={{
                    textIndent: 0,
                    textAlign: "start",

                    lineHeight: "normal",
                    textTransform: "none",
                    blockProgression: "tb",
                    InkscapeFontSpecification: "Sans",
                  }}
                  d="M 14.375 4 L 14.09375 4.5625 L 10.375 12 L 5 12 L 4 12 L 4 13 L 4 27 L 4 28 L 5 28 L 22.84375 28 C 24.252639 28 25.485512 27.002126 25.78125 25.625 L 27.9375 15.625 C 28.333399 13.778954 26.888338 12 25 12 L 17.21875 12 C 17.29165 11.37427 17.30917 10.744865 17.78125 9.3125 C 18.086021 8.3886616 18 7.5356644 18 7 C 18 6.2541498 17.698062 5.5648148 17.1875 5 C 16.676938 4.4351852 15.904575 4 15 4 L 14.375 4 z M 15.5 6.25 C 15.5633 6.295815 15.662583 6.281615 15.71875 6.34375 C 15.906938 6.5519352 16 6.8378502 16 7 C 16 7.6503356 16.018229 8.2533384 15.875 8.6875 C 15.129582 10.949238 15 12.9375 15 12.9375 L 14.9375 14 L 16 14 L 25 14 C 25.659662 14 26.106851 14.574796 25.96875 15.21875 L 23.84375 25.21875 C 23.743488 25.685624 23.320861 26 22.84375 26 L 12 26 L 12 13.25 L 15.5 6.25 z M 6 14 L 10 14 L 10 26 L 6 26 L 6 14 z M 8 23 C 7.4477153 23 7 23.447715 7 24 C 7 24.552285 7.4477153 25 8 25 C 8.5522847 25 9 24.552285 9 24 C 9 23.447715 8.5522847 23 8 23 z"
                  overflow="visible"
                  fontFamily="Sans"
                />
              </svg>

              <div className="col-9 lead">{likes}</div>
              <div className="lead">Username: {username}</div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
