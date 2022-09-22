import {useState} from 'react'


function Wedding () {
    const [weddingName, setweddningName] = useState("")
    const [date, setDate] = useState("")
    const [spouseOne, setSpouseOne] = useState("")
    const [spouseTwo, setSpouseTwo] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        fetch('', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                weddingName: weddingName,
                date:date,
                spouseOne:spouseOne,
                spouseTwo:spouseTwo
            }),
        })
            .then(response => response.json()).
            .then((newWedding) => handleNewWedding(newWedding))

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
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => seSpouseTwo(e.target.value)}
                    />
                <button type="submit">Create New Weddding</button>
                </form>
        </div>
        )
};



export default Wedding;