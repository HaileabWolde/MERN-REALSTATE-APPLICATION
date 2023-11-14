const NavBar = ()=>{
    return (
       <header>
        <div className="flex justify-between bg-slate-200 mx-auto">
            <h1>
                <span className="text-xl ">Sahand</span>
                <span className="text-xl">Estate</span>
            </h1>
            <form>
                <input
                type="text"
                placeholder="Search ..."
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