import React, { useRef, useCallback, useState, useEffect } from 'react';
import styles from './SignUpForm.module.scss';
import useInput from '../hooks/useInput';
import { useDispatch,useSelector } from 'react-redux';
import {SIGN_UP_REQUEST} from '../reducers/user'
const SignUpForm = () => {
    const [email, onChangeEmail, setEmail] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [userName, onChangeUserName, setUserName] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [gender, setGender] = useState('male');
    const [tel, onChangeTel, setTel] = useInput('');
    const [userId, onChangeUserId, setUserId] = useInput('');

    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const telInput = useRef(null);
    const passwordCheckInput = useRef(null);
    const userNameInput = useRef(null);
    const userIdInput = useRef(null);

    const {signUpDone} = useSelector((state) => state.user);

    const dispatch = useDispatch();

useEffect(()=>{
    if(signUpDone){
        setPassword('');
        setUserName('');
        setPasswordCheck('');
        setPasswordError('');
        setGender('male');
        setTel('');
        setUserId('');
    }
},[signUpDone])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();//spa에서는 브라우저 새로고침이 제출할 때 필요없음
        return dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                email,
                password,
                userId,
                tel,
                userName,
                gender
            }
        })

    }, [email, password, userId,email,tel,userName,gender])


    const onChangeGender = (choice) => () => {
        setGender(choice);
        console.log(gender);
    }
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    return (
        <div >
            <form onSubmit={onSubmitForm}>
                <label htmlFor="email">email : </label><br />
                <input
                    className={styles.input}
                    id="email"
                    ref={emailInput}
                    value={email}
                    onChange={onChangeEmail}
                    type="email"
                /><br />

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

                <div>
                    <label htmlFor="passwordCheck">password check : </label><br />
                    <input
                        className={styles.input} id="password"
                        ref={passwordCheckInput} value={passwordCheck}
                        onChange={onChangePasswordCheck} type="password"
                    />  {passwordError && <span className={styles.red}>비밀번호가 일치하지 않습니다.</span>}
                    <br />
                </div>


                <label htmlFor="name">name : </label><br />
                <input
                    className={styles.input}
                    id="name"
                    ref={userNameInput}
                    value={userName}
                    onChange={onChangeUserName}
                    type="text"
                /><br />

                <input type="radio" id="male" value="male"
                    checked={gender === 'male'} onChange={onChangeGender("male")}
                />
                <label htmlFor="male">남</label>
                <input type="radio" id="female" value="female"
                    checked={gender === 'female'} onChange={onChangeGender("female")}
                />
                <label htmlFor="female">여</label><br />

                <label htmlFor="tel">tel : </label><br />
                <input
                    className={styles.input}
                    id="tel"
                    ref={telInput}
                    value={tel}
                    onChange={onChangeTel}
                    type="tel"
                    placeholder="-없이 입력하세요" pattern="[0-9]{11}" required
                /><br />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default SignUpForm;