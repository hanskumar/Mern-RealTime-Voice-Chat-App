import React,{useState} from 'react'
import Card from '../../../components/shard/Card/Card'
import TextInput from '../../../components/shard/TextInput'
import Button from '../../../components/shard/Button/Button'


    
const NameStep = () => {

    const parag = {
        //width: '70%',
        textAlign: 'center',
        margin: '20px auto'
    };

    const[fullname,setFullname] = useState();

    const nextStep = () =>{

    }

    return (
        <>
        <div className="cardWrapper">
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p style={parag}>
                    Please use your real Full Name here.. !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </div>    
        </>
    )
}

export default NameStep
