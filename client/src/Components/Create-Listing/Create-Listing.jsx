import { useState } from "react"
const CreateLisiting = ()=>{
    const [files, setFiles] = useState([])
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
   
const handleChange = (e)=>{
    if(e.target.type === 'text' || e.target.type === 'number'){
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

return (
  <main className="max-w-4xl mx-auto">
    <h1 className="font-bold text-center my-12 text-4xl">Create a Lisiting</h1>
    <form className="flex flex-col md:flex-row gap-4">
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
                className="p-3 border border-gray-300"
                onChange={(e)=>setFiles(e.target.files)}
                />
                <button className="p-3 text-green-700 border border-green-700">UPLOAD</button>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg">CREATE LISTING</button>
        </div>
    </form>
  </main>
)
}
export default CreateLisiting