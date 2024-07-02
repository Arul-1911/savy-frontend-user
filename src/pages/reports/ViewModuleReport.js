import React, { useEffect, useState } from "react";
import { CustomTable, MotionDiv } from "../../components";
import { Container, ToastContainer } from "react-bootstrap";
import { useViewModuleReportStaticsMutation } from "../../features/apiSlice";
import { getError } from "../../utils/error";

const ViewModuleReport = () => {
  const [viewModuleReportStatics, { isLoading }] =
    useViewModuleReportStaticsMutation();
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
      const { data } = await viewModuleReportStatics(query);
      setUsers(data?.transactions);
    } catch (error) {
      getError(error);
    }
  };

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);

  const column = [
    "S.No",
    "Area of seciality",
    "Prof Name",
    "Email",
    "Amount Recieved",
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
                <td>{user?.subdomain?.sub_domain_name}</td>
                <td>{user?.Professor[0]?.name}</td>
                <td>{user?.Professor[0]?.email}</td>
                <td>
                  {user?.amount && "£"} {user?.amount}
                </td>
              </tr>
            ))}
        </CustomTable>
        <ToastContainer />
      </Container>
    </MotionDiv>
  );
};

export default ViewModuleReport;
