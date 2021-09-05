import React,{useState} from 'react'
import styles from './OtpStep.Module.css'

import TextInput from '../../../components/shard/TextInput'
import Card from '../../../components/shard/Card/Card'
import Button from '../../../components/shard/Button/Button'

const OtpStep = () => {

    const [otp,setOtp] = useState();

    const submit = () => {

    }

    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the code we just texted you"
                    icon="lock-emoji"
                >
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                </Card>
            </div>
        </>
    )
}

export default OtpStep
