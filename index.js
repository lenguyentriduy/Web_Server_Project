// Triger ghi dữ liệu vào SQL
var insert_trigger = false;			
var old_insert_trigger = false;	
// /////////////////////////++THIẾT LẬP KẾT NỐI WEB++/////////////////////////
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
// Home calling
app.get("/", function(req, res){
    res.render("home")
});
//
// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');  
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({port: 102, host: '10.128.134.66', rack: 0, slot: 1}, PLC_connected);
// Bảng tag trong Visual studio code
var tags_list = {
    Q_BT1: 'Q0.3',
    Q_BT2: 'Q0.4',
    Q_BT3: 'Q0.5',
    Q_BT4: 'Q0.6',
    Q_Cylinder_HTKT: 'Q0.7',
    Q_BT5: 'Q1.0',           // Dữ liệu dạng bool
    Q_BT6: 'Q1.1',
    Q_Pump: 'Q1.2',
    Q_MAY_CAP_NAP: 'Q1.3',
    Q_Xylanh_Nang: 'Q1.4',
    Q_Motor_Quay: 'Q1.5',
    Q_BT7: 'Q1.6',
    Q_BT8: 'Q1.7',
    Q_Xylanh_Kep: 'Q2.0',
    Q_MAY_DAN_NHAN: 'Q2.1',
    Q_Cylinder_Push_Lon: 'Q2.2',
    Q_Cylinder_Bar_Lon: 'Q2.3',
    Q_BT9: 'Q2.4',
    Q_THANH_GIU: 'Q2.5',
    Q_THANH_DAY: 'Q2.6',
    Q_4_THANH_MIET: 'Q2.7',
    Q_Mam_Xoay: 'Q3.0',
    Q_CAMERA_HTKTKT: 'Q3.1',
    Q_CAMERA_HTND: 'Q3.2',
    Q_Cylinder_HTKTND: 'Q3.3',
    Q_BT10: 'Q3.4',
    Q_Cylinder_Push_Thung: 'Q3.5',
    M_Mode: 'M0.0',
    M_Start: 'M0.1',
    M_BT1: 'M0.3',
    M_BT2: 'M0.4',
    M_BT3: 'M0.5',
    M_BT4: 'M0.6',
    M_Optical_Sensor_1: 'M0.7',
    M_Cylinder_HTKT: 'M1.0',
    M_BT5: 'M1.1',
    M_BT6: 'M1.2',
    M_CAMERA_HTKTKT: 'M1.3',
    M_Position_Sensor_1: 'M1.4',
    M_Pump: 'M1.5',
    M_MAY_CAP_NAP: 'M1.6',
    M_Position_Sensor_2: 'M1.7',
    M_Position_Sensor_3: 'M2.0',
    M_Xylanh_Nang: 'M2.1',
    M_Motor_Quay: 'M2.2',
    M_BT7: 'M2.3',
    M_BT8: 'M2.4',
    M_Position_Sensor_5: 'M2.5', 
    M_MAY_DAN_NHAN: 'M2.6',
    M_Cylinder_Push_Lon: 'M2.7',
    M_Cylinder_Bar_Lon: 'M3.0',
    M_Optical_Sensor_3: 'M3.1',
    M_Position_Sensor_4: 'M3.2',
    M_THANH_GIU: 'M3.3',
    M_THANH_DAY: 'M3.4',
    M_Pause: 'M3.5',
    M_Mam_Xoay: 'M3.6',
    M_Xylanh_Kep: 'M3.7',
    M_BT9: 'M4.0',
    M_4_THANH_MIET: 'M4.1',
    M_RESET: 'M4.2',
    M_Optical_Sensor_2: 'M4.3',
    M_CAMERA_HTND: 'M4.4',
    M_Cylinder_HTKTND: 'M4.5',
    M_BT10: 'M4.6',
    M_Cylinder_Push_Thung: 'M4.7',
    M_Position_Sensor_6: 'M5.0', 
    M_Position_Sensor_7: 'M5.1',
    M_Position_Sensor_8: 'M5.2',
    Chai_250ml: 'M17.7',
    Chai_1lit: 'M18.0',
    Binh_2lit: 'M18.1',
    Binh_5lit: 'M18.2',
    Temp_1: 'M18.3',
    Temp_2: 'M18.4',
    Temp_3: 'M18.5',
    Temp_4: 'M18.6',
    HIEN_1: 'M19.0',
    HIEN_3: 'M19.2',
    Btt_Chai_250ml: 'M19.3',
    Btt_Chai_1lit: 'M19.4',
    Btt_Binh_2lit: 'M19.5',
    Btt_Binh_5lit: 'M19.6',
    BT: 'M20.7',
    MNCD: 'M21.0',
    NDDR: 'M21.1',
    SMV: 'M21.2',
    Set_Parameter: 'M21.3',
    Temp: 'M21.5',
    Default: 'M36.2',
    SQL_Trigger: 'M36.3',
    Count_SPKT: 'MW50',  
    Count_Lon_HTKTKT: 'MW52',        // Dữ liệu dạng số nguyên integer
    QR_code: 'MW54',
    Level_Production: 'MW60',
    Count_Lon_Di_Qua: 'MW62',
    Count_Lon_Trong_Thung: 'MW64',
    Muc_Bom: 'MR70',          // Dữ liệu dạng số thực real
    MN_TT: 'MW90',
    QR_code_TT: 'MW92',
    Lon_loi: 'MW94',
    Lon_bth: 'MW96',
    So_lon_nhap_vao: 'MW98',
    Khoi_luong: 'MR108',
    Khoi_luong_TT: 'MR112', 
};
// GỬI DỮ LIỆu TAG CHO PLC
function PLC_connected(err) {
    if (typeof(err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function(tag) {return tags_list[tag];});  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems([
      'Q_BT1',
      'Q_BT2',
      'Q_BT3',
      'Q_BT4',
      'Q_Cylinder_HTKT',
      'Q_BT5',       // Dữ liệu dạng bool
      'Q_BT6',
      'Q_Pump',
      'Q_MAY_CAP_NAP',
      'Q_Xylanh_Nang',
      'Q_Motor_Quay',
      'Q_BT7',
      'Q_BT8',
      'Q_Xylanh_Kep',
      'Q_MAY_DAN_NHAN',
      'Q_Cylinder_Push_Lon',
      'Q_Cylinder_Bar_Lon',
      'Q_BT9',
      'Q_THANH_GIU',
      'Q_THANH_DAY',
      'Q_4_THANH_MIET',
      'Q_Mam_Xoay',
      'Q_CAMERA_HTKTKT',
      'Q_CAMERA_HTND',
      'Q_Cylinder_HTKTND',
      'Q_BT10',
      'Q_Cylinder_Push_Thung',
      'M_Mode',
      'M_Start',
      'M_BT1',
      'M_BT2',
      'M_BT3',
      'M_BT4',
      'M_Optical_Sensor_1',
      'M_Cylinder_HTKT',
      'M_BT5',
      'M_BT6',
      'M_CAMERA_HTKTKT',
      'M_Position_Sensor_1',
      'M_Pump',
      'M_MAY_CAP_NAP',
      'M_Position_Sensor_2',
      'M_Position_Sensor_3',
      'M_Xylanh_Nang',
      'M_Motor_Quay',
      'M_BT7',
      'M_BT8',
      'M_Position_Sensor_5',
      'M_MAY_DAN_NHAN',
      'M_Cylinder_Push_Lon',
      'M_Cylinder_Bar_Lon',
      'M_Optical_Sensor_3',
      'M_Position_Sensor_4',
      'M_THANH_GIU',
      'M_THANH_DAY',
      'M_Pause',
      'M_Mam_Xoay',
      'M_Xylanh_Kep',
      'M_BT9',
      'M_4_THANH_MIET',
      'M_RESET',
      'M_Optical_Sensor_2',
      'M_CAMERA_HTND',
      'M_Cylinder_HTKTND',
      'M_BT10',
      'M_Cylinder_Push_Thung',
      'M_Position_Sensor_6',
      'M_Position_Sensor_7',
      'M_Position_Sensor_8',
      'Chai_250ml',
      'Chai_1lit',
      'Binh_2lit',
      'Binh_5lit',
      'Temp_1',
      'Temp_2',
      'Temp_3',
      'Temp_4',
      'HIEN_1',
      'HIEN_3',
      'Btt_Chai_250ml',
      'Btt_Chai_1lit',
      'Btt_Binh_2lit',
      'Btt_Binh_5lit',
      'BT',
      'MNCD',
      'NDDR',
      'SMV',
      'Set_Parameter',
      'Temp',
      'Default',
      'SQL_Trigger',
      'Count_SPKT',
      'Count_Lon_HTKTKT',    // Dữ liệu dạng số nguyên integer
      'QR_code',
      'Level_Production',
      'Count_Lon_Di_Qua',
      'Count_Lon_Trong_Thung',
      'Muc_Bom',       // Dữ liệu dạng số thực real
      'MN_TT',
      'QR_code_TT',
      'Lon_loi',
      'Lon_bth',
      'So_lon_nhap_vao',
      'Khoi_luong',  
      'Khoi_luong_TT'
    ]);
}
// Đọc dữ liệu từ PLC và đưa vào array tags
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log(values); // Hiển thị giá trị để kiểm tra
}
// Hàm chức năng scan giá trị
function fn_read_data_scan(){
    conn_plc.readAllItems(valuesReady);
    fn_sql_insert();
}
// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    500 // 1s = 1000ms
);

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag(){
    io.sockets.emit("Q_BT1", arr_tag_value[0]);
    io.sockets.emit("Q_BT2", arr_tag_value[1]);
    io.sockets.emit("Q_BT3", arr_tag_value[2]);
    io.sockets.emit("Q_BT4", arr_tag_value[3]);
    io.sockets.emit("Q_Cylinder_HTKT", arr_tag_value[4]);
    io.sockets.emit("Q_BT5", arr_tag_value[5]);
    io.sockets.emit("Q_BT6", arr_tag_value[6]);
    io.sockets.emit("Q_Pump", arr_tag_value[7]);
    io.sockets.emit("Q_MAY_CAP_NAP", arr_tag_value[8]);
    io.sockets.emit("Q_Xylanh_Nang", arr_tag_value[9]);
    io.sockets.emit("Q_Motor_Quay", arr_tag_value[10]);
    io.sockets.emit("Q_BT7", arr_tag_value[11]);
    io.sockets.emit("Q_BT8", arr_tag_value[12]);
    io.sockets.emit("Q_Xylanh_Kep", arr_tag_value[13]);
    io.sockets.emit("Q_MAY_DAN_NHAN", arr_tag_value[14]);
    io.sockets.emit("Q_Cylinder_Push_Lon", arr_tag_value[15]);
    io.sockets.emit("Q_Cylinder_Bar_Lon", arr_tag_value[16]);
    io.sockets.emit("Q_BT9", arr_tag_value[17]);
    io.sockets.emit("Q_THANH_GIU", arr_tag_value[18]);
    io.sockets.emit("Q_THANH_DAY", arr_tag_value[19]);
    io.sockets.emit("Q_4_THANH_MIET", arr_tag_value[20]);
    io.sockets.emit("Q_Mam_Xoay", arr_tag_value[21]);
    io.sockets.emit("Q_CAMERA_HTKTKT", arr_tag_value[22]);
    io.sockets.emit("Q_CAMERA_HTND", arr_tag_value[23]);
    io.sockets.emit("Q_Cylinder_HTKTND", arr_tag_value[24]);
    io.sockets.emit("Q_BT10", arr_tag_value[25]);
    io.sockets.emit("Q_Cylinder_Push_Thung", arr_tag_value[26]);
    io.sockets.emit("M_Mode", arr_tag_value[27]);
    io.sockets.emit("M_Start", arr_tag_value[28]);
    io.sockets.emit("M_BT1", arr_tag_value[29]);
    io.sockets.emit("M_BT2", arr_tag_value[30]);
    io.sockets.emit("M_BT3", arr_tag_value[31]);
    io.sockets.emit("M_BT4", arr_tag_value[32]);
    io.sockets.emit("M_Optical_Sensor_1", arr_tag_value[33]);
    io.sockets.emit("M_Cylinder_HTKT", arr_tag_value[34]);
    io.sockets.emit("M_BT5", arr_tag_value[35]);
    io.sockets.emit("M_BT6", arr_tag_value[36]);
    io.sockets.emit("M_CAMERA_HTKTKT", arr_tag_value[37]);
    io.sockets.emit("M_Position_Sensor_1", arr_tag_value[38]);
    io.sockets.emit("M_Pump", arr_tag_value[39]);
    io.sockets.emit("M_MAY_CAP_NAP", arr_tag_value[40]);
    io.sockets.emit("M_Position_Sensor_2", arr_tag_value[41]);
    io.sockets.emit("M_Position_Sensor_3", arr_tag_value[42]);
    io.sockets.emit("M_Xylanh_Nang", arr_tag_value[43]);
    io.sockets.emit("M_Motor_Quay", arr_tag_value[44]);
    io.sockets.emit("M_BT7", arr_tag_value[45]);
    io.sockets.emit("M_BT8", arr_tag_value[46]);
    io.sockets.emit("M_Position_Sensor_5", arr_tag_value[47]);
    io.sockets.emit("M_MAY_DAN_NHAN", arr_tag_value[48]);
    io.sockets.emit("M_Cylinder_Push_Lon", arr_tag_value[49]);
    io.sockets.emit("M_Cylinder_Bar_Lon", arr_tag_value[50]);
    io.sockets.emit("M_Optical_Sensor_3", arr_tag_value[51]);
    io.sockets.emit("M_Position_Sensor_4", arr_tag_value[52]);
    io.sockets.emit("M_THANH_GIU", arr_tag_value[53]);
    io.sockets.emit("M_THANH_DAY", arr_tag_value[54]);
    io.sockets.emit("M_Pause", arr_tag_value[55]);   
    io.sockets.emit("M_Mam_Xoay", arr_tag_value[56]);  
    io.sockets.emit("M_Xylanh_Kep", arr_tag_value[57]);
    io.sockets.emit("M_BT9", arr_tag_value[58]);
    io.sockets.emit("M_4_THANH_MIET", arr_tag_value[59]);
    io.sockets.emit("M_RESET", arr_tag_value[60]);
    io.sockets.emit("M_Optical_Sensor_2", arr_tag_value[61]);
    io.sockets.emit("M_CAMERA_HTND", arr_tag_value[62]);
    io.sockets.emit("M_Cylinder_HTKTND", arr_tag_value[63]);
    io.sockets.emit("M_BT10", arr_tag_value[64]);
    io.sockets.emit("M_Cylinder_Push_Thung", arr_tag_value[65]);
    io.sockets.emit("M_Position_Sensor_6", arr_tag_value[66]);
    io.sockets.emit("M_Position_Sensor_7", arr_tag_value[67]);
    io.sockets.emit("M_Position_Sensor_8", arr_tag_value[68]);  
    io.sockets.emit("Chai_250ml", arr_tag_value[69]);
    io.sockets.emit("Chai_1lit", arr_tag_value[70]);
    io.sockets.emit("Binh_2lit", arr_tag_value[71]);
    io.sockets.emit("Binh_5lit", arr_tag_value[72]);
    io.sockets.emit("Temp_1", arr_tag_value[73]);
    io.sockets.emit("Temp_2", arr_tag_value[74]);
    io.sockets.emit("Temp_3", arr_tag_value[75]);
    io.sockets.emit("Temp_4", arr_tag_value[76]);
    io.sockets.emit("HIEN_1", arr_tag_value[77]);
    io.sockets.emit("HIEN_3", arr_tag_value[78]);
    io.sockets.emit("Btt_Chai_250ml", arr_tag_value[79]);
    io.sockets.emit("Btt_Chai_1lit", arr_tag_value[80]);
    io.sockets.emit("Btt_Binh_2lit", arr_tag_value[81]);
    io.sockets.emit("Btt_Binh_5lit", arr_tag_value[82]);
    io.sockets.emit("BT", arr_tag_value[83]);
    io.sockets.emit("MNCD", arr_tag_value[84]);
    io.sockets.emit("NDDR", arr_tag_value[85]);
    io.sockets.emit("SMV", arr_tag_value[86]);
    io.sockets.emit("Set_Parameter", arr_tag_value[87]);
    io.sockets.emit("Temp", arr_tag_value[88]);
    io.sockets.emit("Default", arr_tag_value[89]);
    io.sockets.emit("SQL_Trigger", arr_tag_value[90]);
    io.sockets.emit("Count_SPKT", arr_tag_value[91]);
    io.sockets.emit("Count_Lon_HTKTKT", arr_tag_value[92]);
    io.sockets.emit("QR_code", arr_tag_value[93]);
    io.sockets.emit("Level_Production", arr_tag_value[94]);
    io.sockets.emit("Count_Lon_Di_Qua", arr_tag_value[95]);
    io.sockets.emit("Count_Lon_Trong_Thung", arr_tag_value[96]);
    io.sockets.emit("Muc_Bom", arr_tag_value[97]);
    io.sockets.emit("MN_TT", arr_tag_value[98]);
    io.sockets.emit("QR_code_TT", arr_tag_value[99]);
    io.sockets.emit("Lon_loi", arr_tag_value[100]);
    io.sockets.emit("Lon_bth", arr_tag_value[101]);
    io.sockets.emit("So_lon_nhap_vao", arr_tag_value[102]);
    io.sockets.emit("Khoi_luong", arr_tag_value[103]);
    io.sockets.emit("Khoi_luong_TT", arr_tag_value[104]);
}
// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
    fn_tag();
});});
// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}
// Nhận các bức điện được gửi từ trình duyệt
io.on("connection", function(socket){
    // Bật tắt động cơ M1
        socket.on("cmd_Pause", function(data){conn_plc.writeItems('M_Pause', data, valuesWritten);});
        socket.on("cmd_BT6", function(data){conn_plc.writeItems('M_BT6', data, valuesWritten);});
        socket.on("cmd_BT7", function(data){conn_plc.writeItems('M_BT7', data, valuesWritten);});
        socket.on("cmd_Pump", function(data){conn_plc.writeItems('M_Pump', data, valuesWritten);});
        socket.on("cmd_Motorquay", function(data){conn_plc.writeItems('M_Motor_Quay', data, valuesWritten);});
        socket.on("cmd_Xylanhnang", function(data){conn_plc.writeItems('M_Xylanh_Nang', data, valuesWritten);});
        socket.on("cmd_Maycapnap", function(data){conn_plc.writeItems('M_MAY_CAP_NAP', data, valuesWritten);});
        socket.on("cmd_Mamxoay", function(data){conn_plc.writeItems('M_Mam_Xoay', data, valuesWritten);});
        socket.on("cmd_LOICHAI250ML", function(data){conn_plc.writeItems('Chai_250ml', data, valuesWritten);});
        socket.on("cmd_BT5", function(data){conn_plc.writeItems('M_BT5', data, valuesWritten);});
        socket.on("cmd_Camera1", function(data){conn_plc.writeItems('M_CAMERA_HTKTKT', data, valuesWritten);});
        socket.on("cmd_Xylanhday1", function(data){conn_plc.writeItems('M_Cylinder_HTKT', data, valuesWritten);});
        socket.on("cmd_LOICHAI1LIT", function(data){conn_plc.writeItems('Chai_1lit', data, valuesWritten);});
        socket.on("cmd_LOIBINH2LIT", function(data){conn_plc.writeItems('Binh_2lit', data, valuesWritten);});
        socket.on("cmd_LOIBINH5LIT", function(data){conn_plc.writeItems('Binh_5lit', data, valuesWritten);});
        socket.on("cmd_CHAI250ML", function(data){conn_plc.writeItems('Btt_Chai_250ml', data, valuesWritten);});
        socket.on("cmd_CHAI1LIT", function(data){conn_plc.writeItems('Btt_Chai_1lit', data, valuesWritten);});
        socket.on("cmd_BINH2LIT", function(data){conn_plc.writeItems('Btt_Binh_2lit', data, valuesWritten);});
        socket.on("cmd_BINH5LIT", function(data){conn_plc.writeItems('Btt_Binh_5lit', data, valuesWritten);});
        socket.on("cmd_BT8", function(data){conn_plc.writeItems('M_BT8', data, valuesWritten);});
        socket.on("cmd_Xylanhkep", function(data){conn_plc.writeItems('M_Xylanh_Kep', data, valuesWritten);});
        socket.on("cmd_Maydannhan", function(data){conn_plc.writeItems('M_MAY_DAN_NHAN', data, valuesWritten);});
        socket.on("cmd_BT10", function(data){conn_plc.writeItems('M_BT10', data, valuesWritten);});
        socket.on("cmd_Camera2", function(data){conn_plc.writeItems('M_CAMERA_HTND', data, valuesWritten);});
        socket.on("cmd_Xylanhday2", function(data){conn_plc.writeItems('M_Cylinder_HTKTND', data, valuesWritten);});
        socket.on("cmd_MNCD", function(data){conn_plc.writeItems('MNCD', data, valuesWritten);});
        socket.on("cmd_BT", function(data){conn_plc.writeItems('BT', data, valuesWritten);});
        socket.on("cmd_NDDR", function(data){conn_plc.writeItems('NDDR', data, valuesWritten);});
        socket.on("cmd_SMV", function(data){conn_plc.writeItems('SMV', data, valuesWritten);});
        socket.on("cmd_BT9", function(data){conn_plc.writeItems('M_BT9', data, valuesWritten);});
        socket.on("cmd_Thanhday", function(data){conn_plc.writeItems('M_THANH_DAY', data, valuesWritten);});
        socket.on("cmd_4thanhxep", function(data){conn_plc.writeItems('M_4_THANH_MIET', data, valuesWritten);});
        socket.on("cmd_Thanhnang", function(data){conn_plc.writeItems('M_THANH_GIU', data, valuesWritten);});
        socket.on("cmd_Mode", function(data){conn_plc.writeItems('M_Mode', data, valuesWritten);});
        socket.on("cmd_Start", function(data){conn_plc.writeItems('M_Start', data, valuesWritten);});
        socket.on("cmd_Parameter", function(data){conn_plc.writeItems('Set_Parameter', data, valuesWritten);});
        socket.on("cmd_Reset", function(data){conn_plc.writeItems('M_RESET', data, valuesWritten);});
        socket.on("cmd_BT1", function(data){conn_plc.writeItems('M_BT1', data, valuesWritten);});
        socket.on("cmd_BT2", function(data){conn_plc.writeItems('M_BT2', data, valuesWritten);});
        socket.on("cmd_BT3", function(data){conn_plc.writeItems('M_BT3', data, valuesWritten);});
        socket.on("cmd_BT4", function(data){conn_plc.writeItems('M_BT4', data, valuesWritten);});
        socket.on("cmd_PushCylinder", function(data){conn_plc.writeItems('M_Cylinder_Push_Lon', data, valuesWritten);});
        socket.on("cmd_BarCylinder", function(data){conn_plc.writeItems('M_Cylinder_Bar_Lon', data, valuesWritten);});
        socket.on("cmd_ThungCylinder", function(data){conn_plc.writeItems('M_Cylinder_Push_Thung', data, valuesWritten);});
        socket.on("cmd_Default", function(data){conn_plc.writeItems('Default', data, valuesWritten);});
});
// MÀN HÌNH 4
io.on("connection", function(socket)
{
    // Ghi dữ liệu từ IO field
    socket.on("cmd_MNCD_Edit_Data", function(data){
        conn_plc.writeItems([
                            'MN_TT'],
                            [data[0]
                        ], valuesWritten);  
        });
});
io.on("connection", function(socket)
{
    // Ghi dữ liệu từ IO field
    socket.on("cmd_SMV_Edit_Data", function(data){
        conn_plc.writeItems([
                            'QR_code_TT'],
                            [data[0]
                        ], valuesWritten);  
        });
});
// MÀN HÌNH Main Screen
io.on("connection", function(socket)
{
    // Ghi dữ liệu từ IO field
    socket.on("cmd_Setting_Edit_Data", function(data){
        conn_plc.writeItems([
                            'Level_Production', 'So_lon_nhap_vao'],
                            [data[0],data[1]
                        ], valuesWritten);  
        });
});
io.on("connection", function(socket)
{
    // Ghi dữ liệu từ IO field
    socket.on("cmd_Khoiluong_Edit_Data", function(data){
        conn_plc.writeItems([
                            'Khoi_luong_TT'],
                            [data[0]
                        ], valuesWritten);  
        });
});

