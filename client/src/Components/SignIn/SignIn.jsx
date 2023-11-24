import { useState } from "react"
const SignIn = ()=>{
    const [signup, isSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState({
        Username: '',
        email: '',
        password: ''
    })
    const handleSignup = ()=>{
        isSignUp((prev)=>!prev)
    }
   
    const handleChange = (e)=>{
        setInfo({...info, 
            [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        let endpoint = signup ? 'http://localhost:5000/users/signup' : 'http://localhost:5000/users/signIn';
      
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
          });
      
          const data = await res.json();
      
          if (data.success === false) {
            setError(data.message);
          } else {
            // Process the successful response data
            console.log(data);
          }
        } catch (error) {
          console.error(error);
          // Handle any network or request errors
        }
      
        setLoading(false);
      };
    return (
        <div className="max-w-xl mx-auto my-12 text-center">
           <h1 className="font-semibold text-4xl m-">{signup ? 'Sign Up' : 'Sign In'}</h1>
           <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            {
                signup && 
                <input
                placeholder="Username"
                 type="text"
                name="Username"
                value={info.Username}
                onChange={handleChange}
                className="p-5 rounded-lg  text-sm md:text-lg border"
          />
            }
               
              <input
              placeholder="Email"
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              className="p-5 rounded-lg shadow-sm text-sm md:text-lg"
              />
              <input
              placeholder="Password"
              type="password"
              name="password"
              value={info.password}
              onChange={handleChange}
              className="p-5 rounded-lg shadow-sm text-sm md:text-lg"
              /> 
              {loading ? <button className="bg-slate-700 text-white p-4 rounded-lg text-sm md:text-xl">LOADING ... </button> : <button  type="submit" className="bg-slate-700 text-white p-4 rounded-lg text-sm md:text-xl">{signup ? 'SIGN UP' : 'SIGN IN'}</button>}          
           </form>
           <div className="mt-4">
           {
            signup ? <button onClick={handleSignup}> <h1> <span>Have an account?</span> 
            <span className="text-blue-500 ml-2">Sign In</span></h1></button> : 
            <button onClick={handleSignup}> <h1> 
                <span>Doesn't have an account? </span>
                <span className="text-blue-500 ml-2">Sign Up</span>
            </h1></button>
           }
           </div>
        
          
        </div>
    )
}
export default SignIn