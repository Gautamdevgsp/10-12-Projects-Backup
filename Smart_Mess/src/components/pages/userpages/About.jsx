import React from 'react'

function About() {
  return (
  <>
  
  <>
  {/* ABOUT */}
  <section id="about">
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-5" data-aos="fade-right">
          <div className="astack">
            <div className="aexp">
              <span className="anum">12+</span>
              <small>
                Years of
                <br />
                Excellence
              </small>
            </div>
            <div className="amain">
              <img src="img/about1.jpg" alt="Restaurant" />
            </div>
            <div className="asm">
              <img src="img/about2.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-7" data-aos="fade-left">
          <span className="slbl">Our Story</span>
          <h2 className="stitle text-start">
            We Invite You to Visit
            <br />
            Our <span>Food Restaurant</span>
          </h2>
          <div className="sline lft" />
          <p className="sdesc mb-4">
            Founded in 2012, Sarab began as a small corner joint with a big
            dream - to serve food that brings people together. Today we're proud
            to serve thousands of happy customers every week with the same
            passion that started it all.
          </p>
          <div className="mb-4">
            <div className="fti">
              <div className="ftico r">
                <i className="fas fa-leaf" />
              </div>
              <div>
                <h6>100% Fresh Ingredients</h6>
                <p>
                  We source locally and sustainably. Every ingredient is
                  hand-picked daily for maximum freshness.
                </p>
              </div>
            </div>
            <div className="fti">
              <div className="ftico y">
                <i className="fas fa-award" />
              </div>
              <div>
                <h6>Award-Winning Recipes</h6>
                <p>
                  Our signature recipes have won national culinary awards 5
                  years in a row.
                </p>
              </div>
            </div>
            <div className="fti">
              <div className="ftico g">
                <i className="fas fa-shipping-fast" />
              </div>
              <div>
                <h6>Lightning-Fast Delivery</h6>
                <p>
                  Order online and get hot, fresh food at your door in under 25
                  minutes, guaranteed.
                </p>
              </div>
            </div>
          </div>
          <a href="#menu" className="btn-red">
            <i className="fas fa-book-open" />
            View Full Menu
          </a>
        </div>
      </div>
    </div>
  </section>
</>

  <>
  {/* ============================================================
   GALLERY � FIX 7 (click opens detail popup)
   ============================================================ */}
  <section id="gallery">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">Food Showcase</span>
        <h2 className="stitle">
          Let's See Our <span>Fast Food</span>
        </h2>
        <div className="sline" />
      </div>
      <div className="ggrid" data-aos="fade-up">
        <div
          className="gitem"
          data-gi={0}
          data-gimg="img/portfolio/work1.jpg"
          data-gtitle="Gourmet Burgers"
          data-gdesc="Our award-winning smash burgers, hand-crafted with 100% premium beef, aged cheddar and house-made sauces."
        >
          <img src="img/portfolio/work1.jpg" alt="Burgers" />
          <div className="gover">
            <span>
              <i className="fas fa-expand-alt" /> Gourmet Burgers
            </span>
          </div>
        </div>
        <div
          className="gitem"
          data-gi={1}
          data-gimg="img/portfolio/work2.jpg"
          data-gtitle="Wood-Fired Pizza"
          data-gdesc="Authentic Neapolitan-style pizzas fired at 900deg F in our wood-burning stone oven for the perfect char."
        >
          <img src="img/portfolio/work2.jpg" alt="Pizza" />
          <div className="gover">
            <span>
              <i className="fas fa-expand-alt" /> Wood-Fired Pizza
            </span>
          </div>
        </div>
        <div
          className="gitem"
          data-gi={2}
          data-gimg="img/portfolio/work3.jpg"
          data-gtitle="Crispy Fried Chicken"
          data-gdesc="Double-brined, hand-battered chicken fried to golden perfection using our 15-spice secret blend."
        >
          <img src="img/portfolio/work3.jpg" alt="Chicken" />
          <div className="gover">
            <span>
              <i className="fas fa-expand-alt" /> Crispy Fried Chicken
            </span>
          </div>
        </div>
        <div
          className="gitem"
          data-gi={3}
          data-gimg="img/portfolio/work4.jpg"
          data-gtitle="Sweet Desserts"
          data-gdesc="Handcrafted desserts - from molten lava cakes to artisan ice cream sundaes and seasonal pastries."
        >
          <img src="img/portfolio/work4.jpg" alt="Desserts" />
          <div className="gover">
            <span>
              <i className="fas fa-expand-alt" /> Sweet Desserts
            </span>
          </div>
        </div>
        <div
          className="gitem"
          data-gi={4}
          data-gimg="img/portfolio/work5.jpg"
          data-gtitle="Fresh Wraps & Rolls"
          data-gdesc="Loaded fresh wraps packed with grilled proteins, crunchy vegetables and our house-made sauces."
        >
          <img src="img/portfolio/work5.jpg" alt="Wraps" />
          <div className="gover">
            <span>
              <i className="fas fa-expand-alt" /> Fresh Wraps &amp; Rolls
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* FIX 7 � GALLERY POPUP */}
  <div id="galPop">
    <div className="gpbox">
      <button className="gpclose" id="gpClose">
        <i className="fas fa-times" />
      </button>
      <img id="gpImg" src="" alt="" />
      <div className="gpcap">
        <h5 id="gpTitle" />
        <p id="gpDesc" />
      </div>
      <div className="gpnav">
        <button id="gpPrev">
          <i className="fas fa-chevron-left me-1" />
          Prev
        </button>
        <button id="gpNext">
          Next <i className="fas fa-chevron-right ms-1" />
        </button>
      </div>
    </div>
  </div>
  {/* ============================================================
   HISTORY � FIX 8 (alternating left/right text)
   ============================================================ */}
  <section id="history">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">Our Journey</span>
        <h2 className="stitle">
          A History of <span>Restaurant</span>
        </h2>
        <div className="sline" />
        <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
          From humble beginnings to the city's most beloved restaurant - every
          chapter written with passion.
        </p>
      </div>
      <div className="timeline" data-aos="fade-up">
        {/* ODD ? text on LEFT */}
        <div className="tli">
          <div className="tl-left">
            <div className="tlyear">2012</div>
            <h5>Evolution of Restaurants</h5>
            <p>
              Sarab opens its first 20-seat diner on Flavor Street. Within 3
              months, lines stretch around the block every evening as word of
              our food spreads.
            </p>
          </div>
          <div className="tl-center">
            <div className="tldot" />
          </div>
          <div className="tl-right">
            <div className="tlyear">2012</div>
            <h5>Evolution of Restaurants</h5>
            <p>
              Sarab opens its first 20-seat diner on Flavor Street. Within 3
              months, lines stretch around the block every evening as word of
              our food spreads.
            </p>
          </div>
        </div>
        {/* EVEN ? text on RIGHT */}
        <div className="tli">
          <div className="tl-left">
            <div className="tlyear">2015</div>
            <h5>Fine Dining &amp; The Concept</h5>
            <p>
              Expanding the vision - we introduced our signature tasting menu
              and hired our first Michelin-trained chef, elevating our craft to
              remarkable new heights.
            </p>
          </div>
          <div className="tl-center">
            <div className="tldot" />
          </div>
          <div className="tl-right">
            <div className="tlyear">2015</div>
            <h5>Fine Dining &amp; The Concept</h5>
            <p>
              Expanding the vision - we introduced our signature tasting menu
              and hired our first Michelin-trained chef, elevating our craft to
              remarkable new heights.
            </p>
          </div>
        </div>
        {/* ODD ? text on LEFT */}
        <div className="tli">
          <div className="tl-left">
            <div className="tlyear">2019</div>
            <h5>Modern Fast Food Origins</h5>
            <p>
              Launched our signature fast-food line, merging gourmet quality
              with speed and convenience. Within 6 months we won 3 prestigious
              culinary awards nationally.
            </p>
          </div>
          <div className="tl-center">
            <div className="tldot" />
          </div>
          <div className="tl-right">
            <div className="tlyear">2019</div>
            <h5>Modern Fast Food Origins</h5>
            <p>
              Launched our signature fast-food line, merging gourmet quality
              with speed and convenience. Within 6 months we won 3 prestigious
              culinary awards nationally.
            </p>
          </div>
        </div>
        {/* EVEN ? text on RIGHT */}
        <div className="tli">
          <div className="tl-left">
            <div className="tlyear">2026</div>
            <h5>National Expansion</h5>
            <p>
              Now operating in 8 cities across the US with an online delivery
              platform handling 10,000+ orders weekly - and growing every single
              day.
            </p>
          </div>
          <div className="tl-center">
            <div className="tldot" />
          </div>
          <div className="tl-right">
            <div className="tlyear">2026</div>
            <h5>National Expansion</h5>
            <p>
              Now operating in 8 cities across the US with an online delivery
              platform handling 10,000+ orders weekly - and growing every single
              day.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* CHEFS */}
  <section id="chefs">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">The Culinary Team</span>
        <h2 className="stitle">
          Meet Our Expert <span>Chefs</span>
        </h2>
        <div className="sline" />
      </div>
      <div className="row g-4">
        <div
          className="col-sm-6 col-lg-3"
          data-aos="fade-up"
          data-aos-delay={0}
        >
          <div className="chcard">
            <div className="chimg">
              <img src="img/chefs/1.jpg" alt="" />
              <div className="chsoc">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
            <div className="chbody">
              <div className="chnm">Alice Mortal</div>
              <div className="chrole">Head Chef</div>
              <div className="chexp">12 years experience</div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-6 col-lg-3"
          data-aos="fade-up"
          data-aos-delay={80}
        >
          <div className="chcard">
            <div className="chimg">
              <img src="img/chefs/2.jpg" alt="" />
              <div className="chsoc">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
            <div className="chbody">
              <div className="chnm">Michael Corn</div>
              <div className="chrole">Grill Master</div>
              <div className="chexp">8 years experience</div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-6 col-lg-3"
          data-aos="fade-up"
          data-aos-delay={160}
        >
          <div className="chcard">
            <div className="chimg">
              <img src="img/chefs/3.jpg" alt="" />
              <div className="chsoc">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
            <div className="chbody">
              <div className="chnm">Faz Chowdel</div>
              <div className="chrole">Pastry Chef</div>
              <div className="chexp">10 years experience</div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-6 col-lg-3"
          data-aos="fade-up"
          data-aos-delay={240}
        >
          <div className="chcard">
            <div className="chimg">
              <img src="img/chefs/4.jpg" alt="" />
              <div className="chsoc">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            </div>
            <div className="chbody">
              <div className="chnm">William Latnum</div>
              <div className="chrole">Pizza Artisan</div>
              <div className="chexp">9 years experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* HOURS */}
  <section id="hours">
    <div className="hrsbg" />
    <div className="container" style={{ position: "relative", zIndex: 2 }}>
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl" style={{ color: "#a5d6bc" }}>
          Opening Hours
        </span>
        <h2 className="stitle" style={{ color: "#fff" }}>
          We're Open <span style={{ color: "var(--secondary)" }}>For You</span>
        </h2>
        <div className="sline" />
      </div>
      <div className="row g-4 align-items-start">
        <div className="col-lg-5" data-aos="fade-right">
          <div className="hrscard">
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-calendar-day me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Monday - Tuesday
              </span>
              <div className="d-flex align-items-center gap-2">
                <div className="hdot off" />
                <span className="hrstime" style={{ color: "#ff6b6b" }}>
                  Closed
                </span>
              </div>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-calendar-day me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Wednesday - Thursday
              </span>
              <div className="d-flex align-items-center gap-2">
                <div className="hdot on" />
                <span className="hrstime">09:00 AM - 10:00 PM</span>
              </div>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-calendar-day me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Friday
              </span>
              <div className="d-flex align-items-center gap-2">
                <div className="hdot on" />
                <span className="hrstime">09:00 AM - 11:00 PM</span>
              </div>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-calendar-day me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Saturday
              </span>
              <div className="d-flex align-items-center gap-2">
                <div className="hdot on" />
                <span className="hrstime">10:00 AM - 11:30 PM</span>
              </div>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-calendar-day me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Sunday
              </span>
              <div className="d-flex align-items-center gap-2">
                <div className="hdot on" />
                <span className="hrstime">11:00 AM - 09:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3" data-aos="zoom-in">
          <div className="hrscta">
            <i
              className="fas fa-truck-fast fa-2x mb-3"
              style={{ color: "rgba(255,255,255,.8)" }}
            />
            <h4>Order Online</h4>
            <p>Get hot food delivered in 25 minutes</p>
            <a href="#menu" className="btnw">
              Order Now ?
            </a>
          </div>
        </div>
        <div className="col-lg-4" data-aos="fade-left">
          <div className="hrscard">
            <h5
              style={{
                color: "#fff",
                marginBottom: 18,
                fontFamily: '"Poppins",sans-serif',
                fontSize: ".95rem",
                fontWeight: 700
              }}
            >
              <i
                className="fas fa-map-marker-alt me-2"
                style={{ color: "var(--secondary)" }}
              />
              Find Us
            </h5>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-location-dot me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Address
              </span>
              <span className="hrstime" style={{ fontSize: ".8rem" }}>
                42 Flavor Street, NY
              </span>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-phone me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Phone
              </span>
              <span className="hrstime" style={{ fontSize: ".8rem" }}>
                +1 (800) 123-4567
              </span>
            </div>
            <div className="hrsrow">
              <span className="hrsday">
                <i
                  className="fas fa-envelope me-2"
                  style={{ color: "var(--secondary)" }}
                />
                Email
              </span>
              <span className="hrstime" style={{ fontSize: ".8rem" }}>
                hello@sarabfood.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* TESTIMONIALS */}
  <section id="testimonials">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">What People Say</span>
        <h2 className="stitle">
          Our Customers <span>Feedback</span>
        </h2>
        <div className="sline" />
      </div>
      <div className="swiper tesSwiper" data-aos="fade-up">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="tescard">
              <div className="tesq">"</div>
              <div className="tess">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="testxt">
                Honestly the best burgers I've ever had. The smash burger is
                incredible - perfectly crispy edges, juicy inside, and those
                pickles! We come every Friday now.
              </p>
              <div className="tesauth">
                <img src="img/testimonial/1.jpg" alt="" />
                <div>
                  <div className="tesnm">Monica Wilber</div>
                  <div className="tesrl">Regular Customer</div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="tescard">
              <div className="tesq">"</div>
              <div className="tess">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="testxt">
                Ordered delivery and the food arrived hot and fresh in 22
                minutes. Portions are generous. Sarab has become my go-to
                comfort food spot without question.
              </p>
              <div className="tesauth">
                <img src="img/testimonial/2.jpg" alt="" />
                <div>
                  <div className="tesnm">Cameron Fox</div>
                  <div className="tesrl">Food Blogger</div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="tescard">
              <div className="tesq">"</div>
              <div className="tess">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="testxt">
                The truffle pasta blew my mind. I didn't expect that quality
                from a fast food place. Great ambiance, super friendly staff.
                Highly recommended!
              </p>
              <div className="tesauth">
                <img src="img/testimonial/3.jpg" alt="" />
                <div>
                  <div className="tesnm">Priya Sharma</div>
                  <div className="tesrl">Food Enthusiast</div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="tescard">
              <div className="tesq">"</div>
              <div className="tess">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="testxt">
                Catered our office party of 50 people and everything was
                flawless. Fresh, delicious, on time and well presented.
                Nashville chicken was the absolute star!
              </p>
              <div className="tesauth">
                <img src="img/testimonial/4.jpg" alt="" />
                <div>
                  <div className="tesnm">David Park</div>
                  <div className="tesrl">Corporate Client</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="swiper-pagination mt-4"
          style={{ position: "static" }}
        />
      </div>
    </div>
  </section>
</>

  </>
  )
}

export default About