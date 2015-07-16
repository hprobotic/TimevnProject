<?php include 'header.php'; ?>

<div class="main-page" id="lienhe">
    <div class="page-cover">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="cover-info">
                        <h1>hưu trí bảo việt</h1>
                        <p>
                          Phúc lợi tốt, gắn kết bền
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="page-content">
    <div class="container">
        <div class="col-md-7">
            <div class="block-content">
                <div class="title">
                    Bảo Việt Nhân Thọ
                </div>
                <div class="content">
                   <h4> Tổng Công ty Bảo Việt Nhân thọ </h4>
<p>Trụ sở chính: Tầng 37, Keangnam V, Đường Phạm Hùng, Quận Nam Từ Liêm, Hà Nội <br>
Điện thoại: (+84 4) 6251 7777 <br>
Fax: (+84 4) 3577 0958 <br>
Tổng đài chăm sóc khách hàng: 1900 558899 nhánh số 4 <br>
Trang Facebook Bảo Việt Nhân thọ: <a href="http://facebook.com/www.baovietnhantho.com.vn">http://facebook.com/www.baovietnhantho.com.vn</a></p>
<p>&nbsp;</p>
<p><img src="images/map.jpg" alt=""></p>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="block-content">
                <div class="title">
                    Liên hệ
                </div>
                <div class="content">
                    <form action="/">
                        <div class="form-group">
                            <p>Họ và tên(*)</p>
                            <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                            <p>Số điện thoại(*)</p>
                            <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                            <p>Email(*)</p>
                            <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                            <p>Chủ đề</p>
                            <input type="text" class="form-control">
                            </div>
                            <div class="form-group">
                            <p>Nội dung</p>
                            <textarea name="" id="" cols="30" rows="10" class="form-control"></textarea>
                            </div>
                            <p>(*) Thông tin bắt buộc</p>
                            <div class="form-group">
                            <p class="fr">
                                <button type="submit" class="btn btn-blue">Gửi</button>
                            </p>
</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>


<?php include 'footer.php'; ?>
<script>
    $('select').selectmenu();

    $("#slider-range1").slider({
        min: 15,
        max: 70
    }).slider("pips").slider("float");
    $("#slider-range2").slider({
        min: 60,
        max: 70
    }).slider("pips").slider("float");
    $("#slider-range3").slider({
        min: 0,
        max: 10
    }).slider("pips",{
        rest: "label",
        suffix: " %"
    }).slider("float",{
        rest: "label",
        suffix: " %"
    });
    $("#slider-range4").slider({
        min: 5,
        max: 30
    }).slider("pips").slider("float");
    $("#slider-range5").slider({
        min: 5,
        max: 30
    }).slider("pips",{
        rest: "label",
        suffix: " %"
    }).slider("float",{
        rest: "label",
        suffix: " %"
    });
    jQuery(document).ready(function($) {
        var lvh = $('.list-var').outerHeight();
        $('.fake-wrap').height(lvh);
        $('.target-sex').css('padding-top', lvh/2 - 50);
        $('.target-sex ul li').click(function() {
            $('.target-sex ul li').removeClass('clicked');
            $(this).addClass('clicked');
        });
    });


</script>