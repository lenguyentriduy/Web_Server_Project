///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var S2_data_edditting = false;
function fn_MNCD_ChangeBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_MNCD_Confirm','btt_MNCD_Change');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    S2_data_edditting = true; 
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("MN_CHUADAT").disabled = false; // Tag Real
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_MNCD_ConfirmBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_MNCD_Change','btt_MNCD_Confirm');
    // Cho tag đang sửa dữ liệu về 0
    S2_data_edditting = false; 
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('MN_CHUADAT').value
                          ];
    socket.emit('cmd_MNCD_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("MN_CHUADAT").disabled = true;    // Tag Real
}
 
// Chương trình con đọc dữ liệu lên IO Field
function fn_MNCD_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & S2_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(S2_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}

///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var S1_data_edditting = false;
function fn_SMV_ChangeBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_SMV_Confirm','btt_SMV_Change');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    S1_data_edditting = true; 
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("QR_code_sai").disabled = false; // Tag Real
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_SMV_ConfirmBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_SMV_Change','btt_SMV_Confirm');
    // Cho tag đang sửa dữ liệu về 0
    S1_data_edditting = false; 
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('QR_code_sai').value
                          ];
    socket.emit('cmd_SMV_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("QR_code_TT").disabled = true;    // Tag Real
}
 
// Chương trình con đọc dữ liệu lên IO Field
function fn_MNCD_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & S1_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(S1_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}