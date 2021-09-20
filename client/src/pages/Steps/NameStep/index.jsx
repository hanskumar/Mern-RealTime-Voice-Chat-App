import React,{useState} from 'react'
import Card from '../../../components/shard/Card/Card'
import TextInput from '../../../components/shard/TextInput'
import Button from '../../../components/shard/Button/Button' 
import {setName} from '../../../actions'
import { useSelector,useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";

const NameStep = ({onNext}) => {

    const parag = {
        //width: '70%',
        textAlign: 'center',
        margin: '20px auto'
    };

    const dispatch = useDispatch();

    const { register, handleSubmit,formState: { errors } } = useForm();

    const onSubmit = async(data)=> {
        
        await dispatch(setName(data));

        try{
            console.log(data);
            onNext();
        } catch(err){
            console.log("Bhai error h",err);
        }
    }

    return (
        <>
        <div className="cardWrapper">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Card title="What’s your full name?" icon="goggle-emoji">
                <input
                    className="input" 
                    type="text"
                    placeholder="Enter your fullname"
                    {...register("fullname",{ 
                        required: true 
                    })}
                />
                <p>{errors.fullname?.type === 'required' && "fullname is required"}</p>
                
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
