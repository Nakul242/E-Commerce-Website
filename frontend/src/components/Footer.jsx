import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>ShopSphere</h3>
          <p>Premium products. Fast delivery. Trusted quality.</p>
        </div>

        <div className="footer-right">
          <p>© {new Date().getFullYear()} ShopSphere</p>
          <p>Built with MERN Stack</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
