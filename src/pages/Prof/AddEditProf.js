import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Form,
  Card,
  Spinner,
} from "react-bootstrap";
import FormField from "../../components/layout/FormField";
import { MotionDiv } from "../../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalTemplate from "../../components/modals/ModalTemplate";
import {
  useCreateProfMutation,
  useGetDomainsMutation,
  useGetProfByIdMutation,
  useGetSubdomainsMutation,
  useUpdateProfByIdMutation,
} from "../../features/apiSlice";
import { getError } from "../../utils/error";
import { FaRegRectangleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

function AddEditProf() {
  const location = useLocation();
  const navigate = useNavigate();

  const isEditProf = location.pathname.includes("edit-prof");
  const [getDomain] = useGetDomainsMutation();
  const [getSubdomain] = useGetSubdomainsMutation();
  const [createProf, { isLoading }] = useCreateProfMutation();
  const [getProfById, { isLoading: getLoading }] = useGetProfByIdMutation();
  const [updateProfById, { isLoading: updateLoading }] =
    useUpdateProfByIdMutation();

  const [isFetchProfile, setIsFetchProfile] = useState(false);
  const [form, setForm] = useState({});
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [selectedSubdomains, setSelectedSubdomains] = useState([]);
  const { id } = useParams();
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleHideAddModal = () => setShowAddModal(false);

  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const handleShowCreatedModal = () => setShowCreatedModal(true);
  const handleHideCreatedModal = () => {
    setShowCreatedModal(false);
    navigate("/admin/profs");
  };

  const handleConfirmBtn = () => {
    handleSubmit();
    // handleHideAddModal();
    // handleShowCreatedModal();
  };

  const fetchDomains = async () => {
    try {
      const data = await getDomain().unwrap();

      setDomains(data?.domains);
    } catch (error) {
      getError(error);
    }
  };

  const fetchSubdomains = async (id) => {
    try {
      const data = await getSubdomain(id).unwrap();

      setSubdomains(data?.subDomains);
    } catch (error) {
      getError(error);
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  useEffect(() => {
    if (form?.domain) {
      if (!isFetchProfile) {
        setSelectedSubdomains([]);
      }
      fetchSubdomains(form?.domain);
    }
  }, [form?.domain]);

  useEffect(() => {
    if (id) {
      fetchProf();
    }
  }, [id]);

  useEffect(() => {
    if (selectedSubdomains) {
      const updatedsubdomains = subdomains.filter(
        (item) => !selectedSubdomains.map((sub) => sub?._id).includes(item?._id)
      );
      setSubdomains(updatedsubdomains);
    }
  }, [selectedSubdomains]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleAddSubdomain = (e) => {
    const { name, label, value } = e.target;
    console.log(name, label, value);
    setSelectedSubdomains((prev) => [
      ...prev,
      { sub_domain_name: label, _id: value },
    ]);
  };

  const handleDeleteSubdomain = (item) => {
    const updatedSelectedDomain = selectedSubdomains.filter(
      (s, i) => s?._id !== item?._id
    );
    setSelectedSubdomains(updatedSelectedDomain);
    setSubdomains([
      ...subdomains,
      { sub_domain_name: item?.sub_domain_name, _id: item?._id },
    ]);
  };

  // const domains = [
  //         {name:'Engineering'},
  //         {name:'Medical'},
  // ]
  // const subDomains = [
  //         {name:'Mechanical Engineering'},
  //         {name:'Civil Engineering'},
  // ]

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleShowAddModal();
  };

  const fetchProf = async () => {
    try {
      setIsFetchProfile(true);
      const data = await getProfById(id).unwrap();

      console.log(data);
      const prof = data?.professor;
      setForm({
        profName: prof?.name,
        email: prof?.email,
        payPercentage: prof?.pay_percent,
        dob: prof?.dob,
        doj: prof?.joining_date,
        mobile: prof?.mobile,
        id: prof?.professor_id,
        addr: prof?.address,
        domain: prof?.domain?._id,
      });

      setSelectedSubdomains(prof?.sub_domain);
      //   handleHideAddModal();
      // handleShowCreatedModal();
      setIsFetchProfile(false);
    } catch (error) {
      // setIsFetchProfile(false)
      getError(error);
    }
  };

  const handleSubmit = async (e) => {
    if (form?.payPercentage >= 0 && form?.payPercentage <= 100) {
      try {
        const subDomainIds = selectedSubdomains.map((sub) => sub?._id);
        const data = isEditProf
          ? await updateProfById({
              id: id,
              data: {
                name: form?.profName,
                email: form?.email,
                pay_percent: form?.payPercentage,
                dob: form?.dob,
                joining_date: form?.doj,
                mobile: form?.mobile,
                professor_id: form?.id,
                address: form?.addr,
                domain: form?.domain,
                sub_domain: subDomainIds,
              },
            }).unwrap()
          : await createProf({
              name: form?.profName,
              email: form?.email,
              password: form?.password,
              dob: form?.dob,
              pay_percent: form?.payPercentage,
              joining_date: form?.doj,
              mobile: form?.mobile,
              professor_id: form?.id,
              address: form?.addr,
              domain: form?.domain,
              sub_domain: subDomainIds,
            }).unwrap();

        console.log(data);

        handleHideAddModal();
        handleShowCreatedModal();
      } catch (error) {
        getError(error);
      }
    } else {
      toast.warn("Pay percentage must be between 0 to 100");
    }
  };

  return (
    <MotionDiv>
      <h3>{isEditProf ? "Edit Prof" : "Add New Prof."}</h3>
      <Container className="px-md-5">
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col md={6}>
              <FormField
                label={"Prof. Name"}
                type={"text"}
                placeholder={"Full name"}
                name={"profName"}
                value={form?.profName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                label={"Joining Date"}
                placeholder={"00/00/0000"}
                type={"date"}
                name={"doj"}
                value={form?.doj}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormField
                label={"Email"}
                type={"email"}
                placeholder={"email@example.com"}
                name={"email"}
                value={form?.email}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                label={"Search & Select Domain"}
                type={"select"}
                name={"domain"}
                value={form?.domain}
                onChange={handleChange}
                options={domains?.map((item) => ({
                  label: item?.domain_name,
                  value: item?._id,
                }))}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormField
                label={"Phone Number"}
                type={"number"}
                placeholder={"55987456331"}
                name={"mobile"}
                value={form?.mobile}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                label={"Search & Select Specialty"}
                type={"select"}
                name={"subdomain"}
                // value={form?.subdomain}
                required={false}
                onChange={handleAddSubdomain}
                options={subdomains?.map((item) => ({
                  label: item?.sub_domain_name,
                  value: item?._id,
                }))}
              />

              {selectedSubdomains?.map((item, i) => (
                <div
                  className="domain-card p-2 my-1 d-flex"
                  style={{ color: "rgba(0, 0, 139, 1)" }}
                  key={item._id}
                >
                  <div className="row w-100">
                    <div className="col">{item?.sub_domain_name}</div>
                    <div className="col-auto">
                      <FaRegRectangleXmark
                        onClick={() => handleDeleteSubdomain(item)}
                        style={{ cursor: "pointer" }}
                        color="rgba(255, 22, 22, 1)"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormField
                label={"Date of Birth"}
                type={"date"}
                placeholder={"00/00/0000"}
                name={"dob"}
                value={form?.dob}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormField
                label={"Address"}
                type={"text"}
                placeholder={"101 abc street"}
                name={"addr"}
                value={form?.addr}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <label for="volume">Pay Percentage:</label> <br />
              {/* <input type="range"   value={form?.payPercentage}  id="volume" onChange={handleChange} name="payPercentage" min="0" max="100"/> */}
              {/* </Col>
         <Col md={1} className="d-flex align-items-end"> */}
              <input
                type="number"
                className="border p-0 fw-bold text-center"
                style={{ color: "var(--primary-color)", width: "4rem" }}
                value={form?.payPercentage}
                onChange={handleChange}
                name="payPercentage"
                min="0"
                max="100"
              />
              <span style={{ color: "var(--primary-color)" }}>%</span>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={6}>
              <FormField
                label={"Prof Id"}
                type={"text"}
                placeholder={"Abc123"}
                name={"id"}
                value={form?.id}
                onChange={handleChange}
              />
            </Col>
            <Col>
              {isEditProf ? null : (
                <FormField
                  label={"Password"}
                  type={"password"}
                  placeholder={"********"}
                  name={"password"}
                  value={form?.password}
                  onChange={handleChange}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <Button
                variant="transparent"
                className="add-btn px-3 m-1"
                onClick={() => navigate(-1)}
              >
                Cancel{" "}
              </Button>
              <Button className="blue-btn px-3 m-1" type="submit">
                {isEditProf ? "Edit Prof" : "Add Prof"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <ModalTemplate
        show={showAddModal}
        onHide={handleHideAddModal}
        src={"/icons/question-green.png"}
        title={`Are you sure you want to  ${
          isEditProf ? "update" : "add"
        } this Prof. profile to user system`}
        description={
          "Lorem ipsum dolor sit amet consectetur. Suscipit nunc tincidunt iaculis sit feugiat platea. Aliquet amet cras amet mauris neque facilisi. Scelerisque interdum elit maecenas."
        }
        onConfirm={handleConfirmBtn}
        onDiscard={handleHideAddModal}
        loading={isLoading || updateLoading}
      />

      <ModalTemplate
        show={showCreatedModal}
        onHide={handleHideCreatedModal}
        src={"/icons/tick.png"}
        title={`You have successfully ${
          isEditProf ? "updated" : "created"
        } new Prof. profile`}
      />
    </MotionDiv>
  );
}

export default AddEditProf;
