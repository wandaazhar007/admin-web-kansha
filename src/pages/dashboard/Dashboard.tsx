import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [name, setname] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState<number>(0);
  const [users, setUsers] = useState([]);
  // const navigate = useNavigate();

  // const refreshToken = async () => {
  //   try {
  //     console.log('decoded')
  //     const response = await axios.get('http://localhost:2000/token');
  //     setToken(response.data.accessToken);
  //     const decoded: any = jwt_decode(response.data.accessToken);
  //     setname(decoded.name);
  //     setExpire(decoded.exp);
  //   } catch (error: any) {
  //     console.log(error)
  //     if (error.response) {
  //       navigate('/login');
  //     }
  //   }
  // }

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config: any) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:2000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setname(decoded.name);
      setExpire(decoded.exp);
      return config
    }
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.get('http://localhost:2000/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    setUsers(response.data);
  }

  useEffect(() => {
    // refreshToken();
    getUsers();
  }, []);

  return (
    <>
      <h1>Welcome Back: {name}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 mt-4">
        Button
      </button>
      <ul>
        {users.map((user: any) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;