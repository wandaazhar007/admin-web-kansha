import axios from 'axios';
import './formAddProduct.scss';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { TriggerContext } from '../../context/TriggerContext';

const FormAddProduct = ({ setButtonAdd, buttonAdd }: any) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState('');
  const [selectCategory, setSelectCategory] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const trigger: any = useContext(TriggerContext);
  const active = trigger.active;

  const getCategory = async () => {
    const response = await axios.get(import.meta.env.VITE_GET_ALL_CATEGORY);
    setSelectCategory(response.data.result);
  }

  const loadImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_GET_ALL_PRODUCT, {
        name: name,
        slug: slug,
        price: price,
        desc: desc,
        categoryId: categoryId,
        image: image
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      toast.success("Product has been created successfuly..", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      setName('');
      setPrice('');
      setCategoryId('');
      setDesc('');
      setSlug('');
      setImage('');
      setButtonAdd(!buttonAdd)
      trigger.trigger();
      setTimeout(() => {
        navigate('/products')
      }, 2500);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.msg);
        console.log(error.response.data.msg)
      }
    }
  }

  const slugify = (str: any) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }


  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="formAddProduct">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="col">
            <div className="inputGroup">
              <label htmlFor="name">Product Name</label>
              <input type="text" name='name' onChange={(e) => { setName(e.target.value); setSlug(slugify(name)) }} value={name} />
            </div>
            <div className="inputGroup">
              <label htmlFor="slug">Slug</label>
              <input type="text" name='slug' readOnly value={slug} />
              {slug}
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
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="desc">Description</label>
              <textarea name='desc' onChange={(e) => { setDesc(e.target.value); setMessage('') }}></textarea>
            </div>
            <div className="inputGroup">
              <label htmlFor="image">Image Product</label>
              <input type="file" name='image' id="image" onChange={loadImage} />
              {preview ? (
                <img src={preview} width={"300px"} />
              ) : (
                ""
              )}
            </div>
            <div className="inputGroup">
              {!isLoading ? (
                <button className="btnSave">Save</button>
              ) : (
                <button className="btnSave">Loading...</button>
              )}
              {message && <p style={{ textAlign: "center", color: "red", fontSize: "12px" }}>{message}</p>}
            </div>
          </div>

        </form>
      </div>
    </section>
  );
}

export default FormAddProduct;