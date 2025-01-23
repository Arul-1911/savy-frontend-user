import { Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { FaEye, FaRegTrashAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi"
import { MdOutlineAssignmentInd, MdOutlineDoNotDisturb, MdOutlineModeEdit } from "react-icons/md";
import CustomSkeleton from "./CustomSkeleton";
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { TbReceipt } from "react-icons/tb";
import CreateBtn from "./CreateBtn";

export default function CustomTable(props) {
  const navigate = useNavigate();
  // console.log(props);
  const {
    loading,
    column,
    rowNo: resultPerPage,
    rowProps,
    paging,
    pageProps,
    pageHandler,
    search,
    searchProps,
    isCreateBtn,
    createBtnProps,
    isTitle,
    title
  } = props;


  const { setResultPerPage } = rowProps;
  const { numOfPages, curPage } = pageProps;
  let searchInput, setSearchInput, setQuery;
  if (search) {
    searchInput = searchProps?.searchInput;
    setSearchInput = searchProps?.setSearchInput;
    setQuery = searchProps?.setQuery;
  }

  let createURL = '/', text;
  if (isCreateBtn) {
    createURL = createBtnProps?.createURL;
    text = createBtnProps?.text;
  }

  const len = column?.length;
  return (
    <Card className=" border-0">
      <Card.Header className="border-bottom">
        <Row>
          <Col lg={6} md={4}>
          {isTitle && <h4 className="mb-3">{title}</h4>}
          </Col>
         
          {search &&     <Col lg={isCreateBtn?4:6} md={4} className="d-flex justify-content-end align-items-center">
         
          
         <>
          <InputGroup className=" shadow" style={{maxWidth:'450px',maxHeight:'2rem'}} >
            <Form.Control
              aria-label="Search Input"
              placeholder="Search"
              type="search"
              value={searchInput}
              onChange={(e) => {setSearchInput(e.target.value);
                setQuery(e.target.value)
            }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setQuery(searchInput);
                  pageHandler(1); 
                }
              }}
              
            />
            <InputGroup.Text
            className=" bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery(searchInput);
                pageHandler(1);
              }}
               >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
          <Button className="blue-btn   mx-2">Search</Button>
          </>
        
                      </Col>
}

{isCreateBtn && createURL &&
<Col lg={!search? 6: 2} md={!search?6: 4} className="text-end p-1">
         
   
        <CreateBtn createURL={createURL} text={text} />
     
        
        
        </Col>
}
        
            
       
        
        </Row>
      </Card.Header>
      <Card.Body>
        <Table responsive borderless hover className="text-center">
          <thead>
            <tr>{len && column.map((col) => <th key={col}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <CustomSkeleton resultPerPage={resultPerPage} column={len} />
            ) : (
              <>{props.children}</>
            )}
          </tbody>
        </Table>
      </Card.Body>

     {paging && <Card.Footer>
        <div className="float-start d-flex align-items-center mt-3">
          <p className="p-bold m-0 me-3">Number of Row</p>
          <Form.Group controlId="resultPerPage">
            <Form.Select
              value={resultPerPage}
              onChange={(e) => {
               setResultPerPage && setResultPerPage(e.target.value);
               pageHandler && pageHandler(1);
              }}
              aria-label="Default select example"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Select>
          </Form.Group>
        </div>
        {paging && (
          <CustomPagination
            pages={numOfPages}
            pageHandler={pageHandler}
            curPage={curPage}
          />
        )}
      </Card.Footer>
}
    </Card>
  );
}

export const AddButton = ({ title,func,url='/',disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (func) {
      func();
    } else {
      navigate(url);
    }
  };

  return (
    <Button variant='transparent' disabled={disabled} className='add-btn m-2 px-lg-3 px-1 py-1 text-nowrap' style={{display:'inline-block'}} onClick={handleClick}>
      {title} <IoAddCircleSharp className='mb-1' size={25}/>
  </Button>
   
  );
};


export const ViewButton = ({ onClick }) => {
  return (
    <Button variant="transparent" className="p-0 mx-1 " onClick={onClick} >
      <FiEye />
    </Button>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <Button variant="transparent" className="p-0 mx-1 " onClick={onClick} >
      <FaRegTrashAlt color="rgba(0, 26, 114, 1)" />
    </Button>
  );
};

export const AssignButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="p-0 mx-1 " variant="transparent" >
      <MdOutlineAssignmentInd  />
    </Button>
  );
};
export const EditButton = ({ onClick ,disabled=false}) => {
  return (
    <Button onClick={onClick} disabled={disabled} className="p-0 mx-1 border-0" variant="transparent" >
      <MdOutlineModeEdit  color="rgba(134, 134, 134, 1)"/>
    </Button>
  );
};
export const BlockButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="p-0 mx-1 " variant="transparent" >
      <MdOutlineDoNotDisturb color="rgba(244, 43, 61, 1)"  />
    </Button>
  );
};
export const ReceiptButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="p-0 mx-1 " variant="transparent" >
      <TbReceipt   />
    </Button>
  );
};
