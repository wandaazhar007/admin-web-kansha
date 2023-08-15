import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.scss';
import { faAngleDown, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from '../../context/SidebarContext';
import { NavbarContext } from '../../context/NavbarContext';
import { useContext } from 'react';

const Navbar: React.FC = () => {
  const navbarToggle: any = useContext(NavbarContext);
  const activeNavbar = navbarToggle.active;
  const triggerNavbar = navbarToggle.triggerNavbar;

  const sidebarToggle: any = useContext(SidebarContext);
  const activeSidebar = sidebarToggle.active;
  const triggerSidebar = sidebarToggle.triggerSidebar;

  return (
    <section className="navbar">
      <div className="logo">
        <img src="./logo-kansha-header.png" />
      </div>
      <div className={`links  ${activeNavbar ? 'on' : ''}`}>
        <img src="/search.svg" className="icon" />
        <img src="/app.svg" className="icon" />
        <img src="expand.svg" className="icon" />
        <img src="settings.svg" className="icon" />
        <div className="icon notification">
          <img src="/notifications.svg" />
          <span>1</span>
        </div>
        <div className="icon user">
          <img src="/wanda-azhar.jpg" alt="" />
          <span>Dave G</span>
        </div>
      </div>
      <div className="toggles">
        {activeSidebar ? (
          <FontAwesomeIcon icon={faClose} className="togglesIcon" onClick={triggerSidebar} />
        ) : (
          <FontAwesomeIcon icon={faBars} className="togglesIcon" onClick={triggerSidebar} />
        )}
        {activeNavbar ? (
          <FontAwesomeIcon icon={faClose} className="togglesIcon" onClick={triggerNavbar} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} className="togglesIcon" onClick={triggerNavbar} />
        )}
      </div>
    </section>
  );
}

export default Navbar;