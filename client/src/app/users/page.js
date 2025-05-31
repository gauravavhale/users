"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './users.module.css'
import { ServerCall } from '@/common/api'
import { ctx } from '@/context/appContext'
import { toast} from 'react-toastify'
import { Table } from '@/components/Table'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Users = () => {
  const [data,setData]=useState([])
  const ctxData=useContext(ctx);

  const fnGetUsers=async ()=>{
    ctxData.dispatch({type:'LOADER',payload:true})
    try{
      debugger;
    const res=await ServerCall.sendGetReq(`${API_BASE_URL}/student/get-std`)
    setData(Array.isArray(res.data)?res.data: [])
    console.log(res.data);
    }catch(e){
      console.log(e.message);
      setData([])
      toast.error(e.message)
    }finally{
      ctxData.dispatch({type:'LOADER',payload:false})
    }
  }
  useEffect(()=>{
    fnGetUsers();
  },[])
  return (
    <div>
      <Table
        headers={["UID","Gender","LOCATION"]}
        data={data}
        columns={['uid','gen','address']}
      />
    </div>  
  )
}

export default Users
