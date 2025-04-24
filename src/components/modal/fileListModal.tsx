import { forwardRef } from "react";
import { Box, Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import {TableVirtuoso} from 'react-virtuoso'
import { Check, CheckBox } from "@mui/icons-material";

export const AddFileModal = ({
  open,
  setIsOpenAddFileModal,
  // addedJdfFiles,
  // selectedJdfFiles,
  // setSelectedJdfFiles,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setIsOpenAddFileModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      sx={{
        "& .MuiDialog-container": {
          overflow: "auto",
          "& .MuiPaper-root": {
            overflow: "hidden",
            height: "686px",
            maxWidth: 704,
          },
        },
      }}
    >
      <Box
        p={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          height: "668px",
          width: "704px",
        }}
      >
        <Box
          sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: 2,
          }}
        >
          <Box
            sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            }}
          >
            <TableVirtuoso
              style={{
                flex: 5,
                height: "332px",
                width: "650px",
                boxShadow: "none",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              components={{
                TableBody: forwardRef(({ style, ...props }, ref) => (
                    <TableBody
                      {...props}
                      ref={ref}
                      sx={{ ...style, height: "100%" }}
                    >
                      <p>hoge</p>
                    </TableBody>
                )),
                Table: forwardRef(({ style, ...props }, ref: any) => (
                    <Table
                      {...props}
                      ref={ref}
                      sx={{
                        ...style,
                        tableLayout: "fixed",
                        borderCollapse: "collapse",
                      }}
                    />
                  ),
                ),
                TableHead: forwardRef(({ style, ...props }, ref: any) => (
                  <TableHead
                    {...props}
                    ref={ref}
                    sx={{
                      ...style,
                      // background: theme.palette.blueGray_100,
                      height: 32,
                    }}
                  />
                )),
                TableRow: forwardRef(({ style, ...props }, ref: any) => (
                  <TableRow
                    {...props}
                    ref={ref}
                    sx={{
                      ...style,
                      tableLayout: "fixed",
                      borderCollapse: "collapse",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      fontSize: 12,
                      "&:hover": {
                        cursor: "pointer",
                        // background: theme.palette.blueGray_50,
                      },
                    }}
                  />
                )),
              }}
              data={userFiles?.files ?? []}
              id="virtuosoTable"
              itemContent={(_, data) => {
                return (
                  <>
                    {columns.map((column) => {
                      return (
                        (data.fileTypeId === FILE_TYPES.Folder ||
                          data.format.endsWith("D") ||
                          data.format.endsWith("処理済み")) && (
                            <TableCell
                              key={column.id}
                              sx={{
                                padding: 0,
                                maxWidth: column.width,
                                border: "none",
                                background:
                                  isMatched || isSelected
                                    ? theme.palette.selectCell
                                    : "",
                                pointerEvents: isMatched ? "none" : "auto",
                                opacity: isMatched ? 0.6 : 1,
                              }}
                            >
                              <TableCellComponent
                                column={column}
                                row={data}
                                locationCurrentPath={locationCurrentPath}
                                setLocationCurrentPath={setLocationCurrentPath}
                                selectedJdfFiles={modalSelectedJdfFiles}
                                setSelectedJdfFiles={setModalSelectedJdfFiles}
                                setLocationFolderId={setLocationFolderId}
                                addedJdfFiles={addedJdfFiles}
                              />
                            </TableCell>
                        )
                      );
                    })}
                  </>
                );
              }}
            />
        </Box>
      </Box>
    </Box>

    <Box
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bottom: 0,
        right: 0,
        p: "24px",
        width: "100%",
        height: "80px",
        boxShadow:
          "0px -2px 4px -2px rgba(0, 0, 0, 0.10), 0px -4px 6px -1px rgba(0, 0, 0, 0.10)",
        backgroundColor: "fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "16px",
        }}
      >
        <Button
          // onClick={onClose}
          color="inherit"
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textTransform: "none",
            width: 80,
            height: 32,
            // border: `1px solid ${theme.palette.blueGray_300}`,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            // background: theme.palette.primary_,
            color: "#FFF",
          }}
          sx={{
            fontWeight: 700,
            fontSize: 12,
            textTransform: "none",
            width: 80,
            height: 32,
          }}
          // onClick={handleSubmit}
        >
          OK
        </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const TableCellComponent = ({
  column,
  row,
  locationCurrentPath,
  selectedJdfFiles,
  addedJdfFiles,
  setSelectedJdfFiles,
  setLocationCurrentPath,
  setLocationFolderId,
  }) => {
    switch ([column.id]) {
      case COLUMN_ID.CHECKBOX:
        if (row.fileTypeId === 1) {
          return (
            <Box sx={{ textAlign: "center" }}>
              <Checkbox checked={true} />
            </Box>
          );
        }
        return null;
  case COLUMN_ID.TITLE:
  return (
  <Box
  sx={{
  display: "flex",
  alignItems: "center",
  gap: 2,
  overflowWrap: "break-word",
  maxWidth: "full",
  padding: "0 8px",
  height: "40px",
  }}
  >
  {row.fileTypeId === FILE_TYPES.File ? (
  <img src={`/images/fileIcon/${row.format}.png`} />
  ) : (
  <FolderIcon sx={{ fill: theme.palette.amber_300, fontSize: 24 }} />
  )}
  <Typography
  sx={{
  display: "block",
  minWidth: column.width,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "0 8px",
  }}
  >
  {`${row.fileName} (${row.id})`}
  </Typography>
  </Box>
  );

  case COLUMN_ID.CREATED_DATE:
    return (
      <Typography
        sx={{ pr: "16px" }}
        onClick={() => {
          setSelectedJdfFiles((prev: SelectedJdfFile[]) => [...prev, row]);
        }}
      >
        {format(new Date(row.createdAt), "yyyy/MM/dd HH:mm")}
      </Typography>
    );
  default:
    return null;

}
