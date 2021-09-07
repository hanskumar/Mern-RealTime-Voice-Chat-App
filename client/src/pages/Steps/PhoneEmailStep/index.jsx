import React,{useState} from 'react'
//import styles from './PhoneEmail.Module'
import styles from './PhoneEmail.Module.css'
import Email from './Email'
import Phone from './Phone'

const PhoneEmailStep = ({onNext}) => {

    const [type, setType] = useState('phone');
    
    return (
        <>
            <div className={styles.cardWrapper}>
                <div>
                    <div className={styles.buttonWrap}>
                        <button
                            className={`${styles.tabButton} ${ type ==='phone' ? styles.active:""}` } 
                            onClick={()=>setType('phone')} >
                            
                            <img src="/images/phone-white.png" alt="phone" />
                        </button>
                        <button 
                            className={`${styles.tabButton} ${ type ==='email' ? styles.active:""} `} 
                            onClick={()=>setType('email')}>

                            <img src="/images/mail-white.png" alt="email" />
                        </button>
                    </div>
                    {
                        type === 'phone' ? <Phone onNext={onNext}/> : <Email onNext={onNext}/>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default PhoneEmailStep
