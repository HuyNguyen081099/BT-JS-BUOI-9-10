function getElement(selector) {
    return document.querySelector(selector)
}

var dsnv = new DSNV()


function getThongTinNV(isEdit) {
    // Lấy thông tin từ user
    var taiKhoan = getElement('#tknv').value
    var hoTen = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = getElement('#gioLam').value

    // tạo đối tượng sinh viên từ thông tin lấy từ user
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

    // console.log('nhanVien: ', nhanVien)
    // // console.log(sinhVien.maSV.trim();
    // if (nhanVien.taiKhoan.trim().length < 1) {
    //     // alert('Mã sinh viên không được bỏ trống')
    //     getElement('#spanMaSV').innerHTML = 'Mã sinh viên không được bỏ trống'
    // }

    var isValid = true

    // Kiểm tra TKNV
    isValid &=
        kiemTraChuoi(
            nhanVien.taiKhoan,
            1,
            undefined,
            '#spantknv',
            'Tài khoản không được bỏ trống'
        ) &&
        kiemTraChuoi(nhanVien.taiKhoan, 6, 10, '#spantknv', 'Tài khoản từ 6 đến 10 ký tự') &&
        kiemTraMaNV(nhanVien.taiKhoan, dsnv.arrNV, isEdit, '#spantknv', 'Tài khoản đã tồn tại')



    // isValid &=
    //     kiemTraChuoi(
    //         nhanVien.matKhau,
    //         1,
    //         undefined,
    //         '#spanMk',
    //         'Mật khẩu không được bỏ trống'
    //     )

    // Kiểm tra tên nhân viên
    isValid &= kiemTraChuoi(
        nhanVien.hoTen,
        1,
        undefined,
        '#spanname',
        'Tên nhân viên không được bỏ trống'
    )

    isValid &= kiemTraPattern(
        nhanVien.email,
        '#spanemail',
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không đúng định dạng'
    )


    return isValid ? nhanVien : undefined
}


// cập nhật thồn tin nhân viên
function getThongTinNVUpdate(isEdit) {
    // Lấy thông tin từ user
    var taiKhoan = getElement('#tknv').value
    var hoTen = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCoBan = getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = getElement('#gioLam').value

    // tạo đối tượng sinh viên từ thông tin lấy từ user
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


    var isValid = true
    // Kiểm tra tên nhân viên
    isValid &= kiemTraChuoi(
        nhanVien.hoTen,
        1,
        undefined,
        '#spanname',
        'Tên nhân viên không được bỏ trống'
    )

    isValid &= kiemTraPattern(
        nhanVien.email,
        '#spanemail',
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không đúng định dạng'
    )

    //toán tử 3 ngôi (? tương tự if nếu đúng trả về nhân viên, : tương tự else sai sẽ là underfine)
    return isValid ? nhanVien : undefined

}


//xóa thông tin nhaVien nhập từ user
function xoaThongtinNV() {
    getElement('#tknv').value = ""
    getElement('#name').value = ""
    getElement('#email').value = ""
    getElement('#password').value = ""
    getElement('#datepicker').value = ""
    getElement('#luongCB').value = ""
    getElement('#chucvu').value = ""
    getElement('#gioLam').value = ""
}


// Thêm nhân viên
getElement('#btnThemNV').onclick = function () {
    // // lấy thông tin từ người dùng
    // var taiKhoan = getElement('#tknv').value
    // var hoTen = getElement('#name').value
    // var email = getElement('#email').value
    // var matKhau = getElement('#password').value
    // var ngayLam = getElement('#datepicker').value
    // var luongCoBan = getElement('#luongCB').value
    // var chucVu = getElement('#chucvu').value
    // var gioLam = getElement('#gioLam').value

    // // tạo đối tượng sinh viên từ thông tin lấy từ user
    // var nhanVien = new NhanVien(
    //     taiKhoan,
    //     hoTen,
    //     email,
    //     matKhau,
    //     ngayLam,
    //     luongCoBan,
    //     chucVu,
    //     gioLam,
    // )
    var nhanVien = getThongTinNV()
    dsnv.themNV(nhanVien)
    xoaThongtinNV(nhanVien)
    // console.log(dsnv.arrNV)
    //gọi lại hàm rendẻ để cập nhập thành công
    renderdsnv()
    // console.log(nhanVien.xepLoai())
    setLocalStorage()
}





// hiện trên UI
function renderdsnv(arrNV = dsnv.arrNV) {
    var content = ''
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `
               <tr>
               <td>${nv.taiKhoan}</td>
               <td>${nv.hoTen}</td>
               <td>${nv.email}</td>
               <td>${nv.ngayLam}</td>
               <td>${nv.chucVu}</td>
               <td>${nv.luongCoBan}</td>
               <td>${nv.xepLoai()}</td>
               <td>
               <button class='btn btn-success mr-3' onclick="updateNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Edit</button>
               <button class='btn btn-danger' onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
               </td>
               </tr>
               `
    }
    getElement('#tableDanhSach').innerHTML = content
}

// renderdssv()

// Lưu danh sách nhân viên vào localStorage
function setLocalStorage() {
    // B1: chuyển data về dạng string
    var data = JSON.stringify(dsnv.arrNV);
    //B2: Lưu vào local
    localStorage.setItem('DSNV', data)
    // setLocalStorage()

    // localStorage.setItem('DSSV',JSON.stringify(dsnv.arrNV))
}
// get danh sách sinh viên từ localStorage
function getLocalStorage() {
    //B1: lấy data từ local
    var data = localStorage.getItem('DSNV') // null

    //B2: parse data về kiểu dữ liệu ban đầu
    if (data) {
        var parseData = JSON.parse(data)
        // console.log('parseData: ', parseData)

        // Tạo lại đối tượng sinhVien từ lớp đối nhanVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rỗng để lưu dsnv
        var arr = []

        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            console.log('nv: ', nv)
            // tạo lại đối tượng sv từ lớp đối tượng SV

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

            // thêm nhanVien vào mảng arr
            arr.push(nhanVien)
        }

        // gán giá trị cho mảng arrNV từ data lấy từ localStorage
        dsnv.arrNV = arr
        console.log('arr: ', arr)
        renderdsnv()
    }
}
// tìm nhân viên
getElement('#searchName').addEventListener('keyup', function() {
   
    var valueSearch =  getElement('#searchName').value.toLowerCase();
    // console.log('valueSerch: ', valueSearch);
    var arrNVSearch = []
    for(var i = 0; i < dsnv.arrNV.length; i++){
        var xepLoai = dsnv.arrNV[i].xepLoai().toLowerCase();
        if(xepLoai.indexOf(valueSearch) !== -1){
            arrNVSearch.push(dsnv.arrNV[i])
        }
    }
    // console.log('arrNVSearch: ', arrNVSearch);
    renderdsnv(arrNVSearch)
})


// xóa nhân viên
function deleteNV(taiKhoan) {


    // console.log(taiKhoan)
    dsnv.xoaNV(taiKhoan)
    // console.log(dsnv.arrNV)
    renderdsnv()

    // cập nhật lại data lưu dưới local storage
    //  setLocalStorage()
}
function updateNV(taiKhoan) {
    var index = dsnv.timNV(taiKhoan)
    var nv = dsnv.arrNV[index]
    console.log('nv: ', nv)


    getElement('#tknv').value = nv.taiKhoan
    // getElement('#tknv').disabled  = true
    getElement('#name').value = nv.hoTen
    getElement('#email').value = nv.email
    getElement('#password').value = nv.matKhau
    getElement('#datepicker').value = nv.ngayLam
    getElement('#luongCB').value = nv.luongCoBan
    getElement('#chucvu').value = nv.chucVu
    getElement('#gioLam').value = nv.gioLam


    //lấy lại thông tin NV sau khi chỉnh sửa xong

    getElement('#btnCapNhat').onclick = function () {
        var nhanVien = getThongTinNVUpdate()
        //cập nhập lại NV
        dsnv.capNhatNV(nhanVien);


        renderdsnv()
        xoaThongtinNV(nhanVien)

        setLocalStorage()
    }

}






