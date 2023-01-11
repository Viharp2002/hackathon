import React, { useContext, useEffect } from 'react'
import Schem from '../components/schem';
import { SchemApi } from '../config/api'
import { AdminContext } from '../context/admin';
function Home() {
    // react-pdf package
    let { schems, dispatch } = useContext(AdminContext)
    useEffect(() => {
        let fetchSchems = async () => {
            let res = await fetch(SchemApi);
            let data = await res.json();
            if (data.success) {
                dispatch({ type: "SET_SCHEMS", data: data.msg })
            }
        }
        if (!schems) {
            fetchSchems();
        }
    }, [])

    return (
        <div className="schem_container">
            {
                schems && schems.map((schem) => <Schem key={schem._id} item={schem} />)
            }
        </div>
    )
}

export default Home