import './categories.scss';
import { useState } from "react";
import FormAddCategory from "../../components/formAddCategory/FormAddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryList from '../../components/categoryList/CategoryList';
const Categories = () => {

  const [buttonAdd, setButtonAdd] = useState<any>(false);

  const handleAdd = () => {
    setButtonAdd(!buttonAdd);
  }

  return (
    <section className="categories">
      <div className="header">
        <h1>All Categories</h1>
        {!buttonAdd ? (
          <button className="btnAddProduct" onClick={handleAdd}>Add Category <FontAwesomeIcon icon={faPlus} /></button>
        ) : (
          <button className="btnClose" onClick={handleAdd}>Close <FontAwesomeIcon icon={faClose} /></button>
        )}
      </div>
      {/* <FormAddProduct /> */}
      {buttonAdd && <FormAddCategory setButtonAdd={setButtonAdd} buttonAdd={buttonAdd} />}
      <div className="content">
        <CategoryList />
      </div>
    </section>
  );
}

export default Categories;