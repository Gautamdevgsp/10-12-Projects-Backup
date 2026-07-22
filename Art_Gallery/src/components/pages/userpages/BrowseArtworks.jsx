import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import ArtworkService from "../../../services/ArtworkService";

function BrowseArtworks() {
  const [searchParams] = useSearchParams();
  const [load, setLoad] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadArtworks();
  }, [searchParams.get("category")]);

  const loadArtworks = async () => {
    setLoad(true);
    try {
      const categoryId = searchParams.get("category");
      let data;
      if (categoryId) {
        data = await ArtworkService.getByCategory(categoryId);
      } else {
        data = await ArtworkService.getActive();
      }
      setArtworks(data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const filteredArtworks = artworks.filter((a) =>
    a.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {load && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
          }}
        >
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>BROWSE ARTWORKS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="furniture_area p_120">
        <div className="container">
          <div className="main_title">
            <h2>Artworks</h2>
            <p>Discover unique artworks from talented artists.</p>
          </div>
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="furniture_inner row">
            {filteredArtworks.map((art) => (
              <div className="col-lg-4" key={art.id}>
                <Link to={`/artwork/${art.id}`}>
                  <div className="furniture_item">
                    {art.imageUrl && (
                      <img
                        className="img-fluid"
                        src={art.imageUrl}
                        alt={art.title}
                        style={{ height: 250, width: "100%", objectFit: "cover" }}
                      />
                    )}
                    <h4>{art.title}</h4>
                    <p>Artist: {art.artistName}</p>
                    <p>Price: ₹{art.price}</p>
                  </div>
                </Link>
              </div>
            ))}
            {filteredArtworks.length === 0 && !load && (
              <div className="col-12 text-center">
                <p>No artworks found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BrowseArtworks;
