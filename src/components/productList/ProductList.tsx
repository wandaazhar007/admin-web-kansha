import { useEffect, useState } from 'react';
import './productList.scss';
import axios from 'axios';

const ProductList = () => {

  const [menus, setMenus] = useState([]);

  const getMenu = async () => {
    const res = await axios.get(`http://localhost:2000/products`);
    console.log(res);
    setMenus(res.data.result);
  }

  useEffect(() => {
    getMenu();
  }, [])
  return (
    <section className="productList">

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name Products</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu: any, index) => (
              <tr>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={menu.urlImage} alt="kanhsa" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{menu.name}</div>
                      <div className="text-sm opacity-50">{menu.category.name}</div>
                    </div>
                  </div>
                </td>
                <td>${menu.price}</td>
                <td>{menu.category.name}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </section>
  );
}

export default ProductList;