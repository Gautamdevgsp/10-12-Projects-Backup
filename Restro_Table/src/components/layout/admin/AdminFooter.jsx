function AdminFooter() {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; {new Date().getFullYear()} Restoran, All Right Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminFooter;
