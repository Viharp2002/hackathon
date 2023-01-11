import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageApi } from '../config/api'

function Schem({ item }) {

    let Navigate = useNavigate();

    let navigate = () => {
        Navigate("schem/" + item._id);
    }
    
    return (
        <div className="schem" onClick={navigate}>
            <h3>{item.name}</h3>
            <img src={item.image ? ImageApi + item.image : ""} />
        </div>
    )
}

export default Schem