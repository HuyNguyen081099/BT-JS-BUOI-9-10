// lấy đối từ từ form login
function NhanVien (
    _taiKhoan,
    _hoTen,
    _email,
    _matKhau,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _gioLam
) {
    ;(this.taiKhoan = _taiKhoan),
        (this.hoTen =  _hoTen),
        (this.email = _email),
        (this.matKhau = _matKhau),
        (this.ngayLam = _ngayLam),
        (this.luongCoBan = _luongCoBan),
        (this.chucVu = _chucVu),
        (this.gioLam = _gioLam),
        (this.xepLoai = function () {
            if (this.gioLam <= 120) {
                return 'khá'
            }else if (this.gioLam <= 200) {
                return'giỏi'
            }
            return 'xuất sắc'
        })
    
}


// var luongNV = this.luongCoBan
// var luongGD = this.luongCoBan * 3
// var luongTruongPhong = this.luongCoBan * 2