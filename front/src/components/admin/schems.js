import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ImageApi, SchemApi } from '../../config/api';
import { AdminContext } from '../../context/admin'
import SchemForm from './SchemForm';

function Schmes() {

  let { dispatch, schems } = useContext(AdminContext);
  const [form, setForm] = useState(false);
  // searching functionality

  const Navigate = useNavigate();

  useEffect(() => {
    let fetchSchems = async () => {
      let res = await fetch(SchemApi);
      let data = await res.json();
      // console.log(data);
      dispatch({ type: "SET_SCHEMS", data: data.msg })
    }
    if (!schems) {

      fetchSchems();
    }
  }, [])

  const navigate = (x) => {
    Navigate("/admin/schem/" + x);
  }

  return (
    <div>
      <br />
      <button onClick={() => setForm(!form)}>
        Add schem  ++
      </button>
      <br />
      <br />

      {
        form && <SchemForm close={setForm} />
      }
      {
        schems && schems.map((item) => {
          return (
            <div className="schem" key={item._id} onClick={() => navigate(item._id)}>
              <h3>{item.name}</h3>
              <img src={item.image ? ImageApi + item.image : ""} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Schmes