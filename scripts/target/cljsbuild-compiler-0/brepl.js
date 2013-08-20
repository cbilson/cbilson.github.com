goog.provide('scripts.brepl');
goog.require('cljs.core');
goog.require('clojure.browser.repl');
try{clojure.browser.repl.connect.call(null,"http://localhost:9000/repl");
}catch (e3434){if((e3434 instanceof Error))
{var err_3435 = e3434;
} else
{if("\uFDD0:else")
{throw e3434;
} else
{}
}
}