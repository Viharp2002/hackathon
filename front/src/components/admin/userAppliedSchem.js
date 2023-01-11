import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { docApi, UserApplySchem } from '../../config/api';
import { AuthContext } from '../../context/auth';

function UserAppliedSchem() {
  const { uid, sid } = useParams();


  let [info, setinfo] = useState(null);

  let { token } = useContext(AuthContext);


  const navigate = (name) => {
    // make custom pdf view
    window.open(docApi + name);
  }

  const fetchApplication = async () => {
    let res = await fetch(`${UserApplySchem}${uid}/${sid}`, {
      headers: {
        "authorization": token
      }
    })
    let data = await res.json();
    // console.log(data.msg);
    
    setinfo(data.msg)
  }

  useEffect(() => {
    fetchApplication();
  }, [uid, sid])

  return (
    <>
      {
        info &&
        <div>

          {/* user details  */}
          <div>
            <div>{info.uname}</div>
            <div>{info.umail}</div>
          </div>
          <hr />
          <br />

          {/* schem details  */}
          <div>
            <div>{info.sname}</div>
            <div>{info.sdesc}</div>
          </div>
          <hr />
          <br />


          {/* information that user have fill while applying schem  */}
          {
            info.information.map((one) => {
              return (
                <div key={one._id}>
                  <div>
                    {one.formfield.name} : {one.data} {one.doc &&
                      <span onClick={() => navigate(one.doc)}>Open doc</span>
                    }
                  </div>
                </div>
              )
            })
          }

        </div>

      }
    </>
  )
}

export default UserAppliedSchem