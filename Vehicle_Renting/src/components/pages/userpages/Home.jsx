import React from "react";

function Home() {
  return (
    <>

      {/* banner section start */}
      <div className="banner_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div
                id="banner_slider"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">
                        Car Rent <br />
                        <span style={{ color: "#fe5b29" }}>For You</span>
                      </h1>
                      <p className="banner_text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority
                      </p>
                      <div className="btn_main">
                        <div className="contact_bt">
                          <a href="#">Read More</a>
                        </div>
                        <div className="contact_bt active">
                          <a href="#">Contact Us</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">
                        Car Rent <br />
                        <span style={{ color: "#fe5b29" }}>For You</span>
                      </h1>
                      <p className="banner_text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority
                      </p>
                      <div className="btn_main">
                        <div className="contact_bt">
                          <a href="#">Read More</a>
                        </div>
                        <div className="contact_bt active">
                          <a href="#">Contact Us</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="banner_taital_main">
                      <h1 className="banner_taital">
                        Car Rent <br />
                        <span style={{ color: "#fe5b29" }}>For You</span>
                      </h1>
                      <p className="banner_text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority
                      </p>
                      <div className="btn_main">
                        <div className="contact_bt">
                          <a href="#">Read More</a>
                        </div>
                        <div className="contact_bt active">
                          <a href="#">Contact Us</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#banner_slider"
                  role="button"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left" />
                </a>
                <a
                  className="carousel-control-next"
                  href="#banner_slider"
                  role="button"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="banner_img">
                <img src="images/banner-img.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner section end */}
      {/* about section start */}
      <div className="about_section layout_padding">
        <div className="container">
          <div className="about_section_2">
            <div className="row">
              <div className="col-md-6">
                <div className="image_iman">
                  <img src="images/about-img.png" className="about_img" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="about_taital_box">
                  <h1 className="about_taital">
                    About <span style={{ color: "#fe5b29" }}>Us</span>
                  </h1>
                  <p className="about_text">
                    going to use a passage of Lorem Ipsum, you need to be sure
                    there isn't anything embarrassing hidden in the middle of
                    text. All the Lorem Ipsum generators on the Internet tend to
                    repeat predefined going to use a passage of Lorem Ipsum, you
                    need to be sure there isn't anything embarrassing hidden in
                    the middle of text. All the Lorem Ipsum generators on the
                    Internet tend to repeat predefined{" "}
                  </p>
                  <div className="readmore_btn">
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* about section end */}
      <div className="search_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="search_taital">Search Your Best Cars</h1>
              <p className="search_text">
                Using 'Content here, content here', making it look like readable
              </p>
              {/* select box section start */}
              <div className="container">
                <div className="select_box_section">
                  <div className="select_box_main">
                    <div className="row">
                      <div className="col-md-3 select-outline">
                        <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                          <option value="" disabled="" selected="">
                            Any Brand
                          </option>
                          <option value={1}>Option 1</option>
                          <option value={2}>Option 2</option>
                          <option value={3}>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-3 select-outline">
                        <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                          <option value="" disabled="" selected="">
                            Any type
                          </option>
                          <option value={1}>Option 1</option>
                          <option value={2}>Option 2</option>
                          <option value={3}>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-3 select-outline">
                        <select className="mdb-select md-form md-outline colorful-select dropdown-primary">
                          <option value="" disabled="" selected="">
                            Price
                          </option>
                          <option value={1}>Option 1</option>
                          <option value={2}>Option 2</option>
                          <option value={3}>Option 3</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <div className="search_btn">
                          <a href="#">Search Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* select box section end */}
            </div>
          </div>
        </div>
      </div>
      {/* gallery section start */}
      <div className="gallery_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="gallery_taital">Our best offers</h1>
            </div>
          </div>
          <div className="gallery_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-1.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-2.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-3.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gallery_section_2">
            <div className="row">
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-1.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-2.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery_box">
                  <div className="gallery_img">
                    <img src="images/img-3.png" />
                  </div>
                  <h3 className="types_text">Toyota car</h3>
                  <p className="looking_text">Start per day $4500</p>
                  <div className="read_bt">
                    <a href="#">Book Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gallery section end */}
      {/* choose section start */}
      <div className="choose_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="choose_taital">WHY CHOOSE US</h1>
            </div>
          </div>
          <div className="choose_section_2">
            <div className="row">
              <div className="col-sm-4">
                <div className="icon_1">
                  <img src="images/icon-1.png" />
                </div>
                <h4 className="safety_text">SAFETY &amp; SECURITY</h4>
                <p className="ipsum_text">
                  variations of passages of Lorem Ipsum available, but the
                  majority have{" "}
                </p>
              </div>
              <div className="col-sm-4">
                <div className="icon_1">
                  <img src="images/icon-2.png" />
                </div>
                <h4 className="safety_text">Online Booking</h4>
                <p className="ipsum_text">
                  variations of passages of Lorem Ipsum available, but the
                  majority have{" "}
                </p>
              </div>
              <div className="col-sm-4">
                <div className="icon_1">
                  <img src="images/icon-3.png" />
                </div>
                <h4 className="safety_text">Best Drivers</h4>
                <p className="ipsum_text">
                  variations of passages of Lorem Ipsum available, but the
                  majority have{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* choose section end */}
      {/* client section start */}
      <div className="client_section layout_padding">
        <div className="container">
          <div
            id="custom_slider"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="client_taital">What Says Customers</h1>
                  </div>
                </div>
                <div className="client_section_2">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img1.png" />
                        </div>
                        <h3 className="moark_text">Hannery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img2.png" />
                        </div>
                        <h3 className="moark_text">Channery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="client_taital">What Says Customers</h1>
                  </div>
                </div>
                <div className="client_section_2">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img1.png" />
                        </div>
                        <h3 className="moark_text">Hannery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img2.png" />
                        </div>
                        <h3 className="moark_text">Channery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="client_taital">What Says Customers</h1>
                  </div>
                </div>
                <div className="client_section_2">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img1.png" />
                        </div>
                        <h3 className="moark_text">Hannery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="client_taital_box">
                        <div className="client_img">
                          <img src="images/client-img2.png" />
                        </div>
                        <h3 className="moark_text">Channery</h3>
                        <p className="client_text">
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page
                        </p>
                      </div>
                      <div className="quick_icon">
                        <img src="images/quick-icon.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#custom_slider"
              role="button"
              data-slide="prev"
            >
              <i className="fa fa-angle-left" />
            </a>
            <a
              className="carousel-control-next"
              href="#custom_slider"
              role="button"
              data-slide="next"
            >
              <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
      </div>
      {/* client section end */}
      {/* contact section start */}
      <div className="contact_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="contact_taital">Get In Touch</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="contact_section_2">
            <div className="row">
              <div className="col-md-12">
                <div className="mail_section_1">
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Name"
                    name="Name"
                  />
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Email"
                    name="Email"
                  />
                  <input
                    type="text"
                    className="mail_text"
                    placeholder="Phone Number"
                    name="Phone Number"
                  />
                  <textarea
                    className="massage-bt"
                    placeholder="Massage"
                    rows={5}
                    id="comment"
                    name="Massage"
                    defaultValue={""}
                  />
                  <div className="send_bt">
                    <a href="#">Send</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
