import React, { useContext, useEffect, useState } from 'react'
import { ApplyApi } from '../config/api';
import { AuthContext } from '../context/auth';
import Input from './input';

function ApplyForm({ schem }) {

    const { token } = useContext(AuthContext);

    const FormType = schem.Type;
    const FieldCriteria = schem.Criteria

    const [formData, setForm] = useState(() => {

        // formData : {
        //     cast:{data:" ",doc:"",formfield:"4732864fuwf"},
        //     fullName:{data:"",formfield}
        // }

        let obj = {};
        FormType.forEach(e => {
            obj[e.name] = e.isDoc ? { data: "", doc: "", formfield: e._id } : { data: "", formfield: e._id }
        });

        return obj;
    })

    let getArrayFromObject = (obj) => {
        let ans = [];
        for (let i in obj) {
            ans.push({
                ...obj[i]
            })
        }
        return ans;
    }

    const handleSubmit = async () => {

        // validate all the fields before submit

        let formBody = {
            schem: schem._id
        }

        let Arraydata = getArrayFromObject(formData);

        formBody['data'] = Arraydata;

        let res = await fetch(ApplyApi, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": token
            },
            body: JSON.stringify(formBody)
        })

        let data = await res.json();
        console.log(data);
    }

    return (
        <div className="appply_form">
            {
                FormType.map((item) => {
                    return (<Input input={item} key={item._id} state={formData} change={setForm} />)
                })
            }
            <div className="submit_apply" onClick={handleSubmit}>
                Submit
            </div>
        </div>
    )
}

export default ApplyForm