import { useState } from "react"
const CreateLisiting = ()=>{
    const [formdata, setFomrData] = useState({
        name: "",
        description: "",
        address: "",
        type: "Rent",
        Parking: "false",
        Furnished: "false",
        Offer: "false",
        Beds: "1",
        Baths: "1"

    })
return (
  <main className="max-w-4xl mx-auto">
    <h1 className="font-bold text-center my-12 text-4xl">Create a Lisiting</h1>
    <form className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
            <input
            type="text"
            placeholder="Name"
            name="name"
            className="p-3 border rounded-lg text-xl"
            defaultValue={formdata.name}
            required
            />
            <textarea
            type="text"
            placeholder="Description"
            name="description"
            value={formdata.description}
            className="p-3 border rounded-lg text-xl"
            required
            />
            <input
            type="text"
            placeholder="Address"
            name="address"
            value={formdata.address}
            className="p-3 border rounded-lg text-xl"
            required
            />
            <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Sell"
                    className="w-5"
                
                    />
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Rent"
                    className="w-5"
                    />
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Parking"
                    className="w-5"
                    value={formdata.Parking}
                    />
                    <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Furnished"
                    className="w-5"
                    value={formdata.Furnished}
                    />
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Offer"
                    className="w-5"
                    value={formdata.Offer}
                    />
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2 ">
                    <input
                    type="number"
                    min='1'
                    max='10'
                    className='p-3 border border-gray-300 rounded-lg'
                    value={formdata.Beds}
                    />
                    <span>Beds</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                    type="number"
                    min='1'
                    max='10'
                    className='p-3 border border-gray-300 rounded-lg'
                    value={formdata.Baths}
                    />
                    <span>Baths</span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <input
                type="number"
                required
                className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                    <span>Regular Price</span>
                    <span>($ / Month)</span>
                </div>
            </div>
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