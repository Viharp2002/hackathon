import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApplyForm from '../components/applyForm';
import { hasApplyApi, ImageApi, SchemInfo as Info } from '../config/api';
import { AuthContext } from '../context/auth';

function Schem() {

    let { token } = useContext(AuthContext);

    let { id } = useParams();
    let [schemInfo, setInfo] = useState(null);
    let [isapply, setapply] = useState(false);
    let [hasApplied, sethas] = useState(false);

    let Navigate = useNavigate();

    let apply = () => {

        // check for user loged in ? if not then first ask to login
        if (hasApplied) return;
        setapply(true);
    }

    useEffect(() => {
        let fetchSchemInfo = async () => {
            let res = await fetch(Info + id);
            let data = await res.json();
            if (data.success) {
                setInfo(data.msg);
            }
        }

        let fetchHasApplied = async () => {
            let res = await fetch(hasApplyApi, {
                method: "POST",
                headers: {
                    "authorization": token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({ schem: id })
            })

            let data = await res.json();
            if (data.success) {
                sethas(data.msg);
            }
        }


        if (id) {
            fetchSchemInfo();
        }
        if (token) {
            fetchHasApplied();
        }
    }, [id, token])

    return (
        <>{
            schemInfo &&
            <>
                <div className="schem_details">
                    <h1>{schemInfo.name}</h1>
                    <img src={schemInfo.image ? ImageApi + schemInfo.image : ""} alt="sanket" />
                    <div>{schemInfo.desc}</div>
                    <div className="apply" onClick={apply}>
                        {
                            hasApplied ? "Already Applied" :
                                "Apply for schem"
                        }
                    </div>
                    {/* check for whether the user has already applied in this schem if yes then this apply button should be different */}
                </div>
                {
                    isapply &&
                    <ApplyForm schem={schemInfo} />
                }
            </>
        }
        </>

    )
}

export default Schem