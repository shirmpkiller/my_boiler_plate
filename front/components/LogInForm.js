import React, { useRef, useCallback, useState, useEffect } from 'react';
import styles from './LogInForm.module.scss';
import useInput from '../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import {LOG_IN_REQUEST, LOG_OUT_REQUEST} from '../reducers/user'
const LogInForm = () => {
    const [userId, onChangeUserId, setUserId] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    
    const userIdInput = useRef(null);
    const passwordInput = useRef(null);

    // const {signUpDone} = useSelector((state) => state.user);

    const dispatch = useDispatch();

// useEffect(()=>{
//     if(signUpDone){
//         setPassword('');
//         setUserName('');
//         setPasswordCheck('');
//         setPasswordError('');
//         setGender('male');
//         setTel('');
//         setUserId('');
//     }
// },[signUpDone])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();//spa에서는 브라우저 새로고침이 제출할 때 필요없음
        return dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId,
                password,               
            }
        })

    }, [userId, password])


  
    return (
        <div >
            <form onSubmit={onSubmitForm}>
            <label htmlFor="id">id : </label><br />
                <input
                    className={styles.input}
                    id="id"
                    ref={userIdInput}
                    value={userId}
                    onChange={onChangeUserId}
                    type="text"
                /><br />
               
                <label htmlFor="password">password : </label><br />
                <input
                    className={styles.input}
                    id="password"
                    ref={passwordInput}
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                /><br />                
                <button type="submit">LOG IN</button>
            </form>
        </div>
    );
}

export default LogInForm;