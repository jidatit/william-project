import React, { useEffect, useState, useMemo } from 'react';
import { TextField, Box } from '@mui/material';
import Button from '../components/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../../db';
import Modal from '@mui/material/Modal';
import { MaterialReactTable } from 'material-react-table';
import { MdModeEditOutline } from "react-icons/md";
import { SendClientInvite } from "../../utils/MailingFuncs"

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

  const [formData, setformData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const UsersCollection = collection(db, 'users');
        const snapshot = await getDocs(UsersCollection);
        const UsersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(UsersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchInvitedUsers = async () => {
      try {
        const InvUsersCollection = collection(db, 'invited_users');
        const snapshot = await getDocs(InvUsersCollection);
        const InvUsersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInvitedUsers(InvUsersData);
      } catch (error) {
        console.error('Error fetching invited users:', error);
      }
    };

    fetchInvitedUsers();
    fetchUsers();
  }, []);

  const handleEdit = (data) => {
    setSelectedData(data)
    handleOpen1()
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'fullname',
        header: 'User Name',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 200,
      },
      {
        header: 'Actions',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            <MdModeEditOutline onClick={() => handleEdit(cell.row.original)} className='w-6 h-6 cursor-pointer text-[#FFA90A]' />
          </Box>
        )
      },
    ],
    [],
  );

  const InvUserscolumns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'User Name',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 100,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 100 ? cell.getValue().slice(0, 100) + '...' : cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        size: 200,
      },
      {
        accessorKey: 'signup_status',
        header: 'Signup Status',
        size: 100,
        Cell: ({ cell }) => (
          <Box>
            {cell.getValue() === "pending" ? (
              <>
                <div className='w-full flex flex-row justify-center items-center gap-2'>
                  <div className='h-[8px] w-[8px] bg-[#ff0000] rounded-full'></div>
                  <p className='text-center font-semibold text-[12px]'>Pending</p>
                </div>
              </>
            ) : (
              <>
                <div className='w-full flex flex-row justify-center items-center gap-2'>
                  <div className='h-[8px] w-[8px] bg-[#00C32B] rounded-full'></div>
                  <p className='text-center font-semibold text-[12px]'>joined</p>
                </div>
              </>
            )}
          </Box>
        )
      },
    ],
    [],
  );

  const DeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      toast.success('User deleted successfully!');
      setUsers(prevUsers => prevUsers.filter(prep => prep.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error occurred while deleting user');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData(
      { ...formData, [name]: value }
    );
  }

  const sendInviteMail = async () => {
    try {
      setButtonText("Inviting...")
      SendClientInvite(formData)
      await addDoc(collection(db, 'invited_users'), { ...formData, signup_status: "pending" });
      setButtonText("Invite")
      handleClose();
      toast.success("User Invited Successfully!")
    } catch (error) {
      console.log(error.message)
      setButtonText("Invite")
      handleClose();
      toast.success("Error Inviting User!")
    }
  }

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
            phoneNumber: SelectedData.phoneNumber
          });
        });
        handleClose1()
        toast.success("User Edited Successfully!")
      }
      else {
        console.log("no record of user found..")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-full flex flex-col bg-[#FAFAFA] justify-center items-center">
        <ToastContainer />
        <div className="w-[90%] flex flex-col gap-5 justify-center items-start">
          <button className="md:w-[30%] font-semibold md:font-bold rounded-[33px] bg-[#FFA90A] text-white text-[15px] lg:text-[22px] py-2 md:px-3 px-2 md:py-4" onClick={handleOpen}>Invite a New User +</button>
          <h1 className="text-black font-bold text-[25px] mt-5 mb-5">Users</h1>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="md:w-[50%] w-[90%] gap-4 bg-white flex flex-col  rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
            <h3 className='font-bold md:text-[24px] text-[15px] text-center'>Invite a New User</h3>
            <TextField required label="Client Name" type="text" onChange={handleChange} name="name" value={formData.name} className="w-[70%]" />
            <TextField required label="Email" type="email" onChange={handleChange} name="email" value={formData.email} className="w-[70%]" />
            <TextField required label="Contact Number" type="text" onChange={handleChange} name="phoneNumber" value={formData.phoneNumber} className="w-[70%]" />

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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="md:w-[50%] w-[90%] gap-4 bg-white flex flex-col  rounded-md shadow-lg overflow-y-auto max-h-[80vh] items-center py-[30px]">
              <h3 className='font-bold md:text-[24px] text-[15px] text-center'>Edit User Details</h3>
              <TextField required label="Client Name" type="text" name="name" onChange={(e) => setSelectedData({ ...SelectedData, fullname: e.target.value })} value={SelectedData.fullname} className="w-[70%]" />
              <TextField required label="Email" type="email" name="email" disabled value={SelectedData.email} className="w-[70%]" />
              <TextField required label="Contact Number" type="text" name="phoneNumber" onChange={(e) => setSelectedData({ ...SelectedData, phoneNumber: e.target.value })} value={SelectedData.phoneNumber} className="w-[70%]" />

              <div className="w-[90%] mb-5 flex flex-col justify-end items-end">
                <div className="md:w-[30%] w-full pr-0 md:pr-2">
                  <Button onClickProp={updateUser} text={"Edit"} />
                </div>
              </div>
            </div>
          </Modal>
        )}

        <div className="w-[90%] flex flex-col gap-5 justify-center items-start">
          {users ? (<div className="table w-full">
            <MaterialReactTable
              enableRowSelection
              columns={columns}
              data={users}
              renderTopToolbarCustomActions={({ table }) => {
                const handleDelete = () => {
                  const selectedRows = table.getSelectedRowModel().flatRows;
                  if (selectedRows.length === 1) {
                    const selectedRowId = selectedRows[0].original.id;
                    alert('Deleting User with ID: ' + selectedRowId);
                    DeleteUser(selectedRowId)
                  } else {
                    alert('Please select a single row to delete.');
                  }
                }
                return (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      color="error"
                      disabled={!table.getIsSomeRowsSelected()}
                      onClick={handleDelete}
                      className='bg-[#FFA90A] text-white rounded-lg py-2 px-6'
                    >
                      Delete
                    </button>
                  </div>
                )
              }}

            />
          </div>) : (null)}
        </div>

        <div className="w-[90%] flex flex-col justify-center items-start">
          <h1 className="text-black font-bold text-[25px] mt-5 mb-5">Invited Users</h1>
          {Invitedusers ? (<div className="table w-full">
            <MaterialReactTable
              columns={InvUserscolumns}
              data={Invitedusers}
            />
          </div>) : (null)}
        </div>

      </div>
    </>
  )
}

export default Users