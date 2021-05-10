/* eslint-disable eqeqeq */
import React from "react";

import { CButton } from "@coreui/react";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const MessageAlert = ({
  isShow,
  title,
  message,
  error,
  warning,
  onOk,
  onCancel,
}) => {
  const messageType = () => {
    if (error) return "danger";
    if (warning) return "warning";
    return "success";
  };

  return (
    <CModal show={isShow} onClose={onCancel} color={messageType()}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        {onOk && (
          <CButton color={messageType()} onClick={onOk}>
            OK
          </CButton>
        )}{" "}
        <CButton color="primary" onClick={onCancel}>
          Cancel
        </CButton>{" "}
      </CModalFooter>
    </CModal>
  );
};

export default MessageAlert;