// Khởi tạo SQL
var mysql = require('mysql');
 
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "SQL_PLC"
});
function fn_sql_insert(){
    insert_trigger = arr_tag_value[90];		// Read trigger from PLC
    var sqltable_Name = "plc_data";
    // Lấy thời gian hiện tại
	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
	var temp_datenow = new Date();
	var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
	var timeNow_toSQL = "'" + timeNow + "',";
 
    // Dữ liệu đọc lên từ các tag
    var data0 = "'" + arr_tag_value[0] + "',";
    var data1 = "'" + arr_tag_value[1] + "',";
    var data2 = "'" + arr_tag_value[2] + "',";
    var data3 = "'" + arr_tag_value[3] + "',";
    var data4 = "'" + arr_tag_value[4] + "',";
    var data5 = "'" + arr_tag_value[5] + "',";
    var data6 = "'" + arr_tag_value[6] + "',";
    var data7 = "'" + arr_tag_value[7] + "',";
    var data8 = "'" + arr_tag_value[8] + "',";
    var data9 = "'" + arr_tag_value[9] + "',";
    var data10 = "'" + arr_tag_value[10] + "',";
    var data11 = "'" + arr_tag_value[11] + "',";
    var data12 = "'" + arr_tag_value[12] + "',";
    var data13 = "'" + arr_tag_value[13] + "',";
    var data14 = "'" + arr_tag_value[14] + "',";
    var data15 = "'" + arr_tag_value[15] + "',";
    var data16 = "'" + arr_tag_value[16] + "',";
    var data17 = "'" + arr_tag_value[17] + "',";
    var data18 = "'" + arr_tag_value[18] + "',";
    var data19 = "'" + arr_tag_value[19] + "',";
    var data20 = "'" + arr_tag_value[20] + "',";
    var data21 = "'" + arr_tag_value[21] + "',";
    var data22 = "'" + arr_tag_value[22] + "',";
    var data23 = "'" + arr_tag_value[23] + "',";
    var data24 = "'" + arr_tag_value[24] + "',";
    var data25 = "'" + arr_tag_value[25] + "',";
    var data26 = "'" + arr_tag_value[26] + "',";
    var data91 = "'" + arr_tag_value[91] + "',";
    var data92 = "'" + arr_tag_value[92] + "',";
    var data93 = "'" + arr_tag_value[93] + "',";
    var data94 = "'" + arr_tag_value[94] + "',";
    var data96 = "'" + arr_tag_value[96] + "',";
    var data97 = "'" + arr_tag_value[97] + "',";
    var data98 = "'" + arr_tag_value[98] + "',";
    var data99 = "'" + arr_tag_value[99] + "',";
    var data100 = "'" + arr_tag_value[100] + "',";
    var data101 = "'" + arr_tag_value[101] + "',";
    var data102 = "'" + arr_tag_value[102] + "',";
    var data103 = "'" + arr_tag_value[103] + "',";
    var data104 = "'" + arr_tag_value[104] + "'";
    // Ghi dữ liệu vào SQL
    if (insert_trigger && !old_insert_trigger)
    {
        var sql_write_str11 = "INSERT INTO " + sqltable_Name + " (Date_time, Motor_BT1, Motor_BT2, Motor_BT3, Motor_BT4, Xylanh_HTPLC, Motor_BT5, Motor_BT6, Bom_Dinh_Luong, May_Cap_Nap, Xylanh_Nang_Chai, Motor_Xoay_Nap, Motor_BT7, Motor_BT8, Xylanh_Kep_HTDN, May_Dan_Nhan, Xylanh_Push_Chai, Xylanh_Bar_Chai, Motor_BT9, Thanh_Nang_HTDT, Thanh_Gat_HTDT, 4_Thanh_Xep_HTDT, Mam_Xoay_HTCR, Camera_HTPLC, Camera_HTKTND, Xylanh_HTKTND, Motor_BT10, Xylanh_Push_Thung, Count_Chai_Sai_HTPLC, Count_Chai_Dung_HTPLC, Bar_Code_He_Thong, Dung_Tich_Chai_Se_Chiet_Rot, So_Chai_Hien_Tai_Trong_Thung, The_Tich_Dang_Bom, Luong_Nuoc_Trong_Chai_Khi_KT, Bar_Code_Chai_Khi_KT, Count_Chai_Sai_HTKTND, Count_Chai_Dung_HTKTND, So_Chai_Quy_Dinh_Trong_1_Thung, Khoi_Luong_Thung_Quy_Dinh, Khoi_Luong_Thung_Thuc_Te) VALUES (";
        var sql_write_str12 = timeNow_toSQL 
                            + data0
                            + data1
                            + data2
                            + data3
                            + data4
                            + data5
                            + data6
                            + data7
                            + data8
                            + data9
                            + data10
                            + data11
                            + data12
                            + data13
                            + data14
                            + data15
                            + data16
                            + data17
                            + data18
                            + data19
                            + data20
                            + data21
                            + data22
                            + data23
                            + data24
                            + data25
                            + data26
                            + data91
                            + data92
                            + data93
                            + data94
                            + data96
                            + data97
                            + data98
                            + data99
                            + data100
                            + data101
                            + data102
                            + data103
                            + data104
                            ;
        var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
        // Thực hiện ghi dữ liệu vào SQL
		sqlcon.query(sql_write_str1, function (err, result) {
            if (err) {
                console.log(err);
             } else {
                console.log("SQL - Ghi dữ liệu thành công");
              } 
			});
    }
    old_insert_trigger = insert_trigger;
}