import React,{useState} from 'react'
import PhoneEmailStep from '../Steps/PhoneEmailStep'
import OtpStep from '../Steps/OtpStep'

const steps ={
   1: PhoneEmailStep,
   2: OtpStep,
};

const Authenticate = () => {

    const [step, setStep] = useState(1);
    const Step = steps[step];

    console.log("Step No..",step);

    const onNext = () =>{
        setStep(step+1);
    }

    return <Step onNext={onNext} />;
    
}

export default Authenticate
