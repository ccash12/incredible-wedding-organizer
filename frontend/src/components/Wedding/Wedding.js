import {useState} from 'react'
import API from '../../utils/API'


function Wedding ({token}) {
    const [weddingName, setWeddingName] = useState("")
    const [date, setDate] = useState("")
    const [spouseName1, setSpouseName1] = useState("")
    const [spouseName2, setSpouseName2] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
            API.createWedding({weddingName,date,spouseName1,spouseName2},token)
            .then((res)=> {console.log('success')}).catch((err)=>{console.log('error')})
            }
        return( 
            <div>
                <div>
                    <h3>Add New Wedding</h3>
                </div> 
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Wedding Name'
                        value={weddingName}
                        onChange={(e) => setWeddingName(e.target.value)}
                    />
                    <input
                        type='date'
                        name='date'
                        placeholder='Date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type='text'
                        name='spouse1'
                        placeholder='Spouse 1'
                        value={spouseName1}
                        onChange={(e) => setSpouseName1(e.target.value)}
                    />
                    <input
                        type='text'
                        name='spouse2'
                        placeholder='Spouse 2'
                        value={spouseName2}
                        onChange={(e) => setSpouseName2(e.target.value)}
                    />
                <button type="submit">Create New Weddding</button>
                </form>
        </div>
        )
};



export default Wedding;