$(document).on('pageshow', '#scenario', function(){
	console.log( '#scenario pageshow');

	

});


$(document).on('pageinit', '#scenario', function(){
	console.log('#scenario pageinit');
	
	/**
	 * JSONを読み込みhtmlを錬成する
	 */
	var getlist = $.ajax( '../json/checklist.json', {
		dataType: "json",
		cache: true,
		xhrFields: {
        	mozSystem: true
    	}
	});
	// success
	getlist.done( function(data){
		
		// remove loading
		$('.loading').remove();
		
		//if( $('.question').length == 0 ){
			
			// チェックリスト定義文の設問を作成する
			$(data.scenario).each( function(i, obj){
				
				rendarHTML.scenario( obj, '#scenario div.ui-content' );
				
			}).promise().done( function() {
				// HTMLの錬成が終わったら実行される
				
			
			});
		
		//}
	});
	// fail
	getlist.fail( function(){
		rendarHTML.error('シナリオの取得に失敗しました', '#scenario div.ui-content' );
	});
});

