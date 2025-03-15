import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, TextField, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../../components/Header";

// Dữ liệu mẫu cho từng nhân viên
const mockData = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        data: [
            { tuần: "Tuần 1", giờ_làm: 40, ngày_nghỉ: 2, trễ: 3, sớm: 2 },
            { tuần: "Tuần 2", giờ_làm: 38, ngày_nghỉ: 3, trễ: 4, sớm: 1 },
            { tuần: "Tuần 3", giờ_làm: 42, ngày_nghỉ: 1, trễ: 2, sớm: 3 },
            { tuần: "Tuần 4", giờ_làm: 37, ngày_nghỉ: 4, trễ: 5, sớm: 2 },
        ],
    },
    {
        id: "2",
        name: "Trần Thị B",
        data: [
            { tuần: "Tuần 1", giờ_làm: 39, ngày_nghỉ: 1, trễ: 2, sớm: 1 },
            { tuần: "Tuần 2", giờ_làm: 41, ngày_nghỉ: 2, trễ: 3, sớm: 2 },
            { tuần: "Tuần 3", giờ_làm: 36, ngày_nghỉ: 3, trễ: 4, sớm: 1 },
            { tuần: "Tuần 4", giờ_làm: 43, ngày_nghỉ: 2, trễ: 3, sớm: 3 },
        ],
    },
];

const ChamCong = () => {
    const [employees] = useState(mockData);
    const [selectedEmployee, setSelectedEmployee] = useState(mockData[0].id);
    const [data, setData] = useState(mockData[0].data);

    useEffect(() => {
        const selected = employees.find(emp => emp.id === selectedEmployee);
        setData(selected ? selected.data : []);
    }, [selectedEmployee, employees]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ChamCong");
        XLSX.writeFile(workbook, `ChamCong_${selectedEmployee}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Báo Cáo Chấm Công - ${employees.find(emp => emp.id === selectedEmployee)?.name}`, 14, 10);
        doc.autoTable({
            head: [["Tuần", "Giờ Làm", "Ngày Nghỉ", "Trễ", "Sớm"]],
            body: data.map(row => [row.tuần, row.giờ_làm, row.ngày_nghỉ, row.trễ, row.sớm]),
        });
        doc.save(`ChamCong_${selectedEmployee}.pdf`);
    };

    return (
        <Box>
            <Header title="THỐNG KÊ CHẤM CÔNG" />

            {/* Bộ lọc chọn nhân viên */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        label="Chọn nhân viên"
                        variant="outlined"
                        fullWidth
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        {employees.map((emp) => (
                            <MenuItem key={emp.id} value={emp.id}>
                                {emp.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="primary" fullWidth onClick={exportToExcel}>
                        Xuất Excel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="secondary" fullWidth onClick={exportToPDF}>
                        Xuất PDF
                    </Button>
                </Grid>
            </Grid>

            {/* Tổng quan số liệu */}
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: "#2196f3", color: "white", textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h6">Tổng giờ làm</Typography>
                            <Typography variant="h4">{data.reduce((acc, item) => acc + item.giờ_làm, 0)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: "#f44336", color: "white", textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h6">Số ngày nghỉ</Typography>
                            <Typography variant="h4">{data.reduce((acc, item) => acc + item.ngày_nghỉ, 0)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: "#ff9800", color: "white", textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h6">Số lần trễ</Typography>
                            <Typography variant="h4">{data.reduce((acc, item) => acc + item.trễ, 0)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: "#4caf50", color: "white", textAlign: "center" }}>
                        <CardContent>
                            <Typography variant="h6">Số lần về sớm</Typography>
                            <Typography variant="h4">{data.reduce((acc, item) => acc + item.sớm, 0)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Biểu đồ */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="tuần" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="giờ_làm" fill="#2196f3" name="Giờ làm" />
                    <Bar dataKey="ngày_nghỉ" fill="#f44336" name="Ngày nghỉ" />
                    <Bar dataKey="trễ" fill="#ff9800" name="Trễ" />
                    <Bar dataKey="sớm" fill="#4caf50" name="Sớm" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ChamCong;
