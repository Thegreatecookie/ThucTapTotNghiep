import * as React from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";

export function CustomToolbar({ onDelete }) {
  const navigate = useNavigate();
  // const { selectedIds, setSelectedIds } = useContext(GlobalContext);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </GridToolbarContainer>
      </div>
      <div>
        <Button
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTE_PATH.CREATE_STUDENT)}
        >
          Add
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={onDelete}>
          Delete
        </Button>
        {/* <Button startIcon={<EditIcon />}>Edit</Button> */}
      </div>
    </div>
  );
}
