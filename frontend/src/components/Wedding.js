import {useState} from 'react'
import API from '../../utils/API'


function Wedding () {
    const [weddingName, setWeddingName] = useState("")
    const [date, setDate] = useState("")
    const [spouseOne, setSpouseOne] = useState("")
    const [spouseTwo, setSpouseTwo] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
            API.createWedding({weddingName,date,spouseOne,spouseTwo})
            .then((res)=> {console.log(success)}).catch((err)=>{console.log(error)})

        return( 
            <div>
                <div>
                    <h3>Add New Wedding</h3>
                </div> 
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='name'
                        value={weddingName}
                        onChange={(e) => setWeddingName(e.target.value)}
                    />
                    <input
                        type='date'
                        name='date'
                        placeholder='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type='text'
                        name='spouseOne'
                        placeholder='Spouse One'
                        value={spouseOne}
                        onChange={(e) => setSpouseOne(e.target.value)}
                    />
                    <input
                        type='text'
                        name='spouseTwo'
                        placeholder='Spouse Two'
                        value={spouseTwo}
                        onChange={(e) => setSpouseTwo(e.target.value)}
                    />
                <button type="submit">Create New Weddding</button>
                </form>
        </div>
        )
};



export default Wedding;