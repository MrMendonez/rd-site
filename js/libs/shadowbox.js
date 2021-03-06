/*
 * Shadowbox.js, version 3.0.3
 * http://shadowbox-js.com/
 *
 * Copyright 2007-2010, Michael J. I. Jackson
 * Date: 2011-05-14 08:09:50 +0000
 */
(function(e, t) {
  function v() {
    var e = n.errorInfo,
      t = n.plugins,
      r, s, o, u, a, f, l, c;
    for (var h = 0; h < n.gallery.length; ++h) {
      r = n.gallery[h], s = !1, o = null;
      switch (r.player) {
        case "flv":
        case "swf":
          t.fla || (o = "fla");
          break;
        case "qt":
          t.qt || (o = "qt");
          break;
        case "wmp":
          n.isMac ? t.qt && t.f4m ? r.player = "qt" : o = "qtf4m" : t.wmp || (o = "wmp");
          break;
        case "qtwmp":
          t.qt ? r.player = "qt" : t.wmp ? r.player = "wmp" : o = "qtwmp"
      }
      if (o)
        if (n.options.handleUnsupported == "link") {
          switch (o) {
            case "qtf4m":
              a = "shared", f = [e.qt.url, e.qt.name, e.f4m.url, e.f4m.name];
              break;
            case "qtwmp":
              a = "either", f = [e.qt.url, e.qt.name, e.wmp.url, e.wmp.name];
              break;
            default:
              a = "single", f = [e[o].url, e[o].name]
          }
          r.player = "html", r.content = '<div class="sb-message">' + N(n.lang.errors[a], f) + "</div>"
        } else s = !0;
      else if (r.player == "inline") u = i.exec(r.content), u ? (l = k(u[1]), l ? r.content = l.innerHTML : s = !0) : s = !0;
      else if (r.player == "swf" || r.player == "flv") c = r.options && r.options.flashVersion || n.options.flashVersion, n.flash && !n.flash.hasFlashPlayerVersion(c) && (r.width = 310, r.height = 177);
      s && (n.gallery.splice(h, 1), h < n.current ? --n.current : h == n.current && (n.current = h > 0 ? h - 1 : h), --h)
    }
  }

  function m(e) {
    if (!n.options.enableKeys) return;
    (e ? B : j)(document, "keydown", g)
  }

  function g(e) {
    if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;
    var t = H(e),
      r;
    switch (t) {
      case 81:
      case 88:
      case 27:
        r = n.close;
        break;
      case 37:
        r = n.previous;
        break;
      case 39:
        r = n.next;
        break;
      case 32:
        r = typeof d == "number" ? n.pause : n.play
    }
    r && (P(e), r())
  }

  function y(e) {
    m(!1);
    var t = n.getCurrent(),
      r = t.player == "inline" ? "html" : t.player;
    if (typeof n[r] != "function") throw "unknown player " + r;
    e && (n.player.remove(), n.revertOptions(), n.applyOptions(t.options || {})), n.player = new n[r](t, n.playerId);
    if (n.gallery.length > 1) {
      var i = n.gallery[n.current + 1] || n.gallery[0];
      if (i.player == "img") {
        var s = new Image;
        s.src = i.content
      }
      var o = n.gallery[n.current - 1] || n.gallery[n.gallery.length - 1];
      if (o.player == "img") {
        var u = new Image;
        u.src = o.content
      }
    }
    n.skin.onLoad(e, b)
  }

  function b() {
    if (!f) return;
    if (typeof n.player.ready != "undefined") var e = setInterval(function() {
      f ? n.player.ready && (clearInterval(e), e = null, n.skin.onReady(w)) : (clearInterval(e), e = null)
    }, 10);
    else n.skin.onReady(w)
  }

  function w() {
    if (!f) return;
    n.player.append(n.skin.body, n.dimensions), n.skin.onShow(E)
  }

  function E() {
    if (!f) return;
    n.player.onLoad && n.player.onLoad(), n.options.onFinish(n.getCurrent()), n.isPaused() || n.play(), m(!0)
  }

  function S() {
    return (new Date).getTime()
  }

  function x(e, t) {
    for (var n in t) e[n] = t[n];
    return e
  }

  function T(e, t) {
    var n = 0,
      r = e.length;
    for (var i = e[0]; n < r && t.call(i, n, i) !== !1; i = e[++n]);
  }

  function N(e, t) {
    return e.replace(/\{(\w+?)\}/g, function(e, n) {
      return t[n]
    })
  }

  function C() {}

  function k(e) {
    return document.getElementById(e)
  }

  function L(e) {
    e.parentNode.removeChild(e)
  }

  function M() {
    var e = document.body,
      t = document.createElement("div");
    A = typeof t.style.opacity == "string", t.style.position = "fixed", t.style.margin = 0, t.style.top = "20px", e.appendChild(t, e.firstChild), O = t.offsetTop == 20, e.removeChild(t)
  }

  function _(e) {
    return e.target
  }

  function D(e) {
    return [e.pageX, e.pageY]
  }

  function P(e) {
    e.preventDefault()
  }

  function H(e) {
    return e.keyCode
  }

  function B(e, t, n) {
    jQuery(e).bind(t, n)
  }

  function j(e, t, n) {
    jQuery(e).unbind(t, n)
  }

  function q() {
    if (F) return;
    try {
      document.documentElement.doScroll("left")
    } catch (e) {
      setTimeout(q, 1);
      return
    }
    n.load()
  }

  function R() {
    if (document.readyState === "complete") return n.load();
    if (document.addEventListener) document.addEventListener("DOMContentLoaded", I, !1), e.addEventListener("load", n.load, !1);
    else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", I), e.attachEvent("onload", n.load);
      var t = !1;
      try {
        t = e.frameElement === null
      } catch (r) {}
      document.documentElement.doScroll && t && q()
    }
  }

  function J(e) {
    n.open(this), n.gallery.length && P(e)
  }

  function et() {
    G = {
      x: 0,
      y: 0,
      startX: null,
      startY: null
    }
  }

  function tt() {
    var e = n.dimensions;
    x(Y.style, {
      height: e.innerHeight + "px",
      width: e.innerWidth + "px"
    })
  }

  function nt() {
    et();
    var e = ["position:absolute", "cursor:" + (n.isGecko ? "-moz-grab" : "move"), "background-color:" + (n.isIE ? "#fff;filter:alpha(opacity=0)" : "transparent")].join(";");
    n.appendHTML(n.skin.body, '<div id="' + Q + '" style="' + e + '"></div>'), Y = k(Q), tt(), B(Y, "mousedown", it)
  }

  function rt() {
    Y && (j(Y, "mousedown", it), L(Y), Y = null), Z = null
  }

  function it(e) {
    P(e);
    var t = D(e);
    G.startX = t[0], G.startY = t[1], Z = k(n.player.id), B(document, "mousemove", st), B(document, "mouseup", ot), n.isGecko && (Y.style.cursor = "-moz-grabbing")
  }

  function st(e) {
    var t = n.player,
      r = n.dimensions,
      i = D(e),
      s = i[0] - G.startX;
    G.startX += s, G.x = Math.max(Math.min(0, G.x + s), r.innerWidth - t.width);
    var o = i[1] - G.startY;
    G.startY += o, G.y = Math.max(Math.min(0, G.y + o), r.innerHeight - t.height), x(Z.style, {
      left: G.x + "px",
      top: G.y + "px"
    })
  }

  function ot() {
    j(document, "mousemove", st), j(document, "mouseup", ot), n.isGecko && (Y.style.cursor = "-moz-grab")
  }

  function dt(e, t, r, i, s) {
    var o = t == "opacity",
      u = o ? n.setOpacity : function(e, n) {
        e.style[t] = "" + n + "px"
      };
    if (i == 0 || !o && !n.options.animate || o && !n.options.animateFade) {
      u(e, r), s && s();
      return
    }
    var a = parseFloat(n.getStyle(e, t)) || 0,
      f = r - a;
    if (f == 0) {
      s && s();
      return
    }
    i *= 1e3;
    var l = S(),
      c = n.ease,
      h = l + i,
      p, d = setInterval(function() {
        p = S(), p >= h ? (clearInterval(d), d = null, u(e, r), s && s()) : u(e, a + c((p - l) / i) * f)
      }, 10)
  }

  function vt() {
    lt.style.height = n.getWindowSize("Height") + "px", lt.style.width = n.getWindowSize("Width") + "px"
  }

  function mt() {
    lt.style.top = document.documentElement.scrollTop + "px", lt.style.left = document.documentElement.scrollLeft + "px"
  }

  function gt(e) {
    e ? T(at, function(e, t) {
      t[0].style.visibility = t[1] || ""
    }) : (at = [], T(n.options.troubleElements, function(e, t) {
      T(document.getElementsByTagName(t), function(e, t) {
        at.push([t, t.style.visibility]), t.style.visibility = "hidden"
      })
    }))
  }

  function yt(e, t) {
    var n = k("sb-nav-" + e);
    n && (n.style.display = t ? "" : "none")
  }

  function bt(e, t) {
    var r = k("sb-loading"),
      i = n.getCurrent().player,
      s = i == "img" || i == "html";
    if (e) {
      n.setOpacity(r, 0), r.style.display = "block";
      var o = function() {
        n.clearOpacity(r), t && t()
      };
      s ? dt(r, "opacity", 1, n.options.fadeDuration, o) : o()
    } else {
      var o = function() {
        r.style.display = "none", n.clearOpacity(r), t && t()
      };
      s ? dt(r, "opacity", 0, n.options.fadeDuration, o) : o()
    }
  }

  function wt(e) {
    var t = n.getCurrent();
    k("sb-title-inner").innerHTML = t.title || "";
    var r, i, s, o, u;
    if (n.options.displayNav) {
      r = !0;
      var a = n.gallery.length;
      a > 1 && (n.options.continuous ? i = u = !0 : (i = a - 1 > n.current, u = n.current > 0)), n.options.slideshowDelay > 0 && n.hasNext() && (o = !n.isPaused(), s = !o)
    } else r = i = s = o = u = !1;
    yt("close", r), yt("next", i), yt("play", s), yt("pause", o), yt("previous", u);
    var f = "";
    if (n.options.displayCounter && n.gallery.length > 1) {
      var a = n.gallery.length;
      if (n.options.counterType == "skip") {
        var l = 0,
          c = a,
          h = parseInt(n.options.counterLimit) || 0;
        if (h < a && h > 2) {
          var p = Math.floor(h / 2);
          l = n.current - p, l < 0 && (l += a), c = n.current + (h - p), c > a && (c -= a)
        }
        while (l != c) l == a && (l = 0), f += '<a onclick="Shadowbox.change(' + l + ');"', l == n.current && (f += ' class="sb-counter-current"'), f += ">" + ++l + "</a>"
      } else f = [n.current + 1, n.lang.of, a].join(" ")
    }
    k("sb-counter").innerHTML = f, e()
  }

  function Et(e) {
    var t = k("sb-title-inner"),
      n = k("sb-info-inner"),
      r = .35;
    t.style.visibility = n.style.visibility = "", t.innerHTML != "" && dt(t, "marginTop", 0, r), dt(n, "marginTop", 0, r, e)
  }

  function St(e, t) {
    var n = k("sb-title"),
      r = k("sb-info"),
      i = n.offsetHeight,
      s = r.offsetHeight,
      o = k("sb-title-inner"),
      u = k("sb-info-inner"),
      a = e ? .35 : 0;
    dt(o, "marginTop", i, a), dt(u, "marginTop", s * -1, a, function() {
      o.style.visibility = u.style.visibility = "hidden", t()
    })
  }

  function xt(e, t, r, i) {
    var s = k("sb-wrapper-inner"),
      o = r ? n.options.resizeDuration : 0;
    dt(ht, "top", t, o), dt(s, "height", e, o, i)
  }

  function Tt(e, t, r, i) {
    var s = r ? n.options.resizeDuration : 0;
    dt(ht, "left", t, s), dt(ht, "width", e, s, i)
  }

  function Nt(e, t) {
    var r = k("sb-body-inner"),
      e = parseInt(e),
      t = parseInt(t),
      i = ht.offsetHeight - r.offsetHeight,
      s = ht.offsetWidth - r.offsetWidth,
      o = ct.offsetHeight,
      u = ct.offsetWidth,
      a = parseInt(n.options.viewportPadding) || 20,
      f = n.player && n.options.handleOversize != "drag";
    return n.setDimensions(e, t, o, u, i, s, a, f)
  }
  var n = {
      version: "3.0.3"
    },
    r = navigator.userAgent.toLowerCase();
  r.indexOf("windows") > -1 || r.indexOf("win32") > -1 ? n.isWindows = !0 : r.indexOf("macintosh") > -1 || r.indexOf("mac os x") > -1 ? n.isMac = !0 : r.indexOf("linux") > -1 && (n.isLinux = !0), n.isIE = r.indexOf("msie") > -1, n.isIE6 = r.indexOf("msie 6") > -1, n.isIE7 = r.indexOf("msie 7") > -1, n.isGecko = r.indexOf("gecko") > -1 && r.indexOf("safari") == -1, n.isWebKit = r.indexOf("applewebkit/") > -1;
  var i = /#(.+)$/,
    s = /^(light|shadow)box\[(.*?)\]/i,
    o = /\s*([a-z_]*?)\s*=\s*(.+)\s*/,
    u = /[0-9a-z]+$/i,
    a = /(.+\/)shadowbox\.js/i,
    f = !1,
    l = !1,
    c = {},
    h = 0,
    p, d;
  n.current = -1, n.dimensions = null, n.ease = function(e) {
    return 1 + Math.pow(e - 1, 3)
  }, n.errorInfo = {
    fla: {
      name: "Flash",
      url: "http://www.adobe.com/products/flashplayer/"
    },
    qt: {
      name: "QuickTime",
      url: "http://www.apple.com/quicktime/download/"
    },
    wmp: {
      name: "Windows Media Player",
      url: "http://www.microsoft.com/windows/windowsmedia/"
    },
    f4m: {
      name: "Flip4Mac",
      url: "http://www.flip4mac.com/wmv_download.htm"
    }
  }, n.gallery = [], n.onReady = C, n.path = null, n.player = null, n.playerId = "sb-player", n.options = {
    animate: !0,
    animateFade: !0,
    autoplayMovies: !0,
    continuous: !1,
    enableKeys: !0,
    flashParams: {
      bgcolor: "#000000",
      allowfullscreen: !0
    },
    flashVars: {},
    flashVersion: "9.0.115",
    handleOversize: "resize",
    handleUnsupported: "link",
    onChange: C,
    onClose: C,
    onFinish: C,
    onOpen: C,
    showMovieControls: !0,
    skipSetup: !1,
    slideshowDelay: 0,
    viewportPadding: 20
  }, n.getCurrent = function() {
    return n.current > -1 ? n.gallery[n.current] : null
  }, n.hasNext = function() {
    return n.gallery.length > 1 && (n.current != n.gallery.length - 1 || n.options.continuous)
  }, n.isOpen = function() {
    return f
  }, n.isPaused = function() {
    return d == "pause"
  }, n.applyOptions = function(e) {
    c = x({}, n.options), x(n.options, e)
  }, n.revertOptions = function() {
    x(n.options, c)
  }, n.init = function(e, t) {
    if (l) return;
    l = !0, n.skin.options && x(n.options, n.skin.options), e && x(n.options, e);
    if (!n.path) {
      var r, i = document.getElementsByTagName("script");
      for (var s = 0, o = i.length; s < o; ++s) {
        r = a.exec(i[s].src);
        if (r) {
          n.path = r[1];
          break
        }
      }
    }
    t && (n.onReady = t), R()
  }, n.open = function(e) {
    if (f) return;
    var t = n.makeGallery(e);
    n.gallery = t[0], n.current = t[1], e = n.getCurrent();
    if (e == null) return;
    n.applyOptions(e.options || {}), v();
    if (n.gallery.length) {
      e = n.getCurrent();
      if (n.options.onOpen(e) === !1) return;
      f = !0, n.skin.onOpen(e, y)
    }
  }, n.close = function() {
    if (!f) return;
    f = !1, n.player && (n.player.remove(), n.player = null), typeof d == "number" && (clearTimeout(d), d = null), h = 0, m(!1), n.options.onClose(n.getCurrent()), n.skin.onClose(), n.revertOptions()
  }, n.play = function() {
    if (!n.hasNext()) return;
    h || (h = n.options.slideshowDelay * 1e3), h && (p = S(), d = setTimeout(function() {
      h = p = 0, n.next()
    }, h), n.skin.onPlay && n.skin.onPlay())
  }, n.pause = function() {
    if (typeof d != "number") return;
    h = Math.max(0, h - (S() - p)), h && (clearTimeout(d), d = "pause", n.skin.onPause && n.skin.onPause())
  }, n.change = function(e) {
    if (!(e in n.gallery)) {
      if (!n.options.continuous) return;
      e = e < 0 ? n.gallery.length + e : 0;
      if (!(e in n.gallery)) return
    }
    n.current = e, typeof d == "number" && (clearTimeout(d), d = null, h = p = 0), n.options.onChange(n.getCurrent()), y(!0)
  }, n.next = function() {
    n.change(n.current + 1)
  }, n.previous = function() {
    n.change(n.current - 1)
  }, n.setDimensions = function(e, t, r, i, s, o, u, a) {
    var f = e,
      l = t,
      c = 2 * u + s;
    e + c > r && (e = r - c);
    var h = 2 * u + o;
    t + h > i && (t = i - h);
    var p = (f - e) / f,
      d = (l - t) / l,
      v = p > 0 || d > 0;
    return a && v && (p > d ? t = Math.round(l / f * e) : d > p && (e = Math.round(f / l * t))), n.dimensions = {
      height: e + s,
      width: t + o,
      innerHeight: e,
      innerWidth: t,
      top: Math.floor((r - (e + c)) / 2 + u),
      left: Math.floor((i - (t + h)) / 2 + u),
      oversized: v
    }, n.dimensions
  }, n.makeGallery = function(e) {
    var t = [],
      r = -1;
    typeof e == "string" && (e = [e]);
    if (typeof e.length == "number") T(e, function(e, n) {
      n.content ? t[e] = n : t[e] = {
        content: n
      }
    }), r = 0;
    else {
      if (e.tagName) {
        var i = n.getCache(e);
        e = i ? i : n.makeObject(e)
      }
      if (e.gallery) {
        t = [];
        var s;
        for (var o in n.cache) s = n.cache[o], s.gallery && s.gallery == e.gallery && (r == -1 && s.content == e.content && (r = t.length), t.push(s));
        r == -1 && (t.unshift(e), r = 0)
      } else t = [e], r = 0
    }
    return T(t, function(e, n) {
      t[e] = x({}, n)
    }), [t, r]
  }, n.makeObject = function(e, t) {
    var r = {
      content: e.href,
      title: e.getAttribute("title") || "",
      link: e
    };
    t ? (t = x({}, t), T(["player", "title", "height", "width", "gallery"], function(e, n) {
      typeof t[n] != "undefined" && (r[n] = t[n], delete t[n])
    }), r.options = t) : r.options = {}, r.player || (r.player = n.getPlayer(r.content));
    var i = e.getAttribute("rel");
    if (i) {
      var u = i.match(s);
      u && (r.gallery = escape(u[2])), T(i.split(";"), function(e, t) {
        u = t.match(o), u && (r[u[1]] = u[2])
      })
    }
    return r
  }, n.getPlayer = function(e) {
    if (e.indexOf("#") > -1 && e.indexOf(document.location.href) == 0) return "inline";
    var t = e.indexOf("?");
    t > -1 && (e = e.substring(0, t));
    var r, i = e.match(u);
    i && (r = i[0].toLowerCase());
    if (r) {
      if (n.img && n.img.ext.indexOf(r) > -1) return "img";
      if (n.swf && n.swf.ext.indexOf(r) > -1) return "swf";
      if (n.flv && n.flv.ext.indexOf(r) > -1) return "flv";
      if (n.qt && n.qt.ext.indexOf(r) > -1) return n.wmp && n.wmp.ext.indexOf(r) > -1 ? "qtwmp" : "qt";
      if (n.wmp && n.wmp.ext.indexOf(r) > -1) return "wmp"
    }
    return "iframe"
  }, Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
    var n = this.length >>> 0;
    t = t || 0, t < 0 && (t += n);
    for (; t < n; ++t)
      if (t in this && this[t] === e) return t;
    return -1
  });
  var A = !0,
    O = !0;
  n.getStyle = function() {
    var e = /opacity=([^)]*)/,
      t = document.defaultView && document.defaultView.getComputedStyle;
    return function(n, r) {
      var i;
      if (!A && r == "opacity" && n.currentStyle) return i = e.test(n.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "", i === "" ? "1" : i;
      if (t) {
        var s = t(n, null);
        s && (i = s[r]), r == "opacity" && i == "" && (i = "1")
      } else i = n.currentStyle[r];
      return i
    }
  }(), n.appendHTML = function(e, t) {
    if (e.insertAdjacentHTML) e.insertAdjacentHTML("BeforeEnd", t);
    else if (e.lastChild) {
      var n = e.ownerDocument.createRange();
      n.setStartAfter(e.lastChild);
      var r = n.createContextualFragment(t);
      e.appendChild(r)
    } else e.innerHTML = t
  }, n.getWindowSize = function(e) {
    return document.compatMode === "CSS1Compat" ? document.documentElement["client" + e] : document.body["client" + e]
  }, n.setOpacity = function(e, t) {
    var n = e.style;
    A ? n.opacity = t == 1 ? "" : t : (n.zoom = 1, t == 1 ? typeof n.filter == "string" && /alpha/i.test(n.filter) && (n.filter = n.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi, "")) : n.filter = (n.filter || "").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi, "") + " alpha(opacity=" + t * 100 + ")")
  }, n.clearOpacity = function(e) {
    n.setOpacity(e, 1)
  }, jQuery.fn.shadowbox = function(e) {
    return this.each(function() {
      var t = jQuery(this),
        n = jQuery.extend({}, e || {}, jQuery.metadata ? t.metadata() : jQuery.meta ? t.data() : {}),
        r = this.className || "";
      n.width = parseInt((r.match(/w:(\d+)/) || [])[1]) || n.width, n.height = parseInt((r.match(/h:(\d+)/) || [])[1]) || n.height, Shadowbox.setup(t, n)
    })
  };
  var F = !1,
    I;
  document.addEventListener ? I = function() {
    document.removeEventListener("DOMContentLoaded", I, !1), n.load()
  } : document.attachEvent && (I = function() {
    document.readyState === "complete" && (document.detachEvent("onreadystatechange", I), n.load())
  }), n.load = function() {
    if (F) return;
    if (!document.body) return setTimeout(n.load, 13);
    F = !0, M(), n.onReady(), n.options.skipSetup || n.setup(), n.skin.init()
  }, n.plugins = {};
  if (navigator.plugins && navigator.plugins.length) {
    var U = [];
    T(navigator.plugins, function(e, t) {
      U.push(t.name)
    }), U = U.join(",");
    var z = U.indexOf("Flip4Mac") > -1;
    n.plugins = {
      fla: U.indexOf("Shockwave Flash") > -1,
      qt: U.indexOf("QuickTime") > -1,
      wmp: !z && U.indexOf("Windows Media") > -1,
      f4m: z
    }
  } else {
    var W = function(e) {
      var t;
      try {
        t = new ActiveXObject(e)
      } catch (n) {}
      return !!t
    };
    n.plugins = {
      fla: W("ShockwaveFlash.ShockwaveFlash"),
      qt: W("QuickTime.QuickTime"),
      wmp: W("wmplayer.ocx"),
      f4m: !1
    }
  }
  var X = /^(light|shadow)box/i,
    V = "shadowboxCacheKey",
    $ = 1;
  n.cache = {}, n.select = function(e) {
    var t = [];
    if (!e) {
      var r;
      T(document.getElementsByTagName("a"), function(e, n) {
        r = n.getAttribute("rel"), r && X.test(r) && t.push(n)
      })
    } else {
      var i = e.length;
      if (i)
        if (typeof e == "string") n.find && (t = n.find(e));
        else if (i == 2 && typeof e[0] == "string" && e[1].nodeType) n.find && (t = n.find(e[0], e[1]));
      else
        for (var s = 0; s < i; ++s) t[s] = e[s];
      else t.push(e)
    }
    return t
  }, n.setup = function(e, t) {
    T(n.select(e), function(e, r) {
      n.addCache(r, t)
    })
  }, n.teardown = function(e) {
    T(n.select(e), function(e, t) {
      n.removeCache(t)
    })
  }, n.addCache = function(e, r) {
    var i = e[V];
    i == t && (i = $++, e[V] = i, B(e, "click", J)), n.cache[i] = n.makeObject(e, r)
  }, n.removeCache = function(e) {
    j(e, "click", J), delete n.cache[e[V]], e[V] = null
  }, n.getCache = function(e) {
    var t = e[V];
    return t in n.cache && n.cache[t]
  }, n.clearCache = function() {
    for (var e in n.cache) n.removeCache(n.cache[e].link);
    n.cache = {}
  }, n.find = function() {
    function p(e) {
      var t = "",
        n;
      for (var r = 0; e[r]; r++) n = e[r], n.nodeType === 3 || n.nodeType === 4 ? t += n.nodeValue : n.nodeType !== 8 && (t += p(n.childNodes));
      return t
    }

    function d(e, t, n, r, i, s) {
      for (var o = 0, u = r.length; o < u; o++) {
        var a = r[o];
        if (a) {
          a = a[e];
          var f = !1;
          while (a) {
            if (a.sizcache === n) {
              f = r[a.sizset];
              break
            }
            a.nodeType === 1 && !s && (a.sizcache = n, a.sizset = o);
            if (a.nodeName.toLowerCase() === t) {
              f = a;
              break
            }
            a = a[e]
          }
          r[o] = f
        }
      }
    }

    function v(e, t, n, r, i, s) {
      for (var u = 0, a = r.length; u < a; u++) {
        var f = r[u];
        if (f) {
          f = f[e];
          var l = !1;
          while (f) {
            if (f.sizcache === n) {
              l = r[f.sizset];
              break
            }
            if (f.nodeType === 1) {
              s || (f.sizcache = n, f.sizset = u);
              if (typeof t != "string") {
                if (f === t) {
                  l = !0;
                  break
                }
              } else if (o.filter(t, [f]).length > 0) {
                l = f;
                break
              }
            }
            f = f[e]
          }
          r[u] = l
        }
      }
    }
    var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
      n = 0,
      r = Object.prototype.toString,
      i = !1,
      s = !0;
    [0, 0].sort(function() {
      return s = !1, 0
    });
    var o = function(t, n, i, s) {
      i = i || [];
      var f = n = n || document;
      if (n.nodeType !== 1 && n.nodeType !== 9) return [];
      if (!t || typeof t != "string") return i;
      var c = [],
        h, p, d, v, b = !0,
        w = g(n),
        E = t;
      while ((e.exec(""), h = e.exec(E)) !== null) {
        E = h[3], c.push(h[1]);
        if (h[2]) {
          v = h[3];
          break
        }
      }
      if (c.length > 1 && a.exec(t))
        if (c.length === 2 && u.relative[c[0]]) p = y(c[0] + c[1], n);
        else {
          p = u.relative[c[0]] ? [n] : o(c.shift(), n);
          while (c.length) t = c.shift(), u.relative[t] && (t += c.shift()), p = y(t, p)
        }
      else {
        if (!s && c.length > 1 && n.nodeType === 9 && !w && u.match.ID.test(c[0]) && !u.match.ID.test(c[c.length - 1])) {
          var S = o.find(c.shift(), n, w);
          n = S.expr ? o.filter(S.expr, S.set)[0] : S.set[0]
        }
        if (n) {
          var S = s ? {
            expr: c.pop(),
            set: l(s)
          } : o.find(c.pop(), c.length !== 1 || c[0] !== "~" && c[0] !== "+" || !n.parentNode ? n : n.parentNode, w);
          p = S.expr ? o.filter(S.expr, S.set) : S.set, c.length > 0 ? d = l(p) : b = !1;
          while (c.length) {
            var x = c.pop(),
              T = x;
            u.relative[x] ? T = c.pop() : x = "", T == null && (T = n), u.relative[x](d, T, w)
          }
        } else d = c = []
      }
      d || (d = p);
      if (!d) throw "Syntax error, unrecognized expression: " + (x || t);
      if (r.call(d) === "[object Array]")
        if (!b) i.push.apply(i, d);
        else if (n && n.nodeType === 1)
        for (var N = 0; d[N] != null; N++) d[N] && (d[N] === !0 || d[N].nodeType === 1 && m(n, d[N])) && i.push(p[N]);
      else
        for (var N = 0; d[N] != null; N++) d[N] && d[N].nodeType === 1 && i.push(p[N]);
      else l(d, i);
      return v && (o(v, f, i, s), o.uniqueSort(i)), i
    };
    o.uniqueSort = function(e) {
      if (h) {
        i = s, e.sort(h);
        if (i)
          for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
      }
      return e
    }, o.matches = function(e, t) {
      return o(e, null, null, t)
    }, o.find = function(e, t, n) {
      var r, i;
      if (!e) return [];
      for (var s = 0, o = u.order.length; s < o; s++) {
        var a = u.order[s],
          i;
        if (i = u.leftMatch[a].exec(e)) {
          var f = i[1];
          i.splice(1, 1);
          if (f.substr(f.length - 1) !== "\\") {
            i[1] = (i[1] || "").replace(/\\/g, ""), r = u.find[a](i, t, n);
            if (r != null) {
              e = e.replace(u.match[a], "");
              break
            }
          }
        }
      }
      return r || (r = t.getElementsByTagName("*")), {
        set: r,
        expr: e
      }
    }, o.filter = function(e, n, r, i) {
      var s = e,
        o = [],
        a = n,
        f, l, c = n && n[0] && g(n[0]);
      while (e && n.length) {
        for (var h in u.filter)
          if ((f = u.match[h].exec(e)) != null) {
            var p = u.filter[h],
              d, v;
            l = !1, a === o && (o = []);
            if (u.preFilter[h]) {
              f = u.preFilter[h](f, a, r, o, i, c);
              if (!f) l = d = !0;
              else if (f === !0) continue
            }
            if (f)
              for (var m = 0;
                (v = a[m]) != null; m++)
                if (v) {
                  d = p(v, f, m, a);
                  var y = i ^ !!d;
                  r && d != null ? y ? l = !0 : a[m] = !1 : y && (o.push(v), l = !0)
                }
            if (d !== t) {
              r || (a = o), e = e.replace(u.match[h], "");
              if (!l) return [];
              break
            }
          }
        if (e === s) {
          if (l == null) throw "Syntax error, unrecognized expression: " + e;
          break
        }
        s = e
      }
      return a
    };
    var u = o.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
          ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
          CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
          NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
          ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
          TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
          CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
          POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
          PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
          "class": "className",
          "for": "htmlFor"
        },
        attrHandle: {
          href: function(e) {
            return e.getAttribute("href")
          }
        },
        relative: {
          "+": function(e, t) {
            var n = typeof t == "string",
              r = n && !/\W/.test(t),
              i = n && !r;
            r && (t = t.toLowerCase());
            for (var s = 0, u = e.length, a; s < u; s++)
              if (a = e[s]) {
                while ((a = a.previousSibling) && a.nodeType !== 1);
                e[s] = i || a && a.nodeName.toLowerCase() === t ? a || !1 : a === t
              }
            i && o.filter(t, e, !0)
          },
          ">": function(e, t) {
            var n = typeof t == "string";
            if (n && !/\W/.test(t)) {
              t = t.toLowerCase();
              for (var r = 0, i = e.length; r < i; r++) {
                var s = e[r];
                if (s) {
                  var u = s.parentNode;
                  e[r] = u.nodeName.toLowerCase() === t ? u : !1
                }
              }
            } else {
              for (var r = 0, i = e.length; r < i; r++) {
                var s = e[r];
                s && (e[r] = n ? s.parentNode : s.parentNode === t)
              }
              n && o.filter(t, e, !0)
            }
          },
          "": function(e, t, r) {
            var i = n++,
              s = v;
            if (typeof t == "string" && !/\W/.test(t)) {
              var o = t = t.toLowerCase();
              s = d
            }
            s("parentNode", t, i, e, o, r)
          },
          "~": function(e, t, r) {
            var i = n++,
              s = v;
            if (typeof t == "string" && !/\W/.test(t)) {
              var o = t = t.toLowerCase();
              s = d
            }
            s("previousSibling", t, i, e, o, r)
          }
        },
        find: {
          ID: function(e, t, n) {
            if (typeof t.getElementById != "undefined" && !n) {
              var r = t.getElementById(e[1]);
              return r ? [r] : []
            }
          },
          NAME: function(e, t) {
            if (typeof t.getElementsByName != "undefined") {
              var n = [],
                r = t.getElementsByName(e[1]);
              for (var i = 0, s = r.length; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
              return n.length === 0 ? null : n
            }
          },
          TAG: function(e, t) {
            return t.getElementsByTagName(e[1])
          }
        },
        preFilter: {
          CLASS: function(e, t, n, r, i, s) {
            e = " " + e[1].replace(/\\/g, "") + " ";
            if (s) return e;
            for (var o = 0, u;
              (u = t[o]) != null; o++) u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
            return !1
          },
          ID: function(e) {
            return e[1].replace(/\\/g, "")
          },
          TAG: function(e, t) {
            return e[1].toLowerCase()
          },
          CHILD: function(e) {
            if (e[1] === "nth") {
              var t = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
              e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
            }
            return e[0] = n++, e
          },
          ATTR: function(e, t, n, r, i, s) {
            var o = e[1].replace(/\\/g, "");
            return !s && u.attrMap[o] && (e[1] = u.attrMap[o]), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
          },
          PSEUDO: function(t, n, r, i, s) {
            if (t[1] === "not") {
              if (!((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                var a = o.filter(t[3], n, r, !0 ^ s);
                return r || i.push.apply(i, a), !1
              }
              t[3] = o(t[3], null, null, n)
            } else if (u.match.POS.test(t[0]) || u.match.CHILD.test(t[0])) return !0;
            return t
          },
          POS: function(e) {
            return e.unshift(!0), e
          }
        },
        filters: {
          enabled: function(e) {
            return e.disabled === !1 && e.type !== "hidden"
          },
          disabled: function(e) {
            return e.disabled === !0
          },
          checked: function(e) {
            return e.checked === !0
          },
          selected: function(e) {
            return e.parentNode.selectedIndex, e.selected === !0
          },
          parent: function(e) {
            return !!e.firstChild
          },
          empty: function(e) {
            return !e.firstChild
          },
          has: function(e, t, n) {
            return !!o(n[3], e).length
          },
          header: function(e) {
            return /h\d/i.test(e.nodeName)
          },
          text: function(e) {
            return "text" === e.type
          },
          radio: function(e) {
            return "radio" === e.type
          },
          checkbox: function(e) {
            return "checkbox" === e.type
          },
          file: function(e) {
            return "file" === e.type
          },
          password: function(e) {
            return "password" === e.type
          },
          submit: function(e) {
            return "submit" === e.type
          },
          image: function(e) {
            return "image" === e.type
          },
          reset: function(e) {
            return "reset" === e.type
          },
          button: function(e) {
            return "button" === e.type || e.nodeName.toLowerCase() === "button"
          },
          input: function(e) {
            return /input|select|textarea|button/i.test(e.nodeName)
          }
        },
        setFilters: {
          first: function(e, t) {
            return t === 0
          },
          last: function(e, t, n, r) {
            return t === r.length - 1
          },
          even: function(e, t) {
            return t % 2 === 0
          },
          odd: function(e, t) {
            return t % 2 === 1
          },
          lt: function(e, t, n) {
            return t < n[3] - 0
          },
          gt: function(e, t, n) {
            return t > n[3] - 0
          },
          nth: function(e, t, n) {
            return n[3] - 0 === t
          },
          eq: function(e, t, n) {
            return n[3] - 0 === t
          }
        },
        filter: {
          PSEUDO: function(e, t, n, r) {
            var i = t[1],
              s = u.filters[i];
            if (s) return s(e, n, t, r);
            if (i === "contains") return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
            if (i === "not") {
              var o = t[3];
              for (var n = 0, a = o.length; n < a; n++)
                if (o[n] === e) return !1;
              return !0
            }
            throw "Syntax error, unrecognized expression: " + i
          },
          CHILD: function(e, t) {
            var n = t[1],
              r = e;
            switch (n) {
              case "only":
              case "first":
                while (r = r.previousSibling)
                  if (r.nodeType === 1) return !1;
                if (n === "first") return !0;
                r = e;
              case "last":
                while (r = r.nextSibling)
                  if (r.nodeType === 1) return !1;
                return !0;
              case "nth":
                var i = t[2],
                  s = t[3];
                if (i === 1 && s === 0) return !0;
                var o = t[0],
                  u = e.parentNode;
                if (u && (u.sizcache !== o || !e.nodeIndex)) {
                  var a = 0;
                  for (r = u.firstChild; r; r = r.nextSibling) r.nodeType === 1 && (r.nodeIndex = ++a);
                  u.sizcache = o
                }
                var f = e.nodeIndex - s;
                return i === 0 ? f === 0 : f % i === 0 && f / i >= 0
            }
          },
          ID: function(e, t) {
            return e.nodeType === 1 && e.getAttribute("id") === t
          },
          TAG: function(e, t) {
            return t === "*" && e.nodeType === 1 || e.nodeName.toLowerCase() === t
          },
          CLASS: function(e, t) {
            return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
          },
          ATTR: function(e, t) {
            var n = t[1],
              r = u.attrHandle[n] ? u.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
              i = r + "",
              s = t[2],
              o = t[4];
            return r == null ? s === "!=" : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
          },
          POS: function(e, t, n, r) {
            var i = t[2],
              s = u.setFilters[i];
            if (s) return s(e, n, t, r)
          }
        }
      },
      a = u.match.POS;
    for (var f in u.match) u.match[f] = new RegExp(u.match[f].source + /(?![^\[]*\])(?![^\(]*\))/.source), u.leftMatch[f] = new RegExp(/(^(?:.|\r|\n)*?)/.source + u.match[f].source);
    var l = function(e, t) {
      return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
    };
    try {
      Array.prototype.slice.call(document.documentElement.childNodes, 0)
    } catch (c) {
      l = function(e, t) {
        var n = t || [];
        if (r.call(e) === "[object Array]") Array.prototype.push.apply(n, e);
        else if (typeof e.length == "number")
          for (var i = 0, s = e.length; i < s; i++) n.push(e[i]);
        else
          for (var i = 0; e[i]; i++) n.push(e[i]);
        return n
      }
    }
    var h;
    document.documentElement.compareDocumentPosition ? h = function(e, t) {
        if (!e.compareDocumentPosition || !t.compareDocumentPosition) return e == t && (i = !0), e.compareDocumentPosition ? -1 : 1;
        var n = e.compareDocumentPosition(t) & 4 ? -1 : e === t ? 0 : 1;
        return n === 0 && (i = !0), n
      } : "sourceIndex" in document.documentElement ? h = function(e, t) {
        if (!e.sourceIndex || !t.sourceIndex) return e == t && (i = !0), e.sourceIndex ? -1 : 1;
        var n = e.sourceIndex - t.sourceIndex;
        return n === 0 && (i = !0), n
      } : document.createRange && (h = function(e, t) {
        if (!e.ownerDocument || !t.ownerDocument) return e == t && (i = !0), e.ownerDocument ? -1 : 1;
        var n = e.ownerDocument.createRange(),
          r = t.ownerDocument.createRange();
        n.setStart(e, 0), n.setEnd(e, 0), r.setStart(t, 0), r.setEnd(t, 0);
        var s = n.compareBoundaryPoints(Range.START_TO_END, r);
        return s === 0 && (i = !0), s
      }),
      function() {
        var e = document.createElement("div"),
          n = "script" + (new Date).getTime();
        e.innerHTML = "<a name='" + n + "'/>";
        var r = document.documentElement;
        r.insertBefore(e, r.firstChild), document.getElementById(n) && (u.find.ID = function(e, n, r) {
          if (typeof n.getElementById != "undefined" && !r) {
            var i = n.getElementById(e[1]);
            return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
          }
        }, u.filter.ID = function(e, t) {
          var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
          return e.nodeType === 1 && n && n.nodeValue === t
        }), r.removeChild(e), r = e = null
      }(),
      function() {
        var e = document.createElement("div");
        e.appendChild(document.createComment("")), e.getElementsByTagName("*").length > 0 && (u.find.TAG = function(e, t) {
          var n = t.getElementsByTagName(e[1]);
          if (e[1] === "*") {
            var r = [];
            for (var i = 0; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
            n = r
          }
          return n
        }), e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (u.attrHandle.href = function(e) {
          return e.getAttribute("href", 2)
        }), e = null
      }(), document.querySelectorAll && function() {
        var e = o,
          t = document.createElement("div");
        t.innerHTML = "<p class='TEST'></p>";
        if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) return;
        o = function(t, n, r, i) {
          n = n || document;
          if (!i && n.nodeType === 9 && !g(n)) try {
            return l(n.querySelectorAll(t), r)
          } catch (s) {}
          return e(t, n, r, i)
        };
        for (var n in e) o[n] = e[n];
        t = null
      }(),
      function() {
        var e = document.createElement("div");
        e.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) return;
        e.lastChild.className = "e";
        if (e.getElementsByClassName("e").length === 1) return;
        u.order.splice(1, 0, "CLASS"), u.find.CLASS = function(e, t, n) {
          if (typeof t.getElementsByClassName != "undefined" && !n) return t.getElementsByClassName(e[1])
        }, e = null
      }();
    var m = document.compareDocumentPosition ? function(e, t) {
        return e.compareDocumentPosition(t) & 16
      } : function(e, t) {
        return e !== t && (e.contains ? e.contains(t) : !0)
      },
      g = function(e) {
        var t = (e ? e.ownerDocument || e : 0).documentElement;
        return t ? t.nodeName !== "HTML" : !1
      },
      y = function(e, t) {
        var n = [],
          r = "",
          i, s = t.nodeType ? [t] : t;
        while (i = u.match.PSEUDO.exec(e)) r += i[0], e = e.replace(u.match.PSEUDO, "");
        e = u.relative[e] ? e + "*" : e;
        for (var a = 0, f = s.length; a < f; a++) o(e, s[a], n);
        return o.filter(r, n)
      };
    return o
  }(), n.lang = {
    code: "en",
    of: "of",
    loading: "loading",
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",
    play: "Play",
    pause: "Pause",
    close: "Close",
    errors: {
      single: 'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',
      shared: 'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',
      either: 'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'
    }
  };
  var K, Q = "sb-drag-proxy",
    G, Y, Z;
  n.img = function(e, t) {
    this.obj = e, this.id = t, this.ready = !1;
    var n = this;
    K = new Image, K.onload = function() {
      n.height = e.height ? parseInt(e.height, 10) : K.height, n.width = e.width ? parseInt(e.width, 10) : K.width, n.ready = !0, K.onload = null, K = null
    }, K.src = e.content
  }, n.img.ext = ["bmp", "gif", "jpg", "jpeg", "png"], n.img.prototype = {
    append: function(e, t) {
      var r = document.createElement("img");
      r.id = this.id, r.src = this.obj.content, r.style.position = "absolute";
      var i, s;
      t.oversized && n.options.handleOversize == "resize" ? (i = t.innerHeight, s = t.innerWidth) : (i = this.height, s = this.width), r.setAttribute("height", i), r.setAttribute("width", s), e.appendChild(r)
    },
    remove: function() {
      var e = k(this.id);
      e && L(e), rt(), K && (K.onload = null, K = null)
    },
    onLoad: function() {
      var e = n.dimensions;
      e.oversized && n.options.handleOversize == "drag" && nt()
    },
    onWindowResize: function() {
      var e = n.dimensions;
      switch (n.options.handleOversize) {
        case "resize":
          var t = k(this.id);
          t.height = e.innerHeight, t.width = e.innerWidth;
          break;
        case "drag":
          if (Z) {
            var r = parseInt(n.getStyle(Z, "top")),
              i = parseInt(n.getStyle(Z, "left"));
            r + this.height < e.innerHeight && (Z.style.top = e.innerHeight - this.height + "px"), i + this.width < e.innerWidth && (Z.style.left = e.innerWidth - this.width + "px"), tt()
          }
      }
    }
  }, n.iframe = function(e, t) {
    this.obj = e, this.id = t;
    var n = k("sb-overlay");
    this.height = e.height ? parseInt(e.height, 10) : n.offsetHeight, this.width = e.width ? parseInt(e.width, 10) : n.offsetWidth
  }, n.iframe.prototype = {
    append: function(e, t) {
      var r = '<iframe id="' + this.id + '" name="' + this.id + '" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';
      n.isIE && (r += ' allowtransparency="true"', n.isIE6 && (r += " src=\"javascript:false;document.write('');\"")), r += "></iframe>", e.innerHTML = r
    },
    remove: function() {
      var t = k(this.id);
      t && (L(t), n.isGecko && delete e.frames[this.id])
    },
    onLoad: function() {
      var t = n.isIE ? k(this.id).contentWindow : e.frames[this.id];
      t.location.href = this.obj.content
    }
  }, n.html = function(e, t) {
    this.obj = e, this.id = t, this.height = e.height ? parseInt(e.height, 10) : 300, this.width = e.width ? parseInt(e.width, 10) : 500
  }, n.html.prototype = {
    append: function(e, t) {
      var n = document.createElement("div");
      n.id = this.id, n.className = "html", n.innerHTML = this.obj.content, e.appendChild(n)
    },
    remove: function() {
      var e = k(this.id);
      e && L(e)
    }
  };
  var ut = !1,
    at = [],
    ft = ["sb-nav-close", "sb-nav-next", "sb-nav-play", "sb-nav-pause", "sb-nav-previous"],
    lt, ct, ht, pt = !0,
    Ct = {};
  Ct.markup = '<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="next-project"><a>Next Project</a></div><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()">Back to work</a><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-next" title="{next}" onClick="nextVideo();"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onClick="prevVideo();"></a></div><div class="clearfix" id="custom-container"><div id="employer"><div id="agency"></div><div id="city"></div></div><div id="caption"></div><div id="category" class="clearfix"></div></div></div></div><div id="sb-info-inner"></div><div id="sb-info"></div>', Ct.options = {
    animSequence: "sync",
    counterLimit: 10,
    counterType: "skip",
    displayCounter: !0,
    displayNav: !0,
    fadeDuration: .35,
    initialHeight: 160,
    initialWidth: 320,
    modal: !1,
    overlayColor: "#000",
    overlayOpacity: .95,
    resizeDuration: .35,
    showOverlay: !0,
    troubleElements: ["select", "object", "embed", "canvas"]
  }, Ct.init = function() {
    n.appendHTML(document.body, N(Ct.markup, n.lang)), Ct.body = k("sb-body-inner"), lt = k("sb-container"), ct = k("sb-overlay"), ht = k("sb-wrapper"), O || (lt.style.position = "absolute");
    if (!A) {
      var t, r, i = /url\("(.*\.png)"\)/;
      T(ft, function(e, s) {
        t = k(s), t && (r = n.getStyle(t, "backgroundImage").match(i), r && (t.style.backgroundImage = "none", t.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src=" +
          r[1] + ",sizingMethod=scale);"))
      })
    }
    var s;
    B(e, "resize", function() {
      s && (clearTimeout(s), s = null), f && (s = setTimeout(Ct.onWindowResize, 10))
    })
  }, Ct.onOpen = function(t, r) {
    pt = !1, lt.style.display = "block", vt();
    var i = Nt(n.options.initialHeight, n.options.initialWidth);
    xt(i.innerHeight, i.top), Tt(i.width, i.left), n.options.showOverlay && (ct.style.backgroundColor = n.options.overlayColor, n.setOpacity(ct, 0), n.options.modal || B(ct, "click", n.close), ut = !0), O || (mt(), B(e, "scroll", mt)), gt(), lt.style.visibility = "visible", ut ? dt(ct, "opacity", n.options.overlayOpacity, n.options.fadeDuration, r) : r()
  }, Ct.onLoad = function(e, t) {
    bt(!0);
    while (Ct.body.firstChild) L(Ct.body.firstChild);
    St(e, function() {
      if (!f) return;
      e || (ht.style.visibility = "visible"), wt(t)
    })
  }, Ct.onReady = function(e) {
    if (!f) return;
    var t = n.player,
      r = Nt(t.height, t.width),
      i = function() {
        Et(e)
      };
    switch (n.options.animSequence) {
      case "hw":
        xt(r.innerHeight, r.top, !0, function() {
          Tt(r.width, r.left, !0, i)
        });
        break;
      case "wh":
        Tt(r.width, r.left, !0, function() {
          xt(r.innerHeight, r.top, !0, i)
        });
        break;
      default:
        Tt(r.width, r.left, !0), xt(r.innerHeight, r.top, !0, i)
    }
  }, Ct.onShow = function(e) {
    bt(!1, e), pt = !0
  }, Ct.onClose = function() {
    O || j(e, "scroll", mt), j(ct, "click", n.close), ht.style.visibility = "hidden";
    var t = function() {
      lt.style.visibility = "hidden", lt.style.display = "none", gt(!0)
    };
    ut ? dt(ct, "opacity", 0, n.options.fadeDuration, t) : t()
  }, Ct.onPlay = function() {
    yt("play", !1), yt("pause", !0)
  }, Ct.onPause = function() {
    yt("pause", !1), yt("play", !0)
  }, Ct.onWindowResize = function() {
    if (!pt) return;
    vt();
    var e = n.player,
      t = Nt(e.height, e.width);
    Tt(t.width, t.left), xt(t.innerHeight, t.top), e.onWindowResize && e.onWindowResize()
  }, n.skin = Ct, e.Shadowbox = n
})(window);