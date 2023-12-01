import { useState } from "react"
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from "../../FireBase/firebase"
const CreateLisiting = ()=>{
    
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        imageurl:[],
        name: "",
        description: "",
        address: "",
        type: "Rent",
        Parking: false,
        Furnished: false,
        Offer: false,
        Beds: 1,
        Baths: 1,
        RegularPrice: 1,
        Discounted: 1

    })
    const {token} = useSelector((state)=> state.user)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
   const [uploading, setUploading] = useState(false)
   const [imageUploadError, setImageUploadError] = useState(false)

const handleChange = (e)=>{
    if(e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea'){
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        }) }
    else if(e.target.id === "Sell" || e.target.id === 'Rent'){
        setFormData({
            ...formdata,
            type: e.target.id
        })
    }
    else if(e.target.id === "Parking" || e.target.id === "Furnished" || e.target.id === "Offer"){
        setFormData({
            ...formdata,
            [e.target.id]: e.target.checked
        })
    }
   
}

const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formdata.imageurl.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formdata,
            imageurl: formdata.imageurl.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const RemoveImage = (index)=>{
    setFormData({
      ...formdata,
      imageurl: formdata.imageurl.filter((_, i)=> i !== index)
    })
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const endpoint = 'http://localhost:5000/lisiting/create'
    try{
      setLoading(true)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formdata),
      })
      const data = await res.json()
    
      // Add this line to log the data
      if(data.success === false){
        setError(data.message)
      }

      navigate(`/listing/${data._id}`);
      setLoading(false)
     
    }
    catch(error){
      setLoading(error)
      setError(error.message)
    }

  }
  
return (
  <main className="max-w-4xl mx-auto">
    <h1 className="font-bold text-center my-12 text-4xl">Create a Lisiting</h1>
    <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 flex-1 py-6">
            <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-3 border rounded-lg text-xl"
            defaultValue={formdata.name}
            onChange={handleChange}
            required
            />
            <textarea
            type="text"
            placeholder="Description"
            id="description"
            defaultValue={formdata.description}
            onChange={handleChange}
            className="p-3 border rounded-lg text-xl"
            required
            />
            <input
            type="text"
            placeholder="Address"
            id="address"
            defaultValue={formdata.address}
            className="p-3 border rounded-lg text-xl"
            required
            onChange={handleChange}
            />
            <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    id="Sell"
                    className="w-5"
                    onChange={handleChange}
                    checked={formdata.type === 'Sell'}
                    />
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    id="Rent"
                    className="w-5"
                    onChange={handleChange}
                    checked={formdata.type === 'Rent'}
                    />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    id="Parking"
                    className="w-5"
                    onChange={handleChange}
                    />
                    <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    id="Furnished"
                    className="w-5"
                    onChange={handleChange}
                    />
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    id="Offer"
                    className="w-5"
                    onChange={handleChange}
                    />
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2 ">
                    <input
                    type="number"
                    id="Beds"
                    min='1'
                    max='10'
                    className='p-3 border border-gray-300 rounded-lg'
                    defaultValue={formdata.Beds}
                    onChange={handleChange}
                    />
                    <span>Beds</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                    type="number"
                    id="Baths"
                    min='1'
                    max='10'
                    className='p-3 border border-gray-300 rounded-lg'
                    defaultValue={formdata.Baths}
                    onChange={handleChange}
                    />
                    <span>Baths</span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <input
                type="number"
                id="RegularPrice"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue={formdata.RegularPrice}
                onChange={handleChange}
                />
                <div className="flex flex-col items-center">
                    <span className="text-xl">Regular Price</span>
                    <span  className="text-sm">($ / Month)</span>
                </div>
            </div>
            {
                formdata.Offer && 
                <div className="flex gap-2 items-center">
                <input
                type="number"
                id="Discounted"
                min={1}
                required
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue={formdata.Discounted}
                onChange={handleChange}
                />
                <div className="flex flex-col items-center">
                    <span  className="text-xl">Discounted Price</span>
                    <span className="text-sm">($ / Month)</span>
                </div>
            </div>
            }
          
        </div>
        <div className="flex flex-col gap-4">
            <p className="font-bold">Images:
            <span className="font-normal text-gray-600 ml-2">
                 The First image will be the cover(max 8)
                </span></p>
            <div className="flex gap-4">
                <input
                type="file"
                id='images'
                accept='image/*'
                multiple
                className="p-3 border border-gray-300"
                onChange={(e)=>setFiles(e.target.files)}
                />
                <button className="p-3 text-green-700 border border-green-700" 
                type="button"
                disabled={uploading}  
                onClick={handleImageSubmit}
                >{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formdata.imageurl.length > 0 &&
            formdata.imageurl.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  onClick={()=> RemoveImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button className="bg-slate-700 text-white p-3 rounded-lg" type="submit">{loading ? 'Creating ...' : 'CREATE LISTING'}</button>
            
            {error && <p  className='text-red-700 text-sm'>
             {error}
              </p>}
          
        </div>
    </form>
  </main>
)
}
export default CreateLisiting