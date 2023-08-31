import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modalDelete.scss';
import { faCancel, faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons';

const ModalDelete = ({ openModalDelete, closeModalDelete, propId, handleDelete }: any) => {
  if (!openModalDelete) return null;

  return (
    <div className="modalDelete">
      <div className="boxContainer">
        <div className="box">
          <div className="message">
            Are you sure want to delete?
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