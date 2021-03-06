import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import './alert.css';
const Alert = () => {
	const { alert } = useSelector((state: RootStore) => state);
	return (
		<div>
			{alert.loading && (
				<div className="overlay">
					<div className="container-rubic">
						<div className="h1Container">
							<div className="cube h1 w1 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w1 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w1 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w2 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w2 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w2 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w3 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w3 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h1 w3 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>
						</div>

						<div className="h2Container">
							<div className="cube h2 w1 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w1 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w1 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w2 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w2 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w2 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w3 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w3 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h2 w3 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>
						</div>

						<div className="h3Container">
							<div className="cube h3 w1 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w1 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w1 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w2 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w2 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w2 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w3 l1">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w3 l2">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>

							<div className="cube h3 w3 l3">
								<div className="face-alert top-alert"></div>
								<div className="face-alert left-alert"></div>
								<div className="face-alert right-alert"></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Alert;
