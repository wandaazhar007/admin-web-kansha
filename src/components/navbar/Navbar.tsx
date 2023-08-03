import './navbar.scss';

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="logo">
        <img src="./logo-kansha-header.png" />
      </div>
      <div className="links">
        <img src="/search.svg" className="icon" />
        <img src="/app.svg" className="icon" />
        <img src="expand.svg" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/wanda-azhar.jpg" alt="" />
          <span>Wanda</span>
        </div>
        <img src="settings.svg" className="icon" />
      </div>
    </section>
  );
}

export default Navbar;