
jQuery(document).ready(function($) {

    // Create transition durations
    $('.home').find('[data-wow-delay]').each(function(index, el) {
        var delay = parseInt($(this).data('wowDelay'));
        $(this).css('animationDuration', delay);
    });
    $('.home').find('[data-wow-duration]').each(function(index, el) {
        var duration = parseInt($(this).data('wowDuration'));
        $(this).css('animationDuration', duration);
    });

    // Fullpage
    function home_fullpage_init(){
        $('#main').fullpage({
            paddingBottom: 40,
            fitToSection: true,
            easingcss3: 'ease-in-out',
            responsive: 960,
            afterLoad: function(anchorLink, index){
                $('#section_1').find('.wow').each(function(index, el) {
                    var effect = $(this).data('wowType');
                    $(this).addClass(effect + ' animated');
                });
            },
            onLeave: function(index, nextIndex, direction){
                // and disable follow nextIndex
                $('#section_' + index).find('.wow').each(function(index, el) {
                    var effect = $(this).data('wowType');
                    $(this).removeClass(effect + ' animated');
                });
                // and enable others
                $('#section_' + nextIndex).find('.wow').each(function(index, el) {
                    var effect = $(this).data('wowType');
                    $(this).addClass(effect + ' animated');
                });

                // Show/hide #footer
                if(nextIndex == 5){
                    $('#footer').addClass('fix');
                }
                else if(nextIndex != 5 && index == 5){
                    $('#footer').removeClass('fix');
                }
            }
        });
    }
    if($('body').hasClass('home')){
        home_fullpage_init();
    }
    // Datepicker
    $.datepicker.regional['vi'] = {
        closeText: 'Đóng',
        prevText: '&#x3c;Trước',
        nextText: 'Tiếp&#x3e;',
        currentText: 'Hôm nay',
        monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu',
            'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Th.Mười Một', 'Th.Mười Hai'],
        monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
        dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        weekHeader: 'Tu',
        dateFormat: 'dd-mm-yy',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['vi']);
    $('.datepicker-tg').datepicker();

    // Menu mobile
    $('.nav .nav-close').click(function(event) {
        if( $('.nav').hasClass('show') ){
            $('.nav').fadeOut().removeClass('show');
            $('body').css('overflow', 'auto');
            return false;
        }
    });
    $('#hamburger').click(function(event) {
        if( ! $('.nav').hasClass('show') ){
            $('.nav').fadeIn().addClass('show');
            $('body').css('overflow', 'hidden');
            return false;
        }
    });

    // Home subscribe form
    $('.close-bg').click(function(event){
        event.preventDefault();
        $(this).parents('.close-wrap').fadeOut();
        return false;
    });
    if( $('body').hasClass('home') ){
        $('a#join').click(function(event) {
            event.preventDefault();
            $('#subscribe-popup').fadeIn();
            return false;
        });
    }

    // Tabbed
    if($('body').find('.tabbed').length > 0) {
        var tabbed = $('.tabbed');

        var href = $(location).attr('href');
        ahref = href.substring(href.indexOf('#'));

        if(ahref == href || tabbed.find('a[href="'+ ahref +'"]').length <= 0 || tabbed.find('option[value="'+ ahref +'"]').length <= 0) {
            tabbed.find('.tab-title > li:first').addClass('active');
            tabbed.find('.tab-content > li:first').show();
        }
        else {
            var target = tabbed.find('a[href="'+ ahref +'"]').parents('li').addClass('active');
            var mtarget = tabbed.find('option[value="'+ ahref +'"]').prop('selected', true);
            $(ahref).show();
        }

        $('.tab-title a').click(function(event) {
            event.preventDefault();
            var tab = $(this).attr('href');
            tabbed.find('.tab-title > li.active').removeClass('active');
            $(this).parents('li').addClass('active');
            tabbed.find('.tab-content > li').hide();
            $(tab).fadeIn();
        });

        $('.tab-title-mobile').change(function(event) {
            if($(window).width() > 770) return false;

            var tab = $(this).val();
            tabbed.find('.tab-content > li').hide();
            $(tab).fadeIn();
        });
    }

    /* Tablist with href location */
    if(jQuery('body').find('.tab-list').length > 0){
        var href = jQuery(location).attr('href');
        ahref = href.substring(href.indexOf('#'));

        if(ahref == href) {
            jQuery('.tab-list').find('.tab-title:first').addClass('current');
            jQuery('.tab-list').find('.tab-content').not(':first').hide();
        }
        else {
            jQuery('.tab-list').find('.tab-content').hide();
            var target = jQuery('.tab-list').find('a[href="'+ ahref +'"]').parents('.tab-title');
            target.addClass('current').next('.tab-content').show();
            jQuery('html, body').animate({'scrollTop': target.offset().top-40}, 500);
        }

        jQuery('.tab-title a').click(function(event) {
            jQuery('.tab-title.current').next('.tab-content').hide();
            jQuery('.tab-title.current').removeClass('current');

            jQuery(this).parents('.tab-title').addClass('current').next('.tab-content').show();
            jQuery('html, body').animate({'scrollTop': jQuery('.tab-title.current').offset().top-40}, 500);
        });
    }

    // Subscriber
    function check_email_input(t){
        if(t.attr('type') == 'email'){
            var val = t.val();
            var re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}/igm;
            return re.test(val);
        }
        else
            return true;
    }
    function live_search(t){
        var key = t.attr('name');
        var val = t.val();

        if(val != ''){
            $.ajax({
                url: wp_vars.ajaxurl,
                type: 'POST',
                dataType: 'json',
                cache: false,
                data: {
                    action: 'check_subscriber_info_available',
                    key: key,
                    val: val
                }
            })
            .done(function(response) {
                t.parents('p').find('span').fadeOut();
                var check_1 = false;
                var check_2 = check_email_input(t);
                if(response.result == 'true')
                    check_1 = false;
                else if(response.result == 'false')
                    check_1 = true;

                if(check_1 && check_2)
                    t.parents('p').find('span.success').fadeIn();
                else
                    t.parents('p').find('span.error').fadeIn();
            });
        }
        else
            return false;
    }

    $('.check_subscriber_info').keyup(function(){
        clearTimeout( $.data(this, 'timer') );

        var t = $(this);
        var val = t.val();

        if(val != ''){
            t.data( 'timer', setTimeout( function() { live_search(t) }, 300 ) );
        }
        else{
            t.parents('p').find('span').fadeOut();
        }
    });

    function display_shop(res){
        var html = '';

        for(var index in res) {
            html += '<li class="row">';
            html += '   <h4><a href="javascript:;" data-latlng="'+ res[index]['shop_latlng'] +'">'+ res[index]['shop_title'] +'</a></h4>';
            html += '   <p><strong>Địa chỉ: </strong>'+ res[index]['shop_addr'] +'</p>';
            html += '   <p><strong>Điện thoại: </strong>'+ res[index]['shop_phone'] +'</p>';
            html += '</li>';
        }

        if(html == '') {
            html = '<li class="row clearfix"><p class="tac"><strong>Không tìm thấy<br>Cửa hàng/Nhà phân phối</strong></p></li>';
        }

        $('.shop-list p.loading').hide();
        $('.shop-list ul').html(html);
        if($(window).width() <= 770){
            $('.shop-list ul').css('width', res.length*250);
        }
        return false;
    }

    function get_shops(){
        var request = {};
        var province = $('#shop_province').val();
        var district = $('#shop_district').val();

        if(province != '-1') request.shop_province = province;
        if(district != '-1') request.shop_district = district;

        $('.shop-list ul').html('');
        $('.shop-list p.loading').show();

        $.ajax({
            url: wp_vars.ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'frontend__get_shops',
                req: request
            }
        })
        .done(function(res) {
            if(res.results) {
                display_shop(res.results);
            }
        });
    }

    /* Custom selectbox */
    $('.selectbox').selectbox({
        onOpen: function (inst) {
            var w = $('.sbSelector').outerWidth(true) - 1;
            $('.sbOptions').width(w);
        },
        onChange: function (val, inst) {
            var id = $(this).attr('id');
            if(id.indexOf('province') != -1) {
                if(val != '-1') {
                    $.ajax({
                        url: wp_vars.ajaxurl,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            action: 'frontend__get_districts',
                            req: val
                        }
                    })
                    .done(function(res) {
                        if(res.results) {
                            var html = '<option value="-1">Quận/Huyện</option>';

                            for(var index in res.results) {
                                html += '<option value="'+ res.results[index]['id'] +'">'+ res.results[index]['title'] +'</option>';
                            }

                            $('#shop_district').html(html).selectbox('detach').selectbox(
                                'attach', {
                                onOpen: function (inst) {
                                    var w = $('.sbSelector').outerWidth(true) - 1;
                                    $('.sbOptions').width(w);
                                },
                                onChange: function(val, inst) {
                                    get_shops();
                                }
                            });
                        }
                    });
                }
                else {
                    $('#shop_district').html('<option value="-1">Quận/Huyện</option>').selectbox('detach').selectbox(
                        'attach', {
                        onOpen: function (inst) {
                            var w = $('.sbSelector').outerWidth(true) - 1;
                            $('.sbOptions').width(w);
                        },
                        onChange: function(val, inst) {
                            get_shops();
                        }
                    });
                }
            }
            get_shops();
        }
    });

    /* Distributed map */
    if($('body').find('#map').length > 0) {
        create_map();
    }

    $('.shop-list').delegate('a', 'click', function(event) {
        event.preventDefault();
        var latlng = $(this).attr('data-latlng');
        latlng = latlng.split(',');
        create_map(latlng);
    });

    var map;
    var geocoder;
    function create_map(latlng) {
        // Create first map
        if(typeof(latlng) === 'undefined') latlng = ['21.018721', '105.816643']; // vi tri mac dinh
        geocoder = new google.maps.Geocoder();

        var mapProp = {
            center: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
            zoom: 16,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map'), mapProp);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
            map: map
        });

        return false;
    }
});
