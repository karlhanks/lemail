!function(){
    var $boxhover=$('#main-menu');
    var $blockbox=$('#main-menu-container');
    var $selectbtn=$('.menu-select-btn li')
    $boxhover.hover(function(){
        $blockbox.show()
    },function(){
        $blockbox.hide()
    });
    $blockbox.hover(function(){
        $blockbox.show()
    },function(){
        $blockbox.hide()
    });
    $selectbtn.hover(function(){
        $('.clearfix menu-content-box').show();
        $('.menu-content-wrap').show()
    },function(){
        $('.clearfix menu-content-box').hide();
        $('.menu-content-wrap').hide()
    });
    $('.menu-content-wrap').hover(function(){
        $('.clearfix menu-content-box').show();
        $('.menu-content-wrap').show()
    },function(){
        $('.clearfix menu-content-box').hide();
        $('.menu-content-wrap').hide()
    });
    
}
()