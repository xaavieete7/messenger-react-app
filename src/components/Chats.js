import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext";

import { auth } from "../firebase";
import axios from "axios";

const Chats = () => {

	const history = useHistory();
	const { user } = useAuth();
	const [ loading, setLoading ] = useState(true);

	const handleLogout = async () => {
		await auth.signOut();
		history.push('/');
	}

	const getFile = async (url) => {

		const response = await fetch(url);
		const data = await response.blob();

		return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
	}

	useEffect(() => {

		if (!user) {
			history.push('/');
			return;
		}

		axios.get('https://api.chatengine.io/users/me/', {
			headers:{
				"project-id":"e19c9faa-802c-475d-af4f-fcb39dfe8de3",
				"user-name":user.email,
				"user-secret":user.uid
			}
		})
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				let formData  = new FormData();
				formData.append("email", user.email);
				formData.append("username", user.email);
				formData.append("secret", user.uid);

				getFile(user.photoURL)
					.then((avatar) => {
						formData.append("avatar", avatar, avatar.name);
						axios.post('https://api.chatengine.io/users/',
							formData,
					{
								headers: {
									"PRIVATE-KEY": "ade3c477-211e-4a12-b1d6-97ebfddc5a4f"
								}
							}
						)
							.then(() => setLoading(false))
							.catch((err) => console.log(err))

					});
			});

	}, [user, history]);


	if (!user || loading) return "Loading...";


	return (
		<div className="chats-page">
			<div className="nav-bar">
				<div className="logo-tab">
					Unichat
				</div>
				<div
					className="logout-tab"
					onClick={ handleLogout }
				>
					Logout
				</div>
			</div>

			<ChatEngine
				heigth="calc(100vh - 66px)"
				projectID="e19c9faa-802c-475d-af4f-fcb39dfe8de3"
				userName={user.email}
				userSecret={user.uid}
			/>

		</div>
	);
}

export default Chats;