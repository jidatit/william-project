import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

function StickyTitle() {
	const { currentUser } = useAuth();
	return (
		<>
			<div className="flex-grow text-gray-800">
				<header className="flex items-center h-20 px-6 sm:px-10 bg-white">
					<div className="flex flex-shrink-0 items-center ml-auto">
						<button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
							<span className="sr-only">User Menu</span>

							<div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
								{currentUser.data ? (
									<>
										<span className="font-semibold">
											{currentUser.data?.fullname || "Grace Simmons"}
										</span>
									</>
								) : (
									<div className="bg-white flex flex-col justify-center items-center rounded-lg w-[150px] shadow-md pt-1 pb-1 animate-pulse">
										<div className="w-[90%] h-4 bg-gray-300 rounded"></div>
									</div>
								)}
							</div>
						</button>
						<div className="border-l pl-3 ml-3 space-x-1">
							<Link to="/admin_portal/logout">
								<button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
									<span className="sr-only">Log out</span>
									<svg
										aria-hidden="true"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</button>
							</Link>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}

export default StickyTitle;
