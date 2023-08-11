import './modal-edit-product.scss';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TriggerContext } from '../../context/TriggerContext';
import { useNavigate } from 'react-router-dom';

const ModaleditProduct = ({ openModal, closeModal, propId }: any) => {
  if (!openModal) return null;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBtn, setIsLoadingBtn] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("")
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState('');
  const [preview, setPreview] = useState('');
  const [selectCategory, setSelectCategory] = useState([]);
  const [message, setMessage] = useState("");
  const triggerCon: any = useContext(TriggerContext);
  const active = triggerCon.active;

  const getProductById = async () => {
    const response = await axios.get(`${import.meta.env.VITE_GET_ALL_PRODUCT}/${propId}`);

    setTimeout(() => {
      setName(response.data.name);
      setPrice(response.data.price);
      setDesc(response.data.desc);
      setSlug(response.data.slug)
      setUrlImage(response.data.urlImage);
      setCategoryId(response.data.category.id);
      setCategoryName(response.data.category.name);
      setPreview(response.data.urlImage)
      setIsLoading(false)
    }, 500);
  }

  const getCategory = async () => {
    const response = await axios.get(import.meta.env.VITE_GET_ALL_CATEGORY);
    setSelectCategory(response.data.result);
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_GET_ALL_PRODUCT}/${propId}`, {
        name: name,
        slug: slug,
        price: price,
        desc: desc,
        categoryId: categoryId,
        image: image
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setName('');
      setPrice('');
      setCategoryId('');
      setDesc('');
      setSlug('');
      setImage('');
      toast.success("Product has been updated successfuly..", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      triggerCon.trigger();
      closeModal()
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.msg);
        console.log(error.response.data.msg)
      }
    }
  }



  const loadImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const slugify = (str: any) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  useEffect(() => {
    getProductById();
    getCategory()
  }, [])

  return (
    <section className="modalEditProduct">
      <div className="box-container">
        <div className="formContainer">
          <form onSubmit={handleUpdate}>
            <ToastContainer />
            <div className="col">
              <div className="inputGroup">
                <label htmlFor="name">Product Name</label>
                <input type="text" name='name' onChange={(e) => { setName(e.target.value); setSlug(slugify(name)) }} value={name} />
              </div>
              <div className="inputGroup">
                <label htmlFor="slug">Slug</label>
                <input type="text" name='slug' readOnly value={slug} />
              </div>
              <div className="inputGroup">
                <label htmlFor="price">Price</label>
                <input type="text" name='price' onChange={(e) => setPrice(e.target.value)} value={price} />
              </div>
              <div className="inputGroup">
                <label htmlFor="categoryId">Category</label>
                <select name="categoryId" id="" onChange={(e) => setCategoryId(e.target.value)}>
                  <option value={categoryId}>{categoryName}</option>
                  {selectCategory.map((category: any) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col">
              <div className="inputGroup">
                <label htmlFor="desc">Description</label>
                <textarea name='desc' onChange={(e) => { setDesc(e.target.value); setMessage('') }} value={desc}></textarea>
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
                <button className="btnCancel" onClick={closeModal}>Cancel</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default ModaleditProduct;