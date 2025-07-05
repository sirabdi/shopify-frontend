"use client";

import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSProperties, useState } from "react";
import { FormResponse } from "../../common/interface/form-response.interface";
import createProduct from "../actions/create-product";
import { CloudUploadOutlined } from "@mui/icons-material";

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 1,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const fileInputStyles: CSSProperties = {
    clip: "react(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  };

  const [response, setResponse] = useState<FormResponse>();
  const [fileName, setfileName] = useState<string>("");

  const onClose = () => {
    setResponse(undefined);
    setfileName("");
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={{ ...style }}>
          <form
            className="w-full max-w-xs"
            action={async (formData) => {
              const response = await createProduct(formData);
              setResponse(response);
              if (!response.error) {
                onClose();
              }
            }}
          >
            <Stack spacing={2}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                type="text"
                required
                helperText={response?.error}
                error={!!response?.error}
              />
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                type="text"
                required
                helperText={response?.error}
                error={!!response?.error}
              />
              <TextField
                name="price"
                label="Price"
                variant="outlined"
                type="number"
                required
                helperText={response?.error}
                error={!!response?.error}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadOutlined />}
              >
                Upload File
                <input
                  type="file"
                  name="image"
                  style={fileInputStyles}
                  onChange={(e) =>
                    e.target.files && setfileName(e.target.files[0].name)
                  }
                ></input>
              </Button>
              {fileName && <Typography>{fileName}</Typography>}
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
