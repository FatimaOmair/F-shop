import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../register/register.css'
import { UserContext } from '../context/User.jsx'
import { cartContext } from '../context/Cart.jsx'
import { useQuery } from 'react-query'
export default function Navbar() {
  let{userToken,setUserToken,userData,setUserData}=useContext(UserContext)
  //console.log(userToken)
 let navigate= useNavigate()

 const logout=()=>{
  localStorage.removeItem('userToken')
  setUserToken(null)
  setUserData(null)
  navigate('/')
 }

 const {getCartContext}=useContext(cartContext)
 const getCart= async()=>{
     const res= await getCartContext ();
     return res
 }
 
 const {data,isLoading}= useQuery('cart', getCart)
// console.log(data)
//console.log(userData)



  return (
    <>
  <nav className="navbar navbar-expand-lg bg1 lobster">
      <div className="container">
      <a className="navbar-brand" href="#">
        <img src="/img/download.jpg" alt="" className='img-fluid img rounded-circle ' style={{ width: 50, height: 50 }} />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
         
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>


          <li className="nav-item">
            <a className="nav-link" href="#">Categories</a>
          </li>


          <li className="nav-item">
          <Link className="nav-link" to='/allproducts'>Products</Link>
        </li>

      {userToken?<li className="nav-item">
          <Link className="nav-link" to='/cart'>Cart <span className='rounded p-1 bg-danger'>{data?.count?data.count:'0'}</span></Link>
        </li>
       :null}


       
       
        </ul>
        <ul className="navbar-nav">
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {userData!=null?userData.userName:'Action'}
        </a>
        <ul className="dropdown-menu ">
         
         {userToken==null?<>
          <li><Link className="dropdown-item" to='/register'>register</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to={'/login'}>login</Link></li></>
          :<>
           <li><Link className="dropdown-item" to='/profile'>Profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
          </>}
        
       
          
         
         
          
          

        </ul>
      </li>
        </ul>
     
      </div>
    </div>
  </nav>





    </>
  )
}
