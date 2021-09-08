import React,{useState} from 'react'
import NameStep from '../Steps/NameStep'
import AvatarStep from '../Steps/AvatarStep'

const steps= {
    1: NameStep,
    2: AvatarStep,
}

const AccountActivate = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onNext = () =>{
        setStep(step+1);
    }

    return <Step onNext={onNext} />;
}

export default AccountActivate
