import axios from 'axios';
import './formAddUser.scss';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
import { TriggerContext } from '../../context/TriggerContext';

const FormAddUser = ({ setButtonAdd, buttonAdd }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("")
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();


  const triggerCon: any = useContext(TriggerContext);
  // const active = triggerCon.active;


  const loadImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file.name);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_GET_ALL_USER, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        image: image,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      toast.success("User has been created successfuly..", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      setName('');
      setEmail('');
      setRole('');
      setImage('');
      setButtonAdd(!buttonAdd)
      triggerCon.trigger();
      setIsLoading(true);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  }

  return (
    <section className="formAddUser">
      <div className="formContainer">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="col">
            <div className="inputGroup">
              <label htmlFor="name">User Name</label>
              <input type="text" required name='name' onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input type="email" required name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" required name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="inputGroup">
              <label htmlFor="confPassword">Confrim Password</label>
              <input type="password" required name='confPassword' onChange={(e) => setConfPassword(e.target.value)} value={confPassword} />
            </div>
          </div>

          <div className="col">
            <div className="inputGroup">
              <label htmlFor="role">Role</label>
              <select name="role" id="" onChange={(e) => setRole(e.target.value)}>
                <option value=""></option>
                <option value={parseInt("2")}>User</option>
                <option value={parseInt("1")}>Admin</option>

              </select>
            </div>
            <div className="inputGroup">
              <label htmlFor="image">Profile Picture</label>
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

export default FormAddUser;