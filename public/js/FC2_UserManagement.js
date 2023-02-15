// Danh sách người dùng
var admin = ["Admin","123456"]
var user1 = ["User","123456"]
var user2 = ["user2","2"]
    
// Chương trình con
function login()
{
    var a = document.getElementById("inputuser").value;
    var b = document.getElementById("inputpass").value;
    // Admin
    if (a == admin[0] && b == admin[1])
    {
        fn_ScreenChange('Screen_Main','Screen_1','Screen_2','Screen_3','Screen_4','Screen_5');
        document.getElementById('id01').style.display='none';
    }
    // User 1
    else if (a == user1[0] && b == user1[1])
    {
        fn_ScreenChange('Screen_Main','Screen_1','Screen_2','Screen_3','Screen_4','Screen_5');
        document.getElementById('id01').style.display='none';
        document.getElementById("btt_Setting_Confirm").disabled = true;
        document.getElementById("btt_Setting_Change").disabled = true;
    }
    // User 2
    else if (a == user2[0] && b == user2[1])
    {
        fn_ScreenChange('Screen_2','Screen_Main','Screen_1','Screen_3','Screen_4','Screen_5');
        document.getElementById('id01').style.display='none';
        document.getElementById("btt_Setting_Confirm").disabled = true;
        document.getElementById("btt_Setting_Change").disabled = true;
    } 
    else
    {
        window.location.href = '';
    }
}
function logout() // Ctrinh login
{
    alert("Đăng xuất thành công");
    window.location.href = 'LOGIN_to_the_above_SCADA_system';
}