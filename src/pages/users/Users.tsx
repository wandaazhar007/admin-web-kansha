import { useState } from 'react';
import UserList from '../../components/userList/UserList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import FormAddUser from '../../components/formAddUser/FormAddUser';

const Users: React.FC = () => {
  const [buttonAdd, setButtonAdd] = useState<boolean>(false);

  const handleAdd = () => {
    setButtonAdd(!buttonAdd);
  }
  return (
    <section className="products">
      <div className="header">
        <h1>All Users</h1>
        {!buttonAdd ? (
          <button className="btnAddProduct" onClick={handleAdd}>Add User <FontAwesomeIcon icon={faPlus} /></button>
        ) : (
          <button className="btnClose" onClick={handleAdd}>Close <FontAwesomeIcon icon={faClose} /></button>
        )}
      </div>
      {/* <FormAddProduct /> */}
      {buttonAdd && <FormAddUser setButtonAdd={setButtonAdd} buttonAdd={buttonAdd} />}
      <div className="content">
        <UserList />
      </div>
    </section>
  );
}

export default Users;