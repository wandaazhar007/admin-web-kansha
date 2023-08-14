import { Link } from "react-router-dom";
import { menu } from "../../data";
import './sidebar.scss';

const Sidebar: React.FC = () => {
  return (
    <section className="sidebar">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <div className="title">{item.title}</div>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem " key={listItem.id}>
              <img src={listItem.icon} />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Sidebar;