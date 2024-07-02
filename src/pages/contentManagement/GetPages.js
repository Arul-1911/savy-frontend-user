import React, { useEffect, useState } from 'react'
import { CustomTable, DeleteButton, MotionDiv, ViewButton } from '../../components'
import {Table,Row,Col,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import { useGetPagesMutation } from '../../features/apiSlice';
import { EditButton } from '../../components/layout/CustomTable';
import { getError } from '../../utils/error';


function GetPages() {

    const navigate = useNavigate()
   const [getPages,{isLoading}] = useGetPagesMutation();

   const [pages,setPages] = useState([]);


    const [curPage, setCurPage] = useState(1);
    const [resultPerPage, setResultPerPage] = useState(5);
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");
  
    const curPageHandler = (p) => setCurPage(p);
 
    const numOfPages = Math.ceil(1);
    console.log("no of Page", numOfPages, resultPerPage);
  
    const column = [
        "S.No",
        "Page",
        "Actions"
      ];

     


      const fetchPages = async()=>{
        try {
            const data = await getPages().unwrap();
            console.log(data);
            setPages(data?.pages);

        } catch (error) {
getError(error)
        }
      }

      useEffect(()=>{
        fetchPages();
      },[])


  return (
    <MotionDiv>
        <h1>Content Management</h1>

        <CustomTable
          loading={isLoading}
          column={column}
          rowNo={resultPerPage}
          rowProps={{ setResultPerPage }}
          paging={false}
          pageProps={{ numOfPages, curPage }}
          pageHandler={curPageHandler}
        //    search={true}
        //    searchProps={{ searchInput, setSearchInput, setQuery }}
          isTitle="true"
          title="Pages"

          isCreateBtn={true}
          createBtnProps={{
            text: 'New Page.',
            createURL: '/admin/content-management/add-page',
          }}
        >
          {pages &&
            pages?.map((page, i) => (
              <tr key={page?._id} className="odd">
                <td className="text-center">{i + 1}</td>
                <td>{page?.title}</td>
            
                <td className="text-center">
                  <EditButton
                    onClick={() => navigate(`/admin/content-management/edit-page/${page?._id}`)}
                  />
                   <DeleteButton onClick={() =>{
                   
                     console.log('deleted')
                  }} 
                  /> 

                </td> 
              </tr>
            ))}
        </CustomTable>
    </MotionDiv>
  )
}

export default GetPages