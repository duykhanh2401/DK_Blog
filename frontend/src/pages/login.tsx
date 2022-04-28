import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormSubmit, InputChange } from '../utils/TypeScript';
import { login } from './../redux/actions/authAction';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Alert from '../components/alert/Alert';
const Login = () => {
	const initialState = { email: '', password: '' };
	const [userLogin, setUserLogin] = useState(initialState);
	const { email, password } = userLogin;
	const dispatch = useDispatch();

	const [onFocusEmail, setFocusEmail] = useState(false);
	const toggleFocusEmail = () => {
		if (onFocusEmail) {
			console.log(email === '');
			if (email === '') {
				setFocusEmail(false);
			}
		} else {
			setFocusEmail(true);
		}
	};
	const [onFocusPassword, setFocusPassword] = useState(false);
	const toggleFocusPassword = () => {
		if (onFocusPassword) {
			console.log(email === '');
			if (password === '') {
				setFocusPassword(false);
			}
		} else {
			setFocusPassword(true);
		}
	};
	const handleChangeInput = (e: InputChange) => {
		const { value, type } = e.target;
		setUserLogin({ ...userLogin, [type]: value });
	};

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(login(userLogin));
	};
	return (
		<form onSubmit={handleSubmit} className="form-login" autoComplete="off">
			<div className={`input-div one ${onFocusEmail ? 'focus' : ''}`}>
				<div className="i">
					<PersonIcon />
				</div>
				<div className="div">
					<h5>Email</h5>
					<input
						type="email"
						className="input"
						onFocus={toggleFocusEmail}
						onBlur={toggleFocusEmail}
						autoComplete="new-password"
						onChange={handleChangeInput}
						required
					/>
				</div>
			</div>
			<div className={`input-div pass ${onFocusPassword ? 'focus' : ''}`}>
				<div className="i">
					<LockIcon />
				</div>
				<div className="div">
					<h5>Mật khẩu</h5>
					<input
						onChange={handleChangeInput}
						onFocus={toggleFocusPassword}
						onBlur={toggleFocusPassword}
						type="password"
						className="input"
						autoComplete="new-password"
						required
					/>
				</div>
			</div>
			<input type="submit" className="btn" value="Login" />
		</form>
	);
};

export default Login;
