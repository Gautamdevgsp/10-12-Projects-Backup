import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CategoryService from '../../../services/CategoryService'
import ArtworkService from '../../../services/ArtworkService'

function Home() {
  const [categories, setCategories] = useState([])
  const [artworks, setArtworks] = useState([])

  async function loadData() {
    const cats = await CategoryService.getActive()
    setCategories(cats.slice(0, 3))
    const arts = await ArtworkService.getActive()
    setArtworks(arts.slice(0, 3))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
    <>
  {/*================Home Banner Area =================*/}
  <section className="home_banner_area">
    <div className="banner_inner">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="banner_content">
              <h2>
                Discover the Beauty of <br />
                Fine Art
              </h2>
              <p>
                Explore our curated collection of stunning artworks. From oil
                paintings to abstract masterpieces, find the perfect piece to
                transform your space.
              </p>
              <Link className="banner_btn" to="/artworks">
                Browse Collection
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="home_right_box">
              <div className="home_item">
                <i className="flaticon-sofa" />
              </div>
              <div className="home_item">
                <i className="flaticon-bed" />
              </div>
              <div className="home_item">
                <i className="flaticon-computer" />
              </div>
              <div className="home_item">
                <i className="flaticon-mirror" />
              </div>
              <div className="home_item">
                <i className="flaticon-closet" />
              </div>
              <div className="home_item">
                <i className="flaticon-kitchen" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================End Home Banner Area =================*/}

  {/*================Categories Area =================*/}
  <section className="furniture_area p_120">
    <div className="container">
      <div className="main_title">
        <h2>Browse Categories</h2>
        <p>
          Explore our diverse collection of art categories. Each category
          features carefully curated works from talented artists around the
          world.
        </p>
      </div>
      <div className="furniture_inner row">
        {categories.length > 0 ? categories.map((cat) => (
          <div className="col-lg-4" key={cat.id}>
            <div className="furniture_item">
              <h4>{cat.name}</h4>
              <p>{cat.description}</p>
              <Link to={`/artworks?category=${cat.id}`} className="btn submit_btn" style={{borderRadius:0}}>
                View Artworks
              </Link>
            </div>
          </div>
        )) : (
          <>
            <div className="col-lg-4">
              <div className="furniture_item">
                <h4>Oil Painting</h4>
                <p>Rich textures and vibrant colors brought to life on canvas through the timeless technique of oil painting.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="furniture_item">
                <h4>Abstract Art</h4>
                <p>Express your emotions through bold abstract compositions that challenge conventional perspectives.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="furniture_item">
                <h4>Portrait</h4>
                <p>Stunning portraits that capture the essence and personality of their subjects with remarkable detail.</p>
              </div>
            </div>
          </>
        )}
      </div>
      {categories.length > 0 && (
        <div className="text-center mt-4">
          <Link to="/categories" className="main_btn">View All Categories</Link>
        </div>
      )}
    </div>
  </section>
  {/*================End Categories Area =================*/}

  {/*================Featured Artworks Area =================*/}
  <section className="projects_area">
    <div className="row m0">
      {artworks.length > 0 ? artworks.map((art) => (
        <div className="projects_item wd_44" key={art.id}>
          <img src={art.imageUrl || "img/projects/projects-3.jpg"} alt={art.title} />
          <div className="hover">
            <h4>{art.title}</h4>
            <p>by {art.artistName} - &#8377;{art.price}</p>
            <Link to={`/artwork/${art.id}`} className="main_btn" style={{borderRadius:0, padding:'10px 25px', fontSize:14}}>View Details</Link>
          </div>
        </div>
      )) : (
        <>
          <div className="projects_item wd_18">
            <img src="img/projects/projects-1.jpg" alt="" />
            <div className="hover">
              <h4>Oil Painting Collection</h4>
              <p>Discover our curated selection of oil paintings from renowned artists.</p>
            </div>
          </div>
          <div className="projects_item wd_18">
            <img src="img/projects/projects-2.jpg" alt="" />
            <div className="hover">
              <h4>Abstract Masterpieces</h4>
              <p>Bold and expressive abstract art that pushes creative boundaries.</p>
            </div>
          </div>
          <div className="projects_item wd_44">
            <img src="img/projects/projects-3.jpg" alt="" />
            <div className="hover">
              <h4>Featured Collection</h4>
              <p>Our most celebrated artworks handpicked for discerning collectors.</p>
            </div>
          </div>
          <div className="projects_item wd_18">
            <img src="img/projects/projects-4.jpg" alt="" />
            <div className="hover">
              <h4>Portrait Gallery</h4>
              <p>Stunning portraits that capture life in remarkable detail.</p>
            </div>
          </div>
        </>
      )}
    </div>
    {artworks.length > 0 && (
      <div className="text-center mt-4 pb-5">
        <Link to="/artworks" className="main_btn">View All Artworks</Link>
      </div>
    )}
  </section>
  {/*================End Featured Artworks Area =================*/}

  {/*================Feature Area =================*/}
  <section className="feature_area p_120">
    <div className="container">
      <div className="main_title">
        <h2>Why Choose Art Gallery</h2>
        <p>
          We bring you the finest artworks from talented artists around the
          world. Every piece is carefully curated for quality and authenticity.
        </p>
      </div>
      <div className="row feature_inner">
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-user" />
              Expert Artists
            </h4>
            <p>
              Every artwork in our collection is created by talented and
              experienced artists from around the globe.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-license" />
              Authentic Art
            </h4>
            <p>
              We guarantee the authenticity and originality of every piece
              in our collection.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-phone" />
              Great Support
            </h4>
            <p>
              Our team is always ready to help you find the perfect artwork
              and assist with your purchase.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-rocket" />
              Fast Delivery
            </h4>
            <p>
              Professional packaging and insured delivery to ensure your
              artwork arrives safely.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-diamond" />
              Custom Orders
            </h4>
            <p>
              Get bespoke paintings created specifically for your space
              and personal style.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="feature_item">
            <h4>
              <i className="lnr lnr-bubble" />
              Customer Reviews
            </h4>
            <p>
              Read reviews from our satisfied customers who have found
              their perfect artwork.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================End Feature Area =================*/}

  {/*================Impress Area =================*/}
  <section className="impress_area p_120">
    <div className="container">
      <div className="impress_inner text-center">
        <h2>
          Looking for a <br />
          Custom Painting?
        </h2>
        <p>
          Let our talented artists create a one-of-a-kind masterpiece
          tailored to your vision. Share your ideas and we will bring them
          to life on canvas.
        </p>
        <Link className="main_btn" to="/custom-painting">
          Request Custom Painting
        </Link>
      </div>
    </div>
  </section>
  {/*================End Impress Area =================*/}

  {/*================Our Blog Area =================*/}
  <section className="our_blog_area p_120">
    <div className="container">
      <div className="main_title">
        <h2>Art World Insights</h2>
        <p>
          Stay updated with the latest trends, techniques, and stories
          from the world of art and creativity.
        </p>
      </div>
      <div className="blog_inner row">
        <div className="col-lg-4">
          <div className="o_blog_item">
            <div className="blog_img">
              <img className="img-fluid" src="img/our-blog/our-blog-1.jpg" alt="" />
            </div>
            <div className="blog_text">
              <div className="blog_cat">
                <a className="active" href="#">Art</a>
                <a href="#">Lifestyle</a>
              </div>
              <a href="#">
                <h4>The Rise of Digital Art</h4>
              </a>
              <p>
                Digital art is transforming the creative landscape, offering
                new possibilities for artists and collectors alike.
              </p>
              <a className="date" href="#">31st January, 2024</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="o_blog_item">
            <div className="blog_img">
              <img className="img-fluid" src="img/our-blog/our-blog-2.jpg" alt="" />
            </div>
            <div className="blog_text">
              <div className="blog_cat">
                <a className="active" href="#">Painting</a>
                <a href="#">Tips</a>
              </div>
              <a href="#">
                <h4>Choosing Art for Your Home</h4>
              </a>
              <p>
                Finding the perfect piece of art for your living space can
                transform the entire atmosphere of your home.
              </p>
              <a className="date" href="#">15th February, 2024</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="o_blog_item">
            <div className="blog_img">
              <img className="img-fluid" src="img/our-blog/our-blog-3.jpg" alt="" />
            </div>
            <div className="blog_text">
              <div className="blog_cat">
                <a className="active" href="#">Collecting</a>
                <a href="#">Guide</a>
              </div>
              <a href="#">
                <h4>Starting Your Art Collection</h4>
              </a>
              <p>
                Building an art collection is a rewarding journey. Learn
                how to begin curating your personal gallery.
              </p>
              <a className="date" href="#">28th March, 2024</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================End Our Blog Area =================*/}

  {/*================Clients Logo Area =================*/}
  <section className="clients_logo_area p_120">
    <div className="container">
      <div className="clients_slider owl-carousel">
        <div className="item">
          <img src="img/clients-logo/c-logo-1.png" alt="" />
        </div>
        <div className="item">
          <img src="img/clients-logo/c-logo-2.png" alt="" />
        </div>
        <div className="item">
          <img src="img/clients-logo/c-logo-3.png" alt="" />
        </div>
        <div className="item">
          <img src="img/clients-logo/c-logo-4.png" alt="" />
        </div>
        <div className="item">
          <img src="img/clients-logo/c-logo-5.png" alt="" />
        </div>
      </div>
    </div>
  </section>
  {/*================End Clients Logo Area =================*/}
</>

    </>
  )
}

export default Home
