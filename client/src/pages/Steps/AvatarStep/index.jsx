import React,{useState} from 'react'
import Card from '../../../components/shard/Card/Card'
import TextInput from '../../../components/shard/TextInput'
import Button from '../../../components/shard/Button/Button'
import styles from './AvatarStep.Module.css'


const AvatarStep = () => {

    const parag = {
        textAlign: 'center',
        margin: '20px auto'
    };

    const submit = () =>{

    }

    const [image, setImage] = useState('/images/monkey-avatar.png');

    return (
        <>
        <div className="cardWrapper">
            <Card title="Okay Hansh kumar !" icon="monkey-emoji">
                <p className={styles.subHeading}>How’s this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
        </div>    
        </>
    )
}

export default AvatarStep
