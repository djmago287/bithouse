import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

const Containermain = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
const Conheader = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Title = styled.h2`
  margin: 0;
  color: white;
  font-size: clamp(1.2rem, 3.5vw, 2rem);
`;
const Subtitle = styled.p`
  margin: 0;
  color: white;
  font-size: clamp(0.75rem, 1.8vw, 0.9rem);
`;

const Cardcontainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  overflow: hidden;
`;
const Cardrow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const Cardfilename = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-break: break-all;
  font-size: 0.85rem;
`;

const listbackup = [
  { id: 1, filename: "2025102BACKUP_DBBITHOUSE.sql", date: "2026-01-29 10:30:00" },
  { id: 2, filename: "tes.sql", date: "2026-01-29 10:15:00" },
  { id: 3, filename: "2025102BACKUP_DBBITHOUSE.sql", date: "2026-01-28 09:45:00" },
];

export const BackupPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const RenderStatus = ({ item }) =>
    item.id === listbackup[0].id ? (
      <Chip
        icon={<CloudDoneIcon sx={{ color: "white" }} />}
        label="Último respaldo"
        size="small"
        sx={{ ml: 1, backgroundColor: "#2e7d32", color: "white" }}
      />
    ) : (
      <Chip
        label="Respaldo antiguo"
        size="small"
        sx={{ ml: 1, backgroundColor: "#9e9e9e", color: "white" }}
      />
    );

  return (
    <Containermain>
      <Conheader>
        <Title>Backups de la base de datos de BITHOUSE</Title>
        <Subtitle>Lista de archivos de respaldo SQL generados del sistema.</Subtitle>
      </Conheader>
      {isMobile ? (
        listbackup.map((item) => (
          <Cardcontainer key={item.id} elevation={2}>
            <Cardrow>
              <Cardfilename>
                <InsertDriveFileIcon sx={{ color: "#6b7280" }} />
                <span>{item.filename}</span>
              </Cardfilename>
              <IconButton aria-label="descargar backup" color="primary" size="small">
                <DownloadForOfflineIcon />
              </IconButton>
            </Cardrow>
            <Cardrow>
              <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>{item.date}</span>
              <RenderStatus />
            </Cardrow>
          </Cardcontainer>
        ))
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de backups">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Archivo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                  Descargar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listbackup.map((item) => (
                <TableRow key={item.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <InsertDriveFileIcon sx={{ verticalAlign: "middle", mr: 1, color: "#6b7280" }} />
                    {item.filename}
                  </TableCell>
                  <TableCell>
                    {item.date}
                    <RenderStatus />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="descargar backup" color="primary">
                      <DownloadForOfflineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Containermain>
  );
};