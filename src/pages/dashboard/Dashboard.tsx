import './dashboard.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [name, setname] = useState("");
  // const [token, setToken] = useState("");
  // const [expire, setExpire] = useState<number>(0);
  // const [users, setUsers] = useState([]);
  // const [urlImage, setUrlImage] = useState("");
  // const [email, setEmail] = useState();
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TOKEN);
      // setToken(response.data.accessToken);
      console.log('data login', response.data)
      const decoded: any = jwt_decode(response.data.accessToken);
      // console.log(response.data.accessToken)
      console.log(decoded)
      setname(decoded.name);
      // setEmail(decoded.email);
      // setRole
      // setExpire(decoded.exp);
    } catch (error: any) {
      console.log(error)
      if (error.response) {
        navigate('/login');
      }
    }
  }
  useEffect(() => {
    refreshToken();
  }, [])

  // const axiosJWT = axios.create();
  // axiosJWT.interceptors.request.use(async (config: any) => {
  //   const currentDate = new Date();
  //   if (expire * 1000 < currentDate.getTime()) {
  //     const response = await axios.get(import.meta.env.VITE_TOKEN);
  //     config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //     setToken(response.data.accessToken);
  //     const decoded: any = jwt_decode(response.data.accessToken);
  //     setname(decoded.name);
  //     setExpire(decoded.exp);
  //     return config
  //   }
  // }, (error) => {
  //   return Promise.reject(error);
  // });

  // const getUsers = async () => {
  //   const response = await axiosJWT.get(import.meta.env.VITE_GET_ALL_USER, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   setUsers(response.data.result);
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <>
      <h1>Welcome Back: {name}</h1>

    </>
  );
}

export default Dashboard;