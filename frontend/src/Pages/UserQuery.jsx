import React, { useState, useEffect } from 'react'
import { api } from './api';
import './userQuery.css';
function UserQuery() {
    let [message, setMessage] = useState([]);

    let getMessage = async () => {
        try {
            let res = await api.get("/getcontact");
            console.log(res.data);
            setMessage(res.data);
        }
        catch (err) {
            console.log(err);
        }


    }
    useEffect(() => {
        getMessage();
    }, [])
    return (
        <div className='query-container'>

            <h1 className='query-heading'>Users Queries / Reviews</h1>

            <div className='query-grid'>

                {
                    message.map((item) => (

                        <div
                            key={item._id}
                            className='query-card'
                        >

                            <div className='top-section'>

                                <div className='user-icon'>
                                    {item.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h2>{item.name}</h2>
                                    <p className='email'>{item.email}</p>
                                </div>

                            </div>

                            <div className='message-box'>

                                <p>{item.message}</p>

                            </div>

                            <div className='bottom-section'>

                                <p>📞 {item.number}</p>

                                <button>
                                    Pending
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    )
}

export default UserQuery;
