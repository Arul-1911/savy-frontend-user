import React from "react";
import { Modal, Button, Container, Table } from "react-bootstrap";

const getColumn = (obj) => {
  const attributes = Object.keys(obj);
  const defaultFields = ["_id", "createdAt", "updatedAt", "pid", "__v"];
  return attributes.filter((attribute) => !defaultFields.includes(attribute));
};

/**
 * Renders a modal component to display an array of objects in a table format.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Specifies whether the modal is visible or hidden.
 * @param {function} props.onHide - Function to handle the modal close event.
 * @param {Array} props.arr - An array of objects to display in the table.
 * @param {Object} props.column - An object containing key-value pairs that define the table columns.
 * @param {string} props.title - The title to display in the modal.
 * @returns {JSX.Element} The rendered modal component.
 *
 * @example
 * // Example usage of the ArrayView component
 * <ArrayView
 *   show={modalShow}
 *   onHide={() => setModalShow(false)}
 *   arr={houses}
 *   column={{
 *     "Id": "id",
 *     "Name": "name",
 *     "Capacity": "capacity",
 *     "Filled": "filled",
 *   }}
 *   title="Warehouse List"
 * />
**/
export default function ArrayView(props) {
  console.log(props);
  const { title, arr } = props;
  let columns;
  if (arr.length > 0) columns = Object.entries(props.column);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container
          className="small-container"
          style={{ backgroundColor: "#f4f6f9" }}
        >
          {arr && arr.length > 0 ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  {columns && columns.map(([col, _]) => <th key={col}>{col}</th>)}
                </tr>
              </thead>
              <tbody>
                {arr &&
                  arr.map((row, i) => (
                    <tr key={i} className="odd">
                      <td className="text-center">{i + 1}</td>
                      {columns &&
                        columns.map(([_, col], i) => {
                          return (
                            <>
                              <td key={col + i}>{row[col]}</td>
                            </>
                          );
                        })}
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            "Nothing to show."
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
