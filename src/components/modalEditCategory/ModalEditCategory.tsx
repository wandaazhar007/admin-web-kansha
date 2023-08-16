import './modalEditCategory.scss';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TriggerContext } from '../../context/TriggerContext';

const ModalEditCategory: any = ({ openModal, closeModal, propId }: any) => {
  if (!openModal) return null;
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const triggerCon: any = useContext(TriggerContext);
  // const active = triggerCon.active;

  const getCategoryById = async () => {
    const response = await axios.get(`${import.meta.env.VITE_GET_ALL_CATEGORY}/${propId}`);

    setTimeout(() => {
      setName(response.data.name);
      setSlug(response.data.slug)
      setIsLoading(false)
    }, 500);
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_GET_ALL_CATEGORY}/${propId}`, {
        name: name,
        slug: slug
      });
      setName('');
      setSlug('');
      toast.success("Category has been updated successfuly..", {
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

  const slugify = (str: any) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  useEffect(() => {
    getCategoryById()
  }, [])

  return (
    <section className="modalEditCategory">
      <div className="box-container">
        <div className="formContainer">
          <form onSubmit={handleUpdate}>
            <ToastContainer />
            <div className="col">
              <div className="inputGroup">
                <label htmlFor="name">Category Name</label>
                <input type="text" name='name' onChange={(e) => { setName(e.target.value); setSlug(slugify(name)) }} value={name} />
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
                <button className="btnCancel" onClick={closeModal}>Cancel</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default ModalEditCategory;