import Header from "../../components/Header";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { CustomToolbar } from "../global/customToolbar";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GroupAPI } from "../../services";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
const Group = () => {
  const [groups, setGroup] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleEditGroup = (id) => {
    navigate(ROUTE_PATH.EDIT_GROUP, { state: { id } });
  };

  const handleShowStudent = (id) => {
    console.log(id, "ID func");
    navigate(ROUTE_PATH.MANAGE_GROUP_STUDENT, {
      state: { id },
    });
  };

  const handleAddStudent = (id) => {
    navigate(ROUTE_PATH.ADD_GROUPSTUDENT, {
      state: { id },
    });
  };

  const getGroupById = async (id) => {
    try {
      const group = await GroupAPI.getByClassRoomID(id);

      if (Array.isArray(group) && group.length > 0) {
        const groupList = group.map((i) => ({
          name: i.name,
          id: i._id,
        }));
        setGroup(groupList);
      } else {
        setGroup([]);
      }
    } catch (error) {
      setGroup([]);
    }
  };

  useEffect(() => {
    getGroupById(id);
  }, [id]);

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(selectedIds.map((id) => GroupAPI.deleteGroup(id)));
        getGroupById(id);
        const msg = `Deleted students (${selectedIds.join(", ")}) successfully`;
        return toast.success(msg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        return toast.warning("Vui lòng chọn nhóm muốn xóa", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      return toast.error("Xóa thất bại", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const columns = [
    {
      field: "name",
      headerName: "Class Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "editInfo",
      headerName: "Edit Info",
      // flex:1,
      width: 100,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="end">
            <Button
              onClick={() => handleEditGroup(params.id)}
              startIcon={<EditIcon />}
            />
          </Box>
        );
      },
    },
    {
      field: "showStudent",
      headerName: "Show Student",
      // flex:1,
      width: 100,
      renderCell: (params) => {
        console.log(params, "PARAMS");
        return (
          <Box display="flex" justifyContent="end">
            <Button
              onClick={() => handleShowStudent(params.row.id)}
              startIcon={<AccountCircleIcon />}
            />
          </Box>
        );
      },
    },
    {
      field: "addStudent",
      headerName: "Add Student",
      width: 100,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          <Box display="flex" justifyContent="end">
            <Button
              onClick={() => handleAddStudent(params.id)}
              startIcon={<PersonAddAltIcon />}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="GROUPS" subtitle="List of groups in " />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiButtonBase-root ": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          // disableRowSelectionOnClick
          rows={groups}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: null,
              }),
          }}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
            console.log(ids, "GR index");
          }}
        />
      </Box>
    </Box>
  );
};

export default Group;
