function getElement(selector) {
    return document.querySelector(selector)
}

var dsnv = new DSNV()



getElement('#btnThemNV').onclick = function () {
    var taiKhoan = getElement('#tknv').value
    var hoTen = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = getElement('#gioLam').value

    var nhanVien = new NhanVien(
        taiKhoan,
        hoTen,
        email,
        matKhau,
        ngayLam,
        luongCoBan,
        chucVu,
        gioLam,
    )
    
    dsnv.themNV(nhanVien)
    // console.log(dsnv.arrNV)
    renderdsnv()
    // console.log(nhanVien.xepLoai())
}

function renderdsnv() {
    var content = ''
    for (var i = 0; i < dsnv.arrNV.length; i++) {
        var nv = dsnv.arrNV[i]
        content += `
               <tr>
               <td>${nv.taiKhoan}</td>
               <td>${nv.hoTen}</td>
               <td>${nv.email}</td>
               <td>${nv.ngayLam}</td>
               <td>${nv.chucVu}</td>
               <td>${nv.luongCoBan}</td>
               <td>${nv.xepLoai()}</td>
               </tr>
               `
    }
    getElement('#tableDanhSach').innerHTML = content
}