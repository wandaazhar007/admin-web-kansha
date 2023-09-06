import './userList.scss';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TriggerContext } from '../../context/TriggerContext';
import ModalEditUser from '../modalEditUser/ModalEditUser';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import ModalDelete from '../modalDelete/ModalDelete';

const CategoryList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [querySearch, setQuerySearch] = useState("");
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [propId, setPropId] = useState('');
  const [propName, setPropName] = useState('');
  const triggerCon: any = useContext(TriggerContext);
  const active = triggerCon.active;

  const getUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_GET_ALL_USER}?search_query=${querySearch}&page=${page}&limit=5`);
    setTimeout(() => {
      setUsers(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setIsLoading(false)
    }, 100);
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
  // type search = "string" | "number";
  const handleSearch = (e: any) => {
    setQuerySearch(e.target.value);
    setIsLoading(true);
  }



  const handleDelete = async (id: string) => {
    try {
      axios.delete(`${import.meta.env.VITE_GET_ALL_USER}/${id}`);
      toast.success("User has been deleted successfuly..", {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
      });
      triggerCon.trigger();
    } catch (error: any) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    setOpenModalDelete(false);
    getUsers();
  }

  const handleModal = (id: string) => {
    setOpenModal(true);
    setPropId(id);
  }

  const handleModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setPropId(id);
    setPropName(id);
  }

  const handleResetSearch = () => {
    // getMenu();
    setQuerySearch('');
    setPages(0);
    setPage(0);
    console.log(pages);
    // setOpenModalDelete(true);
  }

  useEffect(() => {
    getUsers();
  }, [querySearch, page, active]);

  return (
    <>
      <section className="userList">
        <ToastContainer />
        <div className="overflow-x-auto">
          <div className="search">
            <input type="text" placeholder='search here..' onChange={handleSearch} value={querySearch} />
            <div className="textSearch">
              {querySearch && (<p onClick={handleResetSearch}>{querySearch}</p>)}
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {isLoading ? (
                <>
                  {users.map((user: any) => (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="skeleton mask mask-squircle w-12 h-12">
                              {/* <img src="./react.svg" alt="kanhsa" /> */}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold skeleton skeletonName"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="skeleton skeletonPrice"></div>
                      </td>
                      <td>
                        <div className="skeleton skeletonCategory"></div>
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
                  {users.map((user: any) => (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={user.urlImage} alt="kanhsa" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role === 1 ? 'Admin' : 'User'}</td>
                      <td>{format(parseISO(user.createdAt), 'yyyy-MM-dd')}</td>
                      <th>
                        <div className="actions">
                          <div className="detail" onClick={() => handleModal(user.id)}> <FontAwesomeIcon icon={faEdit} /></div>
                          <div className="delete" onClick={() => handleModalDelete(user.id)}><FontAwesomeIcon icon={faTrash} /></div>
                        </div>
                      </th>
                    </tr>
                  ))}
                </>
              )}

            </tbody>
          </table>
          <p className="messageTotalPage">Total: {rows} Users | page: {page} of {pages}</p>
          {msg && <p className="messageFooter">{msg}</p>}

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

      <ModalEditUser openModal={openModal} closeModal={() => setOpenModal(false)} propId={propId} />
      <ModalDelete openModalDelete={openModalDelete} closeModalDelete={() => setOpenModalDelete(false)} propName={propName} handleDelete={() => handleDelete(propId)} />
    </>
  );
}

export default CategoryList;