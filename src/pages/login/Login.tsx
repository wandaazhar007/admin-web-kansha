import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    // alert('test')
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/login', {
        email: email,
        password: password
      });
      navigate('/');
    } catch (error: any) {
      setMsg(error.response.data.msg)
    }
  }

  const handleLogout = async () => {
    try {
      axios.delete('http://localhost:2000/logout');
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
    // axios.delete('http://localhost:2000/logout');
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
            <button onClick={handleLogout}>Logout</button>
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
              <button className='btn btn-logon'>
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="footer">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, perspiciatis?</p>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Login;