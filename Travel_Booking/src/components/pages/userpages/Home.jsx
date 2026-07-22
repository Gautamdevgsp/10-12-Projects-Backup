function Home() {
  return (
    <>
     <>
  {/* slider_area_start */}
  <div className="slider_area">
    <div className="slider_active owl-carousel">
      <div className="single_slider  d-flex align-items-center slider_bg_1 overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12 col-md-12">
              <div className="slider_text text-center">
                <h3>Indonesia</h3>
                <p>Pixel perfect design with awesome contents</p>
                <a href="#" className="boxed-btn3">
                  Explore Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single_slider  d-flex align-items-center slider_bg_2 overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12 col-md-12">
              <div className="slider_text text-center">
                <h3>Australia</h3>
                <p>Pixel perfect design with awesome contents</p>
                <a href="#" className="boxed-btn3">
                  Explore Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="single_slider  d-flex align-items-center slider_bg_3 overlay">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12 col-md-12">
              <div className="slider_text text-center">
                <h3>Switzerland</h3>
                <p>Pixel perfect design with awesome contents</p>
                <a href="#" className="boxed-btn3">
                  Explore Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* slider_area_end */}
  {/* where_togo_area_start  */}
  <div className="where_togo_area">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-3">
          <div className="form_area">
            <h3>Where you want to go?</h3>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="search_wrap">
            <form className="search_form" action="#">
              <div className="input_field">
                <input type="text" placeholder="Where to go?" />
              </div>
              <div className="input_field">
                <input id="datepicker" placeholder="Date" />
              </div>
              <div className="input_field">
                <select>
                  <option data-display="Travel type">Travel type</option>
                  <option value={1}>Some option</option>
                  <option value={2}>Another option</option>
                </select>
              </div>
              <div className="search_btn">
                <button className="boxed-btn4 " type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* where_togo_area_end  */}
  {/* popular_destination_area_start  */}
  <div className="popular_destination_area">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="section_title text-center mb_70">
            <h3>Popular Destination</h3>
            <p>
              Suffered alteration in some form, by injected humour or good day
              randomised booth anim 8-bit hella wolf moon beard words.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/1.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                Italy <a href="travel_destination.html"> 07 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/2.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                Brazil <a href="travel_destination.html"> 03 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/3.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                America <a href="travel_destination.html"> 10 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/4.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                Nepal <a href="travel_destination.html"> 02 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/5.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                Maldives <a href="travel_destination.html"> 02 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_destination">
            <div className="thumb">
              <img src="img/destination/6.png" alt="" />
            </div>
            <div className="content">
              <p className="d-flex align-items-center">
                Indonesia <a href="travel_destination.html"> 05 Places</a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* popular_destination_area_end  */}
  {/* newletter_area_start  */}
  <div className="newletter_area overlay">
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-10">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="newsletter_text">
                <h4>Subscribe Our Newsletter</h4>
                <p>
                  Subscribe newsletter to get offers and about new places to
                  discover.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mail_form">
                <div className="row no-gutters">
                  <div className="col-lg-9 col-md-8">
                    <div className="newsletter_field">
                      <input type="email" placeholder="Your mail" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="newsletter_btn">
                      <button className="boxed-btn4 " type="submit">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* newletter_area_end  */}
  <div className="popular_places_area">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="section_title text-center mb_70">
            <h3>Popular Places</h3>
            <p>
              Suffered alteration in some form, by injected humour or good day
              randomised booth anim 8-bit hella wolf moon beard words.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/1.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>California</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/2.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>Korola Megna</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/3.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>London</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/4.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>Miami Beach</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/5.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>California</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_place">
            <div className="thumb">
              <img src="img/place/6.png" alt="" />
              <a href="#" className="prise">
                $500
              </a>
            </div>
            <div className="place_info">
              <a href="destination_details.html">
                <h3>Saintmartine Iceland</h3>
              </a>
              <p>United State of America</p>
              <div className="rating_days d-flex justify-content-between">
                <span className="d-flex justify-content-center align-items-center">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <a href="#">(20 Review)</a>
                </span>
                <div className="days">
                  <i className="fa fa-clock-o" />
                  <a href="#">5 Days</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="more_place_btn text-center">
            <a className="boxed-btn4" href="#">
              More Places
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="video_area video_bg overlay">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="video_wrap text-center">
            <h3>Enjoy Video</h3>
            <div className="video_icon">
              <a
                className="popup-video video_play_button"
                href="https://www.youtube.com/watch?v=f59dDEk57i0"
              >
                <i className="fa fa-play" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="travel_variation_area">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="single_travel text-center">
            <div className="icon">
              <img src="img/svg_icon/1.svg" alt="" />
            </div>
            <h3>Comfortable Journey</h3>
            <p>
              A wonderful serenity has taken to the possession of my entire
              soul.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_travel text-center">
            <div className="icon">
              <img src="img/svg_icon/2.svg" alt="" />
            </div>
            <h3>Luxuries Hotel</h3>
            <p>
              A wonderful serenity has taken to the possession of my entire
              soul.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single_travel text-center">
            <div className="icon">
              <img src="img/svg_icon/3.svg" alt="" />
            </div>
            <h3>Travel Guide</h3>
            <p>
              A wonderful serenity has taken to the possession of my entire
              soul.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* testimonial_area  */}
  <div className="testimonial_area">
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="testmonial_active owl-carousel">
            <div className="single_carousel">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="single_testmonial text-center">
                    <div className="author_thumb">
                      <img src="img/testmonial/author.png" alt="" />
                    </div>
                    <p>
                      "Working in conjunction with humanitarian aid agencies, we
                      have supported programmes to help alleviate human
                      suffering.
                    </p>
                    <div className="testmonial_author">
                      <h3>- Micky Mouse</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single_carousel">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="single_testmonial text-center">
                    <div className="author_thumb">
                      <img src="img/testmonial/author.png" alt="" />
                    </div>
                    <p>
                      "Working in conjunction with humanitarian aid agencies, we
                      have supported programmes to help alleviate human
                      suffering.
                    </p>
                    <div className="testmonial_author">
                      <h3>- Tom Mouse</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single_carousel">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="single_testmonial text-center">
                    <div className="author_thumb">
                      <img src="img/testmonial/author.png" alt="" />
                    </div>
                    <p>
                      "Working in conjunction with humanitarian aid agencies, we
                      have supported programmes to help alleviate human
                      suffering.
                    </p>
                    <div className="testmonial_author">
                      <h3>- Jerry Mouse</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /testimonial_area  */}
</>

    </>
  );
}

export default Home;
