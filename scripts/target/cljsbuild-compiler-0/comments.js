goog.provide('scripts.comments');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.net.XhrIo');
goog.require('goog.dom');
scripts.comments.format_comment = (function format_comment(issue_id,comment){
var cuser = comment.user.login;
var cuserlink = [cljs.core.str("https://www.github.com/"),cljs.core.str(cuser)].join('');
var clink = [cljs.core.str("https://github.com/cbilson/cbilson.github.com/issues/"),cljs.core.str(issue_id),cljs.core.str("#issuecomment-"),cljs.core.str(comment.id)].join('');
var cbody = comment.body_html;
var cavatarlink = comment.user.avatar_url;
var cdate = Date.parse(comment.created_at).toString("yyyy-MM-dd HH:mm:ss");
return [cljs.core.str("<div class='comment'><div class='commentheader'>"),cljs.core.str("<div class='commentgravatar'>"),cljs.core.str("<img src='"),cljs.core.str(cavatarlink),cljs.core.str("' alt='' width='20' height='20'></img>"),cljs.core.str("</div>"),cljs.core.str("<a class='commentuser' href='"),cljs.core.str(cuserlink),cljs.core.str("'>"),cljs.core.str(cuser),cljs.core.str("</a>"),cljs.core.str("on <a class='commentdate' href='"),cljs.core.str(clink),cljs.core.str("'>"),cljs.core.str(cdate),cljs.core.str("</a>"),cljs.core.str("said: <div class='commentbody'>"),cljs.core.str(cbody),cljs.core.str("</div>"),cljs.core.str("</div>")].join('');
});
scripts.comments.show_comments = (function show_comments(comments){
return cljs.core.map.call(null,cljs.core.partial.call(null,goog.dom.appendChild,goog.dom.getElement("comments")),cljs.core.map.call(null,goog.dom.htmlToDocumentFragment,cljs.core.map.call(null,cljs.core.partial.call(null,scripts.comments.format_comment,comments.id),comments)));
});
scripts.comments.send = (function send(url,callback,headers,content,timeout){
var uri = (new goog.Uri(url));
var headers__$1 = cljs.core.clj__GT_js.call(null,headers);
var content__$1 = cljs.core.clj__GT_js.call(null,content);
return goog.net.XhrIo.send(uri,callback,"GET",content__$1,headers__$1,timeout);
});
scripts.comments.load_comments = (function load_comments(issue_id){
var url = [cljs.core.str("https://api.github.com/repos/cbilson/cbilson.github.com/issues/"),cljs.core.str(issue_id),cljs.core.str("/comments")].join('');
var uri = (new goog.Uri(url));
return scripts.comments.send.call(null,uri,scripts.comments.show_comments,cljs.core.PersistentArrayMap.fromArray(["Accept","application/vnd.github.full+json"], true),null,30000);
});
goog.exportSymbol('scripts.comments.load_comments', scripts.comments.load_comments);
