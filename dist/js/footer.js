function findParent(a) {
    return $(a).parent().parent().data("who");
}

function formatDate(a) {
    a || (a = new Date());
    var b = a.getFullYear(), c = a.getMonth() + 1;
    13 == c && (c = 1);
    var d = a.getDate(), e = b.toString() + "-" + c.toString() + "-" + d.toString(), f = a.getHours(), g = a.getMinutes();
    10 > g && (g = "0" + g.toString());
    var h = f.toString() + ":" + g.toString();
    return e + " " + h;
}

!function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Handlebars = b();
}(this, function() {
    var a = function() {
        "use strict";
        function a(a) {
            return i[a];
        }
        function b(a) {
            for (var b = 1; b < arguments.length; b++) for (var c in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
            return a;
        }
        function c(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }
        function d(b) {
            return b && b.toHTML ? b.toHTML() : null == b ? "" : b ? (b = "" + b, k.test(b) ? b.replace(j, a) : b) : b + "";
        }
        function e(a) {
            return a || 0 === a ? n(a) && 0 === a.length ? !0 : !1 : !0;
        }
        function f(a, b) {
            return a.path = b, a;
        }
        function g(a, b) {
            return (a ? a + "." : "") + b;
        }
        var h = {}, i = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, j = /[&<>"'`]/g, k = /[&<>"'`]/;
        h.extend = b;
        var l = Object.prototype.toString;
        h.toString = l;
        var m = function(a) {
            return "function" == typeof a;
        };
        m(/x/) && (m = function(a) {
            return "function" == typeof a && "[object Function]" === l.call(a);
        });
        var m;
        h.isFunction = m;
        var n = Array.isArray || function(a) {
            return a && "object" == typeof a ? "[object Array]" === l.call(a) : !1;
        };
        return h.isArray = n, h.indexOf = c, h.escapeExpression = d, h.isEmpty = e, h.blockParams = f, 
        h.appendContextPath = g, h;
    }(), b = function() {
        "use strict";
        function a(a, b) {
            var d, e, f = b && b.loc;
            f && (d = f.start.line, e = f.start.column, a += " - " + d + ":" + e);
            for (var g = Error.prototype.constructor.call(this, a), h = 0; h < c.length; h++) this[c[h]] = g[c[h]];
            f && (this.lineNumber = d, this.column = e);
        }
        var b, c = [ "description", "fileName", "lineNumber", "message", "name", "number", "stack" ];
        return a.prototype = new Error(), b = a;
    }(), c = function(a, b) {
        "use strict";
        function c(a, b) {
            this.helpers = a || {}, this.partials = b || {}, d(this);
        }
        function d(a) {
            a.registerHelper("helperMissing", function() {
                if (1 === arguments.length) return void 0;
                throw new g("Missing helper: '" + arguments[arguments.length - 1].name + "'");
            }), a.registerHelper("blockHelperMissing", function(b, c) {
                var d = c.inverse, e = c.fn;
                if (b === !0) return e(this);
                if (b === !1 || null == b) return d(this);
                if (k(b)) return b.length > 0 ? (c.ids && (c.ids = [ c.name ]), a.helpers.each(b, c)) : d(this);
                if (c.data && c.ids) {
                    var g = q(c.data);
                    g.contextPath = f.appendContextPath(c.data.contextPath, c.name), c = {
                        data: g
                    };
                }
                return e(b, c);
            }), a.registerHelper("each", function(a, b) {
                function c(b, c, g) {
                    d && (d.key = b, d.index = c, d.first = 0 === c, d.last = !!g, e && (d.contextPath = e + b)), 
                    m += h(a[b], {
                        data: d,
                        blockParams: f.blockParams([ a[b], b ], [ e + b, null ])
                    });
                }
                if (!b) throw new g("Must pass iterator to #each");
                var d, e, h = b.fn, i = b.inverse, j = 0, m = "";
                if (b.data && b.ids && (e = f.appendContextPath(b.data.contextPath, b.ids[0]) + "."), 
                l(a) && (a = a.call(this)), b.data && (d = q(b.data)), a && "object" == typeof a) if (k(a)) for (var n = a.length; n > j; j++) c(j, j, j === a.length - 1); else {
                    var o;
                    for (var p in a) a.hasOwnProperty(p) && (o && c(o, j - 1), o = p, j++);
                    o && c(o, j - 1, !0);
                }
                return 0 === j && (m = i(this)), m;
            }), a.registerHelper("if", function(a, b) {
                return l(a) && (a = a.call(this)), !b.hash.includeZero && !a || f.isEmpty(a) ? b.inverse(this) : b.fn(this);
            }), a.registerHelper("unless", function(b, c) {
                return a.helpers["if"].call(this, b, {
                    fn: c.inverse,
                    inverse: c.fn,
                    hash: c.hash
                });
            }), a.registerHelper("with", function(a, b) {
                l(a) && (a = a.call(this));
                var c = b.fn;
                if (f.isEmpty(a)) return b.inverse(this);
                if (b.data && b.ids) {
                    var d = q(b.data);
                    d.contextPath = f.appendContextPath(b.data.contextPath, b.ids[0]), b = {
                        data: d
                    };
                }
                return c(a, b);
            }), a.registerHelper("log", function(b, c) {
                var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                a.log(d, b);
            }), a.registerHelper("lookup", function(a, b) {
                return a && a[b];
            });
        }
        var e = {}, f = a, g = b, h = "3.0.0";
        e.VERSION = h;
        var i = 6;
        e.COMPILER_REVISION = i;
        var j = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1"
        };
        e.REVISION_CHANGES = j;
        var k = f.isArray, l = f.isFunction, m = f.toString, n = "[object Object]";
        e.HandlebarsEnvironment = c, c.prototype = {
            constructor: c,
            logger: o,
            log: p,
            registerHelper: function(a, b) {
                if (m.call(a) === n) {
                    if (b) throw new g("Arg not supported with multiple helpers");
                    f.extend(this.helpers, a);
                } else this.helpers[a] = b;
            },
            unregisterHelper: function(a) {
                delete this.helpers[a];
            },
            registerPartial: function(a, b) {
                if (m.call(a) === n) f.extend(this.partials, a); else {
                    if ("undefined" == typeof b) throw new g("Attempting to register a partial as undefined");
                    this.partials[a] = b;
                }
            },
            unregisterPartial: function(a) {
                delete this.partials[a];
            }
        };
        var o = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            log: function(a, b) {
                if ("undefined" != typeof console && o.level <= a) {
                    var c = o.methodMap[a];
                    (console[c] || console.log).call(console, b);
                }
            }
        };
        e.logger = o;
        var p = o.log;
        e.log = p;
        var q = function(a) {
            var b = f.extend({}, a);
            return b._parent = a, b;
        };
        return e.createFrame = q, e;
    }(a, b), d = function() {
        "use strict";
        function a(a) {
            this.string = a;
        }
        var b;
        return a.prototype.toString = a.prototype.toHTML = function() {
            return "" + this.string;
        }, b = a;
    }(), e = function(a, b, c) {
        "use strict";
        function d(a) {
            var b = a && a[0] || 1, c = n;
            if (b !== c) {
                if (c > b) {
                    var d = o[c], e = o[b];
                    throw new m("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").");
                }
                throw new m("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").");
            }
        }
        function e(a, b) {
            if (!b) throw new m("No environment passed to template");
            if (!a || !a.main) throw new m("Unknown template object: " + typeof a);
            b.VM.checkRevision(a.compiler);
            var c = function(c, d, e) {
                e.hash && (d = l.extend({}, d, e.hash)), c = b.VM.resolvePartial.call(this, c, d, e);
                var f = b.VM.invokePartial.call(this, c, d, e);
                if (null == f && b.compile && (e.partials[e.name] = b.compile(c, a.compilerOptions, b), 
                f = e.partials[e.name](d, e)), null != f) {
                    if (e.indent) {
                        for (var g = f.split("\n"), h = 0, i = g.length; i > h && (g[h] || h + 1 !== i); h++) g[h] = e.indent + g[h];
                        f = g.join("\n");
                    }
                    return f;
                }
                throw new m("The partial " + e.name + " could not be compiled when running in runtime-only mode");
            }, d = {
                strict: function(a, b) {
                    if (!(b in a)) throw new m('"' + b + '" not defined in ' + a);
                    return a[b];
                },
                lookup: function(a, b) {
                    for (var c = a.length, d = 0; c > d; d++) if (a[d] && null != a[d][b]) return a[d][b];
                },
                lambda: function(a, b) {
                    return "function" == typeof a ? a.call(b) : a;
                },
                escapeExpression: l.escapeExpression,
                invokePartial: c,
                fn: function(b) {
                    return a[b];
                },
                programs: [],
                program: function(a, b, c, d, e) {
                    var g = this.programs[a], h = this.fn(a);
                    return b || e || d || c ? g = f(this, a, h, b, c, d, e) : g || (g = this.programs[a] = f(this, a, h)), 
                    g;
                },
                data: function(a, b) {
                    for (;a && b--; ) a = a._parent;
                    return a;
                },
                merge: function(a, b) {
                    var c = a || b;
                    return a && b && a !== b && (c = l.extend({}, b, a)), c;
                },
                noop: b.VM.noop,
                compilerInfo: a.compiler
            }, e = function(b, c) {
                c = c || {};
                var f = c.data;
                e._setup(c), !c.partial && a.useData && (f = j(b, f));
                var g, h = a.useBlockParams ? [] : void 0;
                return a.useDepths && (g = c.depths ? [ b ].concat(c.depths) : [ b ]), a.main.call(d, b, d.helpers, d.partials, f, h, g);
            };
            return e.isTop = !0, e._setup = function(c) {
                c.partial ? (d.helpers = c.helpers, d.partials = c.partials) : (d.helpers = d.merge(c.helpers, b.helpers), 
                a.usePartial && (d.partials = d.merge(c.partials, b.partials)));
            }, e._child = function(b, c, e, g) {
                if (a.useBlockParams && !e) throw new m("must pass block params");
                if (a.useDepths && !g) throw new m("must pass parent depths");
                return f(d, b, a[b], c, 0, e, g);
            }, e;
        }
        function f(a, b, c, d, e, f, g) {
            var h = function(b, e) {
                return e = e || {}, c.call(a, b, a.helpers, a.partials, e.data || d, f && [ e.blockParams ].concat(f), g && [ b ].concat(g));
            };
            return h.program = b, h.depth = g ? g.length : 0, h.blockParams = e || 0, h;
        }
        function g(a, b, c) {
            return a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = c.partials[c.name], 
            a;
        }
        function h(a, b, c) {
            if (c.partial = !0, void 0 === a) throw new m("The partial " + c.name + " could not be found");
            return a instanceof Function ? a(b, c) : void 0;
        }
        function i() {
            return "";
        }
        function j(a, b) {
            return b && "root" in b || (b = b ? p(b) : {}, b.root = a), b;
        }
        var k = {}, l = a, m = b, n = c.COMPILER_REVISION, o = c.REVISION_CHANGES, p = c.createFrame;
        return k.checkRevision = d, k.template = e, k.program = f, k.resolvePartial = g, 
        k.invokePartial = h, k.noop = i, k;
    }(a, b, c), f = function(a, b, c, d, e) {
        "use strict";
        var f, g = a, h = b, i = c, j = d, k = e, l = function() {
            var a = new g.HandlebarsEnvironment();
            return j.extend(a, g), a.SafeString = h, a.Exception = i, a.Utils = j, a.escapeExpression = j.escapeExpression, 
            a.VM = k, a.template = function(b) {
                return k.template(b, a);
            }, a;
        }, m = l();
        m.create = l;
        var n = "undefined" != typeof global ? global : window, o = n.Handlebars;
        return m.noConflict = function() {
            n.Handlebars === m && (n.Handlebars = o);
        }, m["default"] = m, f = m;
    }(c, d, b, a, e), g = function() {
        "use strict";
        var a, b = {
            Program: function(a, b, c, d) {
                this.loc = d, this.type = "Program", this.body = a, this.blockParams = b, this.strip = c;
            },
            MustacheStatement: function(a, b, c, d, e, f) {
                this.loc = f, this.type = "MustacheStatement", this.path = a, this.params = b || [], 
                this.hash = c, this.escaped = d, this.strip = e;
            },
            BlockStatement: function(a, b, c, d, e, f, g, h, i) {
                this.loc = i, this.type = "BlockStatement", this.path = a, this.params = b || [], 
                this.hash = c, this.program = d, this.inverse = e, this.openStrip = f, this.inverseStrip = g, 
                this.closeStrip = h;
            },
            PartialStatement: function(a, b, c, d, e) {
                this.loc = e, this.type = "PartialStatement", this.name = a, this.params = b || [], 
                this.hash = c, this.indent = "", this.strip = d;
            },
            ContentStatement: function(a, b) {
                this.loc = b, this.type = "ContentStatement", this.original = this.value = a;
            },
            CommentStatement: function(a, b, c) {
                this.loc = c, this.type = "CommentStatement", this.value = a, this.strip = b;
            },
            SubExpression: function(a, b, c, d) {
                this.loc = d, this.type = "SubExpression", this.path = a, this.params = b || [], 
                this.hash = c;
            },
            PathExpression: function(a, b, c, d, e) {
                this.loc = e, this.type = "PathExpression", this.data = a, this.original = d, this.parts = c, 
                this.depth = b;
            },
            StringLiteral: function(a, b) {
                this.loc = b, this.type = "StringLiteral", this.original = this.value = a;
            },
            NumberLiteral: function(a, b) {
                this.loc = b, this.type = "NumberLiteral", this.original = this.value = Number(a);
            },
            BooleanLiteral: function(a, b) {
                this.loc = b, this.type = "BooleanLiteral", this.original = this.value = "true" === a;
            },
            Hash: function(a, b) {
                this.loc = b, this.type = "Hash", this.pairs = a;
            },
            HashPair: function(a, b, c) {
                this.loc = c, this.type = "HashPair", this.key = a, this.value = b;
            },
            helpers: {
                helperExpression: function(a) {
                    return !("SubExpression" !== a.type && !a.params.length && !a.hash);
                },
                scopedId: function(a) {
                    return /^\.|this\b/.test(a.original);
                },
                simpleId: function(a) {
                    return 1 === a.parts.length && !b.helpers.scopedId(a) && !a.depth;
                }
            }
        };
        return a = b;
    }(), h = function() {
        "use strict";
        var a, b = function() {
            function a() {
                this.yy = {};
            }
            var b = {
                trace: function() {},
                yy: {},
                symbols_: {
                    error: 2,
                    root: 3,
                    program: 4,
                    EOF: 5,
                    program_repetition0: 6,
                    statement: 7,
                    mustache: 8,
                    block: 9,
                    rawBlock: 10,
                    partial: 11,
                    content: 12,
                    COMMENT: 13,
                    CONTENT: 14,
                    openRawBlock: 15,
                    END_RAW_BLOCK: 16,
                    OPEN_RAW_BLOCK: 17,
                    helperName: 18,
                    openRawBlock_repetition0: 19,
                    openRawBlock_option0: 20,
                    CLOSE_RAW_BLOCK: 21,
                    openBlock: 22,
                    block_option0: 23,
                    closeBlock: 24,
                    openInverse: 25,
                    block_option1: 26,
                    OPEN_BLOCK: 27,
                    openBlock_repetition0: 28,
                    openBlock_option0: 29,
                    openBlock_option1: 30,
                    CLOSE: 31,
                    OPEN_INVERSE: 32,
                    openInverse_repetition0: 33,
                    openInverse_option0: 34,
                    openInverse_option1: 35,
                    openInverseChain: 36,
                    OPEN_INVERSE_CHAIN: 37,
                    openInverseChain_repetition0: 38,
                    openInverseChain_option0: 39,
                    openInverseChain_option1: 40,
                    inverseAndProgram: 41,
                    INVERSE: 42,
                    inverseChain: 43,
                    inverseChain_option0: 44,
                    OPEN_ENDBLOCK: 45,
                    OPEN: 46,
                    mustache_repetition0: 47,
                    mustache_option0: 48,
                    OPEN_UNESCAPED: 49,
                    mustache_repetition1: 50,
                    mustache_option1: 51,
                    CLOSE_UNESCAPED: 52,
                    OPEN_PARTIAL: 53,
                    partialName: 54,
                    partial_repetition0: 55,
                    partial_option0: 56,
                    param: 57,
                    sexpr: 58,
                    OPEN_SEXPR: 59,
                    sexpr_repetition0: 60,
                    sexpr_option0: 61,
                    CLOSE_SEXPR: 62,
                    hash: 63,
                    hash_repetition_plus0: 64,
                    hashSegment: 65,
                    ID: 66,
                    EQUALS: 67,
                    blockParams: 68,
                    OPEN_BLOCK_PARAMS: 69,
                    blockParams_repetition_plus0: 70,
                    CLOSE_BLOCK_PARAMS: 71,
                    path: 72,
                    dataName: 73,
                    STRING: 74,
                    NUMBER: 75,
                    BOOLEAN: 76,
                    DATA: 77,
                    pathSegments: 78,
                    SEP: 79,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    13: "COMMENT",
                    14: "CONTENT",
                    16: "END_RAW_BLOCK",
                    17: "OPEN_RAW_BLOCK",
                    21: "CLOSE_RAW_BLOCK",
                    27: "OPEN_BLOCK",
                    31: "CLOSE",
                    32: "OPEN_INVERSE",
                    37: "OPEN_INVERSE_CHAIN",
                    42: "INVERSE",
                    45: "OPEN_ENDBLOCK",
                    46: "OPEN",
                    49: "OPEN_UNESCAPED",
                    52: "CLOSE_UNESCAPED",
                    53: "OPEN_PARTIAL",
                    59: "OPEN_SEXPR",
                    62: "CLOSE_SEXPR",
                    66: "ID",
                    67: "EQUALS",
                    69: "OPEN_BLOCK_PARAMS",
                    71: "CLOSE_BLOCK_PARAMS",
                    74: "STRING",
                    75: "NUMBER",
                    76: "BOOLEAN",
                    77: "DATA",
                    79: "SEP"
                },
                productions_: [ 0, [ 3, 2 ], [ 4, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 12, 1 ], [ 10, 3 ], [ 15, 5 ], [ 9, 4 ], [ 9, 4 ], [ 22, 6 ], [ 25, 6 ], [ 36, 6 ], [ 41, 2 ], [ 43, 3 ], [ 43, 1 ], [ 24, 3 ], [ 8, 5 ], [ 8, 5 ], [ 11, 5 ], [ 57, 1 ], [ 57, 1 ], [ 58, 5 ], [ 63, 1 ], [ 65, 3 ], [ 68, 3 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 18, 1 ], [ 54, 1 ], [ 54, 1 ], [ 73, 2 ], [ 72, 1 ], [ 78, 3 ], [ 78, 1 ], [ 6, 0 ], [ 6, 2 ], [ 19, 0 ], [ 19, 2 ], [ 20, 0 ], [ 20, 1 ], [ 23, 0 ], [ 23, 1 ], [ 26, 0 ], [ 26, 1 ], [ 28, 0 ], [ 28, 2 ], [ 29, 0 ], [ 29, 1 ], [ 30, 0 ], [ 30, 1 ], [ 33, 0 ], [ 33, 2 ], [ 34, 0 ], [ 34, 1 ], [ 35, 0 ], [ 35, 1 ], [ 38, 0 ], [ 38, 2 ], [ 39, 0 ], [ 39, 1 ], [ 40, 0 ], [ 40, 1 ], [ 44, 0 ], [ 44, 1 ], [ 47, 0 ], [ 47, 2 ], [ 48, 0 ], [ 48, 1 ], [ 50, 0 ], [ 50, 2 ], [ 51, 0 ], [ 51, 1 ], [ 55, 0 ], [ 55, 2 ], [ 56, 0 ], [ 56, 1 ], [ 60, 0 ], [ 60, 2 ], [ 61, 0 ], [ 61, 1 ], [ 64, 1 ], [ 64, 2 ], [ 70, 1 ], [ 70, 2 ] ],
                performAction: function(a, b, c, d, e, f) {
                    var g = f.length - 1;
                    switch (e) {
                      case 1:
                        return f[g - 1];

                      case 2:
                        this.$ = new d.Program(f[g], null, {}, d.locInfo(this._$));
                        break;

                      case 3:
                        this.$ = f[g];
                        break;

                      case 4:
                        this.$ = f[g];
                        break;

                      case 5:
                        this.$ = f[g];
                        break;

                      case 6:
                        this.$ = f[g];
                        break;

                      case 7:
                        this.$ = f[g];
                        break;

                      case 8:
                        this.$ = new d.CommentStatement(d.stripComment(f[g]), d.stripFlags(f[g], f[g]), d.locInfo(this._$));
                        break;

                      case 9:
                        this.$ = new d.ContentStatement(f[g], d.locInfo(this._$));
                        break;

                      case 10:
                        this.$ = d.prepareRawBlock(f[g - 2], f[g - 1], f[g], this._$);
                        break;

                      case 11:
                        this.$ = {
                            path: f[g - 3],
                            params: f[g - 2],
                            hash: f[g - 1]
                        };
                        break;

                      case 12:
                        this.$ = d.prepareBlock(f[g - 3], f[g - 2], f[g - 1], f[g], !1, this._$);
                        break;

                      case 13:
                        this.$ = d.prepareBlock(f[g - 3], f[g - 2], f[g - 1], f[g], !0, this._$);
                        break;

                      case 14:
                        this.$ = {
                            path: f[g - 4],
                            params: f[g - 3],
                            hash: f[g - 2],
                            blockParams: f[g - 1],
                            strip: d.stripFlags(f[g - 5], f[g])
                        };
                        break;

                      case 15:
                        this.$ = {
                            path: f[g - 4],
                            params: f[g - 3],
                            hash: f[g - 2],
                            blockParams: f[g - 1],
                            strip: d.stripFlags(f[g - 5], f[g])
                        };
                        break;

                      case 16:
                        this.$ = {
                            path: f[g - 4],
                            params: f[g - 3],
                            hash: f[g - 2],
                            blockParams: f[g - 1],
                            strip: d.stripFlags(f[g - 5], f[g])
                        };
                        break;

                      case 17:
                        this.$ = {
                            strip: d.stripFlags(f[g - 1], f[g - 1]),
                            program: f[g]
                        };
                        break;

                      case 18:
                        var h = d.prepareBlock(f[g - 2], f[g - 1], f[g], f[g], !1, this._$), i = new d.Program([ h ], null, {}, d.locInfo(this._$));
                        i.chained = !0, this.$ = {
                            strip: f[g - 2].strip,
                            program: i,
                            chain: !0
                        };
                        break;

                      case 19:
                        this.$ = f[g];
                        break;

                      case 20:
                        this.$ = {
                            path: f[g - 1],
                            strip: d.stripFlags(f[g - 2], f[g])
                        };
                        break;

                      case 21:
                        this.$ = d.prepareMustache(f[g - 3], f[g - 2], f[g - 1], f[g - 4], d.stripFlags(f[g - 4], f[g]), this._$);
                        break;

                      case 22:
                        this.$ = d.prepareMustache(f[g - 3], f[g - 2], f[g - 1], f[g - 4], d.stripFlags(f[g - 4], f[g]), this._$);
                        break;

                      case 23:
                        this.$ = new d.PartialStatement(f[g - 3], f[g - 2], f[g - 1], d.stripFlags(f[g - 4], f[g]), d.locInfo(this._$));
                        break;

                      case 24:
                        this.$ = f[g];
                        break;

                      case 25:
                        this.$ = f[g];
                        break;

                      case 26:
                        this.$ = new d.SubExpression(f[g - 3], f[g - 2], f[g - 1], d.locInfo(this._$));
                        break;

                      case 27:
                        this.$ = new d.Hash(f[g], d.locInfo(this._$));
                        break;

                      case 28:
                        this.$ = new d.HashPair(f[g - 2], f[g], d.locInfo(this._$));
                        break;

                      case 29:
                        this.$ = f[g - 1];
                        break;

                      case 30:
                        this.$ = f[g];
                        break;

                      case 31:
                        this.$ = f[g];
                        break;

                      case 32:
                        this.$ = new d.StringLiteral(f[g], d.locInfo(this._$));
                        break;

                      case 33:
                        this.$ = new d.NumberLiteral(f[g], d.locInfo(this._$));
                        break;

                      case 34:
                        this.$ = new d.BooleanLiteral(f[g], d.locInfo(this._$));
                        break;

                      case 35:
                        this.$ = f[g];
                        break;

                      case 36:
                        this.$ = f[g];
                        break;

                      case 37:
                        this.$ = d.preparePath(!0, f[g], this._$);
                        break;

                      case 38:
                        this.$ = d.preparePath(!1, f[g], this._$);
                        break;

                      case 39:
                        f[g - 2].push({
                            part: f[g],
                            separator: f[g - 1]
                        }), this.$ = f[g - 2];
                        break;

                      case 40:
                        this.$ = [ {
                            part: f[g]
                        } ];
                        break;

                      case 41:
                        this.$ = [];
                        break;

                      case 42:
                        f[g - 1].push(f[g]);
                        break;

                      case 43:
                        this.$ = [];
                        break;

                      case 44:
                        f[g - 1].push(f[g]);
                        break;

                      case 51:
                        this.$ = [];
                        break;

                      case 52:
                        f[g - 1].push(f[g]);
                        break;

                      case 57:
                        this.$ = [];
                        break;

                      case 58:
                        f[g - 1].push(f[g]);
                        break;

                      case 63:
                        this.$ = [];
                        break;

                      case 64:
                        f[g - 1].push(f[g]);
                        break;

                      case 71:
                        this.$ = [];
                        break;

                      case 72:
                        f[g - 1].push(f[g]);
                        break;

                      case 75:
                        this.$ = [];
                        break;

                      case 76:
                        f[g - 1].push(f[g]);
                        break;

                      case 79:
                        this.$ = [];
                        break;

                      case 80:
                        f[g - 1].push(f[g]);
                        break;

                      case 83:
                        this.$ = [];
                        break;

                      case 84:
                        f[g - 1].push(f[g]);
                        break;

                      case 87:
                        this.$ = [ f[g] ];
                        break;

                      case 88:
                        f[g - 1].push(f[g]);
                        break;

                      case 89:
                        this.$ = [ f[g] ];
                        break;

                      case 90:
                        f[g - 1].push(f[g]);
                    }
                },
                table: [ {
                    3: 1,
                    4: 2,
                    5: [ 2, 41 ],
                    6: 3,
                    13: [ 2, 41 ],
                    14: [ 2, 41 ],
                    17: [ 2, 41 ],
                    27: [ 2, 41 ],
                    32: [ 2, 41 ],
                    46: [ 2, 41 ],
                    49: [ 2, 41 ],
                    53: [ 2, 41 ]
                }, {
                    1: [ 3 ]
                }, {
                    5: [ 1, 4 ]
                }, {
                    5: [ 2, 2 ],
                    7: 5,
                    8: 6,
                    9: 7,
                    10: 8,
                    11: 9,
                    12: 10,
                    13: [ 1, 11 ],
                    14: [ 1, 18 ],
                    15: 16,
                    17: [ 1, 21 ],
                    22: 14,
                    25: 15,
                    27: [ 1, 19 ],
                    32: [ 1, 20 ],
                    37: [ 2, 2 ],
                    42: [ 2, 2 ],
                    45: [ 2, 2 ],
                    46: [ 1, 12 ],
                    49: [ 1, 13 ],
                    53: [ 1, 17 ]
                }, {
                    1: [ 2, 1 ]
                }, {
                    5: [ 2, 42 ],
                    13: [ 2, 42 ],
                    14: [ 2, 42 ],
                    17: [ 2, 42 ],
                    27: [ 2, 42 ],
                    32: [ 2, 42 ],
                    37: [ 2, 42 ],
                    42: [ 2, 42 ],
                    45: [ 2, 42 ],
                    46: [ 2, 42 ],
                    49: [ 2, 42 ],
                    53: [ 2, 42 ]
                }, {
                    5: [ 2, 3 ],
                    13: [ 2, 3 ],
                    14: [ 2, 3 ],
                    17: [ 2, 3 ],
                    27: [ 2, 3 ],
                    32: [ 2, 3 ],
                    37: [ 2, 3 ],
                    42: [ 2, 3 ],
                    45: [ 2, 3 ],
                    46: [ 2, 3 ],
                    49: [ 2, 3 ],
                    53: [ 2, 3 ]
                }, {
                    5: [ 2, 4 ],
                    13: [ 2, 4 ],
                    14: [ 2, 4 ],
                    17: [ 2, 4 ],
                    27: [ 2, 4 ],
                    32: [ 2, 4 ],
                    37: [ 2, 4 ],
                    42: [ 2, 4 ],
                    45: [ 2, 4 ],
                    46: [ 2, 4 ],
                    49: [ 2, 4 ],
                    53: [ 2, 4 ]
                }, {
                    5: [ 2, 5 ],
                    13: [ 2, 5 ],
                    14: [ 2, 5 ],
                    17: [ 2, 5 ],
                    27: [ 2, 5 ],
                    32: [ 2, 5 ],
                    37: [ 2, 5 ],
                    42: [ 2, 5 ],
                    45: [ 2, 5 ],
                    46: [ 2, 5 ],
                    49: [ 2, 5 ],
                    53: [ 2, 5 ]
                }, {
                    5: [ 2, 6 ],
                    13: [ 2, 6 ],
                    14: [ 2, 6 ],
                    17: [ 2, 6 ],
                    27: [ 2, 6 ],
                    32: [ 2, 6 ],
                    37: [ 2, 6 ],
                    42: [ 2, 6 ],
                    45: [ 2, 6 ],
                    46: [ 2, 6 ],
                    49: [ 2, 6 ],
                    53: [ 2, 6 ]
                }, {
                    5: [ 2, 7 ],
                    13: [ 2, 7 ],
                    14: [ 2, 7 ],
                    17: [ 2, 7 ],
                    27: [ 2, 7 ],
                    32: [ 2, 7 ],
                    37: [ 2, 7 ],
                    42: [ 2, 7 ],
                    45: [ 2, 7 ],
                    46: [ 2, 7 ],
                    49: [ 2, 7 ],
                    53: [ 2, 7 ]
                }, {
                    5: [ 2, 8 ],
                    13: [ 2, 8 ],
                    14: [ 2, 8 ],
                    17: [ 2, 8 ],
                    27: [ 2, 8 ],
                    32: [ 2, 8 ],
                    37: [ 2, 8 ],
                    42: [ 2, 8 ],
                    45: [ 2, 8 ],
                    46: [ 2, 8 ],
                    49: [ 2, 8 ],
                    53: [ 2, 8 ]
                }, {
                    18: 22,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    18: 31,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    4: 32,
                    6: 3,
                    13: [ 2, 41 ],
                    14: [ 2, 41 ],
                    17: [ 2, 41 ],
                    27: [ 2, 41 ],
                    32: [ 2, 41 ],
                    37: [ 2, 41 ],
                    42: [ 2, 41 ],
                    45: [ 2, 41 ],
                    46: [ 2, 41 ],
                    49: [ 2, 41 ],
                    53: [ 2, 41 ]
                }, {
                    4: 33,
                    6: 3,
                    13: [ 2, 41 ],
                    14: [ 2, 41 ],
                    17: [ 2, 41 ],
                    27: [ 2, 41 ],
                    32: [ 2, 41 ],
                    42: [ 2, 41 ],
                    45: [ 2, 41 ],
                    46: [ 2, 41 ],
                    49: [ 2, 41 ],
                    53: [ 2, 41 ]
                }, {
                    12: 34,
                    14: [ 1, 18 ]
                }, {
                    18: 36,
                    54: 35,
                    58: 37,
                    59: [ 1, 38 ],
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    5: [ 2, 9 ],
                    13: [ 2, 9 ],
                    14: [ 2, 9 ],
                    16: [ 2, 9 ],
                    17: [ 2, 9 ],
                    27: [ 2, 9 ],
                    32: [ 2, 9 ],
                    37: [ 2, 9 ],
                    42: [ 2, 9 ],
                    45: [ 2, 9 ],
                    46: [ 2, 9 ],
                    49: [ 2, 9 ],
                    53: [ 2, 9 ]
                }, {
                    18: 39,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    18: 40,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    18: 41,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    31: [ 2, 71 ],
                    47: 42,
                    59: [ 2, 71 ],
                    66: [ 2, 71 ],
                    74: [ 2, 71 ],
                    75: [ 2, 71 ],
                    76: [ 2, 71 ],
                    77: [ 2, 71 ]
                }, {
                    21: [ 2, 30 ],
                    31: [ 2, 30 ],
                    52: [ 2, 30 ],
                    59: [ 2, 30 ],
                    62: [ 2, 30 ],
                    66: [ 2, 30 ],
                    69: [ 2, 30 ],
                    74: [ 2, 30 ],
                    75: [ 2, 30 ],
                    76: [ 2, 30 ],
                    77: [ 2, 30 ]
                }, {
                    21: [ 2, 31 ],
                    31: [ 2, 31 ],
                    52: [ 2, 31 ],
                    59: [ 2, 31 ],
                    62: [ 2, 31 ],
                    66: [ 2, 31 ],
                    69: [ 2, 31 ],
                    74: [ 2, 31 ],
                    75: [ 2, 31 ],
                    76: [ 2, 31 ],
                    77: [ 2, 31 ]
                }, {
                    21: [ 2, 32 ],
                    31: [ 2, 32 ],
                    52: [ 2, 32 ],
                    59: [ 2, 32 ],
                    62: [ 2, 32 ],
                    66: [ 2, 32 ],
                    69: [ 2, 32 ],
                    74: [ 2, 32 ],
                    75: [ 2, 32 ],
                    76: [ 2, 32 ],
                    77: [ 2, 32 ]
                }, {
                    21: [ 2, 33 ],
                    31: [ 2, 33 ],
                    52: [ 2, 33 ],
                    59: [ 2, 33 ],
                    62: [ 2, 33 ],
                    66: [ 2, 33 ],
                    69: [ 2, 33 ],
                    74: [ 2, 33 ],
                    75: [ 2, 33 ],
                    76: [ 2, 33 ],
                    77: [ 2, 33 ]
                }, {
                    21: [ 2, 34 ],
                    31: [ 2, 34 ],
                    52: [ 2, 34 ],
                    59: [ 2, 34 ],
                    62: [ 2, 34 ],
                    66: [ 2, 34 ],
                    69: [ 2, 34 ],
                    74: [ 2, 34 ],
                    75: [ 2, 34 ],
                    76: [ 2, 34 ],
                    77: [ 2, 34 ]
                }, {
                    21: [ 2, 38 ],
                    31: [ 2, 38 ],
                    52: [ 2, 38 ],
                    59: [ 2, 38 ],
                    62: [ 2, 38 ],
                    66: [ 2, 38 ],
                    69: [ 2, 38 ],
                    74: [ 2, 38 ],
                    75: [ 2, 38 ],
                    76: [ 2, 38 ],
                    77: [ 2, 38 ],
                    79: [ 1, 43 ]
                }, {
                    66: [ 1, 30 ],
                    78: 44
                }, {
                    21: [ 2, 40 ],
                    31: [ 2, 40 ],
                    52: [ 2, 40 ],
                    59: [ 2, 40 ],
                    62: [ 2, 40 ],
                    66: [ 2, 40 ],
                    69: [ 2, 40 ],
                    74: [ 2, 40 ],
                    75: [ 2, 40 ],
                    76: [ 2, 40 ],
                    77: [ 2, 40 ],
                    79: [ 2, 40 ]
                }, {
                    50: 45,
                    52: [ 2, 75 ],
                    59: [ 2, 75 ],
                    66: [ 2, 75 ],
                    74: [ 2, 75 ],
                    75: [ 2, 75 ],
                    76: [ 2, 75 ],
                    77: [ 2, 75 ]
                }, {
                    23: 46,
                    36: 48,
                    37: [ 1, 50 ],
                    41: 49,
                    42: [ 1, 51 ],
                    43: 47,
                    45: [ 2, 47 ]
                }, {
                    26: 52,
                    41: 53,
                    42: [ 1, 51 ],
                    45: [ 2, 49 ]
                }, {
                    16: [ 1, 54 ]
                }, {
                    31: [ 2, 79 ],
                    55: 55,
                    59: [ 2, 79 ],
                    66: [ 2, 79 ],
                    74: [ 2, 79 ],
                    75: [ 2, 79 ],
                    76: [ 2, 79 ],
                    77: [ 2, 79 ]
                }, {
                    31: [ 2, 35 ],
                    59: [ 2, 35 ],
                    66: [ 2, 35 ],
                    74: [ 2, 35 ],
                    75: [ 2, 35 ],
                    76: [ 2, 35 ],
                    77: [ 2, 35 ]
                }, {
                    31: [ 2, 36 ],
                    59: [ 2, 36 ],
                    66: [ 2, 36 ],
                    74: [ 2, 36 ],
                    75: [ 2, 36 ],
                    76: [ 2, 36 ],
                    77: [ 2, 36 ]
                }, {
                    18: 56,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    28: 57,
                    31: [ 2, 51 ],
                    59: [ 2, 51 ],
                    66: [ 2, 51 ],
                    69: [ 2, 51 ],
                    74: [ 2, 51 ],
                    75: [ 2, 51 ],
                    76: [ 2, 51 ],
                    77: [ 2, 51 ]
                }, {
                    31: [ 2, 57 ],
                    33: 58,
                    59: [ 2, 57 ],
                    66: [ 2, 57 ],
                    69: [ 2, 57 ],
                    74: [ 2, 57 ],
                    75: [ 2, 57 ],
                    76: [ 2, 57 ],
                    77: [ 2, 57 ]
                }, {
                    19: 59,
                    21: [ 2, 43 ],
                    59: [ 2, 43 ],
                    66: [ 2, 43 ],
                    74: [ 2, 43 ],
                    75: [ 2, 43 ],
                    76: [ 2, 43 ],
                    77: [ 2, 43 ]
                }, {
                    18: 63,
                    31: [ 2, 73 ],
                    48: 60,
                    57: 61,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 62,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    66: [ 1, 68 ]
                }, {
                    21: [ 2, 37 ],
                    31: [ 2, 37 ],
                    52: [ 2, 37 ],
                    59: [ 2, 37 ],
                    62: [ 2, 37 ],
                    66: [ 2, 37 ],
                    69: [ 2, 37 ],
                    74: [ 2, 37 ],
                    75: [ 2, 37 ],
                    76: [ 2, 37 ],
                    77: [ 2, 37 ],
                    79: [ 1, 43 ]
                }, {
                    18: 63,
                    51: 69,
                    52: [ 2, 77 ],
                    57: 70,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 71,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    24: 72,
                    45: [ 1, 73 ]
                }, {
                    45: [ 2, 48 ]
                }, {
                    4: 74,
                    6: 3,
                    13: [ 2, 41 ],
                    14: [ 2, 41 ],
                    17: [ 2, 41 ],
                    27: [ 2, 41 ],
                    32: [ 2, 41 ],
                    37: [ 2, 41 ],
                    42: [ 2, 41 ],
                    45: [ 2, 41 ],
                    46: [ 2, 41 ],
                    49: [ 2, 41 ],
                    53: [ 2, 41 ]
                }, {
                    45: [ 2, 19 ]
                }, {
                    18: 75,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    4: 76,
                    6: 3,
                    13: [ 2, 41 ],
                    14: [ 2, 41 ],
                    17: [ 2, 41 ],
                    27: [ 2, 41 ],
                    32: [ 2, 41 ],
                    45: [ 2, 41 ],
                    46: [ 2, 41 ],
                    49: [ 2, 41 ],
                    53: [ 2, 41 ]
                }, {
                    24: 77,
                    45: [ 1, 73 ]
                }, {
                    45: [ 2, 50 ]
                }, {
                    5: [ 2, 10 ],
                    13: [ 2, 10 ],
                    14: [ 2, 10 ],
                    17: [ 2, 10 ],
                    27: [ 2, 10 ],
                    32: [ 2, 10 ],
                    37: [ 2, 10 ],
                    42: [ 2, 10 ],
                    45: [ 2, 10 ],
                    46: [ 2, 10 ],
                    49: [ 2, 10 ],
                    53: [ 2, 10 ]
                }, {
                    18: 63,
                    31: [ 2, 81 ],
                    56: 78,
                    57: 79,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 80,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    59: [ 2, 83 ],
                    60: 81,
                    62: [ 2, 83 ],
                    66: [ 2, 83 ],
                    74: [ 2, 83 ],
                    75: [ 2, 83 ],
                    76: [ 2, 83 ],
                    77: [ 2, 83 ]
                }, {
                    18: 63,
                    29: 82,
                    31: [ 2, 53 ],
                    57: 83,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 84,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    69: [ 2, 53 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    18: 63,
                    31: [ 2, 59 ],
                    34: 85,
                    57: 86,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 87,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    69: [ 2, 59 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    18: 63,
                    20: 88,
                    21: [ 2, 45 ],
                    57: 89,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 90,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    31: [ 1, 91 ]
                }, {
                    31: [ 2, 72 ],
                    59: [ 2, 72 ],
                    66: [ 2, 72 ],
                    74: [ 2, 72 ],
                    75: [ 2, 72 ],
                    76: [ 2, 72 ],
                    77: [ 2, 72 ]
                }, {
                    31: [ 2, 74 ]
                }, {
                    21: [ 2, 24 ],
                    31: [ 2, 24 ],
                    52: [ 2, 24 ],
                    59: [ 2, 24 ],
                    62: [ 2, 24 ],
                    66: [ 2, 24 ],
                    69: [ 2, 24 ],
                    74: [ 2, 24 ],
                    75: [ 2, 24 ],
                    76: [ 2, 24 ],
                    77: [ 2, 24 ]
                }, {
                    21: [ 2, 25 ],
                    31: [ 2, 25 ],
                    52: [ 2, 25 ],
                    59: [ 2, 25 ],
                    62: [ 2, 25 ],
                    66: [ 2, 25 ],
                    69: [ 2, 25 ],
                    74: [ 2, 25 ],
                    75: [ 2, 25 ],
                    76: [ 2, 25 ],
                    77: [ 2, 25 ]
                }, {
                    21: [ 2, 27 ],
                    31: [ 2, 27 ],
                    52: [ 2, 27 ],
                    62: [ 2, 27 ],
                    65: 92,
                    66: [ 1, 93 ],
                    69: [ 2, 27 ]
                }, {
                    21: [ 2, 87 ],
                    31: [ 2, 87 ],
                    52: [ 2, 87 ],
                    62: [ 2, 87 ],
                    66: [ 2, 87 ],
                    69: [ 2, 87 ]
                }, {
                    21: [ 2, 40 ],
                    31: [ 2, 40 ],
                    52: [ 2, 40 ],
                    59: [ 2, 40 ],
                    62: [ 2, 40 ],
                    66: [ 2, 40 ],
                    67: [ 1, 94 ],
                    69: [ 2, 40 ],
                    74: [ 2, 40 ],
                    75: [ 2, 40 ],
                    76: [ 2, 40 ],
                    77: [ 2, 40 ],
                    79: [ 2, 40 ]
                }, {
                    21: [ 2, 39 ],
                    31: [ 2, 39 ],
                    52: [ 2, 39 ],
                    59: [ 2, 39 ],
                    62: [ 2, 39 ],
                    66: [ 2, 39 ],
                    69: [ 2, 39 ],
                    74: [ 2, 39 ],
                    75: [ 2, 39 ],
                    76: [ 2, 39 ],
                    77: [ 2, 39 ],
                    79: [ 2, 39 ]
                }, {
                    52: [ 1, 95 ]
                }, {
                    52: [ 2, 76 ],
                    59: [ 2, 76 ],
                    66: [ 2, 76 ],
                    74: [ 2, 76 ],
                    75: [ 2, 76 ],
                    76: [ 2, 76 ],
                    77: [ 2, 76 ]
                }, {
                    52: [ 2, 78 ]
                }, {
                    5: [ 2, 12 ],
                    13: [ 2, 12 ],
                    14: [ 2, 12 ],
                    17: [ 2, 12 ],
                    27: [ 2, 12 ],
                    32: [ 2, 12 ],
                    37: [ 2, 12 ],
                    42: [ 2, 12 ],
                    45: [ 2, 12 ],
                    46: [ 2, 12 ],
                    49: [ 2, 12 ],
                    53: [ 2, 12 ]
                }, {
                    18: 96,
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    36: 48,
                    37: [ 1, 50 ],
                    41: 49,
                    42: [ 1, 51 ],
                    43: 98,
                    44: 97,
                    45: [ 2, 69 ]
                }, {
                    31: [ 2, 63 ],
                    38: 99,
                    59: [ 2, 63 ],
                    66: [ 2, 63 ],
                    69: [ 2, 63 ],
                    74: [ 2, 63 ],
                    75: [ 2, 63 ],
                    76: [ 2, 63 ],
                    77: [ 2, 63 ]
                }, {
                    45: [ 2, 17 ]
                }, {
                    5: [ 2, 13 ],
                    13: [ 2, 13 ],
                    14: [ 2, 13 ],
                    17: [ 2, 13 ],
                    27: [ 2, 13 ],
                    32: [ 2, 13 ],
                    37: [ 2, 13 ],
                    42: [ 2, 13 ],
                    45: [ 2, 13 ],
                    46: [ 2, 13 ],
                    49: [ 2, 13 ],
                    53: [ 2, 13 ]
                }, {
                    31: [ 1, 100 ]
                }, {
                    31: [ 2, 80 ],
                    59: [ 2, 80 ],
                    66: [ 2, 80 ],
                    74: [ 2, 80 ],
                    75: [ 2, 80 ],
                    76: [ 2, 80 ],
                    77: [ 2, 80 ]
                }, {
                    31: [ 2, 82 ]
                }, {
                    18: 63,
                    57: 102,
                    58: 64,
                    59: [ 1, 38 ],
                    61: 101,
                    62: [ 2, 85 ],
                    63: 103,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    30: 104,
                    31: [ 2, 55 ],
                    68: 105,
                    69: [ 1, 106 ]
                }, {
                    31: [ 2, 52 ],
                    59: [ 2, 52 ],
                    66: [ 2, 52 ],
                    69: [ 2, 52 ],
                    74: [ 2, 52 ],
                    75: [ 2, 52 ],
                    76: [ 2, 52 ],
                    77: [ 2, 52 ]
                }, {
                    31: [ 2, 54 ],
                    69: [ 2, 54 ]
                }, {
                    31: [ 2, 61 ],
                    35: 107,
                    68: 108,
                    69: [ 1, 106 ]
                }, {
                    31: [ 2, 58 ],
                    59: [ 2, 58 ],
                    66: [ 2, 58 ],
                    69: [ 2, 58 ],
                    74: [ 2, 58 ],
                    75: [ 2, 58 ],
                    76: [ 2, 58 ],
                    77: [ 2, 58 ]
                }, {
                    31: [ 2, 60 ],
                    69: [ 2, 60 ]
                }, {
                    21: [ 1, 109 ]
                }, {
                    21: [ 2, 44 ],
                    59: [ 2, 44 ],
                    66: [ 2, 44 ],
                    74: [ 2, 44 ],
                    75: [ 2, 44 ],
                    76: [ 2, 44 ],
                    77: [ 2, 44 ]
                }, {
                    21: [ 2, 46 ]
                }, {
                    5: [ 2, 21 ],
                    13: [ 2, 21 ],
                    14: [ 2, 21 ],
                    17: [ 2, 21 ],
                    27: [ 2, 21 ],
                    32: [ 2, 21 ],
                    37: [ 2, 21 ],
                    42: [ 2, 21 ],
                    45: [ 2, 21 ],
                    46: [ 2, 21 ],
                    49: [ 2, 21 ],
                    53: [ 2, 21 ]
                }, {
                    21: [ 2, 88 ],
                    31: [ 2, 88 ],
                    52: [ 2, 88 ],
                    62: [ 2, 88 ],
                    66: [ 2, 88 ],
                    69: [ 2, 88 ]
                }, {
                    67: [ 1, 94 ]
                }, {
                    18: 63,
                    57: 110,
                    58: 64,
                    59: [ 1, 38 ],
                    66: [ 1, 30 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    5: [ 2, 22 ],
                    13: [ 2, 22 ],
                    14: [ 2, 22 ],
                    17: [ 2, 22 ],
                    27: [ 2, 22 ],
                    32: [ 2, 22 ],
                    37: [ 2, 22 ],
                    42: [ 2, 22 ],
                    45: [ 2, 22 ],
                    46: [ 2, 22 ],
                    49: [ 2, 22 ],
                    53: [ 2, 22 ]
                }, {
                    31: [ 1, 111 ]
                }, {
                    45: [ 2, 18 ]
                }, {
                    45: [ 2, 70 ]
                }, {
                    18: 63,
                    31: [ 2, 65 ],
                    39: 112,
                    57: 113,
                    58: 64,
                    59: [ 1, 38 ],
                    63: 114,
                    64: 65,
                    65: 66,
                    66: [ 1, 67 ],
                    69: [ 2, 65 ],
                    72: 23,
                    73: 24,
                    74: [ 1, 25 ],
                    75: [ 1, 26 ],
                    76: [ 1, 27 ],
                    77: [ 1, 29 ],
                    78: 28
                }, {
                    5: [ 2, 23 ],
                    13: [ 2, 23 ],
                    14: [ 2, 23 ],
                    17: [ 2, 23 ],
                    27: [ 2, 23 ],
                    32: [ 2, 23 ],
                    37: [ 2, 23 ],
                    42: [ 2, 23 ],
                    45: [ 2, 23 ],
                    46: [ 2, 23 ],
                    49: [ 2, 23 ],
                    53: [ 2, 23 ]
                }, {
                    62: [ 1, 115 ]
                }, {
                    59: [ 2, 84 ],
                    62: [ 2, 84 ],
                    66: [ 2, 84 ],
                    74: [ 2, 84 ],
                    75: [ 2, 84 ],
                    76: [ 2, 84 ],
                    77: [ 2, 84 ]
                }, {
                    62: [ 2, 86 ]
                }, {
                    31: [ 1, 116 ]
                }, {
                    31: [ 2, 56 ]
                }, {
                    66: [ 1, 118 ],
                    70: 117
                }, {
                    31: [ 1, 119 ]
                }, {
                    31: [ 2, 62 ]
                }, {
                    14: [ 2, 11 ]
                }, {
                    21: [ 2, 28 ],
                    31: [ 2, 28 ],
                    52: [ 2, 28 ],
                    62: [ 2, 28 ],
                    66: [ 2, 28 ],
                    69: [ 2, 28 ]
                }, {
                    5: [ 2, 20 ],
                    13: [ 2, 20 ],
                    14: [ 2, 20 ],
                    17: [ 2, 20 ],
                    27: [ 2, 20 ],
                    32: [ 2, 20 ],
                    37: [ 2, 20 ],
                    42: [ 2, 20 ],
                    45: [ 2, 20 ],
                    46: [ 2, 20 ],
                    49: [ 2, 20 ],
                    53: [ 2, 20 ]
                }, {
                    31: [ 2, 67 ],
                    40: 120,
                    68: 121,
                    69: [ 1, 106 ]
                }, {
                    31: [ 2, 64 ],
                    59: [ 2, 64 ],
                    66: [ 2, 64 ],
                    69: [ 2, 64 ],
                    74: [ 2, 64 ],
                    75: [ 2, 64 ],
                    76: [ 2, 64 ],
                    77: [ 2, 64 ]
                }, {
                    31: [ 2, 66 ],
                    69: [ 2, 66 ]
                }, {
                    21: [ 2, 26 ],
                    31: [ 2, 26 ],
                    52: [ 2, 26 ],
                    59: [ 2, 26 ],
                    62: [ 2, 26 ],
                    66: [ 2, 26 ],
                    69: [ 2, 26 ],
                    74: [ 2, 26 ],
                    75: [ 2, 26 ],
                    76: [ 2, 26 ],
                    77: [ 2, 26 ]
                }, {
                    13: [ 2, 14 ],
                    14: [ 2, 14 ],
                    17: [ 2, 14 ],
                    27: [ 2, 14 ],
                    32: [ 2, 14 ],
                    37: [ 2, 14 ],
                    42: [ 2, 14 ],
                    45: [ 2, 14 ],
                    46: [ 2, 14 ],
                    49: [ 2, 14 ],
                    53: [ 2, 14 ]
                }, {
                    66: [ 1, 123 ],
                    71: [ 1, 122 ]
                }, {
                    66: [ 2, 89 ],
                    71: [ 2, 89 ]
                }, {
                    13: [ 2, 15 ],
                    14: [ 2, 15 ],
                    17: [ 2, 15 ],
                    27: [ 2, 15 ],
                    32: [ 2, 15 ],
                    42: [ 2, 15 ],
                    45: [ 2, 15 ],
                    46: [ 2, 15 ],
                    49: [ 2, 15 ],
                    53: [ 2, 15 ]
                }, {
                    31: [ 1, 124 ]
                }, {
                    31: [ 2, 68 ]
                }, {
                    31: [ 2, 29 ]
                }, {
                    66: [ 2, 90 ],
                    71: [ 2, 90 ]
                }, {
                    13: [ 2, 16 ],
                    14: [ 2, 16 ],
                    17: [ 2, 16 ],
                    27: [ 2, 16 ],
                    32: [ 2, 16 ],
                    37: [ 2, 16 ],
                    42: [ 2, 16 ],
                    45: [ 2, 16 ],
                    46: [ 2, 16 ],
                    49: [ 2, 16 ],
                    53: [ 2, 16 ]
                } ],
                defaultActions: {
                    4: [ 2, 1 ],
                    47: [ 2, 48 ],
                    49: [ 2, 19 ],
                    53: [ 2, 50 ],
                    62: [ 2, 74 ],
                    71: [ 2, 78 ],
                    76: [ 2, 17 ],
                    80: [ 2, 82 ],
                    90: [ 2, 46 ],
                    97: [ 2, 18 ],
                    98: [ 2, 70 ],
                    103: [ 2, 86 ],
                    105: [ 2, 56 ],
                    108: [ 2, 62 ],
                    109: [ 2, 11 ],
                    121: [ 2, 68 ],
                    122: [ 2, 29 ]
                },
                parseError: function(a) {
                    throw new Error(a);
                },
                parse: function(a) {
                    function b() {
                        var a;
                        return a = c.lexer.lex() || 1, "number" != typeof a && (a = c.symbols_[a] || a), 
                        a;
                    }
                    var c = this, d = [ 0 ], e = [ null ], f = [], g = this.table, h = "", i = 0, j = 0, k = 0;
                    this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, 
                    "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                    var l = this.lexer.yylloc;
                    f.push(l);
                    var m = this.lexer.options && this.lexer.options.ranges;
                    "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                    for (var n, o, p, q, r, s, t, u, v, w = {}; ;) {
                        if (p = d[d.length - 1], this.defaultActions[p] ? q = this.defaultActions[p] : ((null === n || "undefined" == typeof n) && (n = b()), 
                        q = g[p] && g[p][n]), "undefined" == typeof q || !q.length || !q[0]) {
                            var x = "";
                            if (!k) {
                                v = [];
                                for (s in g[p]) this.terminals_[s] && s > 2 && v.push("'" + this.terminals_[s] + "'");
                                x = this.lexer.showPosition ? "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + v.join(", ") + ", got '" + (this.terminals_[n] || n) + "'" : "Parse error on line " + (i + 1) + ": Unexpected " + (1 == n ? "end of input" : "'" + (this.terminals_[n] || n) + "'"), 
                                this.parseError(x, {
                                    text: this.lexer.match,
                                    token: this.terminals_[n] || n,
                                    line: this.lexer.yylineno,
                                    loc: l,
                                    expected: v
                                });
                            }
                        }
                        if (q[0] instanceof Array && q.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + p + ", token: " + n);
                        switch (q[0]) {
                          case 1:
                            d.push(n), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(q[1]), n = null, 
                            o ? (n = o, o = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, 
                            l = this.lexer.yylloc, k > 0 && k--);
                            break;

                          case 2:
                            if (t = this.productions_[q[1]][1], w.$ = e[e.length - t], w._$ = {
                                first_line: f[f.length - (t || 1)].first_line,
                                last_line: f[f.length - 1].last_line,
                                first_column: f[f.length - (t || 1)].first_column,
                                last_column: f[f.length - 1].last_column
                            }, m && (w._$.range = [ f[f.length - (t || 1)].range[0], f[f.length - 1].range[1] ]), 
                            r = this.performAction.call(w, h, j, i, this.yy, q[1], e, f), "undefined" != typeof r) return r;
                            t && (d = d.slice(0, -1 * t * 2), e = e.slice(0, -1 * t), f = f.slice(0, -1 * t)), 
                            d.push(this.productions_[q[1]][0]), e.push(w.$), f.push(w._$), u = g[d[d.length - 2]][d[d.length - 1]], 
                            d.push(u);
                            break;

                          case 3:
                            return !0;
                        }
                    }
                    return !0;
                }
            }, c = function() {
                var a = {
                    EOF: 1,
                    parseError: function(a, b) {
                        if (!this.yy.parser) throw new Error(a);
                        this.yy.parser.parseError(a, b);
                    },
                    setInput: function(a) {
                        return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, 
                        this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
                    },
                    input: function() {
                        var a = this._input[0];
                        this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
                        var b = a.match(/(?:\r\n?|\n).*/g);
                        return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
                        this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
                        a;
                    },
                    unput: function(a) {
                        var b = a.length, c = a.split(/(?:\r\n?|\n)/g);
                        this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b - 1), 
                        this.offset -= b;
                        var d = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
                        c.length - 1 && (this.yylineno -= c.length - 1);
                        var e = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
                        }, this.options.ranges && (this.yylloc.range = [ e[0], e[0] + this.yyleng - b ]), 
                        this;
                    },
                    more: function() {
                        return this._more = !0, this;
                    },
                    less: function(a) {
                        this.unput(this.match.slice(a));
                    },
                    pastInput: function() {
                        var a = this.matched.substr(0, this.matched.length - this.match.length);
                        return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "");
                    },
                    upcomingInput: function() {
                        var a = this.match;
                        return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "");
                    },
                    showPosition: function() {
                        var a = this.pastInput(), b = new Array(a.length + 1).join("-");
                        return a + this.upcomingInput() + "\n" + b + "^";
                    },
                    next: function() {
                        if (this.done) return this.EOF;
                        this._input || (this.done = !0);
                        var a, b, c, d, e;
                        this._more || (this.yytext = "", this.match = "");
                        for (var f = this._currentRules(), g = 0; g < f.length && (c = this._input.match(this.rules[f[g]]), 
                        !c || b && !(c[0].length > b[0].length) || (b = c, d = g, this.options.flex)); g++) ;
                        return b ? (e = b[0].match(/(?:\r\n?|\n).*/g), e && (this.yylineno += e.length), 
                        this.yylloc = {
                            first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: e ? e[e.length - 1].length - e[e.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
                        }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, 
                        this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
                        this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], 
                        a = this.performAction.call(this, this.yy, this, f[d], this.conditionStack[this.conditionStack.length - 1]), 
                        this.done && this._input && (this.done = !1), a ? a : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        });
                    },
                    lex: function() {
                        var a = this.next();
                        return "undefined" != typeof a ? a : this.lex();
                    },
                    begin: function(a) {
                        this.conditionStack.push(a);
                    },
                    popState: function() {
                        return this.conditionStack.pop();
                    },
                    _currentRules: function() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                    },
                    topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2];
                    },
                    pushState: function(a) {
                        this.begin(a);
                    }
                };
                return a.options = {}, a.performAction = function(a, b, c, d) {
                    function e(a, c) {
                        return b.yytext = b.yytext.substr(a, b.yyleng - c);
                    }
                    switch (c) {
                      case 0:
                        if ("\\\\" === b.yytext.slice(-2) ? (e(0, 1), this.begin("mu")) : "\\" === b.yytext.slice(-1) ? (e(0, 1), 
                        this.begin("emu")) : this.begin("mu"), b.yytext) return 14;
                        break;

                      case 1:
                        return 14;

                      case 2:
                        return this.popState(), 14;

                      case 3:
                        return b.yytext = b.yytext.substr(5, b.yyleng - 9), this.popState(), 16;

                      case 4:
                        return 14;

                      case 5:
                        return this.popState(), 13;

                      case 6:
                        return 59;

                      case 7:
                        return 62;

                      case 8:
                        return 17;

                      case 9:
                        return this.popState(), this.begin("raw"), 21;

                      case 10:
                        return 53;

                      case 11:
                        return 27;

                      case 12:
                        return 45;

                      case 13:
                        return this.popState(), 42;

                      case 14:
                        return this.popState(), 42;

                      case 15:
                        return 32;

                      case 16:
                        return 37;

                      case 17:
                        return 49;

                      case 18:
                        return 46;

                      case 19:
                        this.unput(b.yytext), this.popState(), this.begin("com");
                        break;

                      case 20:
                        return this.popState(), 13;

                      case 21:
                        return 46;

                      case 22:
                        return 67;

                      case 23:
                        return 66;

                      case 24:
                        return 66;

                      case 25:
                        return 79;

                      case 26:
                        break;

                      case 27:
                        return this.popState(), 52;

                      case 28:
                        return this.popState(), 31;

                      case 29:
                        return b.yytext = e(1, 2).replace(/\\"/g, '"'), 74;

                      case 30:
                        return b.yytext = e(1, 2).replace(/\\'/g, "'"), 74;

                      case 31:
                        return 77;

                      case 32:
                        return 76;

                      case 33:
                        return 76;

                      case 34:
                        return 75;

                      case 35:
                        return 69;

                      case 36:
                        return 71;

                      case 37:
                        return 66;

                      case 38:
                        return b.yytext = e(1, 2), 66;

                      case 39:
                        return "INVALID";

                      case 40:
                        return 5;
                    }
                }, a.rules = [ /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/ ], 
                a.conditions = {
                    mu: {
                        rules: [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40 ],
                        inclusive: !1
                    },
                    emu: {
                        rules: [ 2 ],
                        inclusive: !1
                    },
                    com: {
                        rules: [ 5 ],
                        inclusive: !1
                    },
                    raw: {
                        rules: [ 3, 4 ],
                        inclusive: !1
                    },
                    INITIAL: {
                        rules: [ 0, 1, 40 ],
                        inclusive: !0
                    }
                }, a;
            }();
            return b.lexer = c, a.prototype = b, b.Parser = a, new a();
        }();
        return a = b;
    }(), i = function(a, b) {
        "use strict";
        function c() {
            this.parents = [];
        }
        var d, e = a, f = b;
        return c.prototype = {
            constructor: c,
            mutating: !1,
            acceptKey: function(a, b) {
                var c = this.accept(a[b]);
                if (this.mutating) {
                    if (c && (!c.type || !f[c.type])) throw new e('Unexpected node type "' + c.type + '" found when accepting ' + b + " on " + a.type);
                    a[b] = c;
                }
            },
            acceptRequired: function(a, b) {
                if (this.acceptKey(a, b), !a[b]) throw new e(a.type + " requires " + b);
            },
            acceptArray: function(a) {
                for (var b = 0, c = a.length; c > b; b++) this.acceptKey(a, b), a[b] || (a.splice(b, 1), 
                b--, c--);
            },
            accept: function(a) {
                if (a) {
                    this.current && this.parents.unshift(this.current), this.current = a;
                    var b = this[a.type](a);
                    return this.current = this.parents.shift(), !this.mutating || b ? b : b !== !1 ? a : void 0;
                }
            },
            Program: function(a) {
                this.acceptArray(a.body);
            },
            MustacheStatement: function(a) {
                this.acceptRequired(a, "path"), this.acceptArray(a.params), this.acceptKey(a, "hash");
            },
            BlockStatement: function(a) {
                this.acceptRequired(a, "path"), this.acceptArray(a.params), this.acceptKey(a, "hash"), 
                this.acceptKey(a, "program"), this.acceptKey(a, "inverse");
            },
            PartialStatement: function(a) {
                this.acceptRequired(a, "name"), this.acceptArray(a.params), this.acceptKey(a, "hash");
            },
            ContentStatement: function() {},
            CommentStatement: function() {},
            SubExpression: function(a) {
                this.acceptRequired(a, "path"), this.acceptArray(a.params), this.acceptKey(a, "hash");
            },
            PartialExpression: function(a) {
                this.acceptRequired(a, "name"), this.acceptArray(a.params), this.acceptKey(a, "hash");
            },
            PathExpression: function() {},
            StringLiteral: function() {},
            NumberLiteral: function() {},
            BooleanLiteral: function() {},
            Hash: function(a) {
                this.acceptArray(a.pairs);
            },
            HashPair: function(a) {
                this.acceptRequired(a, "value");
            }
        }, d = c;
    }(b, g), j = function(a) {
        "use strict";
        function b() {}
        function c(a, b, c) {
            void 0 === b && (b = a.length);
            var d = a[b - 1], e = a[b - 2];
            return d ? "ContentStatement" === d.type ? (e || !c ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(d.original) : void 0 : c;
        }
        function d(a, b, c) {
            void 0 === b && (b = -1);
            var d = a[b + 1], e = a[b + 2];
            return d ? "ContentStatement" === d.type ? (e || !c ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(d.original) : void 0 : c;
        }
        function e(a, b, c) {
            var d = a[null == b ? 0 : b + 1];
            if (d && "ContentStatement" === d.type && (c || !d.rightStripped)) {
                var e = d.value;
                d.value = d.value.replace(c ? /^\s+/ : /^[ \t]*\r?\n?/, ""), d.rightStripped = d.value !== e;
            }
        }
        function f(a, b, c) {
            var d = a[null == b ? a.length - 1 : b - 1];
            if (d && "ContentStatement" === d.type && (c || !d.leftStripped)) {
                var e = d.value;
                return d.value = d.value.replace(c ? /\s+$/ : /[ \t]+$/, ""), d.leftStripped = d.value !== e, 
                d.leftStripped;
            }
        }
        var g, h = a;
        return b.prototype = new h(), b.prototype.Program = function(a) {
            var b = !this.isRootSeen;
            this.isRootSeen = !0;
            for (var g = a.body, h = 0, i = g.length; i > h; h++) {
                var j = g[h], k = this.accept(j);
                if (k) {
                    var l = c(g, h, b), m = d(g, h, b), n = k.openStandalone && l, o = k.closeStandalone && m, p = k.inlineStandalone && l && m;
                    k.close && e(g, h, !0), k.open && f(g, h, !0), p && (e(g, h), f(g, h) && "PartialStatement" === j.type && (j.indent = /([ \t]+$)/.exec(g[h - 1].original)[1])), 
                    n && (e((j.program || j.inverse).body), f(g, h)), o && (e(g, h), f((j.inverse || j.program).body));
                }
            }
            return a;
        }, b.prototype.BlockStatement = function(a) {
            this.accept(a.program), this.accept(a.inverse);
            var b = a.program || a.inverse, g = a.program && a.inverse, h = g, i = g;
            if (g && g.chained) for (h = g.body[0].program; i.chained; ) i = i.body[i.body.length - 1].program;
            var j = {
                open: a.openStrip.open,
                close: a.closeStrip.close,
                openStandalone: d(b.body),
                closeStandalone: c((h || b).body)
            };
            if (a.openStrip.close && e(b.body, null, !0), g) {
                var k = a.inverseStrip;
                k.open && f(b.body, null, !0), k.close && e(h.body, null, !0), a.closeStrip.open && f(i.body, null, !0), 
                c(b.body) && d(h.body) && (f(b.body), e(h.body));
            } else a.closeStrip.open && f(b.body, null, !0);
            return j;
        }, b.prototype.MustacheStatement = function(a) {
            return a.strip;
        }, b.prototype.PartialStatement = b.prototype.CommentStatement = function(a) {
            var b = a.strip || {};
            return {
                inlineStandalone: !0,
                open: b.open,
                close: b.close
            };
        }, g = b;
    }(i), k = function(a) {
        "use strict";
        function b(a, b) {
            this.source = a, this.start = {
                line: b.first_line,
                column: b.first_column
            }, this.end = {
                line: b.last_line,
                column: b.last_column
            };
        }
        function c(a, b) {
            return {
                open: "~" === a.charAt(2),
                close: "~" === b.charAt(b.length - 3)
            };
        }
        function d(a) {
            return a.replace(/^\{\{~?\!-?-?/, "").replace(/-?-?~?\}\}$/, "");
        }
        function e(a, b, c) {
            c = this.locInfo(c);
            for (var d = a ? "@" : "", e = [], f = 0, g = "", h = 0, i = b.length; i > h; h++) {
                var k = b[h].part;
                if (d += (b[h].separator || "") + k, ".." === k || "." === k || "this" === k) {
                    if (e.length > 0) throw new j("Invalid path: " + d, {
                        loc: c
                    });
                    ".." === k && (f++, g += "../");
                } else e.push(k);
            }
            return new this.PathExpression(a, f, e, d, c);
        }
        function f(a, b, c, d, e, f) {
            var g = d.charAt(3) || d.charAt(2), h = "{" !== g && "&" !== g;
            return new this.MustacheStatement(a, b, c, h, e, this.locInfo(f));
        }
        function g(a, b, c, d) {
            if (a.path.original !== c) {
                var e = {
                    loc: a.path.loc
                };
                throw new j(a.path.original + " doesn't match " + c, e);
            }
            d = this.locInfo(d);
            var f = new this.Program([ b ], null, {}, d);
            return new this.BlockStatement(a.path, a.params, a.hash, f, void 0, {}, {}, {}, d);
        }
        function h(a, b, c, d, e, f) {
            if (d && d.path && a.path.original !== d.path.original) {
                var g = {
                    loc: a.path.loc
                };
                throw new j(a.path.original + " doesn't match " + d.path.original, g);
            }
            b.blockParams = a.blockParams;
            var h, i;
            return c && (c.chain && (c.program.body[0].closeStrip = d.strip), i = c.strip, h = c.program), 
            e && (e = h, h = b, b = e), new this.BlockStatement(a.path, a.params, a.hash, b, h, a.strip, i, d && d.strip, this.locInfo(f));
        }
        var i = {}, j = a;
        return i.SourceLocation = b, i.stripFlags = c, i.stripComment = d, i.preparePath = e, 
        i.prepareMustache = f, i.prepareRawBlock = g, i.prepareBlock = h, i;
    }(b), l = function(a, b, c, d, e) {
        "use strict";
        function f(a, b) {
            if ("Program" === a.type) return a;
            h.yy = m, m.locInfo = function(a) {
                return new m.SourceLocation(b && b.srcName, a);
            };
            var c = new j();
            return c.accept(h.parse(a));
        }
        var g = {}, h = a, i = b, j = c, k = d, l = e.extend;
        g.parser = h;
        var m = {};
        return l(m, k, i), g.parse = f, g;
    }(h, g, j, k, a), m = function(a, b, c) {
        "use strict";
        function d() {}
        function e(a, b, c) {
            if (null == a || "string" != typeof a && "Program" !== a.type) throw new j("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + a);
            b = b || {}, "data" in b || (b.data = !0), b.compat && (b.useDepths = !0);
            var d = c.parse(a, b), e = new c.Compiler().compile(d, b);
            return new c.JavaScriptCompiler().compile(e, b);
        }
        function f(a, b, c) {
            function d() {
                var d = c.parse(a, b), e = new c.Compiler().compile(d, b), f = new c.JavaScriptCompiler().compile(e, b, void 0, !0);
                return c.template(f);
            }
            if (null == a || "string" != typeof a && "Program" !== a.type) throw new j("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + a);
            b = b || {}, "data" in b || (b.data = !0), b.compat && (b.useDepths = !0);
            var e, f = function(a, b) {
                return e || (e = d()), e.call(this, a, b);
            };
            return f._setup = function(a) {
                return e || (e = d()), e._setup(a);
            }, f._child = function(a, b, c, f) {
                return e || (e = d()), e._child(a, b, c, f);
            }, f;
        }
        function g(a, b) {
            if (a === b) return !0;
            if (k(a) && k(b) && a.length === b.length) {
                for (var c = 0; c < a.length; c++) if (!g(a[c], b[c])) return !1;
                return !0;
            }
        }
        function h(a) {
            if (!a.path.parts) {
                var b = a.path;
                a.path = new m.PathExpression(!1, 0, [ b.original + "" ], b.original + "", b.log);
            }
        }
        var i = {}, j = a, k = b.isArray, l = b.indexOf, m = c, n = [].slice;
        return i.Compiler = d, d.prototype = {
            compiler: d,
            equals: function(a) {
                var b = this.opcodes.length;
                if (a.opcodes.length !== b) return !1;
                for (var c = 0; b > c; c++) {
                    var d = this.opcodes[c], e = a.opcodes[c];
                    if (d.opcode !== e.opcode || !g(d.args, e.args)) return !1;
                }
                for (b = this.children.length, c = 0; b > c; c++) if (!this.children[c].equals(a.children[c])) return !1;
                return !0;
            },
            guid: 0,
            compile: function(a, b) {
                this.sourceNode = [], this.opcodes = [], this.children = [], this.options = b, this.stringParams = b.stringParams, 
                this.trackIds = b.trackIds, b.blockParams = b.blockParams || [];
                var c = b.knownHelpers;
                if (b.knownHelpers = {
                    helperMissing: !0,
                    blockHelperMissing: !0,
                    each: !0,
                    "if": !0,
                    unless: !0,
                    "with": !0,
                    log: !0,
                    lookup: !0
                }, c) for (var d in c) b.knownHelpers[d] = c[d];
                return this.accept(a);
            },
            compileProgram: function(a) {
                var b = new this.compiler().compile(a, this.options), c = this.guid++;
                return this.usePartial = this.usePartial || b.usePartial, this.children[c] = b, 
                this.useDepths = this.useDepths || b.useDepths, c;
            },
            accept: function(a) {
                this.sourceNode.unshift(a);
                var b = this[a.type](a);
                return this.sourceNode.shift(), b;
            },
            Program: function(a) {
                this.options.blockParams.unshift(a.blockParams);
                for (var b = a.body, c = 0, d = b.length; d > c; c++) this.accept(b[c]);
                return this.options.blockParams.shift(), this.isSimple = 1 === d, this.blockParams = a.blockParams ? a.blockParams.length : 0, 
                this;
            },
            BlockStatement: function(a) {
                h(a);
                var b = a.program, c = a.inverse;
                b = b && this.compileProgram(b), c = c && this.compileProgram(c);
                var d = this.classifySexpr(a);
                "helper" === d ? this.helperSexpr(a, b, c) : "simple" === d ? (this.simpleSexpr(a), 
                this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("emptyHash"), 
                this.opcode("blockValue", a.path.original)) : (this.ambiguousSexpr(a, b, c), this.opcode("pushProgram", b), 
                this.opcode("pushProgram", c), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), 
                this.opcode("append");
            },
            PartialStatement: function(a) {
                this.usePartial = !0;
                var b = a.params;
                if (b.length > 1) throw new j("Unsupported number of partial arguments: " + b.length, a);
                b.length || b.push({
                    type: "PathExpression",
                    parts: [],
                    depth: 0
                });
                var c = a.name.original, d = "SubExpression" === a.name.type;
                d && this.accept(a.name), this.setupFullMustacheParams(a, void 0, void 0, !0);
                var e = a.indent || "";
                this.options.preventIndent && e && (this.opcode("appendContent", e), e = ""), this.opcode("invokePartial", d, c, e), 
                this.opcode("append");
            },
            MustacheStatement: function(a) {
                this.SubExpression(a), this.opcode(a.escaped && !this.options.noEscape ? "appendEscaped" : "append");
            },
            ContentStatement: function(a) {
                a.value && this.opcode("appendContent", a.value);
            },
            CommentStatement: function() {},
            SubExpression: function(a) {
                h(a);
                var b = this.classifySexpr(a);
                "simple" === b ? this.simpleSexpr(a) : "helper" === b ? this.helperSexpr(a) : this.ambiguousSexpr(a);
            },
            ambiguousSexpr: function(a, b, c) {
                var d = a.path, e = d.parts[0], f = null != b || null != c;
                this.opcode("getContext", d.depth), this.opcode("pushProgram", b), this.opcode("pushProgram", c), 
                this.accept(d), this.opcode("invokeAmbiguous", e, f);
            },
            simpleSexpr: function(a) {
                this.accept(a.path), this.opcode("resolvePossibleLambda");
            },
            helperSexpr: function(a, b, c) {
                var d = this.setupFullMustacheParams(a, b, c), e = a.path, f = e.parts[0];
                if (this.options.knownHelpers[f]) this.opcode("invokeKnownHelper", d.length, f); else {
                    if (this.options.knownHelpersOnly) throw new j("You specified knownHelpersOnly, but used the unknown helper " + f, a);
                    e.falsy = !0, this.accept(e), this.opcode("invokeHelper", d.length, e.original, m.helpers.simpleId(e));
                }
            },
            PathExpression: function(a) {
                this.addDepth(a.depth), this.opcode("getContext", a.depth);
                var b = a.parts[0], c = m.helpers.scopedId(a), d = !a.depth && !c && this.blockParamIndex(b);
                d ? this.opcode("lookupBlockParam", d, a.parts) : b ? a.data ? (this.options.data = !0, 
                this.opcode("lookupData", a.depth, a.parts)) : this.opcode("lookupOnContext", a.parts, a.falsy, c) : this.opcode("pushContext");
            },
            StringLiteral: function(a) {
                this.opcode("pushString", a.value);
            },
            NumberLiteral: function(a) {
                this.opcode("pushLiteral", a.value);
            },
            BooleanLiteral: function(a) {
                this.opcode("pushLiteral", a.value);
            },
            Hash: function(a) {
                var b, c, d = a.pairs;
                for (this.opcode("pushHash"), b = 0, c = d.length; c > b; b++) this.pushParam(d[b].value);
                for (;b--; ) this.opcode("assignToHash", d[b].key);
                this.opcode("popHash");
            },
            opcode: function(a) {
                this.opcodes.push({
                    opcode: a,
                    args: n.call(arguments, 1),
                    loc: this.sourceNode[0].loc
                });
            },
            addDepth: function(a) {
                a && (this.useDepths = !0);
            },
            classifySexpr: function(a) {
                var b = m.helpers.simpleId(a.path), c = b && !!this.blockParamIndex(a.path.parts[0]), d = !c && m.helpers.helperExpression(a), e = !c && (d || b), f = this.options;
                if (e && !d) {
                    var g = a.path.parts[0];
                    f.knownHelpers[g] ? d = !0 : f.knownHelpersOnly && (e = !1);
                }
                return d ? "helper" : e ? "ambiguous" : "simple";
            },
            pushParams: function(a) {
                for (var b = 0, c = a.length; c > b; b++) this.pushParam(a[b]);
            },
            pushParam: function(a) {
                var b = null != a.value ? a.value : a.original || "";
                if (this.stringParams) b.replace && (b = b.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), 
                a.depth && this.addDepth(a.depth), this.opcode("getContext", a.depth || 0), this.opcode("pushStringParam", b, a.type), 
                "SubExpression" === a.type && this.accept(a); else {
                    if (this.trackIds) {
                        var c;
                        if (!a.parts || m.helpers.scopedId(a) || a.depth || (c = this.blockParamIndex(a.parts[0])), 
                        c) {
                            var d = a.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", c, d);
                        } else b = a.original || b, b.replace && (b = b.replace(/^\.\//g, "").replace(/^\.$/g, "")), 
                        this.opcode("pushId", a.type, b);
                    }
                    this.accept(a);
                }
            },
            setupFullMustacheParams: function(a, b, c, d) {
                var e = a.params;
                return this.pushParams(e), this.opcode("pushProgram", b), this.opcode("pushProgram", c), 
                a.hash ? this.accept(a.hash) : this.opcode("emptyHash", d), e;
            },
            blockParamIndex: function(a) {
                for (var b = 0, c = this.options.blockParams.length; c > b; b++) {
                    var d = this.options.blockParams[b], e = d && l(d, a);
                    if (d && e >= 0) return [ b, e ];
                }
            }
        }, i.precompile = e, i.compile = f, i;
    }(b, a, g), n = function(a) {
        "use strict";
        function b(a, b, c) {
            if (e(a)) {
                for (var d = [], f = 0, g = a.length; g > f; f++) d.push(b.wrap(a[f], c));
                return d;
            }
            return "boolean" == typeof a || "number" == typeof a ? a + "" : a;
        }
        function c(a) {
            this.srcFile = a, this.source = [];
        }
        var d, e = a.isArray;
        try {
            var f = require("source-map"), g = f.SourceNode;
        } catch (h) {
            g = function(a, b, c, d) {
                this.src = "", d && this.add(d);
            }, g.prototype = {
                add: function(a) {
                    e(a) && (a = a.join("")), this.src += a;
                },
                prepend: function(a) {
                    e(a) && (a = a.join("")), this.src = a + this.src;
                },
                toStringWithSourceMap: function() {
                    return {
                        code: this.toString()
                    };
                },
                toString: function() {
                    return this.src;
                }
            };
        }
        return c.prototype = {
            prepend: function(a, b) {
                this.source.unshift(this.wrap(a, b));
            },
            push: function(a, b) {
                this.source.push(this.wrap(a, b));
            },
            merge: function() {
                var a = this.empty();
                return this.each(function(b) {
                    a.add([ "  ", b, "\n" ]);
                }), a;
            },
            each: function(a) {
                for (var b = 0, c = this.source.length; c > b; b++) a(this.source[b]);
            },
            empty: function(a) {
                return a = a || this.currentLocation || {
                    start: {}
                }, new g(a.start.line, a.start.column, this.srcFile);
            },
            wrap: function(a, c) {
                return a instanceof g ? a : (c = c || this.currentLocation || {
                    start: {}
                }, a = b(a, this, c), new g(c.start.line, c.start.column, this.srcFile, a));
            },
            functionCall: function(a, b, c) {
                return c = this.generateList(c), this.wrap([ a, b ? "." + b + "(" : "(", c, ")" ]);
            },
            quotedString: function(a) {
                return '"' + (a + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
            },
            objectLiteral: function(a) {
                var c = [];
                for (var d in a) if (a.hasOwnProperty(d)) {
                    var e = b(a[d], this);
                    "undefined" !== e && c.push([ this.quotedString(d), ":", e ]);
                }
                var f = this.generateList(c);
                return f.prepend("{"), f.add("}"), f;
            },
            generateList: function(a, c) {
                for (var d = this.empty(c), e = 0, f = a.length; f > e; e++) e && d.add(","), d.add(b(a[e], this, c));
                return d;
            },
            generateArray: function(a, b) {
                var c = this.generateList(a, b);
                return c.prepend("["), c.add("]"), c;
            }
        }, d = c;
    }(a), o = function(a, b, c, d) {
        "use strict";
        function e(a) {
            this.value = a;
        }
        function f() {}
        function g(a, b, c, d) {
            var e = b.popStack(), f = 0, g = c.length;
            for (a && g--; g > f; f++) e = b.nameLookup(e, c[f], d);
            return a ? [ b.aliasable("this.strict"), "(", e, ", ", b.quotedString(c[f]), ")" ] : e;
        }
        var h, i = a.COMPILER_REVISION, j = a.REVISION_CHANGES, k = b, l = c.isArray, m = d;
        f.prototype = {
            nameLookup: function(a, b) {
                return f.isValidJavaScriptVariableName(b) ? [ a, ".", b ] : [ a, "['", b, "']" ];
            },
            depthedLookup: function(a) {
                return [ this.aliasable("this.lookup"), '(depths, "', a, '")' ];
            },
            compilerInfo: function() {
                var a = i, b = j[a];
                return [ a, b ];
            },
            appendToBuffer: function(a, b, c) {
                return l(a) || (a = [ a ]), a = this.source.wrap(a, b), this.environment.isSimple ? [ "return ", a, ";" ] : c ? [ "buffer += ", a, ";" ] : (a.appendToBuffer = !0, 
                a);
            },
            initializeBuffer: function() {
                return this.quotedString("");
            },
            compile: function(a, b, c, d) {
                this.environment = a, this.options = b, this.stringParams = this.options.stringParams, 
                this.trackIds = this.options.trackIds, this.precompile = !d, this.name = this.environment.name, 
                this.isChild = !!c, this.context = c || {
                    programs: [],
                    environments: []
                }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, 
                this.registers = {
                    list: []
                }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], 
                this.compileChildren(a, b), this.useDepths = this.useDepths || a.useDepths || this.options.compat, 
                this.useBlockParams = this.useBlockParams || a.useBlockParams;
                var e, f, g, h, i = a.opcodes;
                for (g = 0, h = i.length; h > g; g++) e = i[g], this.source.currentLocation = e.loc, 
                f = f || e.loc, this[e.opcode].apply(this, e.args);
                if (this.source.currentLocation = f, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new k("Compile completed with content left on stack");
                var j = this.createFunctionContext(d);
                if (this.isChild) return j;
                var l = {
                    compiler: this.compilerInfo(),
                    main: j
                }, m = this.context.programs;
                for (g = 0, h = m.length; h > g; g++) m[g] && (l[g] = m[g]);
                return this.environment.usePartial && (l.usePartial = !0), this.options.data && (l.useData = !0), 
                this.useDepths && (l.useDepths = !0), this.useBlockParams && (l.useBlockParams = !0), 
                this.options.compat && (l.compat = !0), d ? l.compilerOptions = this.options : (l.compiler = JSON.stringify(l.compiler), 
                this.source.currentLocation = {
                    start: {
                        line: 1,
                        column: 0
                    }
                }, l = this.objectLiteral(l), b.srcName ? (l = l.toStringWithSourceMap({
                    file: b.destName
                }), l.map = l.map && l.map.toString()) : l = l.toString()), l;
            },
            preamble: function() {
                this.lastContext = 0, this.source = new m(this.options.srcName);
            },
            createFunctionContext: function(a) {
                var b = "", c = this.stackVars.concat(this.registers.list);
                c.length > 0 && (b += ", " + c.join(", "));
                var d = 0;
                for (var e in this.aliases) {
                    var f = this.aliases[e];
                    this.aliases.hasOwnProperty(e) && f.children && f.referenceCount > 1 && (b += ", alias" + ++d + "=" + e, 
                    f.children[0] = "alias" + d);
                }
                var g = [ "depth0", "helpers", "partials", "data" ];
                (this.useBlockParams || this.useDepths) && g.push("blockParams"), this.useDepths && g.push("depths");
                var h = this.mergeSource(b);
                return a ? (g.push(h), Function.apply(this, g)) : this.source.wrap([ "function(", g.join(","), ") {\n  ", h, "}" ]);
            },
            mergeSource: function(a) {
                var b, c, d, e, f = this.environment.isSimple, g = !this.forceBuffer;
                return this.source.each(function(a) {
                    a.appendToBuffer ? (d ? a.prepend("  + ") : d = a, e = a) : (d && (c ? d.prepend("buffer += ") : b = !0, 
                    e.add(";"), d = e = void 0), c = !0, f || (g = !1));
                }), g ? d ? (d.prepend("return "), e.add(";")) : c || this.source.push('return "";') : (a += ", buffer = " + (b ? "" : this.initializeBuffer()), 
                d ? (d.prepend("return buffer + "), e.add(";")) : this.source.push("return buffer;")), 
                a && this.source.prepend("var " + a.substring(2) + (b ? "" : ";\n")), this.source.merge();
            },
            blockValue: function(a) {
                var b = this.aliasable("helpers.blockHelperMissing"), c = [ this.contextName(0) ];
                this.setupHelperArgs(a, 0, c);
                var d = this.popStack();
                c.splice(1, 0, d), this.push(this.source.functionCall(b, "call", c));
            },
            ambiguousBlockValue: function() {
                var a = this.aliasable("helpers.blockHelperMissing"), b = [ this.contextName(0) ];
                this.setupHelperArgs("", 0, b, !0), this.flushInline();
                var c = this.topStack();
                b.splice(1, 0, c), this.pushSource([ "if (!", this.lastHelper, ") { ", c, " = ", this.source.functionCall(a, "call", b), "}" ]);
            },
            appendContent: function(a) {
                this.pendingContent ? a = this.pendingContent + a : this.pendingLocation = this.source.currentLocation, 
                this.pendingContent = a;
            },
            append: function() {
                if (this.isInline()) this.replaceStack(function(a) {
                    return [ " != null ? ", a, ' : ""' ];
                }), this.pushSource(this.appendToBuffer(this.popStack())); else {
                    var a = this.popStack();
                    this.pushSource([ "if (", a, " != null) { ", this.appendToBuffer(a, void 0, !0), " }" ]), 
                    this.environment.isSimple && this.pushSource([ "else { ", this.appendToBuffer("''", void 0, !0), " }" ]);
                }
            },
            appendEscaped: function() {
                this.pushSource(this.appendToBuffer([ this.aliasable("this.escapeExpression"), "(", this.popStack(), ")" ]));
            },
            getContext: function(a) {
                this.lastContext = a;
            },
            pushContext: function() {
                this.pushStackLiteral(this.contextName(this.lastContext));
            },
            lookupOnContext: function(a, b, c) {
                var d = 0;
                c || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(a[d++])), 
                this.resolvePath("context", a, d, b);
            },
            lookupBlockParam: function(a, b) {
                this.useBlockParams = !0, this.push([ "blockParams[", a[0], "][", a[1], "]" ]), 
                this.resolvePath("context", b, 1);
            },
            lookupData: function(a, b) {
                this.pushStackLiteral(a ? "this.data(data, " + a + ")" : "data"), this.resolvePath("data", b, 0, !0);
            },
            resolvePath: function(a, b, c, d) {
                if (this.options.strict || this.options.assumeObjects) return void this.push(g(this.options.strict, this, b, a));
                for (var e = b.length; e > c; c++) this.replaceStack(function(e) {
                    var f = this.nameLookup(e, b[c], a);
                    return d ? [ " && ", f ] : [ " != null ? ", f, " : ", e ];
                });
            },
            resolvePossibleLambda: function() {
                this.push([ this.aliasable("this.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")" ]);
            },
            pushStringParam: function(a, b) {
                this.pushContext(), this.pushString(b), "SubExpression" !== b && ("string" == typeof a ? this.pushString(a) : this.pushStackLiteral(a));
            },
            emptyHash: function(a) {
                this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), 
                this.pushStackLiteral(a ? "undefined" : "{}");
            },
            pushHash: function() {
                this.hash && this.hashes.push(this.hash), this.hash = {
                    values: [],
                    types: [],
                    contexts: [],
                    ids: []
                };
            },
            popHash: function() {
                var a = this.hash;
                this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(a.ids)), 
                this.stringParams && (this.push(this.objectLiteral(a.contexts)), this.push(this.objectLiteral(a.types))), 
                this.push(this.objectLiteral(a.values));
            },
            pushString: function(a) {
                this.pushStackLiteral(this.quotedString(a));
            },
            pushLiteral: function(a) {
                this.pushStackLiteral(a);
            },
            pushProgram: function(a) {
                this.pushStackLiteral(null != a ? this.programExpression(a) : null);
            },
            invokeHelper: function(a, b, c) {
                var d = this.popStack(), e = this.setupHelper(a, b), f = c ? [ e.name, " || " ] : "", g = [ "(" ].concat(f, d);
                this.options.strict || g.push(" || ", this.aliasable("helpers.helperMissing")), 
                g.push(")"), this.push(this.source.functionCall(g, "call", e.callParams));
            },
            invokeKnownHelper: function(a, b) {
                var c = this.setupHelper(a, b);
                this.push(this.source.functionCall(c.name, "call", c.callParams));
            },
            invokeAmbiguous: function(a, b) {
                this.useRegister("helper");
                var c = this.popStack();
                this.emptyHash();
                var d = this.setupHelper(0, a, b), e = this.lastHelper = this.nameLookup("helpers", a, "helper"), f = [ "(", "(helper = ", e, " || ", c, ")" ];
                this.options.strict || (f[0] = "(helper = ", f.push(" != null ? helper : ", this.aliasable("helpers.helperMissing"))), 
                this.push([ "(", f, d.paramsInit ? [ "),(", d.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", d.callParams), " : helper))" ]);
            },
            invokePartial: function(a, b, c) {
                var d = [], e = this.setupParams(b, 1, d, !1);
                a && (b = this.popStack(), delete e.name), c && (e.indent = JSON.stringify(c)), 
                e.helpers = "helpers", e.partials = "partials", d.unshift(a ? b : this.nameLookup("partials", b, "partial")), 
                this.options.compat && (e.depths = "depths"), e = this.objectLiteral(e), d.push(e), 
                this.push(this.source.functionCall("this.invokePartial", "", d));
            },
            assignToHash: function(a) {
                var b, c, d, e = this.popStack();
                this.trackIds && (d = this.popStack()), this.stringParams && (c = this.popStack(), 
                b = this.popStack());
                var f = this.hash;
                b && (f.contexts[a] = b), c && (f.types[a] = c), d && (f.ids[a] = d), f.values[a] = e;
            },
            pushId: function(a, b, c) {
                "BlockParam" === a ? this.pushStackLiteral("blockParams[" + b[0] + "].path[" + b[1] + "]" + (c ? " + " + JSON.stringify("." + c) : "")) : "PathExpression" === a ? this.pushString(b) : this.pushStackLiteral("SubExpression" === a ? "true" : "null");
            },
            compiler: f,
            compileChildren: function(a, b) {
                for (var c, d, e = a.children, f = 0, g = e.length; g > f; f++) {
                    c = e[f], d = new this.compiler();
                    var h = this.matchExistingProgram(c);
                    null == h ? (this.context.programs.push(""), h = this.context.programs.length, c.index = h, 
                    c.name = "program" + h, this.context.programs[h] = d.compile(c, b, this.context, !this.precompile), 
                    this.context.environments[h] = c, this.useDepths = this.useDepths || d.useDepths, 
                    this.useBlockParams = this.useBlockParams || d.useBlockParams) : (c.index = h, c.name = "program" + h, 
                    this.useDepths = this.useDepths || c.useDepths, this.useBlockParams = this.useBlockParams || c.useBlockParams);
                }
            },
            matchExistingProgram: function(a) {
                for (var b = 0, c = this.context.environments.length; c > b; b++) {
                    var d = this.context.environments[b];
                    if (d && d.equals(a)) return b;
                }
            },
            programExpression: function(a) {
                var b = this.environment.children[a], c = [ b.index, "data", b.blockParams ];
                return (this.useBlockParams || this.useDepths) && c.push("blockParams"), this.useDepths && c.push("depths"), 
                "this.program(" + c.join(", ") + ")";
            },
            useRegister: function(a) {
                this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a));
            },
            push: function(a) {
                return a instanceof e || (a = this.source.wrap(a)), this.inlineStack.push(a), a;
            },
            pushStackLiteral: function(a) {
                this.push(new e(a));
            },
            pushSource: function(a) {
                this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), 
                this.pendingContent = void 0), a && this.source.push(a);
            },
            replaceStack: function(a) {
                var b, c, d, f = [ "(" ];
                if (!this.isInline()) throw new k("replaceStack on non-inline");
                var g = this.popStack(!0);
                if (g instanceof e) b = [ g.value ], f = [ "(", b ], d = !0; else {
                    c = !0;
                    var h = this.incrStack();
                    f = [ "((", this.push(h), " = ", g, ")" ], b = this.topStack();
                }
                var i = a.call(this, b);
                d || this.popStack(), c && this.stackSlot--, this.push(f.concat(i, ")"));
            },
            incrStack: function() {
                return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), 
                this.topStackName();
            },
            topStackName: function() {
                return "stack" + this.stackSlot;
            },
            flushInline: function() {
                var a = this.inlineStack;
                this.inlineStack = [];
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    if (d instanceof e) this.compileStack.push(d); else {
                        var f = this.incrStack();
                        this.pushSource([ f, " = ", d, ";" ]), this.compileStack.push(f);
                    }
                }
            },
            isInline: function() {
                return this.inlineStack.length;
            },
            popStack: function(a) {
                var b = this.isInline(), c = (b ? this.inlineStack : this.compileStack).pop();
                if (!a && c instanceof e) return c.value;
                if (!b) {
                    if (!this.stackSlot) throw new k("Invalid stack pop");
                    this.stackSlot--;
                }
                return c;
            },
            topStack: function() {
                var a = this.isInline() ? this.inlineStack : this.compileStack, b = a[a.length - 1];
                return b instanceof e ? b.value : b;
            },
            contextName: function(a) {
                return this.useDepths && a ? "depths[" + a + "]" : "depth" + a;
            },
            quotedString: function(a) {
                return this.source.quotedString(a);
            },
            objectLiteral: function(a) {
                return this.source.objectLiteral(a);
            },
            aliasable: function(a) {
                var b = this.aliases[a];
                return b ? (b.referenceCount++, b) : (b = this.aliases[a] = this.source.wrap(a), 
                b.aliasable = !0, b.referenceCount = 1, b);
            },
            setupHelper: function(a, b, c) {
                var d = [], e = this.setupHelperArgs(b, a, d, c), f = this.nameLookup("helpers", b, "helper");
                return {
                    params: d,
                    paramsInit: e,
                    name: f,
                    callParams: [ this.contextName(0) ].concat(d)
                };
            },
            setupParams: function(a, b, c) {
                var d, e = {}, f = [], g = [], h = [];
                e.name = this.quotedString(a), e.hash = this.popStack(), this.trackIds && (e.hashIds = this.popStack()), 
                this.stringParams && (e.hashTypes = this.popStack(), e.hashContexts = this.popStack());
                var i = this.popStack(), j = this.popStack();
                (j || i) && (e.fn = j || "this.noop", e.inverse = i || "this.noop");
                for (var k = b; k--; ) d = this.popStack(), c[k] = d, this.trackIds && (h[k] = this.popStack()), 
                this.stringParams && (g[k] = this.popStack(), f[k] = this.popStack());
                return this.trackIds && (e.ids = this.source.generateArray(h)), this.stringParams && (e.types = this.source.generateArray(g), 
                e.contexts = this.source.generateArray(f)), this.options.data && (e.data = "data"), 
                this.useBlockParams && (e.blockParams = "blockParams"), e;
            },
            setupHelperArgs: function(a, b, c, d) {
                var e = this.setupParams(a, b, c, !0);
                return e = this.objectLiteral(e), d ? (this.useRegister("options"), c.push("options"), 
                [ "options=", e ]) : (c.push(e), "");
            }
        };
        for (var n = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), o = f.RESERVED_WORDS = {}, p = 0, q = n.length; q > p; p++) o[n[p]] = !0;
        return f.isValidJavaScriptVariableName = function(a) {
            return !f.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a);
        }, h = f;
    }(c, b, a, n), p = function(a, b, c, d, e) {
        "use strict";
        var f, g = a, h = b, i = c.parser, j = c.parse, k = d.Compiler, l = d.compile, m = d.precompile, n = e, o = g.create, p = function() {
            var a = o();
            return a.compile = function(b, c) {
                return l(b, c, a);
            }, a.precompile = function(b, c) {
                return m(b, c, a);
            }, a.AST = h, a.Compiler = k, a.JavaScriptCompiler = n, a.Parser = i, a.parse = j, 
            a;
        };
        g = p(), g.create = p;
        var q = "undefined" != typeof global ? global : window, r = q.Handlebars;
        return g.noConflict = function() {
            q.Handlebars === g && (q.Handlebars = r);
        }, g["default"] = g, f = g;
    }(f, g, l, m, o);
    return p;
}), !function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length, c = _.type(a);
        return "function" === c || _.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
    }
    function d(a, b, c) {
        if (_.isFunction(b)) return _.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        });
        if (b.nodeType) return _.grep(a, function(a) {
            return a === b !== c;
        });
        if ("string" == typeof b) {
            if (ha.test(b)) return _.filter(b, a, c);
            b = _.filter(b, a);
        }
        return _.grep(a, function(a) {
            return U.call(b, a) >= 0 !== c;
        });
    }
    function e(a, b) {
        for (;(a = a[b]) && 1 !== a.nodeType; ) ;
        return a;
    }
    function f(a) {
        var b = oa[a] = {};
        return _.each(a.match(na) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), 
        _.ready();
    }
    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        }), this.expando = _.expando + h.uid++;
    }
    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(ua, "-$1").toLowerCase(), 
        c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ta.test(c) ? _.parseJSON(c) : c;
            } catch (e) {}
            sa.set(a, b, c);
        } else c = void 0;
        return c;
    }
    function j() {
        return !0;
    }
    function k() {
        return !1;
    }
    function l() {
        try {
            return Z.activeElement;
        } catch (a) {}
    }
    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
    }
    function o(a) {
        var b = Ka.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function p(a, b) {
        for (var c = 0, d = a.length; d > c; c++) ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"));
    }
    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (ra.hasData(a) && (f = ra.access(a), g = ra.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c]);
            }
            sa.hasData(a) && (h = sa.access(a), i = _.extend({}, h), sa.set(b, i));
        }
    }
    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([ a ], c) : c;
    }
    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ya.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
    }
    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
        return e.detach(), f;
    }
    function u(a) {
        var b = Z, c = Oa[a];
        return c || (c = t(a, b), "none" !== c && c || (Na = (Na || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), 
        b = Na[0].contentDocument, b.write(), b.close(), c = t(a, b), Na.detach()), Oa[a] = c), 
        c;
    }
    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), 
        Qa.test(g) && Pa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, 
        g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
    }
    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--; ) if (b = Xa[e] + c, 
        b in a) return b;
        return d;
    }
    function y(a, b, c) {
        var d = Ta.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += _.css(a, c + wa[f], !0, e)), 
        d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e), 
        "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
        return g;
    }
    function A(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ra(a), g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qa.test(e)) return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ra.get(d, "olddisplay"), 
        c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d), 
        "none" === c && e || ra.set(d, "olddisplay", e ? c : _.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e);
    }
    function D() {
        return setTimeout(function() {
            Ya = void 0;
        }), Ya = _.now();
    }
    function E(a, b) {
        var c, d = 0, e = {
            height: a
        };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wa[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e;
    }
    function F(a, b, c) {
        for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function G(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && xa(a), p = ra.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, 
        h.empty.fire = function() {
            h.unqueued || i();
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, _.queue(a, "fx").length || h.empty.fire();
            });
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [ n.overflow, n.overflowX, n.overflowY ], 
        j = _.css(a, "display"), k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j, 
        "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")), 
        c.overflow && (n.overflow = "hidden", l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2];
        }));
        for (d in b) if (e = b[d], $a.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                if ("show" !== e || !p || void 0 === p[d]) continue;
                o = !0;
            }
            m[d] = p && p[d] || _.style(a, d);
        } else j = void 0;
        if (_.isEmptyObject(m)) "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j); else {
            p ? "hidden" in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}), f && (p.hidden = !o), 
            o ? _(a).show() : l.done(function() {
                _(a).hide();
            }), l.done(function() {
                var b;
                ra.remove(a, "fxshow");
                for (b in m) _.style(a, b, m[b]);
            });
            for (d in m) g = F(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, 
            g.start = "width" === d || "height" === d ? 1 : 0));
        }
    }
    function H(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function I(a, b, c) {
        var d, e, f = 0, g = bb.length, h = _.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), 1 > f && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: _.extend({}, b),
            opts: _.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Ya || D(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++) if (d = bb[f].call(j, a, k, j.opts)) return d;
        return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(na) || [];
            if (_.isFunction(c)) for (;d = f[e++]; ) "+" === d[0] ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, _.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                e(j), !1);
            }), i;
        }
        var f = {}, g = a === tb;
        return e(b.dataTypes[0]) || !f["*"] && e("*");
    }
    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d), a;
    }
    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), 
        void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break;
                }
                g || (g = e);
            }
            f = f || g;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function N(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; ) if (a.responseFields[f] && (c[a.responseFields[f]] = b), 
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b);
            } catch (l) {
                return {
                    state: "parsererror",
                    error: g ? l : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    function O(a, b, c, d) {
        var e;
        if (_.isArray(b)) _.each(b, function(b, e) {
            c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== _.type(b)) d(a, b); else for (e in b) O(a + "[" + e + "]", b[e], c, d);
    }
    function P(a) {
        return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
    }
    var Q = [], R = Q.slice, S = Q.concat, T = Q.push, U = Q.indexOf, V = {}, W = V.toString, X = V.hasOwnProperty, Y = {}, Z = a.document, $ = "2.1.3", _ = function(a, b) {
        return new _.fn.init(a, b);
    }, aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ba = /^-ms-/, ca = /-([\da-z])/gi, da = function(a, b) {
        return b.toUpperCase();
    };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this);
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this);
        },
        pushStack: function(a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b;
        },
        each: function(a, b) {
            return _.each(this, a, b);
        },
        map: function(a) {
            return this.pushStack(_.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    }, _.extend = _.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); i > h; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], 
        d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, 
        f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g;
    }, _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === _.type(a);
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window;
        },
        isNumeric: function(a) {
            return !_.isArray(a) && a - parseFloat(a) + 1 >= 0;
        },
        isPlainObject: function(a) {
            return "object" !== _.type(a) || a.nodeType || _.isWindow(a) ? !1 : a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0;
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a;
        },
        globalEval: function(a) {
            var b, c = eval;
            a = _.trim(a), a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), 
            b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a));
        },
        camelCase: function(a) {
            return a.replace(ba, "ms-").replace(ca, da);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h) for (;g > f && (e = b.apply(a[f], d), e !== !1); f++) ; else for (f in a) if (e = b.apply(a[f], d), 
                e === !1) break;
            } else if (h) for (;g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++) ; else for (f in a) if (e = b.call(a[f], f, a[f]), 
            e === !1) break;
            return a;
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(aa, "");
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [ a ] : a) : T.call(d, a)), 
            d;
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c);
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e;
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h) for (;g > f; f++) e = b(a[f], f, d), null != e && i.push(e); else for (f in a) e = b(a[f], f, d), 
            null != e && i.push(e);
            return S.apply([], i);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a) ? (d = R.call(arguments, 2), 
            e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)));
            }, e.guid = a.guid = a.guid || _.guid++, e) : void 0;
        },
        now: Date.now,
        support: Y
    }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase();
    });
    var ea = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, 
            "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a))) if (g = e[1]) {
                    if (9 === h) {
                        if (f = b.getElementById(g), !f || !f.parentNode) return c;
                        if (f.id === g) return c.push(f), c;
                    } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), 
                    c;
                } else {
                    if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                    if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), 
                    c;
                }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), 
                        n = "[id='" + n + "'] ", i = j.length; i--; ) j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b, p = j.join(",");
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c;
                    } catch (q) {} finally {
                        l || b.removeAttribute("id");
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d;
            }
            var b = [];
            return a;
        }
        function d(a) {
            return a[N] = !0, a;
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; ) w.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c) for (;c = c.nextSibling; ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; ) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        function l() {}
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function n(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = Q++;
            return b.first ? function(b, c, f) {
                for (;b = b[d]; ) if (1 === b.nodeType || e) return a(b, c, f);
            } : function(b, c, g) {
                var h, i, j = [ P, f ];
                if (g) {
                    for (;b = b[d]; ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                } else for (;b = b[d]; ) if (1 === b.nodeType || e) {
                    if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                    if (i[d] = j, j[2] = a(b, c, g)) return !0;
                }
            };
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d;
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), 
            j && b.push(h));
            return g;
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [ h ] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e) for (j = q(t, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--; ) (l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i);
                        }
                        for (k = t.length; k--; ) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t);
            });
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b;
            }, g, !0), j = n(function(a) {
                return aa(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null, e;
            } ]; e > h; h++) if (c = w.relative[a[h].type]) k = [ n(o(k), c) ]; else {
                if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                    for (d = ++h; e > d && !w.relative[a[d].type]; d++) ;
                    return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*" : ""
                    })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a));
                }
                k.push(c);
            }
            return o(k);
        }
        function t(a, c) {
            var e = c.length > 0, f = a.length > 0, g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++]; ) if (m(k, g, h)) {
                            i.push(k);
                            break;
                        }
                        j && (P = u);
                    }
                    e && ((k = !m && k) && n--, d && p.push(k));
                }
                if (n += o, e && o !== n) {
                    for (l = 0; m = c[l++]; ) m(p, r, g, h);
                    if (d) {
                        if (n > 0) for (;o--; ) p[o] || r[o] || (r[o] = Y.call(i));
                        r = q(r);
                    }
                    $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                }
                return j && (P = u, C = s), p;
            };
            return e ? d(g) : g;
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date(), O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function(a, b) {
            return a === b && (E = !0), 0;
        }, V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, aa = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
            return -1;
        }, ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ea = da.replace("w", "w#"), fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]", ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)", ha = new RegExp(ca + "+", "g"), ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"), ja = new RegExp("^" + ca + "*," + ca + "*"), ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"), la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"), ma = new RegExp(ga), na = new RegExp("^" + ea + "$"), oa = {
            ID: new RegExp("^#(" + da + ")"),
            CLASS: new RegExp("^\\.(" + da + ")"),
            TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fa),
            PSEUDO: new RegExp("^" + ga),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ba + ")$", "i"),
            needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
        }, pa = /^(?:input|select|textarea|button)$/i, qa = /^h\d$/i, ra = /^[^{]+\{\s*\[native \w/, sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ta = /[+~]/, ua = /'|\\/g, va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"), wa = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        }, xa = function() {
            F();
        };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType;
        } catch (ya) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b));
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; ) ;
                    a.length = c - 1;
                }
            };
        }
        v = b.support = {}, y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1;
        }, F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, 
            c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), 
            I = !y(d), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length;
            }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length;
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [ c ] : [];
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (;c = f[e++]; ) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0;
            }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), 
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), 
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]");
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), 
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), 
                J.push(",.*:");
            })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga);
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), 
            b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1);
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0, f = a.parentNode, h = b.parentNode, i = [ a ], j = [ b ];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode; ) i.unshift(c);
                for (c = b; c = c.parentNode; ) j.unshift(c);
                for (;i[e] === j[e]; ) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
            }, d) : G;
        }, b.matches = function(a, c) {
            return b(a, null, null, c);
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (e) {}
            return b(c, G, null, [ a ]).length > 0;
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b);
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()], d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (;b = a[e++]; ) b === a[e] && (d = c.push(e));
                for (;d--; ) a.splice(c[d], 1);
            }
            return D = null, a;
        }, x = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
            } else for (;b = a[d++]; ) c += x(b);
            return c;
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0;
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (;p; ) {
                                    for (l = b; l = l[p]; ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], 
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); ) if (1 === l.nodeType && ++m && l === b) {
                                    k[a] = [ P, n, m ];
                                    break;
                                }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1]; else for (;(l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [ P, m ]), 
                            l !== b)); ) ;
                            return m -= e, m === d || m % d === 0 && m / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [ a, a, "", c ], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; ) d = aa(a, e[g]), a[d] = !(b[d] = e[g]);
                    }) : function(a) {
                        return f(a, 0, e);
                    }) : f;
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [], c = [], e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop();
                    };
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0;
                    };
                }),
                contains: d(function(a) {
                    return a = a.replace(va, wa), function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1;
                    };
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(), 
                    function(b) {
                        var c;
                        do if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), 
                        c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === H;
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !w.pseudos.empty(a);
                },
                header: function(a) {
                    return qa.test(a.nodeName);
                },
                input: function(a) {
                    return pa.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: j(function() {
                    return [ 0 ];
                }),
                last: j(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: j(function(a, b, c) {
                    return [ 0 > c ? c + b : c ];
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a;
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a;
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) w.pseudos[u] = h(u);
        for (u in {
            submit: !0,
            reset: !0
        }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l(), z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h; ) {
                (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), 
                f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break;
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0);
        }, A = b.compile = function(a, b) {
            var c, d = [], e = [], f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--; ) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a;
            }
            return f;
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length);
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]); ) if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                    if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                    break;
                }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c;
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, 
        F(), v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"));
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), v.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
        }), e(function(a) {
            return null == a.getAttribute("disabled");
        }) || f(ba, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), b;
    }(a);
    _.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, 
    _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
    var fa = _.expr.match.needsContext, ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ha = /^.[^:#\[\.,]*$/;
    _.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [ d ] : [] : _.find.matches(a, _.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, _.fn.extend({
        find: function(a) {
            var b, c = this.length, d = [], e = this;
            if ("string" != typeof a) return this.pushStack(_(a).filter(function() {
                for (b = 0; c > b; b++) if (_.contains(e[b], this)) return !0;
            }));
            for (b = 0; c > b; b++) _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, 
            d;
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0));
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length;
        }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ka = _.fn.init = function(a, b) {
        var c, d;
        if (!a) return this;
        if ("string" == typeof a) {
            if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [ null, a, null ] : ja.exec(a), 
            !c || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), 
                ga.test(c[1]) && _.isPlainObject(b)) for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this;
            }
            return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), 
            this.context = Z, this.selector = a, this;
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, 
        this.context = a.context), _.makeArray(a, this));
    };
    ka.prototype = _.fn, ia = _(Z);
    var la = /^(?:parents|prev(?:Until|All))/, ma = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    _.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; ) if (1 === a.nodeType) {
                if (e && _(a).is(c)) break;
                d.push(a);
            }
            return d;
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        }
    }), _.fn.extend({
        has: function(a) {
            var b = _(a, this), c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++) if (_.contains(this, b[a])) return !0;
            });
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? _.unique(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), _.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return _.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return _.dir(a, "parentNode", c);
        },
        next: function(a) {
            return e(a, "nextSibling");
        },
        prev: function(a) {
            return e(a, "previousSibling");
        },
        nextAll: function(a) {
            return _.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return _.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return _.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return _.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return _.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return _.sibling(a.firstChild);
        },
        contents: function(a) {
            return a.contentDocument || _.merge([], a.childNodes);
        }
    }, function(a, b) {
        _.fn[a] = function(c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), 
            this.length > 1 && (ma[a] || _.unique(e), la.test(a) && e.reverse()), this.pushStack(e);
        };
    });
    var na = /\S+/g, oa = {};
    _.Callbacks = function(a) {
        a = "string" == typeof a ? oa[a] || f(a) : _.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function(f) {
            for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++) if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                b = !1;
                break;
            }
            d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable());
        }, l = {
            add: function() {
                if (i) {
                    var c = i.length;
                    !function f(b) {
                        _.each(b, function(b, c) {
                            var d = _.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c);
                        });
                    }(arguments), d ? g = i.length : b && (e = c, k(b));
                }
                return this;
            },
            remove: function() {
                return i && _.each(arguments, function(a, b) {
                    for (var c; (c = _.inArray(b, i, c)) > -1; ) i.splice(c, 1), d && (g >= c && g--, 
                    h >= c && h--);
                }), this;
            },
            has: function(a) {
                return a ? _.inArray(a, i) > -1 : !(!i || !i.length);
            },
            empty: function() {
                return i = [], g = 0, this;
            },
            disable: function() {
                return i = j = b = void 0, this;
            },
            disabled: function() {
                return !i;
            },
            lock: function() {
                return j = void 0, b || l.disable(), this;
            },
            locked: function() {
                return !j;
            },
            fireWith: function(a, b) {
                return !i || c && !j || (b = b || [], b = [ a, b.slice ? b.slice() : b ], d ? j.push(b) : k(b)), 
                this;
            },
            fire: function() {
                return l.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!c;
            }
        };
        return l;
    }, _.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", _.Callbacks("once memory"), "resolved" ], [ "reject", "fail", _.Callbacks("once memory"), "rejected" ], [ "notify", "progress", _.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return _.Deferred(function(c) {
                        _.each(b, function(b, f) {
                            var g = _.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? _.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, _.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this;
                }, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b, c, d, e = 0, f = R.call(arguments), g = f.length, h = 1 !== g || a && _.isFunction(a.promise) ? g : 0, i = 1 === h ? a : _.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                };
            };
            if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise();
        }
    });
    var pa;
    _.fn.ready = function(a) {
        return _.ready.promise().done(a), this;
    }, _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? _.readyWait++ : _.ready(!0);
        },
        ready: function(a) {
            (a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [ _ ]), 
            _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))));
        }
    }), _.ready.promise = function(b) {
        return pa || (pa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), 
        a.addEventListener("load", g, !1))), pa.promise(b);
    }, _.ready.promise();
    var qa = _.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c) _.access(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(_(a), c);
        })), b)) for (;i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    };
    _.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
    }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
        key: function(a) {
            if (!h.accepts(a)) return 0;
            var b = {}, c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b);
                } catch (d) {
                    b[this.expando] = c, _.extend(a, b);
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c;
        },
        set: function(a, b, c) {
            var d, e = this.key(a), f = this.cache[e];
            if ("string" == typeof b) f[b] = c; else if (_.isEmptyObject(f)) _.extend(this.cache[e], b); else for (d in b) f[d] = b[d];
            return f;
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b];
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), 
            void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b);
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a), g = this.cache[f];
            if (void 0 === b) this.cache[f] = {}; else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [ b, e ] : (d = e, 
                d = d in g ? [ d ] : d.match(na) || [])), c = d.length;
                for (;c--; ) delete g[d[c]];
            }
        },
        hasData: function(a) {
            return !_.isEmptyObject(this.cache[a[this.expando]] || {});
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]];
        }
    };
    var ra = new h(), sa = new h(), ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ua = /([A-Z])/g;
    _.extend({
        hasData: function(a) {
            return sa.hasData(a) || ra.hasData(a);
        },
        data: function(a, b, c) {
            return sa.access(a, b, c);
        },
        removeData: function(a, b) {
            sa.remove(a, b);
        },
        _data: function(a, b, c) {
            return ra.access(a, b, c);
        },
        _removeData: function(a, b) {
            ra.remove(a, b);
        }
    }), _.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = sa.get(f), 1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--; ) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), 
                    i(f, d, e[d])));
                    ra.set(f, "hasDataAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                sa.set(this, a);
            }) : qa(this, function(b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (c = sa.get(f, a), void 0 !== c) return c;
                    if (c = sa.get(f, d), void 0 !== c) return c;
                    if (c = i(f, d, void 0), void 0 !== c) return c;
                } else this.each(function() {
                    var c = sa.get(this, d);
                    sa.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && sa.set(this, a, b);
                });
            }, null, b, arguments.length > 1, null, !0);
        },
        removeData: function(a) {
            return this.each(function() {
                sa.remove(this, a);
            });
        }
    }), _.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = ra.get(a, b), c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)), 
            d || []) : void 0;
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = _.queue(a, b), d = c.length, e = c.shift(), f = _._queueHooks(a, b), g = function() {
                _.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ra.get(a, c) || ra.access(a, c, {
                empty: _.Callbacks("once memory").add(function() {
                    ra.remove(a, [ b + "queue", c ]);
                })
            });
        }
    }), _.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                _.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = _.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--; ) c = ra.get(f[g], a + "queueHooks"), 
            c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, wa = [ "Top", "Right", "Bottom", "Left" ], xa = function(a, b) {
        return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a);
    }, ya = /^(?:checkbox|radio)$/i;
    !function() {
        var a = Z.createDocumentFragment(), b = a.appendChild(Z.createElement("div")), c = Z.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), 
        b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
    }();
    var za = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var Aa = /^key/, Ba = /^(?:mouse|pointer|contextmenu)|click/, Ca = /^(?:focusinfocus|focusoutblur)$/, Da = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
            if (q) for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), 
            (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0;
            }), b = (b || "").match(na) || [ "" ], j = b.length; j--; ) h = Da.exec(b[j]) || [], 
            n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, 
            n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
                type: n,
                origType: p,
                data: d,
                handler: c,
                guid: c.guid,
                selector: e,
                needsContext: e && _.expr.match.needsContext.test(e),
                namespace: o.join(".")
            }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), 
            l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), 
            _.event.global[n] = !0);
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(na) || [ "" ], j = b.length; j--; ) if (h = Da.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], 
                    h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--; ) k = m[f], 
                    !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), 
                    k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), 
                    delete i[n]);
                } else for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle, ra.remove(a, "events"));
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [ d || Z ], n = X.call(b, "type") ? b.type : b, o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), 
            n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : _.makeArray(c, [ b ]), 
            l = _.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n, Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), 
                    h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a);
                }
                for (f = 0; (g = m[f++]) && !b.isPropagationStopped(); ) b.type = f > 1 ? i : l.bindType || n, 
                k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"), k && k.apply(g, c), 
                k = j && g[j], k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], 
                h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), 
                b.result;
            }
        },
        dispatch: function(a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [], h = R.call(arguments), i = (ra.get(this, "events") || {})[a.type] || [], j = _.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = _.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); ) for (a.currentTarget = e.elem, 
                c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped(); ) (!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, 
                a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), 
                void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type)) for (;i !== this; i = i.parentNode || this) if (i.disabled !== !0 || "click" !== a.type) {
                for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [ i ]).length), 
                d[e] && d.push(f);
                d.length && g.push({
                    elem: i,
                    handlers: d
                });
            }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, 
                d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), 
                a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), 
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
            }
        },
        fix: function(a) {
            if (a[_.expando]) return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}), 
            d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--; ) c = d[b], 
            a[c] = f[c];
            return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), 
            g.filter ? g.filter(a, f) : a;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== l() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === l() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(a) {
                    return _.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = _.extend(new _.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, _.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    }, _.Event = function(a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a, 
        b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void (this[_.expando] = !0)) : new _.Event(a, b);
    }, _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault();
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0);
        };
        _.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = ra.access(d, b);
                e || d.addEventListener(a, c, !0), ra.access(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = ra.access(d, b) - 1;
                e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0), ra.remove(d, b));
            }
        };
    }), _.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this;
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, 
            c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k; else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return _().off(a), f.apply(this, arguments);
            }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function() {
                _.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), 
            this.each(function() {
                _.event.remove(this, a, c, b);
            });
        },
        trigger: function(a, b) {
            return this.each(function() {
                _.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? _.event.trigger(a, b, c, !0) : void 0;
        }
    });
    var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Fa = /<([\w:]+)/, Ga = /<|&#?\w+;/, Ha = /<(?:script|style|link)/i, Ia = /checked\s*(?:[^=]|=\s*.checked.)/i, Ja = /^$|\/(?:java|ecma)script/i, Ka = /^true\/(.*)/, La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ma = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Ma.optgroup = Ma.option, Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead, 
    Ma.th = Ma.td, _.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = _.contains(a.ownerDocument, a);
            if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a))) for (g = r(h), 
            f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
            if (b) if (c) for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]); else q(a, h);
            return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h;
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++) if (e = a[m], 
            e || 0 === e) if ("object" === _.type(e)) _.merge(l, e.nodeType ? [ e ] : e); else if (Ga.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Fa.exec(e) || [ "", "" ])[1].toLowerCase(), 
                h = Ma[g] || Ma._default, f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2], 
                j = h[0]; j--; ) f = f.lastChild;
                _.merge(l, f.childNodes), f = k.firstChild, f.textContent = "";
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++]; ) if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), 
            f = r(k.appendChild(e), "script"), i && p(f), c)) for (j = 0; e = f[j++]; ) Ja.test(e.type || "") && c.push(e);
            return k;
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[ra.expando], e && (b = ra.cache[e]))) {
                    if (b.events) for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    ra.cache[e] && delete ra.cache[e];
                }
                delete sa.cache[c[sa.expando]];
            }
        }
    }), _.fn.extend({
        text: function(a) {
            return qa(this, function(a) {
                return void 0 === a ? _.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a);
                });
            }, null, a, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        remove: function(a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), 
            c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
            return this;
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), 
            a.textContent = "");
            return this;
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return _.clone(this, a, b);
            });
        },
        html: function(a) {
            return qa(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                    a = a.replace(Ea, "<$1></$2>");
                    try {
                        for (;d > c; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this);
            }), a && (a.length || a.nodeType) ? this : this.remove();
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
            });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 
            1 === c.childNodes.length && (c = d), d)) {
                for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = _.clone(g, !0, !0), 
                f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
                if (f) for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i], 
                Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")));
            }
            return this;
        }
    }), _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        _.fn[a] = function(a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), 
            _(e[g])[b](c), T.apply(d, c.get());
            return this.pushStack(d);
        };
    });
    var Na, Oa = {}, Pa = /^margin/, Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"), Ra = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
    };
    !function() {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            g.innerHTML = "", e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f);
        }
        var c, d, e = Z.documentElement, f = Z.createElement("div"), g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", 
        Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
        f.appendChild(g), a.getComputedStyle && _.extend(Y, {
            pixelPosition: function() {
                return b(), c;
            },
            boxSizingReliable: function() {
                return null == d && b(), d;
            },
            reliableMarginRight: function() {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
                c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), 
                b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), 
                b;
            }
        }));
    }(), _.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    };
    var Sa = /^(none|table(?!-c[ea]).+)/, Ta = new RegExp("^(" + va + ")(.*)$", "i"), Ua = new RegExp("^([+-])=(" + va + ")", "i"), Va = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Wa = {
        letterSpacing: "0",
        fontWeight: "400"
    }, Xa = [ "Webkit", "O", "Moz", "ms" ];
    _.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b), i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], 
                void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, 
                "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), 
                f = "number"), void (null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), 
                Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))));
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], 
            g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wa && (e = Wa[b]), 
            "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e;
        }
    }), _.each([ "height", "width" ], function(a, b) {
        _.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va, function() {
                    return A(a, b, d);
                }) : A(a, b, d) : void 0;
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0);
            }
        };
    }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function(a, b) {
        return b ? _.swap(a, {
            display: "inline-block"
        }, v, [ a, "marginRight" ]) : void 0;
    }), _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        _.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; 4 > d; d++) e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, Pa.test(a) || (_.cssHooks[a + b].set = y);
    }), _.fn.extend({
        css: function(a, b) {
            return qa(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (_.isArray(b)) {
                    for (d = Ra(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return B(this, !0);
        },
        hide: function() {
            return B(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                xa(this) ? _(this).show() : _(this).hide();
            });
        }
    }), _.Tween = C, C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.pos = b = this.options.duration ? _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : C.propHooks._default.set(this), this;
        }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0) : a.elem[a.prop];
            },
            set: function(a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, _.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, _.fx = C.prototype.init, _.fx.step = {};
    var Ya, Za, $a = /^(?:toggle|show|hide)$/, _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"), ab = /queueHooks$/, bb = [ G ], cb = {
        "*": [ function(a, b) {
            var c = this.createTween(a, b), d = c.cur(), e = _a.exec(b), f = e && e[3] || (_.cssNumber[a] ? "" : "px"), g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a)), h = 1, i = 20;
            if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do h = h || ".5", g /= h, _.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i);
            }
            return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), 
            c;
        } ]
    };
    _.Animation = _.extend(I, {
        tweener: function(a, b) {
            _.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], cb[c] = cb[c] || [], cb[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? bb.unshift(a) : bb.push(a);
        }
    }), _.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? _.extend({}, a) : {
            complete: c || !c && b || _.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !_.isFunction(b) && b
        };
        return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, 
        (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue);
        }, d;
    }, _.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(xa).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = _.isEmptyObject(a), f = _.speed(b, c, d), g = function() {
                var b = I(this, _.extend({}, a), f);
                (e || ra.get(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = _.timers, g = ra.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && ab.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && _.dequeue(this, a);
            });
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = ra.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = _.timers, g = d ? d.length : 0;
                for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), _.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = _.fn[b];
        _.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e);
        };
    }), _.each({
        slideDown: E("show"),
        slideUp: E("hide"),
        slideToggle: E("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        _.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), _.timers = [], _.fx.tick = function() {
        var a, b = 0, c = _.timers;
        for (Ya = _.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || _.fx.stop(), Ya = void 0;
    }, _.fx.timer = function(a) {
        _.timers.push(a), a() ? _.fx.start() : _.timers.pop();
    }, _.fx.interval = 13, _.fx.start = function() {
        Za || (Za = setInterval(_.fx.tick, _.fx.interval));
    }, _.fx.stop = function() {
        clearInterval(Za), Za = null;
    }, _.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, _.fn.delay = function(a, b) {
        return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d);
            };
        });
    }, function() {
        var a = Z.createElement("input"), b = Z.createElement("select"), c = b.appendChild(Z.createElement("option"));
        a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, 
        Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", 
        Y.radioValue = "t" === a.value;
    }();
    var db, eb, fb = _.expr.attrHandle;
    _.fn.extend({
        attr: function(a, b) {
            return qa(this, _.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                _.removeAttr(this, a);
            });
        }
    }), _.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), 
            d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb : db)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), 
            null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), 
            c) : void _.removeAttr(a, b)) : void 0;
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(na);
            if (f && 1 === a.nodeType) for (;c = f[e++]; ) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), 
            a.removeAttribute(c);
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        }
    }), eb = {
        set: function(a, b, c) {
            return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c), c;
        }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = fb[b] || _.find.attr;
        fb[b] = function(a, b, d) {
            var e, f;
            return d || (f = fb[b], fb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, 
            fb[b] = f), e;
        };
    });
    var gb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function(a, b) {
            return qa(this, _.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[_.propFix[a] || a];
            });
        }
    }), _.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, 
            e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0;
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1;
                }
            }
        }
    }), Y.optSelected || (_.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null;
        }
    }), _.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        _.propFix[this.toLowerCase()] = this;
    });
    var hb = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a, i = 0, j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).addClass(a.call(this, b, this.className));
            });
            if (h) for (b = (a || "").match(na) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
                for (f = 0; e = b[f++]; ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                g = _.trim(d), c.className !== g && (c.className = g);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a, i = 0, j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).removeClass(a.call(this, b, this.className));
            });
            if (h) for (b = (a || "").match(na) || []; j > i; i++) if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
                for (f = 0; e = b[f++]; ) for (;d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                g = a ? _.trim(d) : "", c.className !== g && (c.className = g);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ? function(c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b);
            } : function() {
                if ("string" === c) for (var b, d = 0, e = _(this), f = a.match(na) || []; b = f[d++]; ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else (c === za || "boolean" === c) && (this.className && ra.set(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "");
            });
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0) return !0;
            return !1;
        }
    });
    var ib = /\r/g;
    _.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = _.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function(a) {
                    return null == a ? "" : a + "";
                })), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
            })) : e ? (b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, 
            "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)) : void 0;
        }
    }), _.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b : _.trim(_.text(a));
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], 
                    !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                        if (b = _(c).val(), f) return b;
                        g.push(b);
                    }
                    return g;
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--; ) d = e[g], 
                    (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f;
                }
            }
        }
    }), _.each([ "radio", "checkbox" ], function() {
        _.valHooks[this] = {
            set: function(a, b) {
                return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0;
            }
        }, Y.checkOn || (_.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        _.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), _.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    });
    var jb = _.now(), kb = /\?/;
    _.parseJSON = function(a) {
        return JSON.parse(a + "");
    }, _.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser(), b = c.parseFromString(a, "text/xml");
        } catch (d) {
            b = void 0;
        }
        return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a), 
        b;
    };
    var lb = /#.*$/, mb = /([?&])_=[^&]*/, nb = /^(.*?):[ \t]*([^\r\n]*)$/gm, ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, pb = /^(?:GET|HEAD)$/, qb = /^\/\//, rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, sb = {}, tb = {}, ub = "*/".concat("*"), vb = a.location.href, wb = rb.exec(vb.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vb,
            type: "GET",
            isLocal: ob.test(wb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a);
        },
        ajaxPrefilter: J(sb),
        ajaxTransport: J(tb),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, 
                i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), 
                i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), 
                u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, 
                k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), 
                v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [ k, w, v ]) : o.rejectWith(m, [ v, w, r ]), 
                v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [ v, l, i ? k : r ]), 
                p.fireWith(m, [ v, w ]), j && (n.trigger("ajaxComplete", [ v, l ]), --_.active || _.event.trigger("ajaxStop")));
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event, o = _.Deferred(), p = _.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!g) for (g = {}; b = nb.exec(f); ) g[b[1].toLowerCase()] = b[2];
                        b = g[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? f : null;
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a, r[a] = b), this;
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (2 > t) for (b in a) q[b] = [ q[b], a[b] ]; else v.always(a[v.status]);
                    return this;
                },
                abort: function(a) {
                    var b = a || u;
                    return d && d.abort(b), c(0, b), this;
                }
            };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"), 
            l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [ "" ], 
            null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wb[3] || ("http:" === wb[1] ? "80" : "443")))), 
            l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), 
            K(sb, l, b, v), 2 === t) return v;
            j = _.event && l.global, j && 0 === _.active++ && _.event.trigger("ajaxStart"), 
            l.type = l.type.toUpperCase(), l.hasContent = !pb.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data, 
            delete l.data), l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)), 
            l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), 
            _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), 
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                success: 1,
                error: 1,
                complete: 1
            }) v[k](l[k]);
            if (d = K(tb, l, b, v)) {
                v.readyState = 1, j && n.trigger("ajaxSend", [ v, l ]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout");
                }, l.timeout));
                try {
                    t = 1, d.send(r, c);
                } catch (w) {
                    if (!(2 > t)) throw w;
                    c(-1, w);
                }
            } else c(-1, "No Transport");
            return v;
        },
        getJSON: function(a, b, c) {
            return _.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return _.get(a, void 0, b, "script");
        }
    }), _.each([ "get", "post" ], function(a, b) {
        _[b] = function(a, c, d, e) {
            return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            });
        };
    }), _._evalUrl = function(a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, _.fn.extend({
        wrapAll: function(a) {
            var b;
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapAll(a.call(this, b));
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), 
            b.map(function() {
                for (var a = this; a.firstElementChild; ) a = a.firstElementChild;
                return a;
            }).append(this)), this);
        },
        wrapInner: function(a) {
            return this.each(_.isFunction(a) ? function(b) {
                _(this).wrapInner(a.call(this, b));
            } : function() {
                var b = _(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = _.isFunction(a);
            return this.each(function(c) {
                _(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes);
            }).end();
        }
    }), _.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0;
    }, _.expr.filters.visible = function(a) {
        return !_.expr.filters.hidden(a);
    };
    var xb = /%20/g, yb = /\[\]$/, zb = /\r?\n/g, Ab = /^(?:submit|button|image|reset|file)$/i, Bb = /^(?:input|select|textarea|keygen)/i;
    _.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(xb, "+");
    }, _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a));
            }).map(function(a, b) {
                var c = _(this).val();
                return null == c ? null : _.isArray(c) ? _.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zb, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(zb, "\r\n")
                };
            }).get();
        }
    }), _.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (a) {}
    };
    var Cb = 0, Db = {}, Eb = {
        0: 200,
        1223: 204
    }, Fb = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Db) Db[a]();
    }), Y.cors = !!Fb && "withCredentials" in Fb, Y.ajax = Fb = !!Fb, _.ajaxTransport(function(a) {
        var b;
        return Y.cors || Fb && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(), g = ++Cb;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Db[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()));
                    };
                }, f.onload = b(), f.onerror = b("error"), b = Db[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null);
                } catch (h) {
                    if (b) throw h;
                }
            },
            abort: function() {
                b && b();
            }
        } : void 0;
    }), _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return _.globalEval(a), a;
            }
        }
    }), _.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
    }), _.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
                    }), Z.head.appendChild(b[0]);
                },
                abort: function() {
                    c && c();
                }
            };
        }
    });
    var Gb = [], Hb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gb.pop() || _.expando + "_" + jb++;
            return this[a] = !0, a;
        }
    }), _.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || _.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gb.push(e)), g && _.isFunction(f) && f(g[0]), 
            g = f = void 0;
        }), "script") : void 0;
    }), _.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || Z;
        var d = ga.exec(a), e = !c && [];
        return d ? [ b.createElement(d[1]) ] : (d = _.buildFragment([ a ], b, e), e && e.length && _(e).remove(), 
        _.merge([], d.childNodes));
    };
    var Ib = _.fn.load;
    _.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ib) return Ib.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a);
        }).complete(c && function(a, b) {
            g.each(c, f || [ a.responseText, b, a ]);
        }), this;
    }, _.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        _.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), _.expr.filters.animated = function(a) {
        return _.grep(_.timers, function(b) {
            return a === b.elem;
        }).length;
    };
    var Jb = a.document.documentElement;
    _.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"), l = _(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), 
            i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, _.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                _.offset.setOffset(this, a, b);
            });
            var b, c, d = this[0], e = {
                top: 0,
                left: 0
            }, f = d && d.ownerDocument;
            return f ? (b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()), 
            c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e) : void 0;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0], d = {
                    top: 0,
                    left: 0
                };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), 
                d.left += _.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position"); ) a = a.offsetParent;
                return a || Jb;
            });
        }
    }), _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function(e) {
            return qa(this, function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void (g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f);
            }, b, e, arguments.length, null);
        };
    }), _.each([ "top", "left" ], function(a, b) {
        _.cssHooks[b] = w(Y.pixelPosition, function(a, c) {
            return c ? (c = v(a, b), Qa.test(c) ? _(a).position()[b] + "px" : c) : void 0;
        });
    }), _.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            _.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return qa(this, function(b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g);
                }, b, f ? d : void 0, f, null);
            };
        });
    }), _.fn.size = function() {
        return this.length;
    }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return _;
    });
    var Kb = a.jQuery, Lb = a.$;
    return _.noConflict = function(b) {
        return a.$ === _ && (a.$ = Lb), b && a.jQuery === _ && (a.jQuery = Kb), _;
    }, typeof b === za && (a.jQuery = a.$ = _), _;
}), $(document).ready(function() {
    function a() {
        $(".js-clickable").click(function(a) {
            a.preventDefault();
            var b = findParent($(this));
            console.log(b);
        }), $(".js-typeable").blur(function(a) {
            a.preventDefault();
            var b = findParent($(this));
            console.log("typed"), console.log(b);
        });
    }
    $("html").removeClass("no-js");
    var b = '<div class="site">\n      <h3>{{title}}</h3>\n      <p>via <a href="{{url}}">{{url}}</a></p>\n      <p>{{description}}</p>\n      <p><em>{{tags}}</em></p>\n      <p>votes:{{votes}}</p>\n      <p>more:<a href="{{url}}">{{slug}}</a></p>\n      </div>', c = Handlebars.compile(b);
    $("#dump").length > 0 && $.getJSON("data.json", function(a) {
        $dump = $("#dump");
        for (var b = 0; b < a.length; b++) {
            var d = a[b], e = d.title.toLowerCase().replace(/[^\w]/gi, "-");
            d.slug = e;
            var f = c(d);
            $dump.append(f);
        }
    }), $("#site-submit").click(function(a) {
        a.preventDefault();
        var b = {
            title: $("#site-title").val(),
            url: $("#site-url").val(),
            description: $("#site-description").val(),
            tags: $("#site-tags").val(),
            timestamp: formatDate(),
            page: window.location.href
        };
        console.log(b), $.ajax({
            type: "POST",
            data: b,
            url: "http://api.thejobist.com/sites/add/"
        }).always(function(a) {
            console.log(a);
        });
    });
    var d = '<tr data-who="{{index}}">\n  <td>{{index}}</td>\n	<td>{{title}}<br/><input type="text" value="{{title}}" data-key="title" placeholder="title" class="js-typeable"/></td>\n	<td>{{url}}<br/><input type="text" value="{{url}}" data-key="url" placeholder="url" class="js-typeable"/><a href="{{url}}" target="_blank">see it</a></td>\n	<td>{{description}}<br/><input type="text" value="{{description}}" data-key="url" placeholder="description" class="js-typeable"/></td>\n	<td>{{tags}}<br/><input type="text" value="{{description}}" data-key="url" placeholder="description" class="js-typeable"/></td>\n	<td>{{added}}</td>\n	<td>{{upvotes}}<br/><input type="text" value="{{upvotes}}" data-key="upvotes" placeholder="upvotes" class="js-typeable"/></td>\n	<td>{{approved}}<br/><input type="text" value="{{approved}}" data-key="approved" placeholder="approved (0 or 1)" class="js-typeable"/></td>\n	<td><button data-action="remove" class="js-clickable">delete</button></td>\n  </tr>', e = Handlebars.compile(d);
    if ($("#js-admin_everything").length > 0) {
        var f = $("#js-admin_everything");
        $.getJSON("http://api.thejobist.com/sites/all/", function(b) {
            for (var c = 0; c < b.length; c++) {
                var d = e(b[c]);
                f.append(d);
            }
            a();
        });
    }
}), function(a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e, a[e] = a[e] || function() {
        (a[e].q = a[e].q || []).push(arguments);
    }, a[e].l = 1 * new Date(), f = b.createElement(c), g = b.getElementsByTagName(c)[0], 
    f.async = 1, f.src = d, g.parentNode.insertBefore(f, g);
}(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), 
ga("create", "UA-17453738-8", "auto"), ga("send", "pageview");