/**
 * jQueryのセレクターをエスケープ
 * @param	{string}	val		エスケープしたい文字列
 */
function selectorEscape(val){
    return val.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
}


