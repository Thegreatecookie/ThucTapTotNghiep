import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { StudentAPI } from "../../services";
import { tokens } from "../../theme";
import { CustomToolbar } from "../global/customToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts";
import { toast } from "react-toastify";

const Student = () => {
  const [student, setStudent] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));
  const [selectedIds, setSelectedIds] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleEditStudent = (id) =>
    navigate(ROUTE_PATH.EDIT_STUDENT, { state: { id } });

  const fetchStudents = (pageOptions) => {
    StudentAPI.getStudent(pageOptions).then((res) => {
      const students =
        res?.students?.map((studentItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = studentItem._id;
          return { ...studentItem, id, idIncrement };
        }) ?? [];
      setStudent(students);
      setTotalStudent(res?.total ?? 0);
    });
  };

  useEffect(() => {
    fetchStudents(pageOptions);
  }, [pageOptions]);

  console.log(student, "STUDENT");

  const role = localStorage.getItem("role");

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(
          selectedIds.map((id) => StudentAPI.deleteStudent(id))
        );
        fetchStudents(pageOptions);
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
    { field: "idIncrement", headerName: "ID", flex: 0.5 },
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
      field: "action",
      headerName: "Edit Info",
      width: 90,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          <Button
            onClick={() => handleEditStudent(params.id)}
            startIcon={<EditIcon />}
          />
        );
      },
    },
  ];

  const [fileUpload, setFileUpload] = useState();
  const handleChangeImportExcel = (e) => {
    console.log(e);
    setFileUpload(e.target?.files[0]);
  };

  const handleSubmitExcel = () => {
    if (fileUpload) {
      const formData = new FormData();
      formData.append("excelFile", fileUpload);

      StudentAPI.importStudentsFromExcel(formData)
        .then((res) => {
          console.log(res, "RES EXCEL");
          fetchStudents(pageOptions);
          toast.success("Import successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          console.log(err, "ERRROR IMPORT");
          const msgErr = err.response.data.message.split("failed:")[1];
          alert(msgErr);
        });
    }
  };

  return (
    <Box m="20px">
      <Header title="STUDENTS" subtitle="List of Students" />
      <Box display="flex" justifyContent="left" mt="20px">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleChangeImportExcel}
        />
      </Box>
      <Box>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmitExcel}
        >
          Submit
        </Button>
      </Box>

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
          rows={student}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: () => navigate(ROUTE_PATH.CREATE_STUDENT),
              }),
          }}
          page={pageOptions.page - 1}
          pageSize={pageOptions.pageSize}
          onPageChange={(page) =>
            setPageOptions({ ...pageOptions, page: page + 1 })
          }
          onPageSizeChange={(pageSize) =>
            setPageOptions({ ...pageOptions, pageSize })
          }
          rowCount={totalStudent}
          pagination
          paginationMode="server"
          rowsPerPageOptions={[10, 25, 50]}
          onSelectionModelChange={(ids) => {
            console.log(ids, "IDS");
            setSelectedIds(ids);
          }}
        />
      </Box>
    </Box>
  );
};

export default Student;
