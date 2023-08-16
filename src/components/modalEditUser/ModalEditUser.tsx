import './modalEditUser.scss';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TriggerContext } from '../../context/TriggerContext';
import { useNavigate } from 'react-router-dom';

const ModalEditUser: any = ({ openModal, closeModal, propId }: any) => {
  if (!openModal) return null;
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  // const [urlImage, setUrlImage] = useState('');
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState("");
  const triggerCon: any = useContext(TriggerContext);
  // const active = triggerCon.active;
  // const navigate = useNavigate();

  const getUserById = async () => {
    const response = await axios.get(`${import.meta.env.VITE_GET_ALL_USER}/${propId}`);

    setTimeout(() => {
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
      // setUrlImage(response.data.urlImage);
      setPreview(response.data.urlImage)
      setIsLoading(false)
    }, 500);
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      await axios.patch(`${import.meta.env.VITE_GET_ALL_USER}/${propId}`, {
        name: name,
        email: email,
        role: role,
        image: image
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setName('');
      setEmail('');
      setRole('');
      setImage('');
      toast.success("User has been updated successfuly..", {
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

  useEffect(() => {
    getUserById();
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
                <input type="text" required name='name' onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" required name='slug' readOnly value={email} />
              </div>
              <div className="inputGroup">
                <label htmlFor="role">Role</label>
                <select name="role" id="" onChange={(e) => setRole(e.target.value)}>
                  <option value={role}>{role}</option>
                  <option value={parseInt("2")}>User</option>
                  <option value={parseInt("1")}>Admin</option>
                </select>
              </div>
            </div>

            <div className="col">

              <div className="inputGroup">
                <label htmlFor="image">Profile Image</label>
                <input type="file" name='image' id="image" onChange={loadImage} />
                {preview ? (
                  <img src={preview} width={"300px"} />
                ) : (
                  ""
                )}
              </div>
              <div className="inputGroup">
                {!isLoading ? (
                  <button className="btnSave">Update</button>
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

export default ModalEditUser;