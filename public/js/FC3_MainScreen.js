var tag_bool_status = false;
function fn_Buttonx(Tagweb,btt_id){
    tag_bool_status = !tag_bool_status;
    socket.emit('cmd_Pause', tag_bool_status);
    socket.on(Tagweb,function(data){
        if(data == false){
            document.getElementById(btt_id).style.backgroundColor = 'rgb(204, 204, 204)';
        } else{
            document.getElementById(btt_id).style.backgroundColor = 'rgb(0, 255, 0)'; 
        }
     });
}

///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var S3_data_edditting = false;
function fn_Setting_ChangeBtt(){
    socket.emit('cmd_Parameter', true);
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_Setting_Confirm','btt_Setting_Change');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    S3_data_edditting = true; 
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("Nhaploaichai").disabled = false; // Tag Integer
    document.getElementById("Sochai").disabled = false; // Tag Real
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_Setting_ConfirmBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_Setting_Change','btt_Setting_Confirm');
    // Cho tag đang sửa dữ liệu về 0
    S3_data_edditting = false; 
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('Nhaploaichai').value,
                            document.getElementById('Sochai').value
                          ];
    socket.emit('cmd_Setting_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("Nhaploaichai").disabled = true; // Tag Integer
    document.getElementById("Sochai").disabled = true;    // Tag Real
}
 
// Chương trình con đọc dữ liệu lên IO Field
function fn_Setting_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & S3_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(S3_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}


///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var S4_data_edditting = false;
function fn_Khoiluong_ChangeBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_Khoiluong_Confirm','btt_Khoiluong_Change');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    S4_data_edditting = true; 
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("Nhapkhoiluong").disabled = false; // Tag Real
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_Khoiluong_ConfirmBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_Khoiluong_Change','btt_Khoiluong_Confirm');
    // Cho tag đang sửa dữ liệu về 0
    S4_data_edditting = false; 
                        // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('Nhapkhoiluong').value
                          ];
    socket.emit('cmd_Khoiluong_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("Nhapkhoiluong").disabled = true;    // Tag Real
}
 
// Chương trình con đọc dữ liệu lên IO Field
function fn_Khoiluong_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & S4_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(S4_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}