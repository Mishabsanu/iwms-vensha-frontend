import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Div from "@jumbo/shared/Div";
import DndWrapper from "app/pages/extensions/dropzone/components/DndWrapper";
import CancelIcon from "@mui/icons-material/Cancel";
// import code from "../components/demo-code/dz-preview.txt";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const ImageUpload = ({ setFieldValue, values, name, type }) => {
  const [files, setFiles] = useState(values?.[name] || []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const previous = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ];
      setFiles(previous);

      if (type == "withoutFormik") {
        setFieldValue([
          ...files.map(({ preview, ...file }) => file),
          ...acceptedFiles.map((file) => file),
        ]);
      } else {
        setFieldValue(
          [name],
          [
            ...files.map(({ preview, ...file }) => file),
            ...acceptedFiles.map((file) => file),
          ]
        );
      }
    },
  });

  const handleRemoveImages = (index) => {
    const updateImg = [...files];
    updateImg.splice(index, 1);
    setFiles(updateImg);
    setFieldValue([name], [...updateImg.map(({ preview, ...file }) => file)]);
  };

  const thumbs = files.map((file, i) => (
    <div style={thumb} key={file.name}>
      <div style={{ ...thumbInner, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "pointer",
          }}
        >
          <CancelIcon onClick={() => handleRemoveImages(i)} color="error" />
        </div>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    // <JumboDemoCard>
    <Div>
      <Typography variant="h5">Upload Images</Typography>
      <DndWrapper>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Typography variant={"body1"} sx={{ cursor: "pointer" }}>
            Click to select files
          </Typography>
        </div>
      </DndWrapper>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Div>
    // </JumboDemoCard>
  );
};

export default ImageUpload;
