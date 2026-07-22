function AdminFooter() {
  return (
    <footer className="footer_area p_120">
      <div className="container">
        <div className="row footer_inner">
          <div className="col-lg-12 text-center">
            <p>&copy; {new Date().getFullYear()} Art Gallery Admin Panel. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default AdminFooter;