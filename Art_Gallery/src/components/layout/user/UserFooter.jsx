import React from "react";

function UserFooter() {
  return (
    <>
      <footer className="footer_area p_120">
        <div className="container">
          <div className="row footer_inner">
            <div className="col-lg-5 col-sm-6">
              <aside className="f_widget ab_widget">
                <div className="f_title">
                  <h3>About Me</h3>
                </div>
                <p>
                  Do you want to be even more successful? Learn to love learning
                  and growth. The more effort you put into improving your
                  skills,
                </p>
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </aside>
            </div>
            <div className="col-lg-5 col-sm-6">
              <aside className="f_widget news_widget">
                <div className="f_title">
                  <h3>Newsletter</h3>
                </div>
                <p>Stay updated with our latest trends</p>
                <div id="mc_embed_signup">
                  <form
                    target="_blank"
                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                    method="get"
                    className="subscribe_form relative"
                  >
                    <div className="input-group d-flex flex-row">
                      <input
                        name="EMAIL"
                        placeholder="Enter email address"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Email Address '"
                        required=""
                        type="email"
                      />
                      <button className="btn sub-btn">
                        <span className="lnr lnr-arrow-right" />
                      </button>
                    </div>
                    <div className="mt-10 info" />
                  </form>
                </div>
              </aside>
            </div>
            <div className="col-lg-2">
              <aside className="f_widget social_widget">
                <div className="f_title">
                  <h3>Follow Me</h3>
                </div>
                <p>Let us be social</p>
                <ul className="list">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-behance" />
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default UserFooter;
