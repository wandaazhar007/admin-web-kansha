import './formAddProduct.scss';

const FormAddProduct = () => {
  return (
    <section className="formAddProduct">
      <div className="container">
        <form>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="name">Name Menu</label>
              <input type="text" name='name' />
            </div>
            <div className="inputGroup">
              <label htmlFor="price">Price</label>
              <input type="text" name='price' />
            </div>
            <div className="inputGroup">
              <label htmlFor="categoryId">Category</label>
              <select name="categoryId" id="">
                <option value="">Hibachi</option>
                <option value="">Sushi Roll</option>
              </select>
            </div>
          </div>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="desc">Description</label>
              <textarea name='desc'></textarea>
            </div>
            <div className="inputGroup">
              <label htmlFor="image">Image</label>
              <input type="file" name='image' />
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}

export default FormAddProduct;