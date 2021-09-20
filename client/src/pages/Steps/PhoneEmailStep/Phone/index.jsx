import React,{useState} from 'react'
import Card from '../../../../components/shard/Card/Card';
import TextInput from '../../../../components/shard/TextInput';
import Button from '../../../../components/shard/Button/Button';
import styles from '../PhoneEmail.Module.css'; 
import { sendOtp } from '../../../../actions';
import { useForm } from "react-hook-form";

import {useDispatch,useSelector} from 'react-redux'

const Phone = ({onNext}) => {

    const dispatch = useDispatch();

    const { register, handleSubmit,formState: { errors } } = useForm();

    const onSubmit = async(data)=> {

        //console.log("phone Data:",data);
        dispatch(sendOtp(data));
        onNext(); 
    }

    return (
        <>
            <Card title="Enter your Phone Number" icon="phone" >
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                    <input
                        className="input"
                        type="text"
                        placeholder="+917047679756"
                        name="phone"
                        {...register("phone",{ 
                            required: true ,
                            maxLength: 10,
                            minLength: 10,
                            pattern: /[0-9]{4}/
                        })}
                    />
                        <p className={styles.bottomParagraph}>{errors.phone?.type === 'required' && "Phone Number is required"}</p>

                        {errors?.phone?.type === "pattern" && (
                            <p>Numbers  only</p>
                        )}  

                        {errors?.phone?.type === "maxLength" && (
                            <p>Phone Number cannot exceed 10 characters</p>
                        )}

                        {errors?.phone?.type === "minLength" && (
                            <p>Phone Number should be 10 digit</p>
                        )} 

                    <div>
                        <div className={styles.actionButtonWrap}>
                            <Button text="Next" />
                        </div>
                        <p className={styles.bottomParagraph}>
                            By entering your number, you’re agreeing to our Terms of
                            Service and Privacy Policy. <br/>
                            Thanks!
                        </p>
                    </div>
                </form>
            </Card>
        </>
    )
}

export default Phone
