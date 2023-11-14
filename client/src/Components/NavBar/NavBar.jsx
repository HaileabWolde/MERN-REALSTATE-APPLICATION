const NavBar = ()=>{
    return (
       <header className="bg-slate-200">
        <div className="flex justify-between max-w-6xl mx-auto p-3">
            <h1 className="font-bold">
                <span className="text-xl ">Sahand</span>
                <span className="text-xl">Estate</span>
            </h1>
            <form>
                <input
                type="text"
                placeholder="Search ..."
                className="rounded-lg"
                />
            </form>
            <ul className="flex gap-2">
                <li>Home</li>
                <li>About</li>
                <li>SignIn</li>
            </ul>
        </div>
       </header>
    )
}
export default NavBar