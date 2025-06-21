import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row text-md-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">IHC TEAM</h5>
            <p>
              We are delivering High Quality Resources and information to aid visitors to gain knowledge of Rich India's Heritage and Culture
            </p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Useful links</h5>
            <p><a href="#" className="text-light text-decoration-none">About us</a></p>
            <p><a href="#" className="text-light text-decoration-none">Contact Us</a></p>
            <p><a href="#" className="text-light text-decoration-none">Help</a></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="bi bi-house-fill me-2"></i> WebsiteName</p>
            <p><i className="bi bi-envelope-fill me-2"></i> IHC@example.com</p>
            <p><i className="bi bi-phone-fill me-2"></i> +1 234 567 88</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left">© {new Date().getFullYear()} IHC TEAM. All rights reserved.</p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <a href="#" className="text-light me-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-4"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light me-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
