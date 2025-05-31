import React from 'react';
import styles from './Select.module.css';
export const Select=({label,model,value,errorMsg,fnChange,options,values})=>{
  
  return <div className="row mb-3">
      <div className="col-sm-5 text-end">
        <b>{label}:</b>
      </div>
      <div className="col-sm-3">
       <select className="form-control" value={value} onChange={fnChange} name={model} >
	     <option value="">--Please select--</option>
	     {
		   options.map((opt,ind)=>{
				return <option value={values[ind]} key={"opt_"+ind}>{opt}</option>
		   })
	    }
	   </select>
      </div>
      <div className="col-sm-4">
       <b className="text-danger">{errorMsg}</b>
      </div>
  </div>
}
