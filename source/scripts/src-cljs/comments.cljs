(ns scripts.comments
  (:require [goog.dom :as dom]
            [goog.net.XhrIo :as xhr]
            [goog.Uri :as uri]))

(defn format-comment [issue-id comment]
  (let [cuser (.. comment -user -login)
        cuserlink (str "https://www.github.com/" cuser)
        clink (str "https://github.com/cbilson/cbilson.github.com/issues/" issue-id "#issuecomment-"
                   (.-id comment))
        cbody (.-body-html comment)
        cavatarlink (.. comment -user -avatar-url)
        cdate (.. js/Date (parse (.-created-at comment)) (toString "yyyy-MM-dd HH:mm:ss"))]
    (str "<div class='comment'><div class='commentheader'>"
         "<div class='commentgravatar'>"
         "<img src='" cavatarlink "' alt='' width='20' height='20'></img>"
         "</div>"
         "<a class='commentuser' href='" cuserlink "'>" cuser "</a>"
         "on <a class='commentdate' href='" clink "'>" cdate "</a>"
         "said: <div class='commentbody'>" cbody "</div>"
         "</div>")))

(defn show-comments [comments]
  (->> comments
       (map (partial format-comment (.-id comments)))
       (map dom/htmlToDocumentFragment)
       (map (partial dom/appendChild (dom/getElement "comments")))))

(defn send [url callback headers content timeout]
  (let [uri (goog.Uri. url)
        headers (clj->js headers)
        content (clj->js content)]
    (xhr/send uri callback "GET" content headers timeout)))

(defn ^:export load-comments [issue-id]
  (let [url (str "https://api.github.com/repos/cbilson/cbilson.github.com/issues/"
                 issue-id "/comments")
        uri (goog.Uri. url)]
    (send uri show-comments {"Accept" "application/vnd.github.full+json"} nil 30000)))

