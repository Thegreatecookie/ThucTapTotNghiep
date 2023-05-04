import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { CustomToolbar } from "../global/customToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubjectAPI } from "../../services";

const Subject = () => {
  const [subject, setSubject] = useState([]);
  const [totalSubject, setTotalSubject] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));
  const [selectedIds, setSelectedIds] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleEditSubject = (id) => {
    if (role == "admin") navigate(ROUTE_PATH.EDIT_SUBJECT, { state: { id } });
    else {
      return toast.error("Contact Admin To Change", {
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

  const fetchSubjects = (pageOptions) => {
    SubjectAPI.getSubject(pageOptions).then((res) => {
      const subjects =
        res?.subjects?.map((subjectItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = subjectItem._id;
          return { ...subjectItem, id, idIncrement };
        }) ?? [];
      setSubject(subjects);
      setTotalSubject(res?.total ?? 0);
    });
  };

  useEffect(() => {
    fetchSubjects(pageOptions);
  }, [pageOptions]);

  console.log(subject, "SUBJECT");

  const handleAddSubject = () => {
    navigate(ROUTE_PATH.CREATE_SUBJECT);
  };

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(
          selectedIds.map((id) => SubjectAPI.deleteSubject(id))
        );
        fetchSubjects(pageOptions);
        const msg = `Deleted subjects (${selectedIds.join(", ")}) successfully`;
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
      if (role == "teacher")
        return toast.error("Contact Admin to Delete", {
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
    { field: "idIncrement", headerName: "ID" },
    {
      field: "name",
      headerName: "Subject Name",
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
            onClick={() => handleEditSubject(params.id)}
            startIcon={<EditIcon />}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px ">
      <Header title="SUBJECT" subtitle="List of Subjects" />
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
          rows={subject}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: role === "admin" ? handleAddSubject : null,
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
          rowCount={totalSubject}
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

export default Subject;
