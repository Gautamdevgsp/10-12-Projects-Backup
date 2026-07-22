import React from 'react'

function Home() {
  return (
    <>
    
    <>
  <section className="banner bg-banner-one overlay">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          {/* Content Block */}
          <div className="block">
            {/* Coundown Timer */}
            <div className="timer" />
            <h1>Business</h1>
            <h2>Conference 2017</h2>
            <h6>02-05 July 2017 California</h6>
            {/* Action Button */}
            <a href="#" className="btn btn-white-md">
              get ticket now
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*====  End of Banner  ====*/}
  {/*===========================
=            About            =
============================*/}
  <section className="section about">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 align-self-center">
          <div className="image-block bg-about">
            <img
              className="img-fluid"
              src="images/speakers/featured-speaker.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="col-lg-8 col-md-6 align-self-center">
          <div className="content-block">
            <h2>
              About The <span className="alternate">Eventre</span>
            </h2>
            <div className="description-one">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusm tempor incididunt ut labore dolore magna aliqua enim ad
                minim veniam quis nostrud exercitation ullamco.
              </p>
            </div>
            <div className="description-two">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmtempor incididunt ut labore et dolore magna aliq enim ad
                minim veniam quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea.
              </p>
            </div>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="btn btn-main-md">
                  Buy ticket
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="btn btn-transparent-md">
                  Read more
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    </>
  )
}

export default Home