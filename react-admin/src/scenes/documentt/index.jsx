import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { format, parseISO, getMonth, getYear } from "date-fns";  // ✅ Đúng

const mockProjects = [
  {
    id: 1,
    name: "Dự án A",
    createdAt: "2024-03-01",
    documents: [
      { id: 101, name: "Báo cáo tiến độ", status: "Hoàn thành" },
      { id: 102, name: "Kế hoạch phát triển", status: "Đang xử lý" },
    ],
  },
  {
    id: 2,
    name: "Dự án B",
    createdAt: "2024-02-15",
    documents: [
      { id: 201, name: "Hợp đồng khách hàng", status: "Chưa bắt đầu" },
      { id: 202, name: "Kế hoạch tài chính", status: "Hoàn thành" },
    ],
  },
];

const statusColors = {
  "Hoàn thành": "#4caf50",
  "Đang xử lý": "#ff9800",
  "Chưa bắt đầu": "#f44336",
};

const DocumentPage = () => {
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const filteredProjects = mockProjects.filter((project) => {
    const projectDate = parseISO(project.createdAt);
    const projectMonth = getMonth(projectDate) + 1; // Lấy tháng (0-11) +1
    const projectYear = getYear(projectDate);

    return (
      (!filterMonth || projectMonth === parseInt(filterMonth)) &&
      (!filterYear || projectYear === parseInt(filterYear)) &&
      project.documents.some((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Quản lý Tài Liệu Dự Án</Typography>

      {/* Thanh tìm kiếm và bộ lọc */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Tìm kiếm tài liệu"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Lọc theo tháng</InputLabel>
            <Select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
              <MenuItem value="">Tất cả</MenuItem>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Lọc theo năm</InputLabel>
            <Select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Hiển thị danh sách dự án và tài liệu */}
      {filteredProjects.map((project) => (
        <Card key={project.id} sx={{ mb: 3 }}>
          <CardHeader
            title={project.name}
            subheader={`Ngày tạo: ${format(parseISO(project.createdAt), "dd/MM/yyyy")}`}
          />
          <CardContent>
            <Grid container spacing={2}>
              {project.documents.map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc.id}>
                  <Card
                    sx={{
                      backgroundColor: statusColors[doc.status] || "#ccc",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{doc.name}</Typography>
                      <Typography variant="body2">Trạng thái: {doc.status}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DocumentPage;
