import React,{useState} from 'react'
import styles from './OtpStep.Module.css'
import {useSelector,useDispatch } from 'react-redux'
import {verfifyOtp} from '../../../actions'
import {useHistory} from "react-router-dom"
import { useForm } from "react-hook-form";

import Card from '../../../components/shard/Card/Card'
import Button from '../../../components/shard/Button/Button'

const OtpStep = () => {

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    console.log("Read Data form Redux::",auth);
    const history = useHistory();

    const { register, handleSubmit,formState: { errors } } = useForm();

    const onSubmit = async(data)=> {

        //console.log(data);
        const { otp } = data;
        
        const request = {otp,phone:auth.phone,hash:auth.hash}
        //console.log("Redux Data::",auth);

        dispatch(verfifyOtp(request));

        history.push('/activate'); 
    }

    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the code we just texted you"
                    icon="lock-emoji"
                >
                    <form  onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <input
                        className="input" 
                        type="text"
                        placeholder="Enter your OTP"
                        {...register("otp",{ 
                            required: true ,
                            maxLength: 6,
                            minLength: 6,
                            pattern: /[0-9]{4}/
                        })}
                    />
                    <p className={styles.bottomParagraph}>{errors.otp?.type === 'required' && "OTP is required"}</p>

                    {errors?.otp?.type === "pattern" && (
                        <p>Numbers  only</p>
                    )}  

                    {errors?.otp?.type === "maxLength" && (
                        <p>OTP cannot exceed 6 digit</p>
                    )}

                    {errors?.otp?.type === "minLength" && (
                        <p>OTP should be 6 digit</p>
                    )} 
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default OtpStep
