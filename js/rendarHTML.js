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
	 * シチュエーション選択リストのHTML製造
	 * @param	{object}	obj		json objectをつっこめ
	 */
	scenario: function( obj, target ){
		var id = obj.id;
		var html = '<div data-role="collapsible" id="'+ id +'">';
		// title
		html += '<h2>'+ obj.name +'</h2>';
		html += '<ul data-role="listview">';
		
		$.each( obj.situation, function( i, situation ){
			
			var href = id+'_'+ situation.id ;
			html += '<li><a href="#'+ href +'" data-ajax="false" data-transition="fade" >'+situation.label+'</a></li>';
			
			// フロータイプならフローつくる
			if( situation.type == 'flow' && situation.flow ){
				rendarHTML.flow( href, situation );
			}
			
		});
		html += '</ul>';
		html += '</div>'; // end div data-role="collapsible"
		
		$(target).append(html).trigger("create");
	},
	
	
	/**
	 * フローHTML製造
	 * @param	{object}	obj		json objectをつっこめ
	 */
	flow: function( id, situation ){
		var flow = '<div id="'+ id +'" data-role="page" data-theme="b" class="flow" data-title="'+ situation.label +'">';
		flow += '<div data-role="header" data-position="fixed">';
		flow += '<h1>'+ situation.label +'</h1>';
		flow += '<a href="#scenario" class="ui-btn ui-btn-left ui-corner-all ui-btn-icon-notext ui-icon-carat-l" data-transition="fade" data-direction="reverse">戻る</a>';
		flow += '</div>';
		
		flow += '<div role="main" class="flow_slide ui-content">';
		$.each( situation.flow, function( key, value ){
			
			var point = id +'_'+ key;
			
			console.log(key);
			//console.log(value);
			
			flow += '<div id="'+ point +'" class="flow_slide_card>';
			flow += '<h3>'+ key +'. '+ value.title +'</h3>';
			flow += '<p>'+ value.description +'</p>';
			flow += '</div>';
			
		});
		flow += '</div>';
		
		flow += '</div>';
		// シナリオの下に出力してく
		$('#scenario').after(flow);
		//console.log('#'+id);
		$('#'+id).trigger('pageinit');
		
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
