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

const ManageClassroomStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [classroom, setclassroom] = useState([]);
  const {
    state: { id },
  } = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleEditStudent = (id) => {
    navigate(ROUTE_PATH.EDIT_CLASSROOM_STUDENT, { state: { id } });
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
        const msg = `Xóa sinh viên thành công`;
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
        return toast.warning("Vui lòng chọn sinh viên muốn xóa", {
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
    {
      field: "role",
      headerName: "Role",
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
              onClick={() => handleEditStudent(params.id)}
              startIcon={<EditIcon />}
            />
          </Box>
        );
      },
    },
  ];

  const getClassRoomById = async (id) => {
    try {
      const classroom = await ClassRoomAPI.getClassRoomById(id);
      setclassroom(classroom);
      const student = await StudentAPI.getStudentByClassRoomId(id);
      if (Array.isArray(student.students) && student.students.length > 0) {
        const studentList = student.students.map((i) => ({
          ...i.r_student,
          id: i._id,
          role: i.role,
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
      <Header title="STUDENTS" subtitle={`${classroom.name}`} />

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
                onAdd: null,
              }),
          }}
          onSelectionModelChange={(ids) => {
            setSelectedIds(ids);
            console.log(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default ManageClassroomStudent;
