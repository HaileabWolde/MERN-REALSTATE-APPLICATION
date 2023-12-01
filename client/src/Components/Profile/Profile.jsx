import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { UpdateInFailure, UpdateInStart, UpdateInSuccess, 
  ErrorInSuccess, DeleteInFailure, DeleteInStart, DeleteInSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from "../../FireBase/firebase"
const Profile = ()=>{
    const fileRef = useRef(null)
    const dispatch = useDispatch()
    const { CurrentUser, Error, Loading, token} =useSelector((state)=> state.user)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formdata, setFormData] = useState({
        Username: CurrentUser.Username,
        email: CurrentUser.email,
        password: CurrentUser.password
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

  useEffect(()=>{
    if(updateSuccess || Error){
     const timeoutId =  setTimeout(()=>{
        setUpdateSuccess(false)
        dispatch(ErrorInSuccess())
        
      }, 3000)

      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, [updateSuccess, Error])

  
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
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let endpoint = `http://localhost:5000/users/update/${CurrentUser._id}`
    try{
      dispatch(UpdateInStart())
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formdata)
      } )
      const data = await result.json()
      if(data.success === false){
        dispatch(UpdateInFailure(data.message))
      }
      else{
        dispatch(UpdateInSuccess(data))
        setUpdateSuccess(true)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const handleDelete = async ()=>{
     
        let endpoint = `http://localhost:5000/users/delete/${CurrentUser._id}`
        try{
          dispatch(DeleteInStart())
          const res = await fetch(endpoint, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          const data = await res.json()
          if(data.success === false){
            dispatch(DeleteInFailure(data.message))
          }
          else{
            dispatch(DeleteInSuccess())
          }
        }
        catch(error){
          dispatch(DeleteInFailure(error))
        }
  }
const handleSignout = ()=>{
      try{
        dispatch(DeleteInStart())
        dispatch(DeleteInSuccess())
      }
      catch(error){
        dispatch(DeleteInFailure(error))
      }
}
const handleListing = async ()=> {
  let endpoint = `http://localhost:5000/lisiting/getListing`

  try{
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
    if(data.success === false){
      dispatch(DeleteInFailure(data.message))
    }

  }
  catch(error){
    dispatch(DeleteInFailure(error))
  }
}
return (
    <div className="max-w-lg mx-auto mt-14">
        <h1 className="font-semibold text-4xl text-center">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        value={formdata.Username}
        onChange={handleChange}
        className="p-4 border rounded-lg text-lg"/>
        <input type="email" 
        placeholder="Email"
        name="email" 
        onChange={handleChange}
        className="p-4  border rounded-lg text-lg"
        value={formdata.email}
        />
        <input type="password" 
        placeholder="Password"
        onChange={handleChange}
        name="password" 
        className="p-4 border rounded-lg text-lg"
        value={formdata.password}/>
        <button type="submit" disabled={Loading} className="text-white bg-slate-700 p-4 rounded-lg text-xl hover:opacity-90">{Loading ? 'Loading...' : 'UPDATE'}</button>
    
        <Link
          className='bg-green-700 text-white p-4 text-xl rounded-lg uppercase text-center hover:opacity-95'
          to="/create-Lisiting"
        >
          Create Listing
        </Link>
     
       
        </form>
        <div className="flex justify-between mt-5">
            <span className="text-red-700 text-lg cursor-pointer hover:underline" onClick={handleDelete}>Delete Account</span>
            <span className="text-red-700 text-lg cursor-pointer hover:underline" onClick={handleSignout}>Sign Out</span>
        </div>
        
        {
            Error && <p className="text-red-500 mt-5">{Error}</p>
           }
           {
            updateSuccess && <p className="text-green-700 mt-5">
              User is Updated Successfully
            </p>
           }
           <button className="text-green-700 text-center w-full text-xl pb-6 hover:underline" onClick={handleListing}>Show Listing</button>
    </div>
)
}
export default Profile