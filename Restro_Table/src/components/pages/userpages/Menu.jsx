import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TableService from "../../../services/MenuService";
import CategoryService from "../../../services/CategoryService";
import BookingService from "../../../services/OrderService";
import { HashLoader } from "react-spinners";

function Menu() {
  const [tables, setTables] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [fetching, setFetching] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "");

  async function releaseExpired() {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const cur = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    const all = await TableService.all();
    const busy = all.filter(t => t.status === "unavailable");
    if (busy.length === 0) return;
    const bookings = await BookingService.all();
    const active = bookings.filter(b => b.bookingStatus === "Pending" || b.bookingStatus === "Accepted");
    for (const table of busy) {
      const hasActive = active.some(b =>
        b.tableId === table.id &&
        (b.bookingDate > today || (b.bookingDate === today && b.endTime > cur))
      );
      if (!hasActive) await TableService.updateStatus(table.id, "available");
    }
  }

  async function loadData() {
    setFetching(true);
    await releaseExpired();
    const cats = await CategoryService.getActive();
    setCategories(cats);

    const catId = searchParams.get("category");
    let items;
    if (catId) {
      items = await TableService.getByCategory(catId);
      setActiveCategory(catId);
    } else {
      items = await TableService.getAvailable();
    }
    setTables(items);
    setFetching(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const filterByCategory = async (categoryId) => {
    setActiveCategory(categoryId);
    setFetching(true);
    await releaseExpired();
    let items;
    if (categoryId) {
      items = await TableService.getByCategory(categoryId);
    } else {
      items = await TableService.getAvailable();
    }
    setTables(items);
    setFetching(false);
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Tables</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Available Tables</h5>
            <h1 className="mb-5">Book Your Table</h1>
          </div>

        <div className="text-center mb-5">
          <button className={`btn btn-outline-primary m-1 ${!activeCategory ? "active" : ""}`}
            onClick={() => filterByCategory("")}>All</button>
          {categories.map((cat) => (
            <button key={cat.id} className={`btn btn-outline-primary m-1 ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => filterByCategory(cat.id)}>{cat.name}</button>
          ))}
        </div>

        <div className="row g-4">
          {tables.map((table) => (
            <div key={table.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card text-center p-0 border-0 shadow-sm overflow-hidden">
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img src={table.imageUrl || "img/table-placeholder.jpg"} alt={`Table ${table.tableNumber}`}
                    className="w-100 h-100" style={{ objectFit: "cover" }} />
                </div>
                <div className="p-4">
                  <h3 className="card-title">Table {table.tableNumber}</h3>
                  <p className="card-text">
                    <span className="badge bg-info me-2">Capacity: {table.capacity}</span>
                    <span className="badge bg-primary me-2">₹{table.ratePerHour}/hr</span>
                    {table.categoryName && <span className="badge bg-secondary">{table.categoryName}</span>}
                  </p>
                  <p className={`badge ${table.status === "available" ? "bg-success" : "bg-danger"} mb-3`}>
                    {table.status === "available" ? "Available" : "Unavailable"}
                  </p>
                  <br />
                  <Link to={`/book-table/${table.id}`}
                    className={`btn ${table.status === "available" ? "btn-primary" : "btn-secondary disabled"}`}>
                    {table.status === "available" ? "Book Now" : "Not Available"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {tables.length === 0 && (
            <div className="col-12 text-center">
              <p>No tables available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
export default Menu;
