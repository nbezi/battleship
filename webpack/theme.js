var Theme = module.exports = {
	init: () => {
		var html = document.querySelector('html'),
			head = document.querySelector('head'),
			metaResponsive = document.createElement('meta');
		metaResponsive.name = "viewport";
		metaResponsive.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
		head.appendChild(metaResponsive);
		head.appendChild(Theme._createFontLink("https://fonts.googleapis.com/css?family=Roboto"));
		head.appendChild(Theme._createFontLink("https://fonts.googleapis.com/icon?family=Material+Icons"));
		head.appendChild(Theme._createStyleTag('{*::-webkit-scrollbar{width:6px!important;height:6px!important}*::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.2)}*::-webkit-scrollbar-track{background:rgba(255,255,255,.08)}'));
	},
	_createStyleTag(css) {
		var style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		return style;
	},
	_createFontLink: (href) => {
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = href;
		return link;
	}
}

export default Theme;