import axios from 'axios';
import './dashboard1.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const Dashboard1: React.FC = () => {
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
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
      setImage(decoded.urlImage);
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

  return (
    <>
      <div className="image">
        <img src={image} alt='user' className='profileImage' />
      </div>
      <h1 className='profileName'>{name}</h1>
    </>
  );
}

export default Dashboard1;