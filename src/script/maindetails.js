!function () {
    //获取sid
    var sid = window.location.search;
    sid = sid.substring(sid.indexOf('='), sid.length).substring(1);
    $.ajax({//将当前的id传给后端获取对应的数据
        url: 'http://10.31.164.22/lemail/php/getdata.php',
        data: { w_sid: sid },
        dataType: 'json'
    }).done(function (d) {
        $('.bread_nav b').text(d.title);
        $('.base_info .title').html(d.title);
        $('head title').html(d.title);
        $('.base_info .slogan').html(d.description)
        $('#big_img img').attr('src', d.url);
        $('#bpic').attr('src',d.url);
        $('#js_price').html(d.price);
        $('#promotionList').html(d.nowprice);
        $('#cart-countPrice').html(d.nowprice);
        var arr=d.urls.split(',')
        var str='';
        $.each(arr,function(index,value){
            str+='<li><img src="'+value+'"/></li>';
        });
        
        $('#pic_list ul').html(str);
    });
    $('#pic_list ul').on('click','li',function(){
        $(this).css('border','1px solid #ccc').siblings().css('border','none');
        var $imgurl=$(this).find('img').attr('src');
        $('#big_img img').attr('src',$imgurl);
        $('#bpic').attr('src',$imgurl);
    });
    //放大镜
    $('#sf').width($('#big_img').width() * $('#bf').width() / $('#bpic').width());
    $('#sf').height($('#big_img').height() * $('#bf').height() / $('#bpic').height());
    var bili = $('#bpic').width() / $('#big_img').width();
    $('#big_img').hover(function () {
        $('#sf').css('visibility', 'visible');
        $('#bf').css('visibility', 'visible');
        $(this).on('mousemove', function (ev) {
            var $left = ev.pageX - $('#product_info_gellary').offset().left - $('#sf').width() / 2;
            var $top = ev.pageY - $('#product_info_gellary').offset().top - $('#sf').height() / 2;
            if ($left < 0) {
                $left = 0;
            } else if ($left >= $('#big_img').width() - $('#sf').width()) {
                $left = $('#big_img').width() - $('#sf').width();
            }
            if ($top < 0) {
                $top = 0;
            } else if ($top >= $('#big_img').height() - $('#sf').height()) {
                $top = $('#big_img').height() - $('#sf').height();
            }
            $('#sf').css('left', $left);
            $('#sf').css('top', $top);
            $('#bpic').css('left', -$left * bili);
            $('#bpic').css('top', -$top * bili);
        });
    }, function () { 
        $('#sf').css('visibility','hidden');
		$('#bf').css('visibility','hidden');
    });
    //商品数量和价格变化
    var num=Number($('#tvSelectNum').val());
    
    $('.plus').on('click',function(){
        num++;
        $('.minus.invalid').css({'background-position':'right top',"cursor":"pointer"});
        $('#tvSelectNum').val(num);
        $('#cart-countPrice').html(num*$('#promotionList').html()); 
    });
    $('.minus.invalid').on('click',function(){
        if(num>1){
            num--;
            $('#tvSelectNum').val(num);
            $('#cart-countPrice').html(num*$('#promotionList').html()); 
            if(num==1){
                $('.minus.invalid').css({'background-position':'right bottom',"cursor":"not-allowed"});
            }
        }else{
            num=1;
            $('.minus.invalid').css({'background-position':'right bottom',"cursor":"not-allowed"});
        }
    });
    // 点击加入购物车
    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    !function cookietoarray(){
        if(getcookie('cookiesid') && getcookie('cookienum')) {//判断商品是第一次存还是多次存储
			arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
			arrnum = getcookie('cookienum').split(','); //cookie商品的num
		}
    }();
    $('.addToCart_2').on('click',function(){
        if($.inArray(sid,arrsid)!=-1){//商品存在，只加数量
            var num=parseInt(arrnum[$.inArray(sid, arrsid)]) + parseInt($('#tvSelectNum').val());
            arrnum[$.inArray(sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10);
        }else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
			arrsid.push(sid); //将当前的id存入数组
			addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
			arrnum.push($('#tvSelectNum').val());
			addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
		}

    });
    


}()