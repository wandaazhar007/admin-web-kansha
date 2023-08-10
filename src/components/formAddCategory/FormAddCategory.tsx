import { useContext, useState } from 'react';
import './formAddCategory.scss';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const FormAddCategory = ({ setButtonAdd, buttonAdd }: any) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const trigger: any = useContext(ProductContext);
  const addMenu = trigger.AddMenu;
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2000/category", {
        name: name,
        slug: slug,
      });
      toast.success("Category has been created successfuly..", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      setName('');
      setSlug('')
      setButtonAdd(!buttonAdd)
      trigger.setAddMenu(!addMenu);
      setTimeout(() => {
        navigate('/categories')
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

  return (
    <section className="formAddProduct">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="col">
            <div className="inputGroup">
              <label htmlFor="name">Category Name</label>
              <input type="text" name='name' required onChange={(e) => { setName(e.target.value); setSlug(slugify(name)) }} value={name} />
            </div>
            <div className="inputGroup">
              <label htmlFor="slug">Slug</label>
              <input type="text" name='slug' readOnly value={slug} />
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
  )

}

export default FormAddCategory;