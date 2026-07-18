import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Home1 from "../assets/Home1.jpg";
import Home2 from "../assets/Home2.jpg";
import Home3 from "../assets/Home3.jpg";

function Home() {

  let auth = localStorage.getItem("user");
  let user = auth ? JSON.parse(auth) : null;  //string -> object
  let role = user?.role;

  const images = [
    Home1,
    Home2,
    Home3
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) => (prev + 1) % images.length);

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="slider-container">

      {/* IMAGES */}

      {
        images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt="slider"
            className={`slider-image ${index === current ? "active" : ""
              }`}
          />

        ))
      }


      {/* OVERLAY */}

      <div className="overlay">

        <div className="container text-center text-white">

          <h1 className="display-3 fw-bold mb-3 hero-text">
            Strong <span className="text-warning">&</span> Stylish Steel <span className="text-warning">Works</span>
          </h1>

          <p className="lead mb-4">
            Custom Gates | Door Frames | Welding Solutions | Railings
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">

            <Link
              to="/products"
              className="btn btn-warning btn-lg px-4"
            >
              View Products
            </Link>

            {role !== "admin" && (
              <Link
                to="/contact"
                className="btn btn-outline-light btn-lg px-4"
              >
                Contact Us
              </Link>
            )}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Home;