import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [name, setname] = useState("");
  const [token, setToken] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [expire, setExpire] = useState<number>(0);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TOKEN);
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      console.log(decoded)
      setname(decoded.name);
      setUrlImage(decoded.urlImage)
      setExpire(decoded.exp);
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        navigate('/login');
      }
    }
  }

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config: any) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(import.meta.env.VITE_TOKEN);
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setname(decoded.name);
      // setExpire(decoded.exp);
      // setUrlImage(decoded.urlImage)
      return config
    }
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get(import.meta.env.VITE_GET_ALL_USER, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data.result);
  }

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  return (
    <>
      <h1>Welcome Back: {name}</h1>
      <ul>
        {users.map((user: any, index: any) => (
          <>
            <li key={index}>{user.email}</li>
            <h3>{user.role}</h3>
            <img src={user.urlImage} />
          </>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;