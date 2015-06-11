if ($.browser.msie && ($.browser.version == '6.0' || $.browser.version == '7.0')) {
	$('#myModal').modal({})
}
//用户名校验

function checkName(strName) {
	var reg = /^[a-z0-9_\u4e00-\u9fa5]{2,12}$/i;
	if (reg.test(strName)) {
		return true;
	} else {
		return false;
	}
}

//邮箱校验

function isEmail(strEmail) {
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if (reg.test(strEmail)) {
		return true;
	} else {
		return false;
	}
}


var winUiList = $('.winUiContent .col').find('div');
for (var i = 0; i < winUiList.length; i++) {
	var randomColor = parseInt(Math.random() * 256);
	var randomColor1 = parseInt(Math.random() * 256);
	var randomColor2 = parseInt(Math.random() * 256);
	winUiList.eq(i).css('background-color', 'rgb(' + randomColor + ',' + randomColor1 + ',' + randomColor2 + ')')
}

if (document.getElementById('userHomeTag')) {
	$('#userHomeTag').click(function() {
		$.get('/myarticle', function(data) {
			var tmpHtml = '';
			var posts = data.posts;
			for (var i = 0; i < posts.length; i++) {
				var post = posts[i];
				var tagHtml = '';
				for(var j =0;j<post.tags.length;j++){
					var tag = post.tags[j];
					if(tag.tag){
						tagHtml+= '<a class="tag" href="/tags/'+tag.tag+'">'+tag.tag+'</a>';
					}
				}
				tmpHtml+= '<div class="artList"><h3><a href="/u/'+post.name+'/'+post.time.day+'/'+post.title+'">'+ post.title+ '</a>  <span class="editBt"><a href="/e/e/'+post.name+'/'+post.time.day+'/'+post.title+'">编辑</a></span></h3><p class="info1">日期：'+post.time.minute+' | 标签：'+tagHtml+'</p><div style="color:#444;">'+post.post+'</div><p class="info1">阅读：'+ post.pv +' | 评论：'+post.comments.length +'</p></div>'
			}

			$('.myArticle').append(tmpHtml);
		});
	})
}

if (document.getElementById('commentForm')) {
	   $('#commentSubmitBt').on('click',function (){
	      var titleStr = $("#content").val();
	        if(/^\s*$/.test(titleStr)){$('#titleErr').text('留言不能为空').css('color','#E64141');return false;}
	        else{$('#titleErr').text('').css('color','#E64141')}    
	      })
}