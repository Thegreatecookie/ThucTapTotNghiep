import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { ClassRoomAPI, ClassroomStudentAPI, StudentAPI } from "../../services";
import { tokens } from "../../theme";
import { CustomToolbar } from "../global/customToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_PATH } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts";
import { toast } from "react-toastify";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleAddStudent = () => {
    navigate(ROUTE_PATH.CREATE_STUDENT);
  };

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(
          selectedIds.map((id) =>
            ClassroomStudentAPI.deleteClassRoomStudent(id)
          )
        );
        getClassRoomById(id);
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
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "idStudent",
      headerName: "ID Student",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "classRoom",
      headerName: "Class",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  const getClassRoomById = async (id) => {
    try {
      const classRoom = await ClassRoomAPI.getClassRoomById(id);

      if (Array.isArray(classRoom.students) && classRoom.students.length > 0) {
        const studentList = classRoom.students.map((i) => ({
          ...i.r_student,
          id: i._id,
        }));
        setStudents(studentList);
      } else {
        setStudents([]);
      }
    } catch (error) {
      setStudents([]);
    }
  };

  useEffect(() => {
    getClassRoomById(id);
  }, [id]);

  return (
    <Box m="20px">
      <Header title="STUDENTS" subtitle={`Students of classroom: ${1}`} />

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
          rows={students}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: role === "teacher" ? handleAddStudent : null,
              }),
          }}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageStudent;
