import React from 'react';
import style2 from "../../../../components/admin/Filter/style.module.css";
import style from "../../Dashboard/style.module.css"
import CustomTable from '../../../../components/admin/CustomTable';
import Filter from '../../../../components/admin/Filter';

import { Space } from 'antd';
import { } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from 'react-icons/fi';
import { IoEyeOutline } from 'react-icons/io5';
import { NavLink } from 'react-router';

function Addons() {

  return (
    <div className="content2">
      <div style={{ marginTop: "80px", borderRadius: "5px", padding: "0 20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "0 20px" }}>
        <div className={style2.actions_btns}>
          <NavLink>Add Addon</NavLink>
        </div>
        </div>

      </div>
    </div>
  );
}

export default Addons;












