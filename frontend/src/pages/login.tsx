import React from 'react';
import { Person, Lock } from '@mui/icons-material';
const Login = () => {
	const submitHandler = (event: any) => {
		event.preventDefault();
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
							type="text"
							name="username"
							className="form__input"
							placeholder="Username"
							required
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
