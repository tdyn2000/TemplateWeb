import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Actions as UserActions } from "../../redux/reducers/UserReducer";
import { Actions as RoleActions } from "../../redux/reducers/RoleReducer";
import MessageAlert from "../views/MessageAlert";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";

const getBadge = (status) => {
  switch (status) {
    case 0:
      return "success";
    case 1:
      return "secondary";
    case 2:
      return "warning";
    case 3:
      return "danger";
    default:
      return "primary";
  }
};

const sts = [
  { id: 0, name: "Enable" },
  { id: 1, name: "Disable" },
];
const getStatus = (status) => {
  for (var sta of sts) {
    if (sta.id === status) {
      return sta.name;
    }
  }
};

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector((state) => state.users.data);
  const roles = useSelector((state) => state.roles.data);
  const [deleteItem, setDeleteItem] = useState(0);
  const error = useSelector((state) => state.users.error);
  const message = useSelector((state) => state.users.message);
  const [show, setShow] = useState(false);

  const getRole = (roleId) => {
    for (var role of roles) {
      if (role.id === roleId) {
        return role.name;
      }
    }
  };

  useEffect(() => {
    dispatch(RoleActions.getAll());
    dispatch(UserActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageView = () => {
    return (
      <MessageAlert
        isShow={show}
        title="Delete User"
        message={
          message === null
            ? "Are you sure to delete " + deleteItem.username
            : message
        }
        error={error}
        onCancel={() => {
          setShow(false);
          dispatch(UserActions.clearMessage());
        }}
        onOk={() => {
          setShow(false);
          deleteUser(deleteItem.id);
        }}
      />
    );
  };

  const deleteUser = (userId) => {
    dispatch(UserActions.delete(userId));
  };

  return (
    <CRow>
      {messageView()}
      <CCol xl={8}>
        <CCard>
          <CCardHeader>
            Users
            <small className="text-muted"> </small>
            <div className="card-header-actions">
              <CButton
                size="large"
                color="success"
                onClick={() => {
                  history.push({
                    pathname: `/createUser`,
                  });
                }}
              >
                Add User
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                { key: "username", label: "UserName" },
                { key: "createdAt" },
                { key: "role" },
                { key: "status" },
                { key: "Control", label: "" },
              ]}
              hover
              striped
              itemsPerPage={8}
              activePage={1}
              scopedSlots={{
                createdAt: (item) => (
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                ),
                role: (item) => <td>{getRole(item.roleId)}</td>,
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {getStatus(item.status)}
                    </CBadge>
                  </td>
                ),
                Control: (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        size="sm"
                        color="primary"
                        onClick={() => {
                          history.push({
                            pathname: `/user/${item.id}`,
                            state: { user: item },
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

export default Users;
