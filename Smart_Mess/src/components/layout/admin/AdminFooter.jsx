import React from 'react'

function AdminFooter() {
  return (
  <>
  
  <>
  {/* FOOTER */}
  <footer>
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-4">
          <div className="fnm">
            Sar<span>ab</span>
          </div>
          <p className="fdesc">
            We bring the world's finest flavors together in a fast, friendly,
            and affordable experience. Every meal crafted with love.
          </p>
          <div className="fsoc">
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-youtube" />
            </a>
            <a href="#">
              <i className="fab fa-tiktok" />
            </a>
          </div>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="ftit">Quick Links</div>
          <ul className="flinks ps-0">
            <li>
              <a href="#hero">
                <i className="fas fa-chevron-right" />
                Home
              </a>
            </li>
            <li>
              <a href="#about">
                <i className="fas fa-chevron-right" />
                About Us
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Our Menu
              </a>
            </li>
            <li>
              <a href="#reservation">
                <i className="fas fa-chevron-right" />
                Reservation
              </a>
            </li>
            <li>
              <a href="#blog">
                <i className="fas fa-chevron-right" />
                Blog
              </a>
            </li>
            <li>
              <a href="#contact-section">
                <i className="fas fa-chevron-right" />
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 col-lg-2">
          <div className="ftit">Our Menu</div>
          <ul className="flinks ps-0">
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Burgers
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Pizza
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Fried Chicken
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Wraps &amp; Rolls
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Pasta
              </a>
            </li>
            <li>
              <a href="#menu">
                <i className="fas fa-chevron-right" />
                Desserts
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-4">
          <div className="ftit">Get In Touch</div>
          <div className="fci">
            <div className="fciico">
              <i className="fas fa-map-marker-alt" />
            </div>
            <div className="fciinfo">
              <strong>Address</strong>42 Flavor Street, Manhattan, NY 10001
            </div>
          </div>
          <div className="fci">
            <div className="fciico">
              <i className="fas fa-phone-alt" />
            </div>
            <div className="fciinfo">
              <strong>Phone</strong>+1 (800) 123-4567
            </div>
          </div>
          <div className="fci">
            <div className="fciico">
              <i className="fas fa-envelope" />
            </div>
            <div className="fciinfo">
              <strong>Email</strong>hello@sarabfood.com
            </div>
          </div>
          <div className="fci">
            <div className="fciico">
              <i className="fas fa-clock" />
            </div>
            <div className="fciinfo">
              <strong>Hours</strong>Wed - Sun: 09 AM - 11 PM
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fbot">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p>
            © 2026 <span>Sarab Restaurant</span>. All Rights Reserved by{" "}
            <a
              target="_blank"
              className="mx-0 fw-bold text-success"
              href="https://bestwpware.com/"
            >
              Bestwpware
            </a>
            . Made with{" "}
            <span>
              <i className="fas fa-heart" />
            </span>{" "}
            <br />
            Distributed by{" "}
            <a
              target="_blank"
              className="mx-0 fw-bold text-success"
              href="https://themewagon.com"
            >
              ThemeWagon
            </a>
          </p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</>

  </>
  )
}

export default AdminFooter