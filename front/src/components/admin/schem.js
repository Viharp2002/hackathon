import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dltSchem, ImageApi, schem, SchemInfo, UsersOfSchem } from '../../config/api';
import { AdminContext } from '../../context/admin';
import { AuthContext } from '../../context/auth';
import SchemForm from './SchemForm';

function Schem() {
  let { id } = useParams();
  let [schem, setschem] = useState(null);
  let [users, setuser] = useState(null);
  const [form, setForm] = useState(false);

  let { token } = useContext(AuthContext);
  let { dispatch } = useContext(AdminContext)

  const Navigate = useNavigate();

  const navigate = (uid) => {
    Navigate(`/admin/${uid}/${id}`);
  }

  const Delete = async () => {
    let res = await fetch(dltSchem + id, {
      method: "DELETE",
      headers: {
        "authorization": token
      }
    })

    let data = await res.json();
    if (data.success) {
      dispatch({ type: 'DLT_SCHEM', data: data.msg });
      Navigate("/admin/schems/");
    }
  }

  useEffect(() => {
    let fetchschem = async () => {
      let res = await fetch(SchemInfo + id);
      let data = await res.json();
      if (data.success) {
        setschem(data.msg);
      }
    }

    let fetchUsers = async () => {
      let res = await fetch(UsersOfSchem + id,
        {
          headers: {
            "authorization": token
          }
        });

      let data = await res.json();
      if (data.success) {
        setuser(data.msg);
      }
    }

    if (id) {

      fetchschem();
      fetchUsers();

    }
  }, [id])

  return (
    <div>
      {
        schem &&
        <>
          <div>
            <h1>{schem.name}</h1>
            <img src={schem.image ? ImageApi + schem.image : ""} />
            <div>{schem.desc}</div>
            <br />
            fields for application is <br />
            {
              schem.Type.map(one => <span key={one._id}>{one.name}<br></br></span>)
            }
            <br />
            <button onClick={Delete}>Delete this schem</button>
            <br />
            <button onClick={() => setForm(!form)}>update this schem</button>
          </div>
          <br />
          {
            form && <SchemForm close={setForm} info={schem} />
          }
          <h3>users</h3>
          {
            users && users.map((user) => {
              return (
                <div key={user._id} onClick={() => navigate(user._id)}>
                  <span>{user.name} </span>
                  <span>{user.mail}</span>
                </div>
              )
            })
          }
        </>
      }
    </div>


  )
}

export default Schem