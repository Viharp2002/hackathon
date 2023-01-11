import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { oneUser } from '../../config/api';
import { AuthContext } from '../../context/auth';

function User() {

  let { id } = useParams();

  let { token } = useContext(AuthContext);
  let [user, setuser] = useState(null);

  const Navigate = useNavigate();

  const naviagte = (sid) => {
    Navigate(`/admin/${id}/${sid}`);
  }

  useEffect(() => {
    let fetchuser = async () => {
      let res = await fetch(oneUser + id, {
        headers: {
          "authorization": token
        }
      })

      let data = await res.json();
      // console.log(data);
      setuser(data.msg);
    }

    if (id) {
      fetchuser();
    }

  }, [id])
  return (
    <div>
      {
        user &&
        <>
          <div>
            <h3>{user.name}</h3>
            <p>{user.mail}</p>
          </div>

          {/* // diaplay additional data of user  */}
          <div className="user_schems">
            {
              user.schems && user.schems.map((schem) => {
                return (
                  <div key={schem.schem._id} onClick={() => naviagte(schem.schem._id)}>
                    <span>{schem.schem.name} </span>
                    <span>{schem.schem.desc}</span>
                  </div>
                )
              })
            }
          </div>
        </>

      }

    </div>
  )
}

export default User