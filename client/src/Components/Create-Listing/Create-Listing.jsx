const CreateLisiting = ()=>{
return (
  <main className="max-w-4xl mx-auto">
    <h1 className="font-bold text-center my-12 text-4xl">Create a Lisiting</h1>
    <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
            <input
            type="text"
            placeholder="Name"
            name="name"
            className="p-3 border rounded-lg text-xl"
            required
            />
            <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="p-3 border rounded-lg text-xl"
            required
            />
            <input
            type="text"
            placeholder="Address"
            name="address"
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
                    />
                    <span>Parking spot</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Furnished"
                    className="w-5"
                    />
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input 
                    type="checkbox"
                    name="Offer"
                    className="w-5"
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
                    />
                    <span>Beds</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                    type="number"
                    min='1'
                    max='10'
                    className='p-3 border border-gray-300 rounded-lg'
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