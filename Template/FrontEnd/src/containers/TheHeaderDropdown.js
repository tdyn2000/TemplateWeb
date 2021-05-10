import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useAuth } from "../context/auth";
import { logout } from "../api/Api";

const TheHeaderDropdown = () => {
  const { setAuthTokens } = useAuth();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/avatar.png"}
            className="c-avatar-img"
            alt="admin@lht.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          id="logOut"
          onClick={() => {
            logout();
            console.log("Log out!");
            setAuthTokens("");
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Đăng Xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
