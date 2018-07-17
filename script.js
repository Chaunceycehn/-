let $buttons = $('.menuItem')
let $slides = $('.slides')
let $images = $('#slides .slide')

let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-920px)'})
bindEvents()
$('.menuItem:first').addClass('act').siblings().removeClass('act');

function bindEvents(){
	$('#menu').on('click', '.menuItem', function(e){
	  let $button = $(e.currentTarget) 
	  let index = $button.index()
	  $('.menuItem').removeClass('act').addClass('inact');
	  $(this).addClass('act');
	  goToSlide(index)
	})
}

function makeFakeSlides() {
	let $firstCopy = $images.eq(0).clone(true)
	let $lastCopy = $images.eq($images.length - 1).clone(true)

	$slides.append($firstCopy)
	$slides.prepend($lastCopy)
}


function goToSlide(index) {
	if (index > $buttons.length - 1) {
		index = 0
	} else if (index < 0) {
		index = $buttons.length - 1
	}

	if (current === $buttons.length - 1 && index === 0) {
		// 最后一张到第一张
		console.log('here')
		$slides.css({ transform: `translateX(${-($buttons.length) * 920}px)` })
			.one('transitionend', function () {
				$slides.hide()
				$slides.offset() // .offset() 可以触发 re-layout，这是一个高级技术，删掉这行你就会发现 bug，所以只能加上这一行。
				// 不要写邮件来问我为什么要写 .offset，你自己注释掉上面一行看最后一张到第一张的动画，就知道为什么要加 offset() 了。
				$slides.css({ transform: `translateX(${-(index) * 920}px)` }).show()
			})

	} else if (current === 0 && index === $buttons.length - 1) {
		// 第一张到最后一张
		$slides.css({ transform: `translateX(0px)` })
			.one('transitionend', function () {
				$slides.hide().offset()
				$slides.css({ transform: `translateX(${-(index) * 920}px)` }).show()
			})

	} else {
		$slides.css({ transform: `translateX(${- (index) * 920}px)` })
	}
	current = index
}






