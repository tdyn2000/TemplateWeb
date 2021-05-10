import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Actions as RoleActions } from "../../redux/reducers/RoleReducer";
import MessageAlert from "../views/MessageAlert";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";

const Roles = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data);
  const history = useHistory();

  const error = useSelector((state) => state.roles.error);
  const message = useSelector((state) => state.roles.message);
  const [show, setShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState(0);

  useEffect(() => {
    dispatch(RoleActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageView = () => {
    return (
      <MessageAlert
        isShow={show}
        title="Delete Role"
        message={
          message === null
            ? "Are you sure to delete role " + deleteItem.name
            : message
        }
        error={error}
        onCancel={() => {
          setShow(false);
          dispatch(RoleActions.clearMessage());
        }}
        onOk={() => {
          setShow(false);
          deleteRole(deleteItem.id);
        }}
      />
    );
  };

  const deleteRole = (roleId) => {
    dispatch(RoleActions.delete(roleId));
  };

  return (
    <CRow>
      {messageView()}
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            Roles
            <small className="text-muted"> </small>
            <div className="card-header-actions">
              <CButton
                size="large"
                color="success"
                onClick={() => {
                  history.push({
                    pathname: `/createRole`,
                  });
                }}
              >
                Add Role
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={roles}
              fields={[
                {
                  key: "id",
                  label: "ID",
                  _classes: "font-weight-bold",
                  _style: { width: "20%" },
                },
                { key: "name", label: "Role", _style: { width: "30%" } },
                { key: "Control", label: "" , _style: { width: "18%" },},
              ]}
              hover
              striped
              itemsPerPage={8}
              activePage={1}
              scopedSlots={{
                Control: (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        size="sm"
                        color="primary"
                        onClick={() => {
                          history.push({
                            pathname: `/role/${item.id}`,
                            state: { role: item },
                          });
                        }}
                      >
                        Edit
                      </CButton>{" "}
                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => {
                          setDeleteItem(item);
                          setShow(true);
                        }}
                      >
                        Delete
                      </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Roles;
