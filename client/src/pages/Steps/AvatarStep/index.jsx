import React,{useState} from 'react'
import Card from '../../../components/shard/Card/Card'
import TextInput from '../../../components/shard/TextInput'
import Button from '../../../components/shard/Button/Button'
import styles from './AvatarStep.Module.css'

import {setAvatar} from '../../../actions'
import Loader from '../../../components/shard/Loader'

import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router'


const AvatarStep = () => {

    const parag = {
        textAlign: 'center',
        margin: '20px auto'
    };

    const[image, setImage] = useState('/images/monkey-avatar.png');
    const[loading,setLoading] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);

    const preset = process.env.REACT_APP_upload_preset;
    const cloud_name = process.env.REACT_APP_cloud_name;

    const previewImage = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            //setImage(reader.result);
            //dispatch(setAvatar(reader.result));
        };
    }

    const uploadImage = (e) =>{

        setLoading(true);

        e.preventDefault();
        
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name","harsh-cloud-bucket");

        fetch("https://api.cloudinary.com/v1_1/harsh-cloud-bucket/image/upload",{
            method:"post",
            body: data
        })
        .then(res=>res.json())
        .then(data => {

            console.log("Image URK",data.url);

            setImage(data.url);
            dispatch(setAvatar({avatar_url:data.url}))
            setLoading(false);

            console.log("vallue of isActivated",auth.isActivated);
            console.log("vallue of auth",auth.isAuth);

            history.push('/rooms');
        })
        .catch(err => setLoading(false))
    }

    if(loading) return <Loader message="Activation in progress...Please Wait.." />;

    return (
        <>
        <div className="cardWrapper">
            <form  >
                <Card title={`Hello ${auth.user.name}`} icon="monkey-emoji">
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
                            //onChange={previewImage}
                            onChange= {(e)=> setImage(e.target.files[0])}
                        />
                        <label className={styles.avatarLabel} htmlFor="avatarInput">
                            Choose a different photo
                        </label>
                    </div>
                    <div>
                        <Button text="Next" onClick={uploadImage}/>
                    </div>
                </Card>
            </form>
        </div>    
        </>
    )
}

export default AvatarStep
