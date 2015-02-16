$(document).on('pageshow', '#index', function(){
	console.log( '#index pageshow');

	// 備えチェックリストに、現在の値を表示
	$('#index').find('.current_number').hide();
	var get_total = localStorage.getItem('_checklist_total');
	if( get_total ){
		$('#index').find('.current_number').show().find('.inputs_total').text( get_total );
	}
	var get_current = localStorage.getItem('_checklist_checked');
	if( get_current ){
		$('#index').find('.current_number').show().find('.checked_number').text( get_current );
	}

});


$(document).on( 'click', '#reset_allclear', function(){
	
	if(window.confirm('入力した備えチェックリストのデータを全て消去します。よろしいですか？')){
	
		localStorage.clear();
		$('#index').find('.current_number').hide();
		
		window.alert('消去しました');
		
	}
	
});