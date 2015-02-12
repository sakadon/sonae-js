
/**
* チェックリストを読み込んだ際にチェックする
*/
$(document).on('pageshow', '#checklist', function(e){
	console.log('LOADED checklist');
	
	// インプット分回す
	$('input').each( function( i ){
		var name = $(this).attr('name');
		//var value = $(this).val();
		var saved = '';
		
		// 保存されたのがあるか
		var store = localStorage.getItem( name );
		if( store ){
			saved = ' <<localStorage.getItem>>';
			$(this).val( store );
			
			// チェックできた数 +1
			checked( 1, name );
			
		} else {
			store = '';
		}
		
		//console.log(value);
		console.log( i + ') '+ name +': ' + store + saved );
		
		
		
	});

});


/**
 * input が変更されたかどうか
 */
$(document).on('change', 'input', function(){
	var name = $(this).attr('name');
	var value = $(this).val();
	var saved = '';
	
	// 内容があれば
	if( value ){
		// 保存
		localStorage.setItem( name, value );
		saved = ' <<localStorege.setItem>>';
		checked( 1, name );
		
	} else {
		
		// 保存されたのがあるか
		var store = localStorage.getItem( name );
		if( store ){
			saved = ' <<CLEAR>>';
			checked( -1, name );
		}
		
	}
	
	console.log(name + ': '+ value + saved);
});


/**
 * カウントアップ
 * @param	{int}		number		加減算する数
 * @param	{string}	name		input name名
 */
function checked( number, name ){
	if( number == null ){
		// なにもしない
		
	} else {
		// 加減する
		
		var now = parseInt( $('#checked_text').text() );
		var n = parseInt( number );
		var total = now + n;
		$('#checked_text').text( total );
		
		if( total > now ){
			// もし加算ならば marking
			$('label[for="'+name+'"]').prepend('<span class="checked_mark">✔</span>');
			$('input[name="'+name+'"]' ).css('background', '#effce5');
			
		} else {
			// 減算ならば unmarking
			
		}
		
	}
}