var wrapper = $("div#wrapper");
var resize = function(page) {
  var scale = Math.min($(window).width() / page.width(), $(window).height() / page.height());
  page.width(page.width() * scale);
  var pad = ($(window).width() - page.width()) / 2;
  page.css("margin-left", pad);
};
function setPageNumber(current) {
  $("#current_page_number").val(current + 1);
};
$(document).ready( function() {
  setPageNumber(0);
  $("#all_page_number").text('/ ' + wrapper.find("img").size());
  resize(wrapper.find("img:visible"));
  spotOneInAllSlide(0);
});
function spotOneInAllSlide(current) {
  slides = $('#allslide .one-of-all-slide');
  $.each(slides, function(i,val) {
    if(i == current){
      $(val).find('input').addClass('selected-slide');
    } else {
      $(val).find('input').removeClass('selected-slide');
    }
  });
};
function toggleAllSlide() {
  $('div#allslide').fadeToggle();
};
function selectPage(index){
  goPage(index);
  toggleAllSlide();
};

$("#current_page_number").keypress(function(e){
  if(e.keyCode == 13){
    var pageNum = $(this).val() - 1;
    if(0 <= pageNum && pageNum <= wrapper.find("img").size() - 1){
      goPage($(this).val() - 1);
    }
  }
});

function go(next, direction) {
  var now = wrapper.find("img:visible");
  var sliding = getSlideEffect(nowEffect, direction);
  if($('div#wrapper img').index(next) != $('div#wrapper img').index(now)) {
    sliding(now, next);
    setPageNumber($('div#wrapper img').index(next));
    resize(next);
    current = $('div#wrapper img').index(next);
    spotOneInAllSlide(current);
    runRabbit(current);
  }
};
$("input:button.prev").click(function() {
  var prev = wrapper.find("img:visible").prev();
  if(prev.length != 0){
    go(prev, "prev");
  }
});
$("input:button.next").click(function() {
  var next = wrapper.find("img:visible").next();
  if(next.length != 0){
    go(next, "next");
  }
});
$("input.next,input.prev").hover( function() {
  $(this).css('width', $(window).width() / 5);
  $(this).css('height', $(window).height());
  $(this).css('opacity', '1');
}, function(){
  $(this).css('opacity', '0');
});
function goFirst(){
  var first = wrapper.find('img:first');
  go(first, "prev");
}
function goPrev(){
  var prev = wrapper.find('img:visible').prev();
  if(prev.length != 0) {
    go(prev, "prev");
  }
}
function goNext(){
  var next = wrapper.find('img:visible').next();
  if(next.length != 0) {
    go(next, "next");
  }
}
function goLast(){
  var last = wrapper.find('img:last');
  go(last, "next");
}
function goPage(index){
  var page = wrapper.find('img:eq(' + index + ')');
  var current = $('div#wrapper img').index(wrapper.find('img:visible'));

  if(current < index){
    go(page, "next");
  } else if(current > index){
    go(page, "prev");
  }
}
$('#toggle_controller').click(function(){
  var ctr_position = ($('#controller').position().top / $(window).height()) * 100;
  if(~~ctr_position == 95){
    $('#controller').animate({'top': '100%'});
    $('#toggle_controller').animate({'top': '95%'});
  }
  if(~~ctr_position == 100){
    $('#controller').animate({'top': '95%'});
    $('#toggle_controller').animate({'top': '90%'});
  }
});

$("#settings").children("button.settings-button").click(function() {
  var menu = $(this).parent().find("p");
  if(menu.length > 0){
    menu.remove();
  } else {
    tags = getEffectMenu();
    $("#settings").append(tags);
  }
});

$(document).on("click", "a[id^=effect-menu-]", function(){
  $(this).parent().parent().find("p").remove();
});

$(window).keydown(function(e){
  switch(e.keyCode){
  case 13: goNext(); break; // Enter => goto next
  case 65: toggleAllSlide(); break; // 'a' => toggle all slides
  case 78: goNext(); break; // 'n' => goto next
  case 80: goPrev(); break; // 'p' => goto previous
  case 87: whiteout(); break; //'w' => white out screen
  }
});

function whiteout(){
  $("div:not(#allslide)").animate({ opacity: 'toggle'});
}

function presentationSetting(){
  $("#presentation").popover({
    html: true,
    placement: "left",
    container: "body",
    title: "Set Presentation Time",
    content: function(){
      return $(".popover_content").html();
    }
  });
}

function presentationStart(){
  // "display: none;" のdiv要素をpopoverで出現させているので":eq(1)"が必要
  var min = parseInt($(":text[name='presentation_min']:visible").val());
  var rabbit = $("#rabbit");
  var turtle = $("#turtle");

  rabbit.css("left","0%");
  $("#rabbit").show();
  turtle.css("left","0%");
  $("#turtle").show();

  $("#turtle").animate({'left': '97%'},{duration: (min * 60) * 1000, queue: false});
  $("#presentation").popover('hide');
};

function runRabbit(current){
  var here = 97 * current / (wrapper.find("img").size() - 1);
  $("#rabbit").css("left", (here) + '%');
}