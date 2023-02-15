////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer()
{
    socket.emit("Client-send-data", "Request data client");
}
////////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0)
        {
            document.getElementById(IOField).value = data;
        }
        else
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}
// Chương trình con đổi màu Symbol
function fn_SymbolStatus(ObjectID, SymName, Tag)
{
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    var imglink_2 = "images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
    socket.on(Tag, function(data){
        if (data == 0)
        {
            document.getElementById(ObjectID).src = imglink_0;
        }
        else if (data == 1)
        {
            document.getElementById(ObjectID).src = imglink_1;
        }
        else
        {
            document.getElementById(ObjectID).src = imglink_2;
        }
    });
}
// Chương trình con chuyển trang
function fn_ScreenChange(scr_1, scr_2, scr_3, scr_4, scr_5, scr_6)
{
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 1
    document.getElementById(scr_3).style.visibility = 'hidden';    // Ẩn trang 2
    document.getElementById(scr_4).style.visibility = 'hidden';     // Ẩn trang 3
    document.getElementById(scr_5).style.visibility = 'hidden';
    document.getElementById(scr_6).style.visibility = 'hidden';
}
// Chương trình con nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2)
{
    document.getElementById(button1).style.zIndex='1';  // Hiển nút 1
    document.getElementById(button2).style.zIndex='0';  // Ẩn nút 2
}

// Chương trình con đổi màu nút nhấn
function fn_ChangeColor(TagLoi,bucdien,btt_id){
     socket.emit(bucdien, true);
// Hiển thị trạng thái nút nhấn (ON = đỏ, Off = Nâu)
     socket.on(TagLoi,function(data){
        if(data == false){
            document.getElementById(btt_id).style.backgroundColor = 'rgb(204, 204, 204)';
        } else{
            document.getElementById(btt_id).style.backgroundColor = 'rgb(0, 255, 0)'; 
        }
     });
}   
// Chương trình con đổi màu nút nhấn Manual
function fn_ChangeColorManual(TagLoi,bucdien,btt_id){
    socket.emit(bucdien, false);
// Hiển thị trạng thái nút nhấn (ON = đỏ, Off = Nâu)
    socket.on(TagLoi,function(data){
       if(data == false){
           document.getElementById(btt_id).style.backgroundColor = 'rgb(0, 255, 0)';
       } else{
           document.getElementById(btt_id).style.backgroundColor = 'rgb(204, 204, 204)'; 
       }
    });
}
// Chương trình con đổi màu nút nhấn off
function fn_ChangeColoroff(TagLoi,bucdien,btt_id){
    socket.emit(bucdien, false);
// Hiển thị trạng thái nút nhấn (ON = đỏ, Off = Nâu)
    socket.on(TagLoi,function(data){
       if(data == false){
           document.getElementById(btt_id).style.backgroundColor = 'rgb(255, 0, 0)';
       } else{
           document.getElementById(btt_id).style.backgroundColor = 'rgb(204, 204, 204)'; 
       }
    });
}
// Chương trình con đổi màu nút nhấn off
function fn_ChangeColoroff1(TagLoi,bucdien,btt_id){
    socket.emit(bucdien, true);
// Hiển thị trạng thái nút nhấn (ON = đỏ, Off = Nâu)
    socket.on(TagLoi,function(data){
       if(data == false){
           document.getElementById(btt_id).style.backgroundColor = 'rgb(204, 204, 204)';
       } else{
           document.getElementById(btt_id).style.backgroundColor = 'rgb(255, 0, 0)'; 
       }
    });
}
// Chương trình con ẩn hiện 2 nút
function fn_Change1and2(Tag1,btt_id1,btt_id2){
// Hiển thị trạng thái nút nhấn (ON = đỏ, Off = Nâu)
    socket.on(Tag1,function(data){
       if(data == false){
        document.getElementById(btt_id2).style.visibility = 'visible';   // Hiển thị trang được chọn
        document.getElementById(btt_id1).style.visibility = 'hidden'; 
       } else{
        document.getElementById(btt_id1).style.visibility = 'visible';   // Hiển thị trang được chọn
        document.getElementById(btt_id2).style.visibility = 'hidden'; 
       }
    });

}
// Chương trình con đổi màu Symbol
function fn_SymbolStatusnew(ObjectID, SymName, Tag, btt_id1, btt_id2)
{
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    socket.on(Tag, function(data){
        if (data == 0)
        {
            document.getElementById(ObjectID).src = imglink_0;
            //document.getElementById(btt_id1).style.visibility = 'hidden';
            //document.getElementById(btt_id2).style.visibility = 'visible';
            document.getElementById(btt_id1).style.display = 'none';
            document.getElementById(btt_id2).style.display = 'block';   
        }
        else
        {
            document.getElementById(ObjectID).src = imglink_1;
            //document.getElementById(btt_id2).style.visibility = 'hidden';
            //document.getElementById(btt_id1).style.visibility = 'visible';
            document.getElementById(btt_id2).style.display = 'none';
            document.getElementById(btt_id1).style.display = 'block';   
        }
    });
}
// Chương trình con đổi màu Symbol
function fn_SymbolStatusMNCD(ObjectID, SymName, Tag, btt_id1, btt_id2, btt_id3)
{
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    socket.on(Tag, function(data){
        if (data == 0)
        {
            document.getElementById(ObjectID).src = imglink_0;
            //document.getElementById(btt_id1).style.visibility = 'hidden';
            //document.getElementById(btt_id2).style.visibility = 'visible';
            document.getElementById(btt_id1).style.display = 'none';
            document.getElementById(btt_id2).style.display = 'none';
            document.getElementById(btt_id3).style.display = 'none';
        }
        else
        {
            document.getElementById(ObjectID).src = imglink_1;
            //document.getElementById(btt_id2).style.visibility = 'hidden';
            //document.getElementById(btt_id1).style.visibility = 'visible';
            document.getElementById(btt_id1).style.display = 'block';
            document.getElementById(btt_id2).style.display = 'block';
            document.getElementById(btt_id3).style.display = 'block';
        }
    });
}
