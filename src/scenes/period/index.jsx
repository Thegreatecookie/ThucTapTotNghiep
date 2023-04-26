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
import { PeriodAPI } from "../../services";

const Period = () => {
  const [period, setPeriod] = useState([]);
  const [totalPeriod, setTotalPeriod] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));
  const [selectedIds, setSelectedIds] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const handleEditPeriod = (id) => {
    if (role == "admin") navigate(ROUTE_PATH.EDIT_PERIOD, { state: { id } });
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

  const fetchPeriods = (pageOptions) => {
    PeriodAPI.getPeriod(pageOptions).then((res) => {
      const periods =
        res?.periods?.map((periodItem, index) => {
          const idIncrement =
            index + 1 + (pageOptions.page - 1) * pageOptions.pageSize;
          const id = periodItem._id;
          return { ...periodItem, id, idIncrement };
        }) ?? [];
      setPeriod(periods);
      setTotalPeriod(res?.total ?? 0);
    });
  };

  useEffect(() => {
    fetchPeriods(pageOptions);
  }, [pageOptions]);

  console.log(period, "PERIOD");

  const handleAddPeriod = () => {
    navigate(ROUTE_PATH.CREATE_PERIOD);
  };

  const handleDeleteMany = async () => {
    try {
      if (selectedIds.length > 0) {
        await Promise.all(
          selectedIds.map((id) => PeriodAPI.deletePeriod(id))
        );
        fetchPeriods(pageOptions);
        const msg = `Deleted periods (${selectedIds.join(", ")}) successfully`;
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
      headerName: "Period Name",
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
            onClick={() => handleEditPeriod(params.id)}
            startIcon={<EditIcon />}
          />
        );
      },
    },
  ];

  return (
    <Box m="20px ">
      <Header title="PERIOD" subtitle="List of Periods" />
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
          rows={period}
          columns={columns}
          components={{
            Toolbar: () =>
              CustomToolbar({
                onDelete: handleDeleteMany,
                onAdd: handleAddPeriod,
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
          rowCount={totalPeriod}
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

export default Period;
