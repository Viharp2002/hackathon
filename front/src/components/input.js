import React, { useContext, useEffect, useState } from 'react'
import { UploadApi } from '../config/api';
import { AuthContext } from '../context/auth';

function Input({ input, state, change }) {


    let { token } = useContext(AuthContext);

    let handleChange = (e) => {
        change((pre) => {
            let new_ = { ...pre };
            new_[e.target.name] = { ...new_[e.target.name], data: e.target.value }
            return new_;
        })
    }

    let uploadDoc = async (e) => {
        let form = new FormData();
        let file = e.target.files[0];
        let name = input.name
        form.append(name, file);

        // mark loading as true
        let res = await fetch(UploadApi, {
            method: "POST",
            body: form
        })

        let data = await res.json();

        // mark loading as false
        if (data.success) {
            change((pre) => {
                let obj = { ...pre };
                obj[data.msg.name] = { ...obj[data.msg.name], doc: data.msg.link };
                return obj;
            })
        }
    }

    // useEffect(() => {
    //     console.log(state)
    // }, [state])

    return (
        <div className="input_conatiner">

            {/* load data if already availabel user information like category, fullName etc */}
            
            <div className="input_field">
                <label htmlFor={input._id}>{input.name}</label>
                <input id={input._id} type="text" name={input.name} value={state[input.name].data} onChange={handleChange} />
            </div>
            {
                input.isDoc && <div className="input_doc">
                    <input type="file" onChange={uploadDoc} />
                </div>
            }
        </div>
    )
}

export default Input