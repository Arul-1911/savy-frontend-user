import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MessageBox,
  MotionDiv,
  CustomTable,
  ViewButton,
} from "../../components";
import { getError } from "../../utils/error";
import { Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { ReceiptButton } from "../../components/layout/CustomTable";
import { useGetUsersMutation } from "../../features/apiSlice";

export default function Users() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [users, setUsers] = useState([]);
  const [countUsers, setCountUsers] = useState(0);

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage, usersCount);

  const column = [
    "S.No",
    "Name",
    "Email",
    "Area of speciality",
    "Subscription Plan",
    "Prof. Name",
    "Expiry Date",
    "Actions",
  ];

  useEffect(() => {
    getAllUsers();
  }, [query]);

  const getAllUsers = async () => {
    try {
      const { data } = await getUsers(query);
      setCountUsers(data.userCount);
      setUsers(data.users);
    } catch (error) {
      getError(error);
    }
  };

  // console.log(users);

  const viewUserDataHandler = (user, name, email) => {
    localStorage.setItem("userDetails", JSON.stringify(user));
    localStorage.setItem("professorName", name);
    localStorage.setItem("professorEmail", email);
    navigate(`/admin/users/view-user`);
  };

  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <CountCard title={"Total Users"} count={countUsers} />
            {/* <CountCard title={"Newly Added Users"} count={50} /> */}
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
            title="User Details"
          >
            {users &&
              users?.map((user, i) => (
                <tr key={user?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  <td>
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.subdomain?.sub_domain_name}</td>
                  <td
                    style={{
                      color: "#213446",
                      fontWeight: 600,
                    }}
                  >
                    {user?.active_transactions[0]?.amount && "£"}{" "}
                    {user?.active_transactions[0]?.amount}
                  </td>
                  <td>
                    {user?.professors[i]?.first_name +
                      user?.professors[i]?.last_name}
                  </td>
                  <td>{user?.active_transactions[0]?.expiry.split("T")[0]}</td>
                  <td>
                    {user?.active_transactions[0] && (
                      <a
                        href={`https://creative-story.s3.amazonaws.com${user?.active_transactions[0]?.invoice_url}`}
                      >
                        <ReceiptButton />
                      </a>
                    )}
                    <ViewButton
                      onClick={() =>
                        viewUserDataHandler(
                          user,
                          user?.professors[i]?.first_name +
                            user?.professors[i]?.last_name,
                          user?.professors[i]?.email
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </CustomTable>
        </>
      )}
      <ToastContainer />
    </MotionDiv>
  );
}
