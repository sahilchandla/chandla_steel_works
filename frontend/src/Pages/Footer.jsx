import React from 'react';
import './Footer.css';

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {

  return (

    <footer className="footer container-fluid">

      <div className="container">

        <div className="row gy-4">

          {/* CONTACT */}

          <div className="col-md-6">

            <h2 className="footer-heading">
              Contact Us
            </h2>

            <p className="footer-text">
              <FaPhoneAlt className="footer-icon" />
              +91 9876543210
            </p>

            <p className="footer-text">
              <FaEnvelope className="footer-icon" />
              steelworks@gmail.com
            </p>

            <p className="footer-text">
              <FaMapMarkerAlt className="footer-icon" />
              Hamirpur, Himachal Pradesh
            </p>

          </div>

          {/* SOCIAL */}

          <div className="col-md-6 text-md-end">

            <h2 className="footer-heading">
              Follow Us
            </h2>

            <div className="social-icons d-flex gap-3 justify-content-md-end">

              <a href="">
                <FaInstagram />
              </a>

              <a href="">
                <FaFacebookF />
              </a>

              <a href="">
                <FaWhatsapp />
              </a>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="footer-bottom text-center">

          &copy; 2026 Strong Steel Works | All rights reserved

        </div>

      </div>

    </footer>

  );
}

export default Footer;