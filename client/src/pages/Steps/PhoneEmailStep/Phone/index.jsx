import React,{useState} from 'react'
import Card from '../../../../components/shard/Card/Card';
import TextInput from '../../../../components/shard/TextInput';
import Button from '../../../../components/shard/Button/Button';
import styles from '../PhoneEmail.Module.css'; 
import { sendOtp } from '../../../../actions';

import {useDispatch,useSelector} from 'react-redux'

const Phone = ({onNext}) => {

    const[phone,setPhone] = useState('');
    
    const dispatch = useDispatch()

    const Submit = (e) =>{

        e.preventDefault();
        console.log("phone Value:",phone);
        dispatch(sendOtp({phone}))
        onNext();
    }

    return (
        <>
            <Card title="Enter your Phone Number" icon="phone" >
                <form onSubmit={Submit}>
                    <TextInput
                        placeholder="+917047679756"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
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
