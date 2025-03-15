import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";

const employees = [
  { id: 1, name: "Nguyễn Văn A", position: "Nhân viên", department: "P1", checkedInShifts: ["S", "C"] },
  { id: 2, name: "Trần Thị B", position: "Nhân viên", department: "P1", checkedInShifts: ["T"] },
  { id: 3, name: "Lê Văn C", position: "Nhân viên", department: "P2", checkedInShifts: [] },
  { id: 4, name: "Phạm Thị D", position: "Nhân viên", department: "P2", checkedInShifts: ["C"] },
  { id: 5, name: "Vũ Văn E", position: "Nhân viên", department: "P3", checkedInShifts: ["S", "T"] },
];

const generateWorkSchedule = (days) =>
  Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    shifts: ["S", "C", "T"],
  }));

const EmployeeDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [currentTime, setCurrentTime] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workSchedule, setWorkSchedule] = useState([]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const daysOfWeek = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      setCurrentTime(
        `${daysOfWeek[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    setWorkSchedule(generateWorkSchedule(daysInMonth));
  }, [selectedMonth, selectedYear]);

  const filteredEmployees = employees.filter(
    (e) =>
      (selectedDepartment === "all" || e.department === selectedDepartment) &&
      e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#121212">
      {/* Header */}
      <Box p={2} bgcolor="#121212" color="white" textAlign="center">
        <Typography variant="h6" fontWeight="bold">
          HỆ THỐNG QUẢN LÝ CHẤM CÔNG NHÂN VIÊN
        </Typography>
        <Typography>{currentTime}</Typography>
      </Box>

      <Box display="flex" flex={1} p={2}>
        {/* Sidebar */}
        <Box width="25%" p={2} bgcolor="#333" borderRadius={2} color="#fff">
          <Typography variant="h6" fontWeight="bold">Danh sách nhân viên</Typography>

          {/* Bộ lọc phòng ban */}
          <Select
            fullWidth
            size="small"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            sx={{ mt: 1, mb: 2, bgcolor: "#121212", color: "white", borderRadius: 1 }}
          >
            <MenuItem value="all">Tất cả phòng ban</MenuItem>
            {[...new Set(employees.map((e) => e.department))].map((dept) => (
              <MenuItem key={dept} value={dept}>
                Phòng {dept}
              </MenuItem>
            ))}
          </Select>

          {/* Tìm kiếm nhân viên */}
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm nhân viên..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: "#121212",
              borderRadius: 1,
              input: { color: "white" },
            }}
            InputProps={{ style: { color: "white" } }}
          />

          {/* Danh sách nhân viên */}
          {filteredEmployees.map((emp) => (
            <Button
              key={emp.id}
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: selectedEmployee.id === emp.id ? "#2e7d32" : "#1976d2",
                "&:hover": { bgcolor: selectedEmployee.id === emp.id ? "#1b5e20" : "#1565c0" },
              }}
              onClick={() => setSelectedEmployee(emp)}
            >
              {emp.name} ({emp.department})
            </Button>
          ))}
        </Box>

        {/* Main Content */}
        <Box flex={1} p={2} color="white">
        {selectedEmployee && (
  <Paper
  elevation={3}
  sx={{ p: 2, mb: 2, bgcolor: "#121212", color: "#fff", width: "100%" }}
>
  <Box display="flex" justifyContent="space-between">
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {selectedEmployee.name}
      </Typography>
      <Typography>Chức vụ: {selectedEmployee.position}</Typography>
      <Typography>Phòng ban: {selectedEmployee.department}</Typography>
    </Box>
    
    <Box textAlign="right">
      <Typography>Email: {selectedEmployee.email || "Đang cập nhật"}</Typography>
      <Typography>Số điện thoại: {selectedEmployee.phone || "Đang cập nhật"}</Typography>
      <Typography>Ngày vào làm: {selectedEmployee.startDate || "Không xác định"}</Typography>
      <Typography>Trạng thái: {selectedEmployee.status || "Đang làm việc"}</Typography>
    </Box>
  </Box>
</Paper>
)}

          {/* Bộ chọn tháng & năm */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="h6" fontWeight="bold">Lịch làm việc:</Typography>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              sx={{ bgcolor: "#121212", color: "#fff", borderRadius: 1 }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <MenuItem key={month} value={month}>
                  Tháng {month}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{ bgcolor: "#121212", color: "#fff", borderRadius: 1 }}
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Lịch làm việc */}
          <Grid container spacing={1} mt={1}>
            {workSchedule.map((day) => (
              <Grid item xs={2} key={day.day}>
                <Paper elevation={2} sx={{ textAlign: "center", p: 1, bgcolor: "#121212", color: "#fff" }}>
                  <Typography variant="body1" fontWeight="bold">
                    {day.day}
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={0.5}>
                    {day.shifts.map((shift, index) => (
                      <Box
                        key={index}
                        bgcolor={selectedEmployee.checkedInShifts.includes(shift) ? "#2e7d32" : "red"}
                        color="white"
                        p={0.5}
                        borderRadius={1}
                        fontSize={12}
                      >
                        {shift}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;
