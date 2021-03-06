

setTimeout(function () {

	var querySelectorShadowDom = function (e) {
		"use strict";

		function r(e, u, s, a) {
			void 0 === a && (a = null), e = function (e) {
				function t() {
					r && (0 < u.length && /^[~+>]$/.test(u[u.length - 1]) && u.push(" "), u.push(r))
				}
				var n, r, l, o, u = [],
					s = [0],
					a = 0,
					h = /(?:[^\\]|(?:^|[^\\])(?:\\\\)+)$/,
					i = /^\s+$/,
					c = [/\s+|\/\*|["'>~+[(]/g, /\s+|\/\*|["'[\]()]/g, /\s+|\/\*|["'[\]()]/g, null, /\*\//g];
				for (e = e.trim(); ;) {
					if (r = "", (l = c[s[s.length - 1]]).lastIndex = a, !(n = l.exec(e))) {
						r = e.substr(a), t();
						break
					}
					if ((o = a) < (a = l.lastIndex) - n[0].length && (r = e.substring(o, a - n[0].length)), s[s.length - 1] < 3) {
						if (t(), "[" === n[0]) s.push(1);
						else if ("(" === n[0]) s.push(2);
						else if (/^["']$/.test(n[0])) s.push(3), c[3] = new RegExp(n[0], "g");
						else if ("/*" === n[0]) s.push(4);
						else if (/^[\])]$/.test(n[0]) && 0 < s.length) s.pop();
						else if (/^(?:\s+|[~+>])$/.test(n[0]) && (0 < u.length && !i.test(u[u.length - 1]) && 0 === s[s.length - 1] && u.push(" "), 1 === s[s.length - 1] && 5 === u.length && "=" === u[2].charAt(u[2].length - 1) && (u[4] = " " + u[4]), i.test(n[0]))) continue;
						u.push(n[0])
					} else u[u.length - 1] += r, h.test(u[u.length - 1]) && (4 === s[s.length - 1] && (u.length < 2 || i.test(u[u.length - 2]) ? u.pop() : u[u.length - 1] = " ", n[0] = ""), s.pop()), u[u.length - 1] += n[0]
				}
				return u.join("").trim()
			}(e);
			var t = s.querySelector(e);
			return document.head.createShadowRoot || document.head.attachShadow ? !u && t ? t : h(e, ",").reduce(function (e, t) {
				if (!u && e) return e;
				var g, d, p, n = h(t.replace(/^\s+/g, "").replace(/\s*([>+~]+)\s*/g, "$1"), " ").filter(function (e) {
					return !!e
				}).map(function (e) {
					return h(e, ">")
				}),
					r = n.length - 1,
					l = i(n[r][n[r].length - 1], s, a),
					o = (g = n, d = r, p = s, function (e) {
						for (var t, n = d, r = e, l = !1; r && (t = r).nodeType !== Node.DOCUMENT_FRAGMENT_NODE && t.nodeType !== Node.DOCUMENT_NODE;) {
							var o = !0;
							if (1 === g[n].length) o = r.matches(g[n]);
							else
								for (var u = [].concat(g[n]).reverse(), s = r, a = u, h = Array.isArray(a), i = 0, a = h ? a : a[Symbol.iterator](); ;) {
									var c;
									if (h) {
										if (i >= a.length) break;
										c = a[i++]
									} else {
										if ((i = a.next()).done) break;
										c = i.value
									}
									var f = c;
									if (!s || !s.matches(f)) {
										o = !1;
										break
									}
									s = v(s, p)
								}
							if (o && 0 === n) {
								l = !0;
								break
							}
							o && n--, r = v(r, p)
						}
						return l
					});
				return u ? e = e.concat(l.filter(o)) : (e = l.find(o)) || null
			}, u ? [] : null) : u ? s.querySelectorAll(e) : t
		}

		function h(e, n) {
			return e.match(/\\?.|^$/g).reduce(function (e, t) {
				return '"' !== t || e.sQuote ? "'" !== t || e.quote ? e.quote || e.sQuote || t !== n ? e.a[e.a.length - 1] += t : e.a.push("") : (e.sQuote ^= 1, e.a[e.a.length - 1] += t) : (e.quote ^= 1, e.a[e.a.length - 1] += t), e
			}, {
				a: [""]
			}).a
		}

		function v(e, t) {
			var n = e.parentNode;
			return n && n.host && 11 === n.nodeType ? n.host : n === t ? null : n
		}

		function i(t, e, n) {
			void 0 === t && (t = null), void 0 === n && (n = null);
			var l = [];
			if (n) l = n;
			else {
				var r = function e(t) {
					for (var n = 0; n < t.length; n++) {
						var r = t[n];
						l.push(r), r.shadowRoot && e(r.shadowRoot.querySelectorAll("*"))
					}
				};
				e.shadowRoot && r(e.shadowRoot.querySelectorAll("*")), r(e.querySelectorAll("*"))
			}
			return t ? l.filter(function (e) {
				return e.matches(t)
			}) : l
		}
		return e.querySelectorAllDeep = function (e, t, n) {
			return void 0 === t && (t = document), void 0 === n && (n = null), r(e, !0, t, n)
		}, e.querySelectorDeep = function (e, t, n) {
			return void 0 === t && (t = document), void 0 === n && (n = null), r(e, !1, t, n)
		}, e.collectAllElementsDeep = i, e
	}({});

	var resizePopup = function () {
		var body = querySelectorShadowDom.querySelectorAllDeep(`.contextual-menu-body`)[0];
		if (body) {
			body.setAttribute("style", "right:30rem;width:50rem")
		}

		var content = querySelectorShadowDom.querySelectorAllDeep(`.contextual-menu-content`)[0];
		if (content) {
			content.setAttribute("style", "width:40rem");
		}

		var container = querySelectorShadowDom.querySelectorAllDeep(`.contextual-menu-top`)[0];
		if (container) {
			container.setAttribute("style", "right:30rem;width:50rem")
		}

		if (!body || !content || !container)
			setTimeout(function () {
				resizePopup();
			}, 2000)
	}

	resizePopup();
}, 3000);