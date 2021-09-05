import React,{useState} from 'react'
import TextInput from '../../../../components/shard/TextInput'
import Card from '../../../../components/shard/Card/Card'
import Button from '../../../../components/shard/Button/Button';
import styles from '../PhoneEmail.Module.css';

const Email = () => {

    const [email,setEmail] = useState();

    const onNext = () =>{

    }

    return (
        <>
            <Card title="Enter your email Address" icon="email-emoji">
                <TextInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder = "jhonedeo@gmail.com"
                />
                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={onNext} />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your Email Address, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                </div>
            </Card>
        </>
    )
}

export default Email
