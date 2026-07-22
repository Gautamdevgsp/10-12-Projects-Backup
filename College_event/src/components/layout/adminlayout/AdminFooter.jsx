import React from 'react'

function AdminFooter() {
  return (
        <>
  <footer className="footer-main">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="block text-center">
            <div className="footer-logo">
              <img
                src="/images/footer-logo.png"
                alt="logo"
                className="img-fluid"
              />
            </div>
            <ul className="social-links-footer list-inline">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-rss" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-vimeo" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Subfooter */}
  <footer className="subfooter">
    <div className="container">
      <div className="row">
        <div className="col-md-6 align-self-center">
          <div className="copyright-text">
            <p>
              <a href="#">Eventre</a> © 2017 All Right Reserved
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <a href="#" className="to-top">
            <i className="fa fa-angle-up" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</>
  )
}

export default AdminFooter