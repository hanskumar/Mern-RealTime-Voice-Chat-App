import axiosIntance from '../helpers/axios'

export const setAvatar = async (data) =>{

    const res = await axiosIntance.post('https://api.cloudinary.com/v1_1/harsh-cloud-bucket/image/upload',{
        data
    });
    console.log("Image URL",res);
    
}