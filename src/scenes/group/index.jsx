import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { CustomToolbar } from "../global/customToolbar";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GroupAPI } from "../../services";
import React, { useEffect, useState } from "react";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useLocation } from "react-router-dom";

const Group = () => {
  const [groups, setGroup] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // const handleEditClassroom = (id) => {
  //   navigate(ROUTE_PATH.EDIT_CLASSROOM, { state: { id } });
  // };

  // const handleShowStudent = (id) => {
  //   navigate(ROUTE_PATH.MANAGE_STUDENT, {
  //     state: { id },
  //   });
  // };

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
          r_classroom: i.r_classroom,
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

  console.log(groups, "GROUP");

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
        return toast.warning("No row is selected", {
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
      return toast.error("Deleted failure", {
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
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params, "params");
        return (
          <Box display="flex" justifyContent="end">
            {/* <Button
              onClick={() => handleEditClassroom(params.id)}
              startIcon={<EditIcon />}
            />
            <Button
              onClick={() => handleShowStudent(params.row._id)}
              startIcon={<AccountCircleIcon />}
            /> */}
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
          rows={groups}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: null,
              }),
          }}
          onSelectionModelChange={(r_classroom) => {
            console.log(r_classroom, "IDS");
            setSelectedIds(r_classroom);
          }}
        />
      </Box>
    </Box>
  );
};

export default Group;
