import './dashboard.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [name, setname] = useState("");
  const [token, setToken] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [expire, setExpire] = useState<number>(0);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState();

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config: any) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(import.meta.env.VITE_TOKEN);
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setname(decoded.name);
      setExpire(decoded.exp);
      setUrlImage(decoded.urlImage)
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
    // refreshToken();
    getUsers();
  }, []);

  return (
    <>
      <h1>Welcome Back: {name}</h1>

    </>
  );
}

export default Dashboard;