import './categoryList.scss';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TriggerContext } from '../../context/TriggerContext';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';
import ModalEditCategory from '../modalEditCategory/ModalEditCategory';
import ModalDelete from '../modalDelete/ModalDelete';
import { SelectedType } from '../../types/types';

const CategoryList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [querySearch, setQuerySearch] = useState("");
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [propId, setPropId] = useState('');
  const [propName, setPropName] = useState('');
  const [categories, setCategories] = useState([]);
  const triggerCon: any = useContext(TriggerContext);
  const active = triggerCon.active;

  const getCategories = async () => {
    const response = await axios.get(`${import.meta.env.VITE_GET_ALL_CATEGORY}?search_query=${querySearch}&page=${page}&limit=5`);
    setTimeout(() => {
      setCategories(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
      setIsLoading(false)
      // console.log(response.data.result);
    }, 100);
  }

  // type selected = any
  // type selectedType = {
  //   selected: number
  // }

  const changePage = ({ selected }: SelectedType) => {
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setPages(0)
    setQuerySearch(e.target.value);
    setIsLoading(true);
  }

  // const urlApi : any = import.meta.env.REACT_APP_GET_ALL_CATEGORY;

  const handleDelete = async (id: string) => {
    try {
      axios.delete(`${import.meta.env.VITE_GET_ALL_CATEGORY}/${id}`);
      toast.success("Category has been deleted successfuly..", {
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
    getCategories();
  }

  const handleModal = (id: string) => {
    setOpenModal(true);
    setPropId(id);
    setPropName(id);
  }

  const handleModalDelete = (id: string) => {
    setOpenModalDelete(true);
    setPropId(id);
    setPropName(id);
  }

  const handleResetSearch = () => {
    setQuerySearch('');
  }

  useEffect(() => {
    getCategories();
  }, [querySearch, page, active]);

  return (
    <>
      <section className="categoryList">
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
                <th>Name Category</th>
                <th>Slug</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {isLoading ? (
                <>
                  {categories.map((category: any) => (
                    <tr key={category.id}>
                      <td>
                        <div className="flex items-center space-x-3">
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
                      <th>
                        <button className="btn btn-primary btn-xs skeleton skeletonAction"></button>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {categories.map((category: any, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{category.slug}</td>
                      <td>{format(parseISO(category.createdAt), 'yyyy-MM-dd')}</td>
                      <th>
                        <div className="actions">
                          <div className="detail" onClick={() => handleModal(category.id)}> <FontAwesomeIcon icon={faEdit} /></div>
                          <div className="delete" onClick={() => handleModalDelete(category.id)}><FontAwesomeIcon icon={faTrash} /></div>
                        </div>
                      </th>
                    </tr>
                  ))}
                </>
              )}

            </tbody>
          </table>
          <p className="messageTotalPage">Total: {rows} Categories | page: {page} of {pages}</p>
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

      <ModalEditCategory openModal={openModal} closeModal={() => setOpenModal(false)} propId={propId} />
      <ModalDelete openModalDelete={openModalDelete} closeModalDelete={() => setOpenModalDelete(false)} propName={propName} handleDelete={() => handleDelete(propId)} />
    </>
  );
}

export default CategoryList;