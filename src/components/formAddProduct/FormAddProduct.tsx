import axios from 'axios';
import './formAddProduct.scss';
import { useEffect, useState } from 'react';

const FormAddProduct = () => {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCategory = async () => {
    const response = await axios.get('http://localhost:2000/category');
    // console.log(response.data.result);
    setSelectCategory(response.data.result);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:2000/products", {
        name: name,
        price: price,
        categoryId: categoryId,
        desc: desc,
        image: image
      })
    } catch (error: any) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="formAddProduct">
      <div className="formContainer">
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="name">Product Name</label>
              <input type="text" name='name' onChange={(e) => setname(e.target.value)} value={name} />
            </div>
            <div className="inputGroup">
              <label htmlFor="price">Price</label>
              <input type="text" name='price' onChange={(e) => setPrice(e.target.value)} value={price} />
            </div>
            <div className="inputGroup">
              <label htmlFor="categoryId">Category</label>
              <select name="categoryId" id="" onChange={(e) => setCategoryId(e.target.value)}>
                <option value=""></option>
                {selectCategory.map((category: any) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="desc">Description</label>
              <textarea name='desc'></textarea>
            </div>
            <div className="inputGroup">
              <label htmlFor="image">Image Product</label>
              <input type="file" name='image' />
            </div>
            <div className="inputGroup">
              <button className="btnSave">Save</button>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}

export default FormAddProduct;