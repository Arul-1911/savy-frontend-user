import React, { useEffect, useState } from "react";
import ModalWindow from "../modals/ModalWindow";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button, Spinner } from "react-bootstrap";
import { LuEqual, LuMinusSquare, LuPlusSquare } from "react-icons/lu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  useGetCustomizeDashboardQuery,
  useUpdateCustomizeDashboardMutation,
} from "../../features/apiSlice";
import { getSuccess } from "../../utils/success";
import { getError } from "../../utils/error";
import { useDispatch } from "react-redux";
import { setDisabled as setDisabledSlice } from "../../features/dashBoardSlice";

const DashboardSettings = ({ show, hide, active }) => {
  const dispatch = useDispatch();
  const { data: dashBoardSettings, isLoading } =
    useGetCustomizeDashboardQuery();
  const [updateDashboardSettings, { isLoading: updateLoading }] =
    useUpdateCustomizeDashboardMutation();

  const [enabled, setEnabled] = useState([]);
  const [disabled, setDisabled] = useState([]);

  useEffect(() => {
    if (dashBoardSettings) {
      setEnabled(dashBoardSettings?.dashboard?.enabled || []);
      setDisabled(dashBoardSettings?.dashboard?.disabled || []);
    }
  }, [dashBoardSettings]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList =
      source.droppableId === "enabled" ? [...enabled] : [...disabled];
    const destinationList =
      destination.droppableId === "enabled" ? [...enabled] : [...disabled];

    // Moving within same List
    if (source?.droppableId === destination?.droppableId) {
      const [reorderedItem] = sourceList?.splice(source.index, 1);
      sourceList.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "enabled") {
        setEnabled(sourceList);
      } else {
        setDisabled(sourceList);
      }
    } else {
      //Moving between Diffrent
      const [moveditem] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, moveditem);

      if (source.droppableId === "enabled") {
        setEnabled(sourceList);
        setDisabled(destinationList);
      } else {
        setEnabled(destinationList);
        setDisabled(sourceList);
      }
    }
  };

  const handleSave = async () => {
    try {
      await updateDashboardSettings({ enabled, disabled }).unwrap();
      dispatch(setDisabledSlice(disabled));
      hide(false);
      getSuccess("Dashboard Updated Successfully");
    } catch (err) {
      getError(err.message);
      console.error(err);
    }
  };

  return (
    <ModalWindow show={show} onHide={hide}>
      {active === 1 && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <IoArrowBackCircleOutline
              color="rgba(92, 182, 249, 1)"
              cursor={"pointer"}
              size={28}
              onClick={() => hide(false)}
            />

            <h6 style={{ color: "rgba(0, 74, 173, 1)" }}>
              Customise dashboard
            </h6>

            <div>
              <Button
                onClick={handleSave}
                variant="transparent"
                size="sm"
                className="py-2 px-3 m-0 fw-bold rounded-pill"
                style={{
                  color: "var(--primary-color)",
                  fontSize: "0.7rem",
                  border: "0.5px solid gray",
                }}
              >
                {updateLoading ? <Spinner size="sm" /> : "save"}
              </Button>
            </div>
          </div>

          <p
            className="mt-2 px-5 text-center"
            style={{ color: "var(--primary-color)", fontSize: "0.7rem" }}
          >
            Get the most appropriate dashboard insights for your needs. Add and
            organise widgets below.
          </p>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="p-2">
              <h6 style={{ fontSize: "0.85rem" }}>Enabled</h6>
              <Droppable droppableId="enabled">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ minHeight: "1rem" }}
                  >
                    {enabled?.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              color: "var(--primary-color)",
                              borderTop: "1px solid rgba(226, 242, 255, 1)",
                              borderBottom: "1px solid rgba(226, 242, 255, 1)",
                              opacity: snapshot.isDragging ? 0.5 : 1,
                              backgroundColor: snapshot.isDragging
                                ? "lightblue"
                                : "white",
                              padding: "8px",
                              margin: "4px 0",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="d-flex">
                              <LuMinusSquare className="me-2" />
                              <h6 style={{ fontSize: "0.9rem" }}>{item}</h6>
                            </div>
                            <div>
                              <LuEqual />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <h6 style={{ fontSize: "0.85rem" }} className="mt-3">
                Disabled
              </h6>
              <Droppable droppableId="disabled">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ minHeight: "1rem" }}
                  >
                    {disabled?.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              color: "var(--primary-color)",
                              borderTop: "1px solid rgba(226, 242, 255, 1)",
                              borderBottom: "1px solid rgba(226, 242, 255, 1)",
                              opacity: snapshot.isDragging ? 0.5 : 1,
                              backgroundColor: snapshot.isDragging
                                ? "lightblue"
                                : "white",
                              padding: "8px",
                              margin: "4px 0",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="d-flex">
                              <LuPlusSquare className="me-2" />
                              <h6 style={{ fontSize: "0.9rem" }}>{item}</h6>
                            </div>
                            <div>
                              <LuEqual />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </>
      )}
    </ModalWindow>
  );
};

export default DashboardSettings;
