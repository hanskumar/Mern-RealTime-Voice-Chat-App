import React,{useState} from 'react'
import Card from '../../../../components/shard/Card/Card';
import TextInput from '../../../../components/shard/TextInput';
import Button from '../../../../components/shard/Button/Button';
import styles from '../PhoneEmail.Module.css'; 

const Phone = () => {

    const [phone,setPhone] = useState();

    const onNext = () =>{

    }

    return (
        <>
            <Card title="Enter your Phone Number" icon="phone" >
                <TextInput
                    placeholder="+917047679756"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={onNext} />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. <br/>
                        Thanks!
                    </p>
                </div>
            </Card>
        </>
    )
}

export default Phone
