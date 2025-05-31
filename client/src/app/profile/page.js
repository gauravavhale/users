"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './profile.module.css'
import { ServerCall } from '@/common/api'
import { ctx } from '@/context/appContext'
import configurations from './configuration.json'
import Input from '@/components/reusable/Input/Input'
import { TextArea } from '@/components/reusable/TextArea'
import { Select } from '@/components/reusable/Select'
import { fnValidate,fnValidateForm } from '@/common/validations'
import { toast } from 'react-toastify'
import { Modal } from '@/components/Modal'
import {useRouter} from 'next/navigation'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Profile = () => {
  const router=useRouter()
  const [inputControls,setInputControls]=useState(configurations)
  const [showModal,setShowModal]=useState(false);
  const ctxData=useContext(ctx);
  const fnGetUserInfo=async ()=>{
      ctxData.dispatch({type:"LOADER",payload:true})
      try{
        const res=await ServerCall.sendGetReq(`${API_BASE_URL}/student/get-std-by-id?id=${sessionStorage.id}`);
        const userInfo=res.data;
        const inputControlsCloned=JSON.parse(JSON.stringify(inputControls));
        inputControlsCloned.forEach((obj)=>{
             obj.value=userInfo[obj.model]
        })
        setInputControls(inputControlsCloned)
      }catch(e){
        console.log(e);
      }finally{
        ctxData.dispatch({type:"LOADER",payload:false})
      }
  }
  useEffect(()=>{
    fnGetUserInfo();
  })
  const handleChange=(eve)=>{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    fnValidate(inputControlsClonedArr,eve)
    setInputControls(inputControlsClonedArr)
  }
  const handleUpdate=()=>{
    const inputControlsClonedArr=JSON.parse(JSON.stringify(inputControls));
    const [isFormValid,dataObj]=fnValidateForm(inputControlsClonedArr)
    if(!isFormValid){
      setInputControls(inputControlsClonedArr);
      return;
    }
    ctxData.dispatch({type:"LOADER",payload:true})
    ServerCall.sendPutReq(`${API_BASE_URL}/student/std-update?id=${sessionStorage.id}`,{data:dataObj})
    .then((res)=>{
        const {acknowledged,modifiedCount}=res?.data
        if(acknowledged && modifiedCount > 0){
          toast.success("Successfully Updated")
          
        }else{
          toast.error("Not Updated")
        }
    })
    .catch((res)=>{
      toast.success(res?.message)
    })
    .finally(()=>{
      ctxData.dispatch({type:"LOADER",payload:false})
    })
  }
  const handleDelete=()=>{
    setShowModal(true)
  }
  const fnOK=async ()=>{
    try{
      setShowModal(false)
      ctxData.dispatch({type:"LOADER",payload:true})
      const res=await ServerCall.sendDeleteReq(`${API_BASE_URL}/student/std-del/${sessionStorage.id}`)
      const {acknowledged,deletedCount}=res?.data
      if(acknowledged && deletedCount > 0){
        toast.success('Successfully terminated')
        router.push("/login")
      }else{
        toast.error('Not terminated')
      }
    }catch(e){
      toast.error(e.message)
    }
    finally{
      ctxData.dispatch({type:"LOADER",payload:false})
    }
      

  }
  const fnClose=()=>{
    setShowModal(false)
  }
  return (
    <div className='container-fluid'>
      <h3 className="text-center my-3">Register</h3>
      {
        inputControls.map((obj,ind)=>{
			switch(obj.tag){
				case 'input':
                  return  <Input key={"Input_"+ind} {...obj} fnChange={handleChange} />
				case 'textarea':
				  return <TextArea key={"TextArea_"+ind} {...obj} fnChange={handleChange} />
				case 'select':
				  return <Select key={"Select_"+ind} {...obj} fnChange={handleChange} />
			}
         
        })
      }
      <div className="row">
        <div className="offset-sm-5 col-sm-7">
        <button onClick={handleUpdate}  className="btn btn-primary me-3">Update</button>
        <button onClick={handleDelete}  className="btn btn-primary me-3">Terminate</button>

        </div>
      </div>
      {showModal && <Modal text="R u sure..." isShowOk={true} fnOK={fnOK} fnClose={fnClose}  />}
    </div>
  )
}

export default Profile
