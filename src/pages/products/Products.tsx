import { useState } from 'react';
import FormAddProduct from '../../components/formAddProduct/FormAddProduct';
import ProductList from '../../components/productList/ProductList';
import './products.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";

const Products: React.FC = () => {
  const [buttonAdd, setButtonAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setButtonAdd(!buttonAdd);
  }
  return (
    <section className="products">
      <div className="header">
        <h1>All Menus</h1>
        {!buttonAdd ? (
          <button className="btnAddProduct" onClick={handleAdd}>Add Product <FontAwesomeIcon icon={faPlus} /></button>
        ) : (
          <button className="btnClose" onClick={handleAdd}>Close <FontAwesomeIcon icon={faClose} /></button>
        )}
      </div>
      {/* <FormAddProduct /> */}
      {buttonAdd && <FormAddProduct setButtonAdd={setButtonAdd} buttonAdd={buttonAdd} />}
      <div className="content">
        <ProductList />
      </div>
    </section>
  );
}

export default Products;