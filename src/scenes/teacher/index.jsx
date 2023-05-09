import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { TeacherAPI } from "../../services";
import { tokens } from "../../theme";
import { CustomToolbar } from "../global/customToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contexts";
import { toast } from "react-toastify";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const Teacher = () => {
  const [teacher, setTeacher] = useState([]);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));
  // const [selectedIds, setSelectedIds] = useState([]);

  const [selectionModel, setSelectionModel] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleAddTeacher = (id) => {
    navigate(ROUTE_PATH.CREATE_TEACHER, {
      state: { id },
    });
  };

  const handleEditTeacher = (id) =>
    navigate(ROUTE_PATH.EDIT_TEACHER, { state: { id } });

  const fetchTeachers = (pageOptions) => {
    TeacherAPI.getTeacher(pageOptions).then((res) => {
      const teachers =
        res?.teachers?.map((teacherItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = teacherItem._id;
          return { ...teacherItem, id, idIncrement };
        }) ?? [];
      setTeacher(teachers);
      setTotalTeacher(res?.total ?? 0);
    });
  };

  useEffect(() => {
    fetchTeachers(pageOptions);
  }, [pageOptions]);

  const handleDeleteMany = () => {
    console.log(selectionModel);
    TeacherAPI.deleteTeacher(selectionModel)
      .then((res) => {
        fetchTeachers(pageOptions);
        // console.log(res, "CREATE RES");
        toast.success("Xóa giáo viên thành công", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        const msgErr = err.response.data.message;
        // alert(msgErr);
        return toast.error(msgErr, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
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
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        // console.log(params, "params");
        return (
          <Button
            onClick={() => handleEditTeacher(params.id)}
            startIcon={<EditIcon />}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEACHERS" subtitle="List of Teachers" />
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
          selectionModel={selectionModel}
          rows={teacher}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: handleAddTeacher,
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
          rowCount={totalTeacher}
          pagination
          paginationMode="server"
          rowsPerPageOptions={[10, 25, 50]}
          // onSelectionModelChange={(ids) => {
          //   console.log(ids, "IDS");
          //   setSelectedIds(ids);
          // }}
          onSelectionModelChange={(selection) => {
            if (selection.length > 1) {
              const selectionSet = new Set(selectionModel);
              const result = selection.filter((s) => !selectionSet.has(s));
              setSelectionModel(result);
            } else {
              setSelectionModel(selection);
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Teacher;
