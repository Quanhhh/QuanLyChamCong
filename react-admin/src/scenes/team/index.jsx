import { 
    Box, Typography, useTheme, Card, CardContent, Dialog, DialogTitle, DialogContent, 
    DialogActions, Button, Grid, Avatar, TextField, MenuItem 
} from "@mui/material";
import { tokens } from "../../theme";
import { useState, useCallback, useMemo } from "react";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [rows, setRows] = useState(mockDataTeam);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const getAccessIcon = (access) => {
        switch (access) {
            case "admin":
                return <AdminPanelSettingsOutlined />;
            case "manager":
                return <SecurityOutlined />;
            case "user":
                return <LockOpenOutlined />;
            default:
                return null;
        }
    };

    const filteredRows = useMemo(() => {
        return rows.filter(row => 
            row.name.toLowerCase().includes(search.toLowerCase()) &&
            (filter ? row.access === filter : true)
        );
    }, [rows, search, filter]);

    const handleOpenForm = useCallback((employee = null) => {
        setIsEditing(Boolean(employee));
        setFormData(employee || { id: uuidv4(), name: "", age: "", phone: "", email: "", phongban: "", access: "user", avatar: "", daysWorked: 0 });
        setOpenDialog(true);
    }, []);

    const handleCloseForm = () => {
        setOpenDialog(false);
        setFormData(null);
    };

    const handleSaveEmployee = () => {
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Vui lòng nhập đầy đủ thông tin nhân viên.");
            return;
        }

        if (isEditing) {
            setRows(rows.map(emp => (emp.id === formData.id ? formData : emp)));
            alert("Nhân viên đã được cập nhật thành công!");
        } else {
            setRows([...rows, formData]);
            alert("Nhân viên đã được thêm thành công!");
        }
        handleCloseForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
            setRows(rows.filter((row) => row.id !== id));
            alert("Nhân viên đã bị xóa.");
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh_sach_nhan_vien");
        XLSX.writeFile(workbook, "DanhSachNhanVien.xlsx");
    };

    return (
        <Box>
            <Header title="QUẢN LÝ NHÂN VIÊN" />
            
            <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={12} sm={5}>
                    <TextField 
                        label="Tìm kiếm theo tên" 
                        variant="outlined" 
                        fullWidth 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField 
                        select 
                        label="Lọc theo vị trí" 
                        variant="outlined" 
                        fullWidth
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4} display="flex" gap={2}>
                    <Button variant="contained" color="success" fullWidth onClick={() => handleOpenForm()}>Thêm Nhân Viên</Button>
                    <Button variant="contained" color="primary" fullWidth onClick={exportToExcel}>Tải danh sách</Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>

            <Dialog open={openDialog} onClose={handleCloseForm}>
    <DialogTitle>{isEditing ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên mới"}</DialogTitle>
    <DialogContent>
        <TextField
            label="Họ và tên"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData?.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData?.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData?.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <TextField
            select
            label="Quyền truy cập"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData?.access || "user"}
            onChange={(e) => setFormData({ ...formData, access: e.target.value })}
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
        </TextField>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseForm} color="error">Hủy</Button>
        <Button onClick={handleSaveEmployee} color="primary">
            {isEditing ? "Cập nhật" : "Thêm mới"}
        </Button>
    </DialogActions>
</Dialog>


                {filteredRows.map((row) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={row.id}>
                        <Card sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], borderRadius: "12px", textAlign: "center", cursor: "pointer", transition: "0.3s", '&:hover': { boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" } }}>
                            <CardContent>
                                <Avatar src={row.avatar} alt={row.name} sx={{ width: 90, height: 90, margin: "auto", mb: 1 }} />
                                <Typography variant="h6">{row.name}</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center" mt={1} p={1} borderRadius="4px"
                                    sx={{ backgroundColor: row.access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700] }}>
                                    {getAccessIcon(row.access)}
                                    <Typography sx={{ ml: 1 }}>{row.access}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                                    <Button variant="contained" color="secondary" size="small" onClick={() => handleOpenForm(row)}>Sửa</Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(row.id)}>Xóa</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Team;
