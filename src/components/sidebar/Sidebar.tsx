import { Link } from "react-router-dom";
import { menu } from "../../data";
import './sidebar.scss';
import { SidebarContext } from "../../context/SidebarContext";
import { useContext } from "react";

const Sidebar: React.FC = () => {

  const sidebarToggle: any = useContext(SidebarContext);
  const handleSidebar = () => {
    sidebarToggle.triggerSidebar();
  }
  const active = sidebarToggle.active;

  return (
    <div className={`sidebarContainer ${active ? 'on' : ''}`}>
      <section className="sidebar">
        {menu.map((item) => (
          <div className="item" key={item.id}>
            <div className="title">{item.title}</div>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem " key={listItem.id}>
                <img src={listItem.icon} />
                <span className="listItemTitle" onClick={() => handleSidebar()}>{listItem.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Sidebar;