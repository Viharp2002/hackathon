import React, { useContext, useEffect, useState } from 'react'
import { addSchem, formFiels, ImageApi } from '../../config/api';
import { AdminContext } from '../../context/admin';
import { AuthContext } from '../../context/auth';

function MyImage({ src, valid }) {
    if (!valid) {
        src = URL.createObjectURL(src);
    }
    return (
        <img width="250px" src={src} />
    )
}

function SchemForm({ close, info }) {
    // info = undefined means componenet using for adding new schems
    // info is valid then used for updating schmes

    const [field, setfield] = useState(null);
    const [check, setcheck] = useState(null);
    const [isvalid, setvalid] = useState(info ? true : false);
    const [name, setname] = useState(info ? info.name : "");
    const [desc, setdesc] = useState(info ? info.desc : "");
    const [image, setimage] = useState(info ? ImageApi + info.image : "");

    let { token } = useContext(AuthContext);

    let { dispatch } = useContext(AdminContext);

    const fetchField = async () => {
        let res = await fetch(formFiels);
        let data = await res.json();
        if (data.success) {
            setfield(data.msg)
        }
    }

    useEffect(() => {
        fetchField();
    }, [])

    useEffect(()=>{
        if(field){
            setcheck()
        }
    },[field])

    const resetInput = () => {
        setname("");
        setdesc("");
        setimage(null);
        setfield(null);
        fetchField();
    }

    const handleSubmit = async () => {

        // validate all the fields
        let Type = [];
        field.forEach(e => {
            let x = document.getElementById(`${e.name}`);
            if (x.checked == true) {
                Type.push(e._id);
            }
        });

        let form = new FormData();
        form.append("name", name);
        form.append("desc", desc);
        form.append("image", image);
        form.append("form", JSON.stringify(Type));

        let res = await fetch(addSchem, {
            method: "POST",
            headers: {
                "authorization": token
            },
            body: form
        })

        let data = await res.json();
        if (data.success) {
            dispatch({ type: "ADD_SCHEM", data: data.msg })
            // resetInput();
            close(false);
        }

    }

    return (
        <div>
            name : <input type="text" value={name} onChange={(e) => { setname(e.target.value) }} /> <br />
            description : <input type="text" value={desc} onChange={(e) => { setdesc(e.target.value) }} /> <br />
            image : <input type="file" name='image' onChange={(e) => {
                setvalid(false);
                setimage(e.target.files[0]);
            }} />
            <br />
            <br />
            {image && <MyImage src={image} valid={isvalid} />}
            <br />

            {
                field && field.map((one) => {
                    return (
                        <div key={one._id}>
                            <input id={one.name} checked={info ? true : false} type="checkbox" value={one.name} />{one.name}
                        </div>
                    )
                })
            }


            {/* criteria for our schem */}

            <br />

            <button onClick={handleSubmit}> submit </button>
        </div >
    )
}

export default SchemForm