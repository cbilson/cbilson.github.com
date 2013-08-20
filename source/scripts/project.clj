(defproject scripts "0.1.0-SNAPSHOT"
  :description "Client side code for my blog"
  :url "http://cbilson.github.com/cbilson.github.com/"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/clojurescript "0.0-1820"]]
  :plugins [[lein-cljsbuild "0.3.2"]]
  :cljsbuild
  {:builds
   [{:source-paths ["src-cljs"]
     :compiler
     {:output-to "../javascripts/site.js"
      :optimizations :whitespace
      :pretty-print true}}]})
