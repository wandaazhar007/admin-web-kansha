import FormAddProduct from '../../components/formAddProduct/FormAddProduct';
import './products.scss';

const Products = () => {
  return (
    <section className="products">
      <div className="header">
        <h1>All Products</h1>
        <button>Add Product</button>
      </div>
      <FormAddProduct />
      <div className="content">

      </div>
    </section>
  );
}

export default Products;