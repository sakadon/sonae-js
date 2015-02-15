/**
 * HTMLの生成
 */
var rendarHTML = {
	
	/**
	 * チェックリストのHTML製造
	 * @param	{object}	obj		json objectをつっこめ
	 */
	checklist: function( obj, target ){
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
		
		$(target).append(html).trigger("create");
	},
	
	
	/**
	 * エラー時のHTML製造
	 * @param	{string}	html		エラーとして出したい文字列
	 */
	error: function( html, target ){
		// remove loading
		$('#loading').remove();
		$(target).prepend('<p class="error">'+html+'</p>');
	}
}
