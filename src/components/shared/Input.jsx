import React from 'react'

export default function Input({type='text', id ,name,title,errors,value, onChange,onBlur,touched}) {
   // console.log(errors)
  return (
<>
<div className='input-group mb-3'>
<label htmlFor={id} className='form-label col-sm-12' >{title}</label><br />

   <input type={type} name={name }  id={id} className='form-control rounded-pill' value={value} onChange={onChange} onBlur={onBlur}/>
   <div className='col-sm-12 p-0 '>{errors[name]&& touched[name] && <p className=' text-danger'>{errors[name]}</p>}</div>
</div>
</>
  )
}
