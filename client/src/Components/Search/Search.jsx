const SearchListing = ()=>{
    return (
        <div className="flex flex-col md:flex-row p-5">
            <div className="border-b-2 md:border-r-2 md:min-h-screen p-7">
                <form className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Search Term</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-lg w-full p-3"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <label>Type:</label>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <label>Amenties:</label>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Parking</span>

                        </div>
                        <div className="flex gap-2">
                            <input
                            type="checkbox"
                            className="w-5"
                            />
                            <span>Furnished</span>
                        </div>
                       
                    </div>
                    <div className="flex items-center gap-2">
                            <label className="font-semibold">Sort:</label>
                            <select className="border rounded-lg p-3">
                                <option>Price hight to low</option>
                                <option>Price low to high</option>
                                <option>Latest</option>
                                <option>Oldest</option>
                            </select>
                        </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
                   
            </div>
            <div className="p-3">
                <h1 className="font-semibold">Listing results:</h1>

            </div>
           
        </div>
    )
}
export default SearchListing