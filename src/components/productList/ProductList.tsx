import { useEffect, useState } from 'react';
import './productList.scss';
import axios from 'axios';
import ReactPaginate from "react-paginate";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [keywordButton, setKeywordButton] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");

  const [menus, setMenus] = useState([]);

  const getMenu = async () => {
    const response = await axios.get(`http://localhost:2000/products?search_query=${keywordSearch}&page=${page}&limit=${limit}`);
    setTimeout(() => {
      setMenus(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setIsLoading(false)
    }, 100)
  }

  // type selected = any
  const changePage = ({ selected }: any) => {
    setIsLoading(true)
    setTimeout(() => {
      setPage(selected);
    }, 1000)
    if (selected === 9) {
      setMsg(
        "Please search by specific keyword..."
      );
    } else {
      setMsg("");
    }
  };

  useEffect(() => {
    getMenu();
  }, [keywordSearch, page])
  return (
    <section className="productList">
      <div className="overflow-x-auto">
        <div className="search">
          <input type="text" placeholder='search here..' />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name Products</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {isLoading ? (
              <>
                {menus.map((menu, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="skeleton mask mask-squircle w-12 h-12">
                            {/* <img src="./react.svg" alt="kanhsa" /> */}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold skeleton skeletonName"></div>
                          <div className="text-sm opacity-50 skeleton skeletonSmallCategory"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="skeleton skeletonPrice"></div>
                    </td>
                    <td>
                      <div className="skeleton skeletonCategory"></div>
                    </td>
                    <th>
                      <button className="btn btn-primary btn-xs skeleton skeletonAction"></button>
                    </th>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {menus.map((menu: any, index) => (
                  <tr key={index}>
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
              </>
            )}

          </tbody>
          {msg && <p>{msg}</p>}
        </table>

        <div className="pagination">
          <div className="box-container">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination box-container"}
              pageLinkClassName={"link"}
              previousLinkClassName={"link"}
              nextLinkClassName={"link"}
              activeLinkClassName={"link active"}
              disabledLinkClassName={"disabled"}
            />
          </div>
        </div>


      </div>

    </section>
  );
}

export default ProductList;