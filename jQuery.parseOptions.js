/**
 * Get named options from attributes on a dom element.
 * 
 * Works with a generic json object or individual attributes
 * Individual attributes override the json object attributes
 * 
 * Example:
 *
 * <div data-datepicker='{"dateFormat":"yy-mm-dd"}' data-datepicker-defaultDate="+7">...</div>
 * 
 * $('#someId').parseOptions( 'datepicker' );
 * 
 * returns:
 * 
 * { "dateFormat": "yy-mm-dd", "defaultDate": "+7" }
 * 
 * @param {string} nameSpace The namespace for the element attributes
 * @return {object} The prioritized options from the element attributes
 */

(function( $ ){

	/* Simple unCapitalization */
	function unCapitalize( string ) {
		return string.charAt( 0 ).toLowerCase() + string.slice( 1 );
	}

	$.fn.parseOptions = function ( nameSpace ) {
		var fullData      = this.data(),
				componentData = fullData[ nameSpace ] || {},
				overrides     = {},
				attrRegex     = new RegExp( '^' + nameSpace + '(.+)' );

		// Walk through all data attributes to find named data
		$.each( fullData, function( a, b ) {
			var attrTest = attrRegex.exec( a );
		
			// If the name fits, save in the overrides array
			if ( attrTest ) {
				
				// jQuery capitalizes the name, let's lowercase that sucker
				var attrName = unCapitalize( attrTest[ 1 ] );
				
				overrides[ attrName ] = b;
			}
		
		} );
		
		// Explicitly named attributes overrides the component data
		return $.extend( {}, componentData, overrides );
	};
})( jQuery );
