import FormAddProduct from '../../components/formAddProduct/FormAddProduct';
import ProductList from '../../components/productList/ProductList';
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
        <ProductList />
      </div>
    </section>
  );
}

export default Products;