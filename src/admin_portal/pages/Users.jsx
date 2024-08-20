import React, { useEffect, useState, useMemo } from "react";
import { TextField, Box } from "@mui/material";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	addDoc,
	collection,
	getDocs,
	deleteDoc,
	doc,
	query,
	where,
	updateDoc,
} from "firebase/firestore";
import CancelIcon from "@mui/icons-material/Cancel";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../../../db";
import Modal from "@mui/material/Modal";
import { MaterialReactTable } from "material-react-table";
import { MdModeEditOutline } from "react-icons/md";
import { SendClientInvite } from "../../utils/MailingFuncs";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
const Users = () => {
	const [users, setUsers] = useState([]);
	const [Invitedusers, setInvitedUsers] = useState([]);
	const [buttonText, setButtonText] = useState("Invite");
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [open1, setOpen1] = useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	const [SelectedData, setSelectedData] = useState(null);
	const [popOPEN, setPopOpen] = useState(false);
	const [MyAds, setMyAds] = useState([]);
	const [createButtonText, setCreateButtonText] = useState("Create");
	const [adToUpdate, setAdToUpdate] = useState(null);
	const [userId, setUserId] = useState();

	const [formData, setformData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
	});
	const createAd = async () => {
		try {
			setCreateButtonText("Creating...");
			if (adFormData.images.length === 0) {
				toast.warn("Upload any image(s)!");
				setCreateButtonText("Create");
				handleClosePop();
				return;
			}

			const timestamp = Date.now();
			const uniqueId = Math.random().toString(36).substring(2);

			const promises = adFormData.images.map(async (file) => {
				const storageRef = ref(
					storage,
					`Ads/${timestamp}_${uniqueId}_${file.name}`,
				);
				await uploadBytes(storageRef, file);
				return getDownloadURL(storageRef);
			});

			const fileUrls = await Promise.all(promises);

			const formDataWithUrls = {
				...adFormData,
				images: fileUrls.map((url) => ({ file: url })),
				user: {
					uid: userId,
				},
				date: new Date().toISOString(),
			};

			delete formDataWithUrls.imagePreviews;

			await addDoc(collection(db, "Ads"), formDataWithUrls);

			toast.success("Ad created successfully!");
		} catch (error) {
			console.error("Error creating Ad:", error);
			toast.error("Error creating Ad!");
			handleClosePop();
		} finally {
			setCreateButtonText("Create");
			resetFormData();
			handleClosePop();
		}
	};

	const [adFormData, setadFormData] = useState({
		images: [],
		imagePreviews: [],
		model_name: "",
		model_year: "",
		registered_in: "",
		location: "",
		address: "",
		mileage_km: "",
		body_color: "",
		price: "",
		description: "",
		engine_type: "",
		engine_capacity: "",
		transmission: "",
		date: "",
		status: "active",
		user: {},
	});

	const resetFormData = () => {
		setadFormData({
			images: [],
			imagePreviews: [],
			model_name: "",
			model_year: "",
			registered_in: "",
			location: "",
			address: "",
			mileage_km: "",
			body_color: "",
			price: "",
			description: "",
			engine_type: "",
			engine_capacity: "",
			transmission: "",
			status: "active",
			date: "",
			user: {},
		});
	};
	const handleChangePop = (e) => {
		const { name, value } = e.target;
		const keys = name.split(".");
		if (keys.length > 1) {
			setadFormData((prevState) => ({
				...prevState,
				[keys[0]]: {
					...prevState[keys[0]],
					[keys[1]]: value,
				},
			}));
		} else {
			setadFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		const newImagePreviews = files.map((file) => URL.createObjectURL(file));

		setadFormData((prevState) => ({
			...prevState,
			images: [...prevState.images, ...files],
			imagePreviews: [...prevState.imagePreviews, ...newImagePreviews],
		}));
	};
	const handleImageDelete = (index) => {
		setadFormData((prevState) => {
			const newImages = [...prevState.images];
			const newImagePreviews = [...prevState.imagePreviews];
			newImages.splice(index, 1);
			newImagePreviews.splice(index, 1);
			return {
				...prevState,
				images: newImages,
				imagePreviews: newImagePreviews,
			};
		});
	};
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const UsersCollection = collection(db, "users");
				const snapshot = await getDocs(UsersCollection);
				const UsersData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setUsers(UsersData);
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};
		const fetchInvitedUsers = async () => {
			try {
				const InvUsersCollection = collection(db, "invited_users");
				const snapshot = await getDocs(InvUsersCollection);
				const InvUsersData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setInvitedUsers(InvUsersData);
			} catch (error) {
				console.error("Error fetching invited users:", error);
			}
		};

		fetchInvitedUsers();
		fetchUsers();
	}, []);
	const CreateHandleOpen = (userId) => {
		setUserId(userId);
		resetFormData();
		setCreateButtonText("Create");
		setAdToUpdate(null);
		setPopOpen(true);
	};

	const handleEdit = (data) => {
		setSelectedData(data);
		handleOpen1();
	};
	const handleClosePop = () => {
		setPopOpen(false);
	};

	const columns = useMemo(
		() => [
			{
				accessorKey: "fullname",
				header: "User Name",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				accessorKey: "email",
				header: "Email",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				accessorKey: "phoneNumber",
				header: "Phone Number",
				size: 200,
			},
			{
				header: "Actions",
				size: 100,
				Cell: ({ cell }) => (
					<Box display="flex" gap="0.5rem" alignItems="center">
						<MdModeEditOutline
							onClick={() => handleEdit(cell.row.original)}
							className="w-6 h-6 cursor-pointer text-[#ffe001]"
						/>
						<button
							onClick={() => {
								CreateHandleOpen(cell.row.original.id);
							}}
							type="button"
							className="bg-[#ffe001] text-white rounded-lg py-2 px-6 hover:scale-105 transition-transform duration-200"
						>
							Add a new add
						</button>
					</Box>
				),
			},
		],
		[],
	);

	const InvUserscolumns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "User Name",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				accessorKey: "email",
				header: "Email",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue().length > 100
							? cell.getValue().slice(0, 100) + "..."
							: cell.getValue()}
					</Box>
				),
			},
			{
				accessorKey: "phoneNumber",
				header: "Phone Number",
				size: 200,
			},
			{
				accessorKey: "signup_status",
				header: "Signup Status",
				size: 100,
				Cell: ({ cell }) => (
					<Box>
						{cell.getValue() === "pending" ? (
							<>
								<div className="w-full flex flex-row justify-center items-center gap-2">
									<div className="h-[8px] w-[8px] bg-[#ff0000] rounded-full"></div>
									<p className="text-center font-semibold text-[12px]">
										Pending
									</p>
								</div>
							</>
						) : (
							<>
								<div className="w-full flex flex-row justify-center items-center gap-2">
									<div className="h-[8px] w-[8px] bg-[#00C32B] rounded-full"></div>
									<p className="text-center font-semibold text-[12px]">
										joined
									</p>
								</div>
							</>
						)}
					</Box>
				),
			},
		],
		[],
	);

	const DeleteUser = async (id) => {
		try {
			await deleteDoc(doc(db, "users", id));
			toast.success("User deleted successfully!");
			setUsers((prevUsers) => prevUsers.filter((prep) => prep.id !== id));
		} catch (error) {
			console.error("Error deleting user:", error);
			toast.error("Error occurred while deleting user");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setformData({ ...formData, [name]: value });
	};

	const sendInviteMail = async () => {
		try {
			setButtonText("Inviting...");
			SendClientInvite(formData);
			await addDoc(collection(db, "invited_users"), {
				...formData,
				signup_status: "pending",
			});
			setButtonText("Invite");
			handleClose();
			toast.success("User Invited Successfully!");
		} catch (error) {
			console.log(error.message);
			setButtonText("Invite");
			handleClose();
			toast.success("Error Inviting User!");
		}
	};

	const updateUser = async () => {
		try {
			const usersref = collection(db, "users");
			const q = query(usersref, where("email", "==", SelectedData.email));
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				querySnapshot.forEach(async (doc) => {
					const UserRef = doc.ref;
					await updateDoc(UserRef, {
						fullname: SelectedData.fullname,
						phoneNumber: SelectedData.phoneNumber,
					});
				});
				handleClose1();
				toast.success("User Edited Successfully!");
			} else {
				console.log("no record of user found..");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="w-full flex flex-col bg-[#FAFAFA] justify-center items-center">
				<div className="w-[90%] flex flex-col gap-5 justify-center items-start">
					<button
						className="
        w-[70%] md:w-[40%] lg:w-1/4
        font-semibold rounded-full 
        bg-[#ffe001] text-white 
        text-[16px] lg:text-[18px]
        py-3 px-4 
        transition-all duration-300 
        hover:bg-[#f0d000] hover:text-gray-500  
hover:scale-105
    "
						onClick={handleOpen}
						type="button"
					>
						Invite a New User +
					</button>
					<h1 className="text-black font-bold text-[25px] mt-5 mb-5">Users</h1>
				</div>

				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div className="md:w-[50%] w-[90%] gap-4 bg-white flex flex-col  rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
						<h3 className="font-bold md:text-[24px] text-[15px] text-center">
							Invite a New User
						</h3>
						<TextField
							required
							label="Client Name"
							type="text"
							onChange={handleChange}
							name="name"
							value={formData.name}
							className="w-[70%]"
						/>
						<TextField
							required
							label="Email"
							type="email"
							onChange={handleChange}
							name="email"
							value={formData.email}
							className="w-[70%]"
						/>
						<TextField
							required
							label="Contact Number"
							type="text"
							onChange={handleChange}
							name="phoneNumber"
							value={formData.phoneNumber}
							className="w-[70%]"
						/>

						<div className="w-[90%] mb-5 flex flex-col justify-end items-end">
							<div className="md:w-[30%] w-full pr-0 md:pr-2">
								<Button onClickProp={sendInviteMail} text={buttonText} />
							</div>
						</div>
					</div>
				</Modal>

				{SelectedData && (
					<Modal
						open={open1}
						onClose={handleClose1}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div className="md:w-[50%] w-[90%] gap-4 bg-white flex flex-col  rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
							<h3 className="font-bold md:text-[24px] text-[15px] text-center">
								Edit User Details
							</h3>
							<TextField
								required
								label="Client Name"
								type="text"
								name="name"
								onChange={(e) =>
									setSelectedData({ ...SelectedData, fullname: e.target.value })
								}
								value={SelectedData.fullname}
								className="w-[70%]"
							/>
							<TextField
								required
								label="Email"
								type="email"
								name="email"
								disabled
								value={SelectedData.email}
								className="w-[70%]"
							/>
							<TextField
								required
								label="Contact Number"
								type="text"
								name="phoneNumber"
								onChange={(e) =>
									setSelectedData({
										...SelectedData,
										phoneNumber: e.target.value,
									})
								}
								value={SelectedData.phoneNumber}
								className="w-[70%]"
							/>

							<div className="w-[90%] mb-5 flex flex-col justify-end items-end">
								<div className="md:w-[30%] w-full pr-0 md:pr-2">
									<Button onClickProp={updateUser} text={"Edit"} />
								</div>
							</div>
						</div>
					</Modal>
				)}

				<div className="w-[90%] flex flex-col gap-5 justify-center items-start">
					{users ? (
						<div className="table w-full">
							<MaterialReactTable
								enableRowSelection
								columns={columns}
								data={users}
								renderTopToolbarCustomActions={({ table }) => {
									const handleDelete = () => {
										const selectedRows = table.getSelectedRowModel().flatRows;
										if (selectedRows.length === 1) {
											const selectedRowId = selectedRows[0].original.id;
											alert("Deleting User with ID: " + selectedRowId);
											DeleteUser(selectedRowId);
										} else {
											alert("Please select a single row to delete.");
										}
									};
									return (
										<div style={{ display: "flex", gap: "0.5rem" }}>
											<button
												color="error"
												onClick={handleDelete}
												type="button"
												className="bg-[#ffe001] text-white rounded-lg py-2 px-6 hover:scale-105 "
											>
												Delete
											</button>
										</div>
									);
								}}
							/>
						</div>
					) : null}
				</div>

				<div className="w-[90%] flex flex-col justify-center items-start">
					<h1 className="text-black font-bold text-[25px] mt-5 mb-5">
						Invited Users
					</h1>
					{Invitedusers ? (
						<div className="table w-full">
							<MaterialReactTable
								columns={InvUserscolumns}
								data={Invitedusers}
							/>
						</div>
					) : null}
				</div>
			</div>
			<Modal
				open={popOPEN}
				onClose={handleClosePop}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div className="md:w-[50%] w-[90%] mt-[50px] gap-4 bg-white flex flex-col rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
					<h3 className="font-bold md:text-[24px] text-[15px] text-center">
						{adToUpdate === null ? "Create Ad" : "Update Ad"}
					</h3>

					<div className="file_upload w-[70%] p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
						<svg
							className="text-indigo-500 w-24 mx-auto mb-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
						<div className="input_field flex flex-col w-max mx-auto text-center">
							<label>
								<input
									className="text-sm cursor-pointer w-36 hidden"
									type="file"
									multiple
									onChange={handleImageChange}
								/>
								<div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
									Select
								</div>
							</label>

							<div className="title text-indigo-500 uppercase">
								or drop files here
							</div>
						</div>
					</div>

					<div className="w-[70%] grid grid-cols-4 gap-1 items-center justify-center mt-4">
						{adFormData.imagePreviews.map((preview, index) => (
							<div key={index} className="relative">
								<button
									onClick={() => handleImageDelete(index)}
									className="absolute w-full flex justify-end items-end text-black rounded-md"
								>
									<CancelIcon />
								</button>
								<img
									src={preview}
									alt={`preview ${index}`}
									className="w-[200px] h-[100px] object-cover mb-2 rounded-md"
								/>
							</div>
						))}
					</div>

					<TextField
						required
						label="Model Name"
						type="text"
						onChange={handleChangePop}
						name="model_name"
						value={formData.model_name}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Model Year"
						type="text"
						onChange={handleChangePop}
						name="model_year"
						value={formData.model_year}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Registered In"
						type="text"
						onChange={handleChangePop}
						name="registered_in"
						value={formData.registered_in}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Location"
						type="text"
						onChange={handleChangePop}
						name="location"
						value={formData.location}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Address"
						type="text"
						onChange={handleChangePop}
						name="address"
						value={formData.address}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Mileage (km)"
						type="text"
						onChange={handleChangePop}
						name="mileage_km"
						value={formData.mileage_km}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Body Color"
						type="text"
						onChange={handleChangePop}
						name="body_color"
						value={formData.body_color}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Price"
						type="number"
						onChange={handleChangePop}
						name="price"
						value={formData.price}
						className="w-[70%]"
					/>
					<TextField
						required
						label="Description"
						multiline
						rows={5}
						type="text"
						onChange={handleChangePop}
						name="description"
						value={formData.description}
						className="w-[70%]"
					/>

					<FormControl required className="w-[70%]">
						<InputLabel>Engine Type</InputLabel>
						<Select
							label="Engine Type"
							onChange={handleChangePop}
							name="engine_type"
							value={formData.engine_type}
						>
							<MenuItem value="Hybrid">Hybrid</MenuItem>
							<MenuItem value="Diesel">Diesel</MenuItem>
							<MenuItem value="CNG">CNG</MenuItem>
							<MenuItem value="Petrol">Petrol</MenuItem>
						</Select>
					</FormControl>

					<TextField
						required
						label="Engine Capacity"
						type="text"
						onChange={handleChangePop}
						name="engine_capacity"
						value={formData.engine_capacity}
						className="w-[70%]"
					/>

					<FormControl required className="w-[70%]">
						<InputLabel>Transmission</InputLabel>
						<Select
							label="Transmission"
							onChange={handleChangePop}
							name="transmission"
							value={formData.transmission}
						>
							<MenuItem value="Automatic">Automatic</MenuItem>
							<MenuItem value="Manual">Manual</MenuItem>
						</Select>
					</FormControl>

					<div className="w-[90%] mb-5 flex flex-col justify-end items-end">
						<div className="md:w-[30%] w-full pr-0 md:pr-2">
							<Button
								onClickProp={createButtonText === "Create" && createAd}
								text={createButtonText}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Users;
