import React from 'react'
import './About.css';
import { Link } from 'react-router-dom';
function About() {
  return (
    <div className='about-page '>

      {/* HERO SECTION */}

      <section className='hero-section d-flex 
      justify-content-center align-items-center text-center'>

        <div>
          <h1 className='display-3 fw-bold'>
            About Our Company
          </h1>

          <p className='lead'>
            We provide premium welding and fabrication services.
          </p>
        </div>

      </section>


      {/* COMPANY SECTION */}

      <section className='container py-5'>

        <div className='row align-items-center'>

          <div className='col-md-6  image-container'>
            <img
              src='https://images.unsplash.com/photo-1517048676732-d65bc937f952'
              alt=''
              className='img-fluid rounded'
            />
          </div>

          <div className='col-md-6 mt-4 mt-md-0'>

            <h2 className='fw-bold mb-4 text-center'>
              Who We Are
            </h2>
            <span style={{ display: 'block', width: '50%', height: '2px', backgroundColor: 'orange', margin: '0 auto 20px' }}><hr />
            </span>

            <p className='fs-5 company-description'>
              We specialize in steel fabrication,
              gates, railings, welding, Door Frames <b>[Japani chokhat]</b> also deals with Ferrous & Non-Ferrous Metals
              , Steel pipe Fitting in all S.S.304,202 Type Quality and modern structures.
            </p>
            <br />
            <button className='btn  py-2 products-linksBtn'>
              <Link to='/products' className='products-links'>Explore Products</Link>
            </button>

          </div>

        </div>

      </section>

      {/* SERVICES SECTION */}

      <section className='container py-5'>

        <h1 className='text-center fw-bold mb-5'>
          Our Services
        </h1>

        <div className='row g-4'>

          {/* CARD 1 */}

          <div className='col-md-3'>

            <div className='service-card text-center p-4'>

              <h2>⚒</h2>

              <h4 className='mt-3'>
                Gate Fabrication
              </h4>

              <p>
                Modern and strong steel gate designs.
              </p>

            </div>

          </div>


          {/* CARD 2 */}

          <div className='col-md-3'>

            <div className='service-card text-center p-4'>

              <h2>🪟</h2>

              <h4 className='mt-3'>
                Window Frames
              </h4>

              <p>
                Premium quality steel window frames.
              </p>

            </div>

          </div>


          {/* CARD 3 */}

          <div className='col-md-3'>

            <div className='service-card text-center p-4'>

              <h2>🏗</h2>

              <h4 className='mt-3'>
                Stair Railings
              </h4>

              <p>
                Stylish and durable railing solutions.
              </p>

            </div>

          </div>


          {/* CARD 4 */}

          <div className='col-md-3'>

            <div className='service-card text-center p-4'>

              <h2>🚪</h2>

              <h4 className='mt-3'>
                Strong Door Frames
              </h4>

              <p>
                High-quality custom steel door frames for homes, offices, and commercial spaces.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATISTICS SECTION */}

      <section className='stats-section'>

        <div className='container'>

          <div className='row text-center'>

            {/* STAT 1 */}

            <div className='col-md-3 col-6 mb-4'>

              <h1>500+</h1>

              <p>Projects Completed</p>

            </div>


            {/* STAT 2 */}

            <div className='col-md-3 col-6 mb-4'>

              <h1>200+</h1>

              <p>Happy Clients</p>

            </div>


            {/* STAT 3 */}

            <div className='col-md-3 col-6 mb-4'>

              <h1>8+</h1>

              <p>Years Experience</p>

            </div>


            {/* STAT 4 */}

            <div className='col-md-3 col-6 mb-4'>

              <h1>24/7</h1>

              <p>Customer Support</p>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default About

