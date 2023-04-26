import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { CustomToolbar } from "../global/customToolbar";
import { ROUTE_PATH } from "../../constants";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { ClassRoomAPI } from "../../services";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const ClassRoom = () => {
  const [classRoom, setClassRoom] = useState([]);
  const [totalClassRoom, setTotalClassRoom] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));
  const [selectedIds, setSelectedIds] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleEditClassroom = (id) => {
    navigate(ROUTE_PATH.EDIT_CLASSROOM, { state: { id } });
  };

  const handleShowStudent = (id) => {
    navigate(ROUTE_PATH.MANAGE_STUDENT, {
      state: { id },
    });
  };

  const fetchClassrooms = (pageOptions) => {
    ClassRoomAPI.getClassRoom(pageOptions).then((res) => {
      const classRooms =
        res?.classRooms?.map((classRoomItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = classRoomItem._id;
          return { ...classRoomItem, id, idIncrement };
        }) ?? [];
      setClassRoom(classRooms);
      setTotalClassRoom(res?.total ?? 0);
    });
  };

  useEffect(() => {
    fetchClassrooms(pageOptions);
  }, [pageOptions]);

  console.log(classRoom, "CLASSROOM");

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(
          selectedIds.map((id) => ClassRoomAPI.deleteClassRoom(id))
        );
        fetchClassrooms(pageOptions);
        const msg = `Deleted classrooms (${selectedIds.join(
          ", "
        )}) successfully`;
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
          autoClose: 5000,
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
      field: "name",
      headerName: "Class Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "period",
      headerName: "Period",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        console.log(params, "params");
        return (
          <Box display="flex" justifyContent="end">
            <Button
              onClick={() => handleEditClassroom(params.id)}
              startIcon={<EditIcon />}
            />
            <Button
              onClick={() => handleShowStudent(params.row._id)}
              startIcon={<AccountCircleIcon />}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLASSROOMS" subtitle="List of Classrooms" />
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
          rows={classRoom}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: () => navigate(ROUTE_PATH.CREATE_CLASSROOM),
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
          rowCount={totalClassRoom}
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

export default ClassRoom;
