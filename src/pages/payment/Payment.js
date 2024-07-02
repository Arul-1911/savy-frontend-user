import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MessageBox,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError } from "../../utils/error";
import { useGetPaymentsMutation } from "../../features/apiSlice";

export default function Payment() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [usersCount, setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const [getPayments, { isLoading }] = useGetPaymentsMutation();
  const [payments, setPayments] = useState("");

  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  // console.log("no of Page", numOfPages, resultPerPage,usersCount);

  const column = [
    "S.No",
    "User Name",
    "Email",
    "Area of speciality",
    "Payment Received",
    "Prof. Name",
    "Actions",
  ];

  useEffect(() => {
    getAllPayments();
  }, [query]);

  const getAllPayments = async () => {
    try {
      const { data } = await getPayments(query);
      console.log(data);
      setPayments(data);
    } catch (error) {
      getError(error);
    }
  };

  const viewUserDataHandler = (user) => {
    localStorage.setItem("profDetails", JSON.stringify(user));
    navigate(`/admin/payment/view`);
  };

  return (
    <MotionDiv>
      {error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
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
            title="Payment details"
          >
            {payments &&
              payments.payments?.map((payment, i) => (
                <tr key={payment?._id} className="odd">
                  <td className="text-center">{skip + i + 1}</td>
                  <td>
                    {payment?.user?.first_name + " " + payment?.user?.last_name}
                  </td>
                  <td>{payment?.user?.email}</td>
                  <td>{payment?.subdomain?.sub_domain_name}</td>
                  <td className="text-center">£ {payment?.amount}</td>
                  <td>Prof</td>
                  <td className="text-center">
                    <ViewButton onClick={() => viewUserDataHandler(payment)} />
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
    </MotionDiv>
  );
}
