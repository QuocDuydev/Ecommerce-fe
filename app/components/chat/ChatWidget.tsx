"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { URL_API } from "@/app/types";
import React, { useEffect } from "react";
import { BsChatRightDots } from "react-icons/bs";
import { io } from "socket.io-client";
import ChatPanel from "./ChatPanel";

export type TMessage = {
	username: string;
	message: string;
};

let socket: any;

const HelpWidget = () => {
	const { user } = useAuth();
	const [isOpen, setIsOpen] = React.useState(false);
	const [text, setText] = React.useState("");
	const [messages, setMessages] = React.useState<TMessage[]>([]);
	let welcome: { username: any; message: any };

	const handleCloseWidget = () => {
		setIsOpen(false);
	};

	const handleOpenSupportWidget = () => {
		setIsOpen(true);
	};

	const handleSendMessage = (e: any) => {
		e.preventDefault();

		socket.emit("sendMessage", {
			username: user === undefined ? "Unknown" : user.username,
			message: text,
		});

		setText("");
	};

	useEffect(() => {
		socketInitializer();
	}, []);

	async function socketInitializer() {
		socket = io(URL_API);

		socket.emit(
			"join",
			{ username: user === undefined ? "Unknown" : user.username },
			(error: any) => {
				//Sending the username to the backend as the user connects.
				if (error) return alert(error);
			},
		);

		socket.on(
			"welcome",
			async (data: { username: any; message: any }, error: any) => {
				//Getting the welcome message from the backend
				const welcomeMessage = {
					username: data.username,
					message: data.message,
				};
				welcome = welcomeMessage;
				setMessages([welcomeMessage]); //Storing the Welcome Message
				await fetch(`${URL_API}/api/messages`) //Fetching all messages from Strapi
					// await fetch(`http://localhost:1337/api/messages`) //Fetching all messages from Strapi
					.then(async (res) => {
						const response = await res.json();
						let arr: TMessage[] = [welcome];
						response.data.map((one: { attributes: TMessage }, i: any) => {
							arr = [...arr, one.attributes];
							setMessages((msgs) => arr); // Storing all Messages in a state variable
						});
					})
					.catch((e) => console.log(e.message));
			},
		);

		socket.on("message", async (data: TMessage) => {
			await fetch(`${URL_API}/api/messages`)
				// await fetch(`http://localhost:1337/api/messages`) //Fetching all messages from Strapi
				.then(async (res) => {
					const response = await res.json();
					let arr: TMessage[] = [welcome];
					response.data.map((one: { attributes: TMessage }, i: any) => {
						arr = [...arr, one.attributes];
						setMessages((msgs) => arr);
					});
				})
				.catch((e) => console.log(e.message));
		});
	}

	return isOpen ? (
		<div
			className="
      fixed bottom-10 right-10 rounded-3xl border-1 border-gray-300
      flex h-96 w-fit flex-col justify-between bg-white p-6 z-20"
		>
			<ChatPanel
				text={text}
				setText={setText}
				messages={messages}
				onClose={handleCloseWidget}
				handleSendMessage={handleSendMessage}
			/>
		</div>
	) : (
		<button
			onClick={handleOpenSupportWidget}
			className="
        fixed bottom-10 right-10 cursor-pointer bg-blue-400 p-4
        text-white hover:bg-blue-500 rounded-full
      "
		>
			<BsChatRightDots />
		</button>
	);
};

export default HelpWidget;
