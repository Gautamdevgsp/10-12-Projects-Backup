import React from 'react'

function Home() {
  return (
    <>
    
   
  {/* ============================================================
   FIX 1 � SEARCH OVERLAY POPUP
   ============================================================ */}
  <div id="searchOv">
    <button className="sovclose" id="searchClose">
      <i className="fas fa-times" />
    </button>
    <div className="sovbox">
      <h4>What are you craving today?</h4>
      <div className="sovinput">
        <input
          type="text"
          id="searchInput"
          placeholder="Search burgers, pizza, chicken..."
          autoComplete="off"
        />
        <button>
          <i className="fas fa-search" />
        </button>
      </div>
      {/* Categories inside search box */}
      <div className="sovcats">
        <div className="sovcat active" data-cat="all">
          <img src="img/menu/1.jpg" alt="" />
          All Items
        </div>
        <div className="sovcat" data-cat="burgers">
          <img src="img/menu/1.jpg" alt="" />
          Burgers
        </div>
        <div className="sovcat" data-cat="pizza">
          <img src="img/menu/2.jpg" alt="" />
          Pizza
        </div>
        <div className="sovcat" data-cat="chicken">
          <img src="img/menu/3.jpg" alt="" />
          Chicken
        </div>
        <div className="sovcat" data-cat="wraps">
          <img src="img/menu/4.jpg" alt="" />
          Wraps
        </div>
        <div className="sovcat" data-cat="pasta">
          <img src="img/menu/5.jpg" alt="" />
          Pasta
        </div>
        <div className="sovcat" data-cat="desserts">
          <img src="img/menu/6.jpg" alt="" />
          Desserts
        </div>
      </div>
      <div className="sovtrend">
        <p>
          <i
            className="fas fa-fire me-1"
            style={{ color: "var(--secondary)" }}
          />
          Trending Searches
        </p>
        <span className="ttag">Smash Burger</span>
        <span className="ttag">Nashville Chicken</span>
        <span className="ttag">Truffle Pizza</span>
        <span className="ttag">Lava Cake</span>
        <span className="ttag">Loaded Fries</span>
        <span className="ttag">Mango Shake</span>
      </div>
    </div>
  </div>
  {/* ============================================================
   HERO
   ============================================================ */}
  <section id="hero">
    <div className="hs hs1" />
    <div className="hs hs2" />
    <div className="hbgtxt">FOOD</div>
    <div className="container">
      <div className="row align-items-center g-5" style={{ minHeight: "88vh" }}>
        <div className="col-lg-6">
          <div className="hbadge">
            <div className="hbi">
              <i className="fas fa-star" />
            </div>
            <span>#1 Rated Fast Food Restaurant in New York</span>
          </div>
          <h1 className="htitle">
            Delicious <span className="hl">Fast Food</span>
            <br />
            for Every Moment
          </h1>
          <p className="hdesc">
            Experience bold flavors crafted from premium ingredients. From
            crispy burgers to gourmet pizzas - every bite is an adventure worth
            savoring.
          </p>
          <div className="d-flex flex-wrap gap-3 mb-2">
            <a href="#menu" className="btn-red">
              <i className="fas fa-utensils" />
              Explore Menu
            </a>
            {/* FIX 2: Magnific popup video trigger */}
            <a
              href="https://www.youtube.com/watch?v=RXv_uIN6e-Y"
              className="magnific_popup btn-play popup-youtube"
            >
              <div className="pico">
                <i className="fas fa-play" />
              </div>
              <span>Watch Our Story</span>
            </a>
          </div>
          <div className="hstats d-flex gap-3 flex-wrap mt-4">
            <div className="hstat">
              <span className="snum">
                850<em>+</em>
              </span>
              <small>Happy Customers</small>
            </div>
            <div className="sdiv" />
            <div className="hstat">
              <span className="snum">
                120<em>+</em>
              </span>
              <small>Menu Items</small>
            </div>
            <div className="sdiv" />
            <div className="hstat">
              <span className="snum">
                15<em>+</em>
              </span>
              <small>Expert Chefs</small>
            </div>
            <div className="sdiv" />
            <div className="hstat">
              <span className="snum">
                12<em>yr</em>
              </span>
              <small>Experience</small>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div style={{ position: "relative", textAlign: "center" }}>
            <div className="hcircle">
              <img src="img/banner-img.jpg" alt="Burger" />
            </div>
            <div className="fcard fc1">
              <div className="fcoi r">
                <i className="fas fa-fire" />
              </div>
              <div>
                <span className="fcnum">Hot Deal</span>
                <span className="fcsm">30% off today</span>
              </div>
            </div>
            <div className="fcard fc2">
              <div className="fcoi y">
                <i className="fas fa-star" />
              </div>
              <div>
                <span className="fcnum">4.9/5</span>
                <span className="fcsm">2k+ reviews</span>
              </div>
            </div>
            <div className="fcard fc3">
              <div className="fcoi g">
                <i className="fas fa-clock" />
              </div>
              <div>
                <span className="fcnum">20 min</span>
                <span className="fcsm">Fast delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* MARQUEE */}
  <div className="mqsec">
    <div className="mqtrack">
      <div className="mqitem">
        <i className="fas fa-circle" />
        Crispy Fried Chicken
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Gourmet Burgers
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Artisan Pizzas
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Fresh Wraps &amp; Rolls
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Loaded Fries
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Ice Cream Shakes
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Grilled Sandwiches
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Crispy Fried Chicken
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Gourmet Burgers
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Artisan Pizzas
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Fresh Wraps &amp; Rolls
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Loaded Fries
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Ice Cream Shakes
      </div>
      <div className="mqitem">
        <i className="fas fa-circle" />
        Grilled Sandwiches
      </div>
    </div>
  </div>
  {/* CATEGORY */}
  <section id="category">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">What We Offer</span>
        <h2 className="stitle">
          Browse by <span>Category</span>
        </h2>
        <div className="sline" />
        <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
          From sizzling burgers to exotic world cuisines - find your favourite
          in our menu
        </p>
      </div>
      <div className="row g-3 justify-content-center">
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={0}
        >
          <div className="catcard active" data-filter="all">
            <img className="catimg" src="img/category/1.jpg" alt="" />
            <div className="catnm">All Items</div>
            <div className="catct">99 items</div>
          </div>
        </div>
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={70}
        >
          <div className="catcard" data-filter="burgers">
            <img className="catimg" src="img/category/2.jpg" alt="" />
            <div className="catnm">Burgers</div>
            <div className="catct">24 items</div>
          </div>
        </div>
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={140}
        >
          <div className="catcard" data-filter="pizza">
            <img className="catimg" src="img/category/3.jpg" alt="" />
            <div className="catnm">Pizza</div>
            <div className="catct">18 items</div>
          </div>
        </div>
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={210}
        >
          <div className="catcard" data-filter="chicken">
            <img className="catimg" src="img/category/4.jpg" alt="" />
            <div className="catnm">Fried Chicken</div>
            <div className="catct">15 items</div>
          </div>
        </div>
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={280}
        >
          <div className="catcard" data-filter="wraps">
            <img className="catimg" src="img/category/5.jpg" alt="" />
            <div className="catnm">Wraps</div>
            <div className="catct">12 items</div>
          </div>
        </div>
        <div
          className="col-6 col-sm-4 col-md-3 col-lg-2"
          data-aos="zoom-in"
          data-aos-delay={350}
        >
          <div className="catcard" data-filter="desserts">
            <img className="catimg" src="img/category/6.jpg" alt="" />
            <div className="catnm">Desserts</div>
            <div className="catct">20 items</div>
          </div>
        </div>
      </div>
    </div>
  </section>

   <>
  {/* ============================================================
   MENU � FIX 3 (filter works) + FIX 4 (plus opens popup)
   ============================================================ */}
  <section id="menu">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <span className="slbl">What's Cooking</span>
        <h2 className="stitle">
          Our Delicious <span>Menu</span>
        </h2>
        <div className="sline" />
      </div>
      {/* FIX 3 � filter buttons */}
      <div className="text-center mb-4" data-aos="fade-up">
        <button className="filtbtn active" data-f="all">
          All
        </button>
        <button className="filtbtn" data-f="burgers">
          Burgers
        </button>
        <button className="filtbtn" data-f="pizza">
          Pizza
        </button>
        <button className="filtbtn" data-f="chicken">
          Chicken
        </button>
        <button className="filtbtn" data-f="wraps">
          Wraps
        </button>
        <button className="filtbtn" data-f="desserts">
          Desserts
        </button>
        <button className="filtbtn" data-f="pasta">
          Pasta
        </button>
      </div>
      <div className="row g-4" id="mgrid">
        {/* CARD 1: Burgers */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="burgers"
          data-aos="fade-up"
        >
          <div
            className="mcard"
            data-img="img/menu/1.jpg"
            data-title="Classic Smash Burger"
            data-cat="Burgers"
            data-price="₹14.99"
            data-old="₹18.99"
            data-rating="4.9"
            data-reviews={128}
            data-cal={620}
            data-time={12}
            data-desc="Double smashed patty, cheddar cheese, caramelized onions, house pickles and our legendary special sauce. Made fresh to order on a toasted brioche bun."
            data-tags="Spicy,Bestseller,Beef"
          >
            <div className="mimg">
              <img src="img/menu/1.jpg" alt="Smash Burger" />
              <div className="mbdg hot">
                <i className="fas fa-star" /> Hot
              </div>
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Burgers</div>
              <div className="mtit">Classic Smash Burger</div>
              <div className="mdesc">
                Double smashed patty, cheddar, caramelized onions, pickles &amp;
                special sauce
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">
                    ₹14.99 <small>₹18.99</small>
                  </div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (128)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD 2: Pizza */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="pizza"
          data-aos="fade-up"
          data-aos-delay={80}
        >
          <div
            className="mcard"
            data-img="img/menu/2.jpg"
            data-title="Margherita Royale"
            data-cat="Pizza"
            data-price="₹19.99"
            data-old="₹24.99"
            data-rating="4.8"
            data-reviews={95}
            data-cal={480}
            data-time={18}
            data-desc="San Marzano tomatoes, fresh buffalo mozzarella, fragrant basil leaves, drizzled with Italian truffle oil on a hand-stretched sourdough base."
            data-tags="Vegetarian,New,Italian"
          >
            <div className="mimg">
              <img src="img/menu/2.jpg" alt="Pizza" />
              <div className="mbdg new">
                <i className="fas fa-star" /> New
              </div>
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Pizza</div>
              <div className="mtit">Margherita Royale</div>
              <div className="mdesc">
                San Marzano tomatoes, buffalo mozzarella, basil &amp; truffle
                oil on sourdough
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">
                    ₹19.99 <small>₹24.99</small>
                  </div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (95)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD 3: Chicken */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="chicken"
          data-aos="fade-up"
          data-aos-delay={160}
        >
          <div
            className="mcard"
            data-img="img/menu/3.jpg"
            data-title="Nashville Hot Chicken"
            data-cat="Chicken"
            data-price="₹12.99"
            data-old="₹16.99"
            data-rating={5.0}
            data-reviews={210}
            data-cal={710}
            data-time={15}
            data-desc="Extra-crispy fried chicken tossed in our signature fiery Nashville spice blend, served with honey drizzle and house pickles on a toasted brioche bun."
            data-tags="Spicy,Bestseller,Crispy"
          >
            <div className="mimg">
              <img src="img/menu/3.jpg" alt="Chicken" />
              <div className="mbdg">
                <i className="fas fa-star" /> Best Seller
              </div>
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Chicken</div>
              <div className="mtit">Nashville Hot Chicken</div>
              <div className="mdesc">
                Crispy fried chicken in fiery Nashville spice blend with honey
                drizzle
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">
                    ₹12.99 <small>₹16.99</small>
                  </div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (210)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD 4: Wraps */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="wraps"
          data-aos="fade-up"
        >
          <div
            className="mcard"
            data-img="img/menu/4.jpg"
            data-title="Loaded Fajita Wrap"
            data-cat="Wraps"
            data-price="₹10.99"
            data-old=""
            data-rating="4.5"
            data-reviews={74}
            data-cal={520}
            data-time={10}
            data-desc="Grilled chicken strips, saut�ed bell peppers and onions, sour cream, fresh guacamole and salsa wrapped in a warm flour tortilla with melted cheddar."
            data-tags="Grilled,Fresh,Mexican"
          >
            <div className="mimg">
              <img src="img/menu/4.jpg" alt="Wrap" />
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Wraps</div>
              <div className="mtit">Loaded Fajita Wrap</div>
              <div className="mdesc">
                Grilled chicken, peppers, sour cream &amp; guacamole in a warm
                tortilla
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">₹10.99</div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (74)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD 5: Desserts */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="desserts"
          data-aos="fade-up"
          data-aos-delay={80}
        >
          <div
            className="mcard"
            data-img="img/menu/5.jpg"
            data-title="Nutella Lava Cake"
            data-cat="Desserts"
            data-price="₹8.99"
            data-old="₹11.99"
            data-rating="4.9"
            data-reviews={56}
            data-cal={390}
            data-time={8}
            data-desc="Warm molten chocolate cake with a gooey Nutella center, served alongside Madagascar vanilla bean ice cream with salted caramel drizzle and fresh berries."
            data-tags="Sweet,New,Chocolate"
          >
            <div className="mimg">
              <img src="img/menu/5.jpg" alt="Lava Cake" />
              <div className="mbdg new">
                <i className="fas fa-star" /> New
              </div>
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Desserts</div>
              <div className="mtit">Nutella Lava Cake</div>
              <div className="mdesc">
                Molten chocolate cake with Nutella center, vanilla ice cream
                &amp; caramel
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">
                    ₹8.99 <small>₹11.99</small>
                  </div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (56)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CARD 6: Pasta */}
        <div
          className="col-sm-6 col-lg-4 mwrap"
          data-c="pasta"
          data-aos="fade-up"
          data-aos-delay={160}
        >
          <div
            className="mcard"
            data-img="img/menu/6.jpg"
            data-title="Truffle Mushroom Pasta"
            data-cat="Pasta"
            data-price="₹16.99"
            data-old=""
            data-rating="4.9"
            data-reviews={88}
            data-cal={560}
            data-time={20}
            data-desc="Al dente tagliatelle tossed with mixed wild mushrooms, freshly shaved black truffle, aged parmesan, fresh thyme and a touch of cream in garlic butter."
            data-tags="Vegetarian,Chef's Pick,Italian"
          >
            <div className="mimg">
              <img src="img/menu/6.jpg" alt="Pasta" />
              <div className="mbdg hot">Chef's Pick</div>
              <div className="mhrt">
                <i className="far fa-heart" />
              </div>
            </div>
            <div className="mbody">
              <div className="mcat">Pasta</div>
              <div className="mtit">Truffle Mushroom Pasta</div>
              <div className="mdesc">
                Al dente tagliatelle, wild mushrooms, black truffle, parmesan
                &amp; thyme
              </div>
              <div className="mfoot">
                <div>
                  <div className="mprice">₹16.99</div>
                  <div className="mstars">
                    <i className="fas fa-star" />{" "}
                    <span style={{ color: "#bbb", fontSize: ".7rem" }}>
                      (88)
                    </span>
                  </div>
                </div>
                <button className="madd" title="View Details">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end #mgrid */}
      <div className="text-center mt-5">
        <a href="#" className="btn-red">
          <i className="fas fa-th-large" />
          View Full Menu
        </a>
      </div>
    </div>
  </section>
  {/* ============================================================
   FIX 4 � MENU DETAIL POPUP MODAL
   ============================================================ */}
  <div id="menuPop">
    <div className="mpbox">
      <button className="mpclose" id="mpClose">
        <i className="fas fa-times" />
      </button>
      <div className="mpimg">
        <img id="mpImg" src="" alt="" />
      </div>
      <div className="mpbody">
        <div id="mpCat" />
        <div id="mpTitle" />
        <div id="mpStars" />
        <div id="mpDesc" />
        <div id="mpPrice" />
        <div className="mpmeta" id="mpMeta" />
        <div className="mpqty">
          <button className="mpqbtn" id="mpMinus">
            -
          </button>
          <span className="mpqnum" id="mpQnum">
            1
          </span>
          <button className="mpqbtn" id="mpPlus">
            +
          </button>
          <span style={{ fontSize: ".82rem", color: "#aaa", marginLeft: 9 }}>
            portion
          </span>
        </div>
        <div className="mptags" id="mpTags" />
        <button className="mpaddcart" id="mpAddCart">
          <i className="fas fa-shopping-cart" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  {/* SPECIAL OFFER */}
  <section id="special">
    <div className="spbg" />
    <div className="container" style={{ position: "relative", zIndex: 2 }}>
      <div className="row align-items-center g-5">
        <div className="col-lg-6" data-aos="fade-right">
          <div className="sptag">
            <i className="fas fa-bolt me-1" />
            Limited Time Offer
          </div>
          <h2 className="sptitle">
            Get 30% Off
            <br />
            Our Signature
            <br />
            <span>Burger</span> Meal
          </h2>
          <p className="spdesc">
            Don't miss our weekend special - grab our award-winning signature
            burger combo with loaded fries and a premium shake at an unbeatable
            price.
          </p>
          <div className="cdwrap">
            <div className="cditem">
              <span className="cdnum" id="cdH">
                08
              </span>
              <span className="cdlbl">Hours</span>
            </div>
            <div className="cditem">
              <span className="cdnum" id="cdM">
                45
              </span>
              <span className="cdlbl">Minutes</span>
            </div>
            <div className="cditem">
              <span className="cdnum" id="cdS">
                30
              </span>
              <span className="cdlbl">Seconds</span>
            </div>
          </div>
          <a href="#menu" className="btn-red">
            <i className="fas fa-shopping-cart" />
            Grab the Deal
          </a>
        </div>
        <div className="col-lg-6" data-aos="fade-left">
          <div className="spimgw">
            <div className="spglow" />
            <div className="sppbdg">
              <span className="old">₹24.99</span>
              <span className="np">₹17.49</span>
            </div>
            <img src="img/off-img.jpg" alt="Special Burger" />
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