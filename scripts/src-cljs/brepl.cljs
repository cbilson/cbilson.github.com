(ns scripts.brepl
  (:require [clojure.browser.repl :as repl]))

(try
  (repl/connect "http://localhost:9000/repl")
  (catch js/Error err))

