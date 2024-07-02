import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

// import "./Page.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { setCurrentPage, setLoading } from "../../features/generalSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MotionDiv } from "../../components";
import {
  useCreatePageMutation,
  useGetPageByIdMutation,
  useUpdatePageMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import Skeleton from "react-loading-skeleton";
import { formats, modules } from "../../utils/helper";
import Editor from "../../components/layout/Editor";

export default function AddEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [getPageById, { isLoading }] = useGetPageByIdMutation();
  const [createPage] = useCreatePageMutation();
  const [updatePage] = useUpdatePageMutation();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [type, setType] = useState("Company");
  const { id } = useParams();

  const isEditPage = location.pathname.includes("edit-page");

  const fetchPage = async () => {
    try {
      const data = await getPageById(id).unwrap();
      console.log(data);
      setTitle(data?.page?.title);
      setDescription(data?.page?.description);
      // setPages(data?.pages);
    } catch (error) {
      getError(error);
      navigate(-1);
    }
  };

  useEffect(() => {
    if (isEditPage) {
      fetchPage();
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warning("Please Enter All Fieleds");
      return;
    }

    try {
      setLoading(true);
      const data = isEditPage
        ? await updatePage({ id, data: { title, description } }).unwrap()
        : await createPage({ title, description }).unwrap();
      setLoading(false);
      toast.success(data?.message);
      navigate("/admin/content-management");
      console.log(data);
    } catch (error) {
      setLoading(false);
      getError(error);
    }
  };

  // const handleChange = (value) => {
  //   setDescription(value);
  // };

  return (
    <MotionDiv>
      <h3 className="text-center">{isEditPage ? "Edit Page" : "Add Page"}</h3>
      <Card className=" ">
        {isLoading ? (
          <Container className="p-4">
            <Skeleton height={30} count={5} />
          </Container>
        ) : (
          <Container className=" p-4">
            <Row className="align-items-center mb-4">
              <Col sm={12} md={3}>
                <Form.Label>Page Title</Form.Label>
              </Col>
              <Col sm={12} md={8}>
                <Form.Control
                  required
                  placeholder="Page Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-4">
              <Col sm={12} md={3}>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col sm={12} md={8}>
                {/* <ReactQuill
                value={description}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                // style={{ border: "1px solid black",height:'200px'}}
                
                placeholder="Text goes here..."
              /> */}
                <Editor
                  description={description}
                  setDescription={setDescription}
                />
              </Col>
            </Row>

            {/* <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Type</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={type}
                className="rounded"
                defaultValue="Company"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="Company">Company</option>
                <option value="Help">Help</option>
                <option value="T & C">T & C</option>
                <option value="Social">Social</option>
              </select>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col className="mb-2" sm={12} md={3}>
              <label>Status</label>
            </Col>
            <Col sm={12} md={8}>
              <select
                value={status}
                className="rounded"
                defaultValue="Active"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Col>
          </Row> */}

            <Row className="my-3">
              <Col className="text-end" md={11}>
                <Button className="blue-btn px-4" onClick={submitHandler}>
                  {loading ? (
                    <Spinner size="sm" />
                  ) : isEditPage ? (
                    "Update"
                  ) : (
                    "Add Page"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Card>
    </MotionDiv>
  );
}
