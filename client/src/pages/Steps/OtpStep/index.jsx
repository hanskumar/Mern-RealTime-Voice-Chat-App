import React,{useState} from 'react'
import styles from './OtpStep.Module.css'
import {useSelector,useDispatch } from 'react-redux'
import {verfifyOtp} from '../../../actions'

import TextInput from '../../../components/shard/TextInput'
import Card from '../../../components/shard/Card/Card'
import Button from '../../../components/shard/Button/Button'

const OtpStep = () => {

    const[otp,setOtp] = useState('');
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    console.log("Read Data form Redux::",auth);

    const submit = (e) => {
        e.preventDefault();

        const data = {otp,phone:auth.phone,hash:auth.hash}
        console.log("Requested data for verify::",data);

        dispatch(verfifyOtp(data));
    }

    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the code we just texted you"
                    icon="lock-emoji"
                >
                    <form  onSubmit={submit}>
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
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
