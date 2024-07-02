import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MessageBox,
  MotionDiv,
  CustomTable,
  DeleteButton,
} from "../../components";
import { getError } from "../../utils/error";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import {
  AddButton,
  BlockButton,
  EditButton,
} from "../../components/layout/CustomTable";
import {
  useAddProfBankDetailsMutation,
  useGetProfsMutation,
} from "../../features/apiSlice";

export default function Prof() {
  const navigate = useNavigate();
  const [getProfs, { isLoading }] = useGetProfsMutation();
  const [addProfBankDetails, { isLoading: bankLoading }] =
    useAddProfBankDetailsMutation();
  const [error, setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [profs, setProfs] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const handleShowBlockModal = () => setShowBlockModal(true);
  const handleHideBlockModal = () => setShowBlockModal(false);
  const [numberOfProfs, setNumberOfProfs] = useState(0);
  const [activeProfs, setActiveProfs] = useState(0);

  const curPageHandler = (p) => setCurPage(p);

  const fetchProfs = async () => {
    try {
      const params = `?key=${query}`;

      const data = await getProfs(params).unwrap();
      setProfs(data?.professors);
      setNumberOfProfs(data?.totalProf);
      setActiveProfs(data?.activeProf);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    fetchProfs();
  }, [query]);

  const handleAddBankDetails = async (id) => {
    try {
      const data = await addProfBankDetails({ id }).unwrap();
      // console.log(data);

      window.location.href = data?.loginlink?.url;
      // console.log(data?.loginlink?.url);
    } catch (error) {
      getError(error);
    }
  };

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "S.No.",
    "Prof. Name",
    "Pay Percentage",
    "Email",
    "Area of speciality",
    "Bank Actions",
    "Actions",
  ];

  console.log(profs);

  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <CountCard title={"Total Number of Prof."} count={numberOfProfs} />
            <CountCard title={"Active Prof."} count={activeProfs} />
          </Row>

          <CustomTable
            loading={isLoading}
            column={column}
            rowNo={resultPerPage}
            rowProps={{ setResultPerPage }}
            paging={numOfPages > 0}
            pageProps={{ numOfPages, curPage }}
            pageHandler={curPageHandler}
            search={true}
            searchProps={{ searchInput, setSearchInput, setQuery }}
            isTitle="true"
            title="Prof. Details"
            isCreateBtn={true}
            createBtnProps={{
              text: "New Prof.",
              createURL: "/admin/profs/add-prof",
            }}
          >
            {profs &&
              profs?.map((prof, i) => (
                <tr key={prof?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  <td>{prof?.first_name + " " + prof?.last_name}</td>
                  <td className="">{prof?.pay_percent}%</td>
                  <td>{prof?.email}</td>
                  <td>
                    {prof?.sub_domain
                      ?.map((item, i) => item?.sub_domain_name)
                      .join(" | ")}
                  </td>

                  <td>
                    <AddButton
                      func={() => handleAddBankDetails(prof?._id)}
                      title={"Add Bank Details"}
                      disabled={bankLoading}
                    />
                  </td>
                  <td className="">
                    <EditButton
                      onClick={() =>
                        navigate(`/admin/profs/edit-prof/${prof?._id}`)
                      }
                    />
                    <BlockButton onClick={handleShowBlockModal} />
                    <DeleteButton
                      onClick={() => {
                        //  deleteUser(user?._id)
                        console.log("deleted");
                      }}
                    />
                  </td>
                </tr>
              ))}
          </CustomTable>
        </>
      )}
      <ToastContainer />

      <Modal show={showBlockModal} onHide={handleHideBlockModal}>
        <Modal.Body className="text-center">
          <Image src="/icons/block.png" className="my-2" />
          <h5>
            Are you sure you want to block this Prof. profile from user system
          </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt
            iaculis sit feugiat platea. Aliquet amet cras amet mauris neque
            facilisi. Scelerisque interdum elit maecenas.
          </p>
          <Row>
            <Col>
              <Button
                variant="transparent"
                className="add-btn w-100 m-1"
                onClick={handleHideBlockModal}
              >
                Discard
              </Button>
            </Col>
            <Col>
              <Button variant="transparent" className="blue-btn w-100 m-1">
                Block Now
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </MotionDiv>
  );
}
