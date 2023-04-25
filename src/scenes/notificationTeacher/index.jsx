import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { NotificationAPI } from "../../services";


// import { mockDataNotifications } from "../../data/mockData";
import { Box } from "@mui/material";
export default function NotificationTeacher() {
  // const { data } = mockDataNotifications({
  //   name: 'Anya Stark',
  //   rowLength: 100,
  //   maxColumns: 6,
  // });

  const [notifi, setNotifi] = useState([]);
  const [totalNotifi, setTotalNotifi] = useState(0);
  const [pageOptions, setPageOptions] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));


  const fetchNoti = (e) =>{ NotificationAPI.getNotification(e).then((res) => {
      const notifications =
        res?.notifications?.map((e, index) => {
          const i =
            index + 1 + (e.page - 1) * e.pageSize;
          const id = e._id;
          return { ...e, id, i };
        }) ?? [];
        setNotifi(notifications);
      setTotalNotifi(res?.total ?? 0);
    });}


    useEffect(() => {
      fetchNoti(pageOptions);
    }, [pageOptions]);


  const columns = [
    {
      field: 'title',
      headerName: 'title',
      width: 150,
      editable: true,
    },
    {
      field: 'message',
      headerName: 'message',
      width: 150,
      editable: true,
    },
  ];
  
  return (
    <Box sx={{ height: 400, width: '100%' }} >
    <DataGrid
          rows={notifi}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
    </Box>
  );
}
