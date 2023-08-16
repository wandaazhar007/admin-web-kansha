import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.scss';
import { faAngleDown, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { SidebarContext } from '../../context/SidebarContext';
import { NavbarContext } from '../../context/NavbarContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const navbarToggle: any = useContext(NavbarContext);
  const activeNavbar = navbarToggle.active;
  const triggerNavbar = navbarToggle.triggerNavbar;

  const sidebarToggle: any = useContext(SidebarContext);
  const activeSidebar = sidebarToggle.active;
  const triggerSidebar = sidebarToggle.triggerSidebar;

  const [name, setname] = useState("");
  // const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");
  // const [role, setRole] = useState("");
  // const [expire, setExpire] = useState<number>(0);
  const [urlImage, setUrlImage] = useState("");

  const refreshToken = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TOKEN);
      // setToken(response.data.accessToken);
      console.log('data login', response.data)
      const decoded: any = jwt_decode(response.data.accessToken);
      // console.log(response.data.accessToken)
      console.log(decoded)
      setname(decoded.name);
      // setEmail(decoded.email);
      // setRole
      // setExpire(decoded.exp);
      setUrlImage(decoded.urlImage)
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        navigate('/login');
      }
    }
  }

  const handleLogout = async () => {
    console.log('logout')
    try {
      await axios.delete(import.meta.env.VITE_LOGOUT);
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    refreshToken();
  }, [])

  return (
    <section className="navbar">
      <div className="logo">
        <img src="./logo-kansha-header.png" />
      </div>
      <div className={`links  ${activeNavbar ? 'on' : ''}`}>
        {/* <img src="/search.svg" className="icon" /> */}
        {/* <img src="expand.svg" className="icon" /> */}
        {/* <img src="settings.svg" className="icon"/> */}
        {/* <div className="icon notification">
          <img src="/notifications.svg" />
          <span>1</span>
        </div> */}
        <img src="/logout.png" className="icon" onClick={handleLogout} />
        <div className="icon user">
          <img src={urlImage} alt="" />
          <span>{name}</span>
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