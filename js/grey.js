$(function() {
	$(window).on('resize', function() {
		// ----------------------------------------轮播图自动切换图片效果
		//窗口的宽度
		let clientW = $(window).width()
		//设置临界点
		let isShowBigImages = clientW >= 900
		//拿到所有的轮播标签
		let $allitems = $('#love-carousel>.carousel-inner>.carousel-item')
		//遍历所有轮播标签
		$allitems.each((index, item) => {
			//取出图片路径
			let src = isShowBigImages ? $(item).data('lg-img') : $(item).data('sm-img')
			let imgUrl = `url(${src})`
			$(item).css({
				backgroundImage: imgUrl
			})
			//如果宽度小于900px，并且没有img标签，创建img标签
			let hasimg = $(item).is(':has(img)')
			if (!isShowBigImages && !hasimg) {
				let imgEle = `<img src='${src}'/>`
				$(item).append(imgEle)
			}
			//如果宽度大于900px则删除img标签
			if (isShowBigImages) {
				$(item).empty()
			}
		})
		// ----------------------------------------选项卡超出内容标题处理
		let $ul = $('#love-museum >.container-fluid>div>ul');
		let $alli = $('#love-museum >.container-fluid>div>ul>li');
		let totalWidth = 0; //存储所有li的宽度
		$alli.each((index, item) => {
			totalWidth += $(item).width();
		})
		let parentWidth = $ul.parent().width();
		if (totalWidth > parentWidth) {
			$ul.css({
				width: (totalWidth + 10) + 'px'
			})
		}
		//---------------------------------------------分页选项高度自适应
		let lovepage = $("#love-page>.container-fluid>.row")
		let allsrction = lovepage.children('#myScrollspy').find('ul.nav-pills')
		let srctionitem = lovepage.children('#myScrollspyItem').find('div')
		let allsrctionWidth = allsrction.width()
		let srctionparentWidth = allsrction.parent().width()
		let clientH = $(window).height()
		let allsrctionHeight = allsrction.height()
		allsrction.css({
			"top": (clientH - allsrctionHeight) / 2-38,
			"left": (srctionparentWidth - allsrctionWidth) / 2
		})
		srctionitem.css({
			"height": clientH
		})
	}).trigger('resize')
	// ----------------------------------------轮播图移动端滑动换图效果
	let startX = 0;
	let endX = 0;
	let CarouselInner = $('#love-carousel>.carousel-inner')[0];
	let $love_carousel = $("#love-carousel");
	let love_carousel = $love_carousel[0];
	CarouselInner.addEventListener('touchstart', (e) => {
		startX = e.targetTouches[0].clientX;
	})
	love_carousel.addEventListener('touchmove', (e) => {
		endX = e.targetTouches[0].clientX;
		//上一張
		if (endX - startX > 0) {
			$love_carousel.carousel('prev');
		} else if (endX - startX < 0) {
			$love_carousel.carousel('next');
		}
	})
})
