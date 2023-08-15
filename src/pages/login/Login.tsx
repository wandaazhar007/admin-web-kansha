import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_LOGIN, {
        email: email,
        password: password
      });
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }


  return (
    <section className="login">
      {/* <div className="container"> */}
      <div className="box">
        <div className="header">
          <div className="logo">
            <img src='./logo-kansha-header.png' />
          </div>
          <div className="title">
            <h1>Admin Kansha Express</h1>
            <p>Please login to your account</p>
          </div>
        </div>
        {msg && (<p className='errorMessage'>{msg}</p>)}
        <div className="content">
          <form onSubmit={handleLogin}>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button">
              <button className='btn btn-login'>
                Login <FontAwesomeIcon icon={faSignIn} className="icon" />
              </button>
            </div>
          </form>
        </div>

        <div className="footer">
          <p>Built with ❤️ by Wanda Azhar in Michigan, USA</p>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Login;