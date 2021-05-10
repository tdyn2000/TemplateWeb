import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions as RoleActions } from "../../redux/reducers/RoleReducer";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import MessageAlert from "../views/MessageAlert";
import { useHistory } from "react-router-dom";
import {
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton,
  CDataTable,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { itemsPerPage } from "../../util";

const Role = ({ match }) => {
  const ActionType = {
    ANY: "any",
    OWN: "own",
    DENY: "deny",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const roleData = useSelector((state) => state.roles.selectedItem);
  const [editRole, setEditRole] = useState({});
  const [details, setDetails] = useState([]);
  const [itemID, setItemID] = useState(-1);
  const error = useSelector((state) => state.roles.error);
  const message = useSelector((state) => state.roles.message);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message != null) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [message]);

  useEffect(() => {
    if (roleData != null) {
      if (roleData.role !== undefined) {
        setEditRole(roleData.role);
      }
      if (roleData.details !== undefined) {
        setDetails(roleData.details);
      }
    } else {
      setEditRole({});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemID, roleData]);

  useEffect(() => {
    if (match.params.id === undefined) {
      setItemID(-1);
    } else {
      setItemID(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    if (itemID > -1) {
      dispatch(RoleActions.get(match.params.id));
    } else {
      dispatch(RoleActions.clearItem());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemID]);

  useEffect(() => {
    return () => {
      dispatch(RoleActions.clearItem());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    const value = evt.target.value;
    const _role = { ...editRole, [evt.target.name]: value };
    setEditRole(_role);
  };

  const handleChangeDetail = (evt, _detail) => {
    const _details = details.map((item, i) => {
      if (_detail.id !== item.id) return item;
      var _item = { ...item, [evt.target.name]: evt.target.value };
      return _item;
    });
    setDetails(_details);
  };

  const reset = (evt) => {
    if (itemID > -1) {
      if (roleData.role !== undefined) {
        setEditRole(roleData.role);
      }
      if (roleData.details !== undefined) {
        setDetails(roleData.details);
      }
    } else {
      setEditRole({ name: "" });
      setDetails([]);
    }
  };

  const saveRole = (evt) => {
    if (itemID > -1) {
      dispatch(RoleActions.update({ role: editRole, details: details }));
    } else {
      dispatch(RoleActions.create({ role: editRole }));
    }
  };

  const messageView = () => {
    return (
      <MessageAlert
        isShow={show}
        title="Role"
        message={message}
        error={error}
        onCancel={() => {
          setShow(false);
          dispatch(RoleActions.clearMessage());
        }}
        onOk={() => {
          setShow(false);
          history.push({
            pathname: `/role/` + editRole.id,
          });
        }}
      />
    );
  };

  return (
    <CRow>
      {messageView()}
      <CCol lg={8}>
        <CCard>
          <CCardHeader>
            <b>Role id {match.params.id}</b>
          </CCardHeader>
          <CCardBody>
            <CForm
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Role Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="name"
                    name="name"
                    placeholder="Please input role name"
                    value={editRole === undefined ? "" : editRole.name}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter align="right">
            <CButton type="submit" size="sm" color="success" onClick={saveRole}>
              <CIcon name="cil-scrubber" /> Save
            </CButton>{" "}
            <CButton type="reset" size="sm" color="danger" onClick={reset}>
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>
            <b>Details</b>{" "}
          </CCardHeader>
          <CCardBody>
            <CDataTable
              columnFilter
              items={details}
              fields={[
                {
                  key: "resource",
                  label: "Resource",
                  _classes: "font-weight-bold",
                  _style: { width: "30%" },
                },
                {
                  key: "action",
                  label: "Action",
                  _classes: "font-weight-bold",
                  _style: { width: "30%" },
                },
                {
                  key: "actionType",
                  label: "Permission",
                  _classes: "font-weight-bold",
                  _style: { width: "30%" },
                },
              ]}
              hover
              striped
              itemsPerPage={itemsPerPage}
              pagination
              sorter
              scopedSlots={{
                actionType: (item) => (
                  <td>
                    <CSelect
                      custom
                      name="actionType"
                      id="actionType"
                      value={item.actionType}
                      onChange={(evt) => {
                        handleChangeDetail(evt, item);
                      }}
                    >
                      {Object.keys(ActionType).map((permiss) => (
                        <option key={permiss} value={ActionType[permiss]}>
                          {permiss}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Role;
