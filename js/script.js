/**
 * JSONを読み込みhtmlを錬成する
 */
var getlist = $.ajax( 'json/checklist.json', {
		dataType: "json",
		cache: false
	});
// success
getlist.done( function(data){
	
	// remove loading
	$('#loading').remove();
	
	//console.log(data);
	$.each( data.checklist, function(i, obj){		
		rendarHTML.checklist(obj);
	});
	
	checkAllInput();	
	//localStorage total数を入れる
	localStorage.setItem( '_checklist_total', parseInt($('#input_total').text()) );

});
// fail
getlist.fail( function(){
	rendarHTML.error('チェックリストの取得に失敗しました');
});


/**
 * チェックリストを読み込んだ際にチェックする
 */
function checkAllInput(){	
	// inputに対して保存された値があれば入れる
	// ✓の集計
	var total = $('.question').each( function( i, html ){
		
		var current = $(html).parent().parent().find('h2');
		//console.log(current);
		var input = $(html).find('input');
		var name = input.attr('name');
		var id = input.attr('id');
		var saved = '', saved_input = '';
		
		// 保存した値があればvalueに入れる
		saved_input = localStorage.getItem( name );
		if( saved_input ){
			saved = ' <<localStorage.getItem>>';
			
			if( input.attr('type') == 'radio' ){
				// radioはchecked
				$('input[name='+selectorEscape(name)+'][value='+saved_input+']').prop('checked', true).checkboxradio("refresh");
				
			} else {
				// type=textなどは普通に処理
				$('input[name='+selectorEscape(name)+']').val( saved_input );
			
			}
			
			// チェックできた数 +1
			checked( 1, name, current.find('.checked_number') );
			
		}
		
		// その項目の質問数を＋＋
		current.find('.inputs').text( function(i,t){
			return parseInt(t) + 1;
		});
		
		//console.log(value);
		console.log( i + ') '+ name +': ' + saved_input + saved );

	}).length;
	$('#input_total').text( total ); // 合計数を書く	

}


/**
 * input が変更されたら、localStorage保存する
 */
$(document).on('blur', 'input', function(){
	var name = $(this).attr('name');
	var id = $(this).attr('id');
	var section_id = '#' + name.substring( 0, name.indexOf('[') );
	var value = $(this).val();
	var saved = '';
	var saved_input = localStorage.getItem( name, value );
	
	if( value == saved_input ){
		// 前回と同じ値が入力されたら、何もしない
		
	} else if( value != saved_input ){
		// 前回とは違う入力が成された
		
		console.log(value +'=='+ saved_input  );
		if( value == '' ){
			// しかし空白だった
			checked( -1, name, $(section_id + ' h2').find('.checked_number') );
		} else if( saved_input == null || saved_input == '' ){
			// 空白ではなく、前回が空白なら、初めての記入である
			// 初めてのカウントアップ
			checked( 1, name, $(section_id + ' h2').find('.checked_number') );
		}
		
		// 保存
		localStorage.setItem( name, value );
		saved = ' <<localStorege.setItem>>';
		
	}
	
	console.log(name + ': '+ value + saved);
	
});


/**
 * input が変更されたかどうか
 */
$(document).on('keyup', 'input', function(){
	var id = $(this).attr('id');
	var value = $(this).val();
	
	// 空ならば、マーキングを消す
	if( value == '' ){
		inputMarking( id, 'remove' );
	}
	
});


/**
 * カウントアップ
 * @param	{int}		number		加減算する数
 * @param	{string}	name		input name名
 * @param	{object}	more		個別にカウントしたい場所があれば指定
 */
function checked( number, name, current ){
	if( number == null ){
		// なにもしない
		return false;
	}
	
	// 加減する
	var now = parseInt( $('#checked_text').text() );
	var n = parseInt( number );
	var total = now + n;
	$('#checked_text').text( total );
	
	if( total > now ){
		// もし加算ならば marking
		inputMarking( name, 'check' );
		
	} else {
		// 減算ならば unmarking
		inputMarking( name, 'remove' );
		
	}
	
	// さらにカウントする場所があるならする
	if( current ){
		current.text( function(i,t){
			return parseInt(t) + n;
		});
	}
	
	// localstorage更新
	localStorage.setItem( '_checklist_checked', parseInt($('#checked_text').text()) );
}


/**
 * チェックリストのHTML製造
 * @param	{string}	id			チェック付ける対象のname属性値
 * @param	{int}		check		1: 加算, -1: 減算
 */
function inputMarking( id, check ){
	if( check == 'check' ){
		// もし加算ならば marking
		$('label[for=input_'+selectorEscape(id)+']').prepend('<span class="checked_mark">✔</span>');
		$('input[id="input_'+selectorEscape(id)+'"]' ).css('background', '#effce5');
		
	} else {
		// 減算ならば unmarking
		$('label[for="input_'+selectorEscape(id)+'"]').find('.checked_mark').remove();
		$('input[id="input_'+selectorEscape(id)+'"]' ).css('background', 'transparent');
		
	}
}


/**
 * HTMLの生成
 */
rendarHTML = {
	
	/**
	 * チェックリストのHTML製造
	 * @param	{object}	obj		json objectをつっこめ
	 */
	checklist: function( obj ){
		var id = obj.id;
		var html = '<div data-role="collapsible" id="'+ id +'">';
		// current check number
		var ccn = '<em class="current_number"><span class="checked_number">0</span>/<span class="inputs">0</span></em>';
		// title
		html += '<h2>'+ obj.name + ccn +'</h2>';
		
		$.each( obj.question, function( i, question ){
			html += '<div class="ui-field-contain question">';
			//label
			html += '<label for="input_'+ id +'['+ question.id +']">'+ question.label +'</label>';
			
			//input
			if ( question.type == 'radio' ){
				html += '<fieldset data-role="controlgroup" data-type="horizontal">';
				
				$.each( question.radio, function( key, value ){
					html += '<input type="radio" name="'+ id +'['+ question.id +']" id="input_'+ id +'['+ question.id +']_'+ key +'" value="'+ key +'">';
					html += '<label for="input_'+ id +'['+ question.id +']_'+ key +'">'+ value +'</label>';
				});
				
				html += '</fieldset>';

			} else {
				html += '<input type="'+ question.type +'" name="'+ id +'['+ question.id +']" id="input_'+ id +'['+ question.id +']" placeholder="'+ question.placeholder +'">';
			}
			
			html += '</div>';
		});
		
		html += '</div>'; // end div data-role="collapsible"
		
		$('div[role="main"]').append(html).trigger("create");
	},
	
	
	/**
	 * エラー時のHTML製造
	 * @param	{string}	html		エラーとして出したい文字列
	 */
	error: function(html){
		$('div[role=main]').prepend('<p class="error">'+html+'</p>');
	}
}


// セレクターのエスケープ
function selectorEscape(val){
    return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}