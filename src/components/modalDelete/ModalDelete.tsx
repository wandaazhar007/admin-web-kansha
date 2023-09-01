import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modalDelete.scss';
import { faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ModalDelete = ({ openModalDelete, closeModalDelete, name, handleDelete }: any) => {
  if (!openModalDelete) return null;

  return (
    <div className="modalDelete">
      <div className="boxContainer">
        <div className="box">
          <div className="message">
            Are you sure want to delete {name}?
          </div>
          <div className="btnGroup">
            <button className="yes" onClick={handleDelete}><FontAwesomeIcon icon={faCheckCircle} /> Yes</button>
            <button className="cancel" onClick={closeModalDelete}><FontAwesomeIcon icon={faCancel} /> Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;