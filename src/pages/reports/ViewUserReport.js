import React, { useEffect, useState } from "react";
import { CustomTable, MotionDiv } from "../../components";
import { Container, ToastContainer } from "react-bootstrap";
import { useGetUsersMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";

const ViewUserReport = () => {
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, [query]);

  const getAllUsers = async () => {
    try {
      const { data } = await getUsers(query);
      setUsers(data.users);
    } catch (error) {
      getError(error);
    }
  };

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);

  const column = [
    "S.No",
    "Name",
    "Email",
    "Contact Number",
    "Selected Module Category",
    "Subscription Plan",
    "Prof. Name",
  ];

  return (
    <MotionDiv>
      <Container>
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
                <td>+{user?.mobile.slice(2)}</td>
                <td>{user?.domain?.domain_name}</td>
                <td>
                  {user?.active_transactions[0]?.amount && "£"}{" "}
                  {user?.active_transactions[0]?.amount}
                </td>
                <td key={user?.professors[i]}>
                  {user?.professors[i]?.first_name +
                    user?.professors[i]?.last_name}
                </td>
              </tr>
            ))}
        </CustomTable>
        <ToastContainer />
      </Container>
    </MotionDiv>
  );
};

export default ViewUserReport;
