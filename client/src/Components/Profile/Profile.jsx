import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from "../../FireBase/firebase"
const Profile = ()=>{
    const fileRef = useRef(null)
    const { CurrentUser} =useSelector((state)=> state.user)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formdata, setFormData] = useState({
        Username: '',
        email: '',
        password: ''
    })
    const handleChange = (e)=>{
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
  useEffect(()=>{
    if(file){
        handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formdata, avatar: downloadURL })
        );
      }
    );
  };
return (
    <div className="max-w-lg mx-auto mt-14">
        <h1 className="font-semibold text-4xl text-center">Profile</h1>
        <form className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} 
        hidden 
        type="file" 
        ref={fileRef} 
        accept="image/*"/>
        <img onClick={()=> fileRef.current.click()}src={CurrentUser.avator} className="rounded-full h-24 w-24 object-cover mx-auto my-6 cursor-pointer" alt="avator"/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" 
        placeholder="Username"
        name="Username"
        defaultValue={CurrentUser.Username}
        onChange={handleChange}
        className="p-4 border rounded-lg text-lg"/>
        <input type="email" 
        placeholder="Email"
        name="email" 
        onChange={handleChange}
        className="p-4  border rounded-lg text-lg"
        defaultValue={CurrentUser.email}
        />
        <input type="password" 
        placeholder="Password"
        onChange={handleChange}
        name="password" 
        className="p-4 border rounded-lg text-lg"
        defaultValue={CurrentUser.password}/>
        <button type="submit" className="text-white bg-slate-700 p-4 rounded-lg text-xl hover:opacity-90">UPDATE</button>
        </form>
        <div className="flex justify-between mt-5">
            <span className="text-red-700 text-lg">Delete Account</span>
            <span className="text-red-700 text-lg">Sign Out</span>
        </div>
       
    </div>
)
}
export default Profile