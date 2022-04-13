import React, { useState } from 'react';
import { Person, Lock } from '@mui/icons-material';
import { InputChange } from '../utils/TypeScript';
const Login = () => {
	const initialState = { email: '', password: '' };
	const [userLogin, setUserLogin] = useState(initialState);
	const { email, password } = userLogin;
	const submitHandler = (event: any) => {
		event.preventDefault();
	};

	const handleChangeInput = (e: InputChange) => {
		const { value, name } = e.target;
		setUserLogin({ ...userLogin, [name]: value });
	};
	return (
		<div>
			<div className="grid">
				<form
					action="https://httpbin.org/post"
					method="POST"
					className="form login"
					onSubmit={submitHandler}
				>
					<div className="form__field">
						<label htmlFor="login__username">
							<Person />
							<span className="hidden">Username</span>
						</label>
						<input
							autoComplete="username"
							id="login__username"
							type="emal"
							name="email"
							className="form__input"
							placeholder="Username"
							required
							onChange={handleChangeInput}
						/>
					</div>

					<div className="form__field">
						<label htmlFor="login__password">
							<Lock />
							<span className="hidden">Password</span>
						</label>
						<input
							id="login__password"
							type="password"
							name="password"
							className="form__input"
							placeholder="Password"
							required
							onChange={handleChangeInput}
						/>
					</div>

					<div className="form__field">
						<input type="submit" value="Sign In" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
