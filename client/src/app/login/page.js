"use client"
import React, { useContext, useState } from 'react'
import styles from './login.module.css'
import configuration from './configuration.json'
import Input from '@/components/reusable/Input/Input'
import { fnValidate, fnValidateForm } from '@/common/validations'
import Link from 'next/link'
import { ServerCall } from '@/common/api'
import { ctx } from '@/context/appContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Login = () => {
  const [inputControls, setInputControls] = useState(configuration)
  const router = useRouter()
  const ctxData = useContext(ctx);
  const fnLogin = async () => {
    try {
      const inputControlsClonedArr = JSON.parse(JSON.stringify(inputControls));
      const [isFormValid, dataObj] = fnValidateForm(inputControlsClonedArr)
      if (!isFormValid) {
        setInputControls(inputControlsClonedArr);
        return;
      }
      ctxData.dispatch({
        type: 'LOADER',
        payload: true
      })
      const res = await ServerCall.sendPostReq(`${API_BASE_URL}/auth/login`, { data: dataObj });
      console.log(res);
      const { uid, id, token } = res.data
      if (uid && id && token) {
        //window.location.href = "/home"
        router.push("/home")
        window.history.replaceState(null, null, "/home");
        sessionStorage.uid = uid
        sessionStorage.setItem("id", id)
        sessionStorage.token = token;
        ctxData.dispatch({
          type: 'AUTH',
          payload: {
            isLoggedIn: true,
            userInfo: res.data,
          }
        })

      } else {
        toast.error("Please Check Entered UID or PWD")
      }

    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
    finally {
      ctxData.dispatch({
        type: 'LOADER',
        payload: false
      })
    }
  }

  const handleChange = (eve) => {
    //create cloned inputControls variable
    const inputControlsClonedArr = JSON.parse(JSON.stringify(inputControls));
    fnValidate(inputControlsClonedArr, eve)
    setInputControls(inputControlsClonedArr)
  }
  return (
    <div className={`container-fluid ${styles.c1}`}>
      <h3 className="text-center my-3">Login</h3>
      {
        inputControls.map((obj, ind) => {
          return <Input key={"Input_" + ind} {...obj} fnChange={handleChange} />
        })
      }
      <div className="row">
        <div className="offset-sm-5 col-sm-7">
          <button onClick={fnLogin} className="btn btn-primary me-3">Login</button>
          <Link href="/register">To Register</Link>
        </div>
      </div>

    </div>
  )
}

export default Login
