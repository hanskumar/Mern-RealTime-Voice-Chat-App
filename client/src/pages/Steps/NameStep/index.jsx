import React,{useState} from 'react'
import Card from '../../../components/shard/Card/Card'
import TextInput from '../../../components/shard/TextInput'
import Button from '../../../components/shard/Button/Button' 
import {setName} from '../../../actions'
import { useSelector,useDispatch } from 'react-redux'

const NameStep = ({onNext}) => {

    const parag = {
        //width: '70%',
        textAlign: 'center',
        margin: '20px auto'
    };

    const[fullname,setFullname] = useState('');

    const dispatch = useDispatch();

    const submit = (e) =>{
        e.preventDefault();
        const data = dispatch(setName({fullname}));

        try{
            console.log(data);
            onNext();
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <div className="cardWrapper">
            <form onSubmit={submit} >
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p style={parag}>
                    Please use your real Full Name here.. !
                </p>
                <div>
                    <Button text="Next" />
                </div>
            </Card>
            </form>
        </div>    
        </>
    )
}

export default NameStep
