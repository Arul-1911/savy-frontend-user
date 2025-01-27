import React, { useEffect, useState } from 'react'
import DashboardCard from '../../../components/layout/DasboardCard';
import { Button, Image, Modal, Spinner } from 'react-bootstrap';
import { useDeleteUserConnectionMutation, useGetUserConnectionsMutation, useGetUserProfileMutation } from '../../../features/apiSlice';
import { getError } from '../../../utils/error';
import Skeleton from 'react-loading-skeleton';
import { RiDeleteBin6Line } from "react-icons/ri";

const ConnectedBanks = () => {
   const [getUserConnections, { isLoading: connectionLoading }] =
     useGetUserConnectionsMutation();
   const [deleteUserConnection, {isLoading:isDeleting}] = useDeleteUserConnectionMutation()
    const [getUserProfile, { isLoading }] = useGetUserProfileMutation();
  const [accounts,setAccounts] = useState('')
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState(null)
  const skeletonArray = [1, 2, 3];

  //open delete confirmation Modal
  const openDeleteModal = (bankId) => {
   setSelectedAccountId(bankId)
   setShowDeleteModal(true)
  }

  //close delete modal
  const closeDeleteModal = () => {
   setSelectedAccountId(null)
   setShowDeleteModal(false)
  }

   const getAllConnectedAccounts = async () => {
       try {
         const  data  = await getUserConnections().unwrap();
         setAccounts(data);
       } catch (error) {
         getError(error);
       }
     };

     const fetchprofile = async () => {
         try {
           const { user } = await getUserProfile().unwrap();
           
         } catch (error) {
           getError(error);
         }
       };

   const handleDeleteAccount = async () => {
      if(selectedAccountId){
         try {
            await deleteUserConnection(selectedAccountId).unwrap()
            getAllConnectedAccounts()
            fetchprofile()
         } catch (error) {
            getError(error)
         }finally{
            closeDeleteModal()
         }
      }
   }

     useEffect(() => {
      getAllConnectedAccounts()
     },[])
   
  return (
    <>
      <div className="mt-4">
        <DashboardCard>
          {connectionLoading ? (
            skeletonArray?.map((_, i) => (
              <span key={i} className="pb-2">
                <Skeleton
                  className="rounded-1"
                  height={"40px"}
                  width={"100%"}
                />
              </span>
            ))
          ) : accounts?.data?.length > 0 ? (
            accounts?.data?.map((account, idx) => (
              <div
                key={account?.id}
                style={{
                  backgroundColor: "rgba(245, 247, 248, 1)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
                className="mt-3 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex gap-2 align-items-center">
                  <Image
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                    src={
                      account?.institution?.logo || "/images/bank-acc-logo.jpg"
                    }
                    alt={account?.institution?.name}
                  />
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "rgba(55, 73, 87, 1)",
                        fontSize: "12px",
                      }}
                    >
                      {account?.institution?.name}
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "rgba(159, 175, 198, 1)",
                        fontSize: "12px",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    color: "var(--primary-color)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => openDeleteModal(account?.id)}
                >
                  <RiDeleteBin6Line size={17} />
                </div>
              </div>
            ))
          ) : (
            <div>No accounts found.</div>
          )}
        </DashboardCard>
      </div>

      {/* Delete confiramtion Modal */}
      <Modal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        style={{ borderBottom: "none" }}
      >
        <Modal.Header style={{ borderBottom: "none" }} closeButton>
          {/* <Modal.Title>Delete Account</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ borderBottom: "none" }}>
          Are you sure you want to delete this account? This action cannot be
          undone. you need to connect your account again if required in future
        </Modal.Body>
        <Modal.Footer style={{ borderBottom: "none" }}>
          <Button
            variant="secondary"
            onClick={closeDeleteModal}
            style={{
              backgroundColor: "var(--primary-color)",
              height: "40px",
              width: "auto",
              borderRadius: "22px",
              fontSize: "12px",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            style={{
              borderBottom: "none",
              borderRadius: "22px",
              border: "none",
            }}
            disabled={isDeleting}
          >
            {isDeleting ? ( 
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
             
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConnectedBanks