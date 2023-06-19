
// hiện thông tin từ modal login
function DSNV () {
    this.arrNV = []

    // Thêm nhân viên
    this.themNV = function(nhanVien) {

        // Tính lương theo chức vụ
        let loaiNv = nhanVien.chucVu;
        switch(loaiNv) {
            case 'Sếp':
                nhanVien.luongCoBan = nhanVien.luongCoBan * 3;
                break;
            case 'Trưởng phòng':
                nhanVien.luongCoBan = nhanVien.luongCoBan * 2;
                break;
            default:
                break;
        }
        this.arrNV.push(nhanVien);

        //khi nhấn thêm người dùng modal login sẽ tự đóng
        // close modal
        $('#myModal').modal('toggle');
        // getElement('#btnDong').onclick();

    }
   
// tìm nhân viên
    this.timNV = function (maNhanVien) {
        var index = -1
        // B1: tìm index của phần tử cần xóa dựa vào thuộc tính tài khoản nhân viên
        for (var i = 0; i < this.arrNV.length; i++) {
            var taiKhoan = this.arrNV[i].taiKhoan
            if (taiKhoan === maNhanVien) {
                return i
            }
        }

        return -1
    }



    // xóa nhân viên
    this.xoaNV = function (maNhanVien) {
        // var index = -1
        // // B1: tìm index của phần tử cần xóa dựa vào thuộc tính mã sinh viên
        // for (var i = 0; i < this.arrNV.length; i++) {
        //     var taiKhoan = this.arrNV[i].taiKhoan
        //     if (taiKhoan === maNhanVien) {
        //         index = i
        //     }
        // }
        var index = this.timNV(maNhanVien)
        // console.log(index)
        //B2: xóa phần tử có index tìm đc
        if (index !== -1){
            this.arrNV.splice(index, 1)
        }

        // return -1
    }



// Cập nhật nhân viên
    this.capNhatNV = function (nhanVien) {
        var index = this.timNV(nhanVien.taiKhoan)
        if (index !== -1){
            this.arrNV[index] = nhanVien
            $('#myModal').modal('toggle');
        }
    }
}