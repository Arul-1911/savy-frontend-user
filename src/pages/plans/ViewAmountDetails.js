
import React, {  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  MessageBox,
  useTitle,
  MotionDiv,
  CustomTable,
  ViewButton,
  DeleteButton,
} from "../../components";
import { getError, toastOptions } from "../../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../features/loadingSlice";
import axiosInstance from "../../utils/axiosUtil";
import { Col, Row } from "react-bootstrap";
import CountCard from "../../components/layout/CountCard";
import { EditButton } from "../../components/layout/CustomTable";
import { selectAuth } from "../../features/authSlice";

export default function ViewAmountDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
  const {isLoading} = useSelector((state)=>state.loading);  
  const [error,setError] = useState(null);
  // const [users,setUsers] = useState([]);
  const [usersCount,setUsersCount] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const curPageHandler = (p) => setCurPage(p);

  const sampleData = [
    {
        email: "example.com",
        areaOfSpecialty: "Mechanical Engineering",
        profName: "John Doe",
        totalSubs: "221",
        amountByPlan: {
            M: 1010,
            Q: 2365,
            Y: 850
        },
        totalAmount: "3354"
    },
    {
        email: "test.org",
        areaOfSpecialty: "Civil Engineering",
        profName: "Jane Smith",
        totalSubs: "456",
        amountByPlan: {
            M: 135,
            Q: 385,
            Y: 1200
        },
        totalAmount: "2354"

    },
    {
        email: "demo.net",
        areaOfSpecialty: "E&TC Engineering",
        profName: "Alex Johnson",
        totalSubs: "123",
        amountByPlan: {
            M: 2440,
            Q: 4665,
            Y: 1820
        },
        totalAmount: "1354"

    }
];


  

// useEffect(()=>{
    
//     const fetchUsers = async()=>{

//         let url =`/api/admin/users/?resultPerPage=${resultPerPage}&currentPage=${curPage}`;
//         try {
//             dispatch(showLoading());
//              const response = await axiosInstance.get(url,{
//                 headers:{
//                     Authorization: token
//                 }
//              });
//              console.log(response);
//              const {users,usersCount} = response.data;   
//              setUsers(users);
//              setUsersCount(usersCount);
//             dispatch(hideLoading());

//         } catch (error) {
//            setError(getError(error));
//             dispatch(hideLoading());
//         }
//     }

//     fetchUsers();

// },[token,resultPerPage,curPage]);


  const numOfPages = Math.ceil(usersCount / resultPerPage);
  const skip = resultPerPage * (curPage - 1);
  console.log("no of Page", numOfPages, resultPerPage,usersCount);

  const column = [
    "S.No",
    "Area of Speciality",
    "Prof Name",
    "Email",
    "No of Subs",
    "Amount Received by plans",
    "Total Amount Received"
  ];

  // useTitle("Users");
  // useTitle("User Details");
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
          
          title="Subscription Amount Details"
        >
          {sampleData &&
            sampleData?.map((data, i) => (
              <tr key={data?._id} className="odd">
                <td className="text-center">{skip + i + 1}</td>
                <td>{data?.areaOfSpecialty}</td>
                <td>{data?.profName}</td>
                <td>{data?.email}</td>
                <td className="text-center">{data?.totalSubs}</td>
                <td className="text-center" style={{color:'rgba(97, 114, 243, 1)'}}>${data?.amountByPlan?.M} | ${data?.amountByPlan?.Q} | ${data?.amountByPlan?.Y}</td>
                <td className="text-center">${data?.totalAmount}</td>
                 
              </tr>
            ))}
        </CustomTable>
        </>
      )}
    </MotionDiv>
  );
}
