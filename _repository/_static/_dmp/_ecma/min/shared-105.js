﻿function polarizedImgMenu(){var n=$(".wcs-lenses").find('a[href$="polarized"]').children("p").children("strong");n.before('<span class="polarizedImg">&nbsp<\/span>');n.parent("p").css("height","15px")}function makeNHBlogTargetBlankForTurkey(){var n=$(document.cookie.split(/\s*;\s*/)).filter(function(n,t){return t.match(/^ctryid/)})[0];n&&n==="ctryid=25"&&$('a[href*="ray-ban.tumblr.com"]').attr("target","_blank")}function neverHideHubMobileTempFix(){$('.rb-menu a:contains("NEVER HIDE HUB")').attr("href")!=undefined&&$('.rb-menu a:contains("NEVER HIDE HUB")').attr("href").indexOf("{")==0&&$('.rb-menu a:contains("NEVER HIDE HUB")').attr("href","/mobile/never-hide-hub")}polarizedImgMenu();makeNHBlogTargetBlankForTurkey();neverHideHubMobileTempFix()