/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.4.0
 */
Bridge.assembly("CSHTML5.Stubs", function ($asm, globals) {
    "use strict";

    Bridge.define("DotNetBrowser.JSValue", {
        statics: {
            methods: {
                Create: function (value) {
                    throw new System.NotImplementedException.ctor();
                },
                Create$1: function (value) {
                    throw new System.NotImplementedException.ctor();
                },
                Create$2: function (value) {
                    throw new System.NotImplementedException.ctor();
                },
                CreateJSON: function (jsonString) {
                    throw new System.NotImplementedException.ctor();
                },
                CreateNull: function () {
                    throw new System.NotImplementedException.ctor();
                },
                CreateUndefined: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsArray: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsBoolean: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsBooleanObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsDotNetObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsFunction: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsNumberObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsString: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsStringObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetBool: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetString: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsArray: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsBool: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsBooleanObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsDotNetObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsFalse: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsFunction: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsJSON: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsNull: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsNumberObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsString: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsStringObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsTrue: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsUndefined: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSContext", {
        inherits: [System.IDisposable],
        events: {
            DisposeEvent: null
        },
        props: {
            FrameId: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            },
            IsDisposed: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            },
            WorldId: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        alias: ["Dispose", "System$IDisposable$Dispose"],
        methods: {
            CreateObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            Dispose: function () {
                throw new System.NotImplementedException.ctor();
            },
            Dispose$1: function (disposing) {
                throw new System.NotImplementedException.ctor();
            },
            equals: function (obj) {
                throw new System.NotImplementedException.ctor();
            },
            getHashCode: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSONString", {
        props: {
            Value: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        ctors: {
            ctor: function (value) {
                this.$initialize();
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("System.Dynamic.DynamicMetaObject");

    Bridge.define("System.Dynamic.IDynamicMetaObjectProvider", {
        $kind: "interface"
    });

    Bridge.define("System.Runtime.CompilerServices.CompilerGeneratedAttribute", {
        inherits: [System.Attribute],
        ctors: {
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });

    Bridge.define("System.Runtime.Serialization.OptionalFieldAttribute", {
        inherits: [System.Attribute],
        fields: {
            _versionAdded: 0
        },
        props: {
            VersionAdded: {
                get: function () {
                    return this._versionAdded;
                },
                set: function (value) {
                    if (value < 1) {
                        throw new System.ArgumentException.$ctor1("Serialization_OptionalFieldVersionValue");
                    }
this._versionAdded = value;
                }
            }
        },
        ctors: {
            init: function () {
                this._versionAdded = 1;
            },
            ctor: function () {
                this.$initialize();
                System.Attribute.ctor.call(this);
            }
        }
    });

    Bridge.define("DotNetBrowser.JSObject", {
        inherits: [DotNetBrowser.JSValue],
        fields: {
            context: null
        },
        props: {
            Context: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            },
            IsDisposed: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsDotNetObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            AsObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetOwnPropertyNames: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetProperty: function (name) {
                throw new System.NotImplementedException.ctor();
            },
            GetPropertyNames: function () {
                throw new System.NotImplementedException.ctor();
            },
            HasProperty: function (name) {
                throw new System.NotImplementedException.ctor();
            },
            IsDotNetObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            RemoveProperty: function (name) {
                throw new System.NotImplementedException.ctor();
            },
            SetProperty: function (index, value) {
                throw new System.NotImplementedException.ctor();
            },
            SetProperty$1: function (name, value) {
                throw new System.NotImplementedException.ctor();
            },
            ToJSONString: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSPrimitive$1", function (T) { return {
        inherits: [DotNetBrowser.JSValue],
        ctors: {
            ctor: function () {
                this.$initialize();
                DotNetBrowser.JSValue.ctor.call(this);
                throw new System.NotImplementedException.ctor();
            }
        },
        methods: {
            toString: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    }; });

    Bridge.define("DotNetBrowser.JSArray", {
        inherits: [DotNetBrowser.JSObject],
        props: {
            Count: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            getItem: function (index) {
                throw new System.NotImplementedException.ctor();
            },
            setItem: function (index, value) {
                throw new System.NotImplementedException.ctor();
            },
            AsArray: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsArray: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSBoolean", {
        inherits: [DotNetBrowser.JSPrimitive$1(System.Boolean)],
        props: {
            Value: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsBoolean: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetBool: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsBool: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSBooleanObject", {
        inherits: [DotNetBrowser.JSObject],
        props: {
            ValueOf: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsBooleanObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetBool: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsBooleanObject: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSFunction", {
        inherits: [DotNetBrowser.JSObject],
        methods: {
            AsFunction: function () {
                throw new System.NotImplementedException.ctor();
            },
            Invoke: function (instance, args) {
                if (args === void 0) { args = []; }
                throw new System.NotImplementedException.ctor();
            },
            InvokeAndReturnValue: function (instance, args) {
                if (args === void 0) { args = []; }
                throw new System.NotImplementedException.ctor();
            },
            IsFunction: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSNumber", {
        inherits: [DotNetBrowser.JSPrimitive$1(System.Double)],
        props: {
            Value: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsNumber: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSNumberObject", {
        inherits: [DotNetBrowser.JSObject],
        props: {
            ValueOf: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsNumberObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetNumber: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsNumberObject: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSString", {
        inherits: [DotNetBrowser.JSPrimitive$1(System.String)],
        props: {
            Value: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsString: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetString: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsString: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });

    Bridge.define("DotNetBrowser.JSStringObject", {
        inherits: [DotNetBrowser.JSObject],
        props: {
            ValueOf: {
                get: function () {
                    throw new System.NotImplementedException.ctor();
                }
            }
        },
        methods: {
            AsStringObject: function () {
                throw new System.NotImplementedException.ctor();
            },
            GetString: function () {
                throw new System.NotImplementedException.ctor();
            },
            IsStringObject: function () {
                throw new System.NotImplementedException.ctor();
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDU0hUTUw1LlN0dWJzLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJEb3ROZXRCcm93c2VyL0pTVmFsdWUuY3MiLCJEb3ROZXRCcm93c2VyL0pTQ29udGV4dC5jcyIsIkRvdE5ldEJyb3dzZXIvSlNPTlN0cmluZy5jcyIsIk1zY29ybGliU3R1ZmZfVG9CZU1vdmVkSW50b0JyaWRnZS9PcHRpb25hbEZpZWxkQXR0cmlidXRlLmNzIiwiRG90TmV0QnJvd3Nlci9KU09iamVjdC5jcyIsIkRvdE5ldEJyb3dzZXIvSlNQcmltaXRpdmUuY3MiLCJEb3ROZXRCcm93c2VyL0pTQXJyYXkuY3MiLCJEb3ROZXRCcm93c2VyL0pTQm9vbGVhbi5jcyIsIkRvdE5ldEJyb3dzZXIvSlNCb29sZWFuT2JqZWN0LmNzIiwiRG90TmV0QnJvd3Nlci9KU0Z1bmN0aW9uLmNzIiwiRG90TmV0QnJvd3Nlci9KU051bWJlci5jcyIsIkRvdE5ldEJyb3dzZXIvSlNOdW1iZXJPYmplY3QuY3MiLCJEb3ROZXRCcm93c2VyL0pTU3RyaW5nLmNzIiwiRG90TmV0QnJvd3Nlci9KU1N0cmluZ09iamVjdC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7a0NBZ0JxQ0E7b0JBQWNBLE1BQU1BLElBQUlBOztvQ0FDeEJBO29CQUFnQkEsTUFBTUEsSUFBSUE7O29DQUMxQkE7b0JBQWdCQSxNQUFNQSxJQUFJQTs7c0NBQ25CQTtvQkFBcUJBLE1BQU1BLElBQUlBOzs7b0JBQzlCQSxNQUFNQSxJQUFJQTs7O29CQUNMQSxNQUFNQSxJQUFJQTs7Ozs7O2dCQWZqQkEsTUFBTUEsSUFBSUE7OztnQkFDTkEsTUFBTUEsSUFBSUE7OztnQkFDRUEsTUFBTUEsSUFBSUE7OztnQkFDcEJBLE1BQU1BLElBQUlBOzs7Z0JBQ1ZBLE1BQU1BLElBQUlBOzs7Z0JBQ2RBLE1BQU1BLElBQUlBOzs7Z0JBQ0VBLE1BQU1BLElBQUlBOzs7Z0JBQ3RCQSxN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QUFJQTs7O2dCQUN2QkEsTUFBTUEsSUFBSUE7OztnQkFDUEEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7b0JDSmJBLE1BQU1BLElBQUlBOzs7Ozs7Z0JBRVRBLE1BQU1BLElBQUlBOzs7Z0JBQ1hBLE1BQU1BLElBQUlBOzs7Z0JBQ2JBLE1BQU1BLElBQUlBOzs7Ozs7Ozs7O29CQ0pkQSxNQUFNQSxJQUFJQTs7Ozs7O2dCQUVVQSxNQUFNQSxJQUFJQTs7O2dCQUN2QkEsTUFBTUEsSUFBSUE7OztnQkFDUEEsTUFBTUEsSUFBSUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldEJyb3dzZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEpTVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBKU0FycmF5IEFzQXJyYXkoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNCb29sZWFuIEFzQm9vbGVhbigpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBKU0Jvb2xlYW5PYmplY3QgQXNCb29sZWFuT2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIG9iamVjdCBBc0RvdE5ldE9iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBKU0Z1bmN0aW9uIEFzRnVuY3Rpb24oKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNOdW1iZXIgQXNOdW1iZXIoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNOdW1iZXJPYmplY3QgQXNOdW1iZXJPYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNPYmplY3QgQXNPYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNTdHJpbmcgQXNTdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgSlNTdHJpbmdPYmplY3QgQXNTdHJpbmdPYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBKU1ZhbHVlIENyZWF0ZShib29sIHZhbHVlKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBKU1ZhbHVlIENyZWF0ZShkb3VibGUgdmFsdWUpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEpTVmFsdWUgQ3JlYXRlKHN0cmluZyB2YWx1ZSkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSlNPTlN0cmluZyBDcmVhdGVKU09OKHN0cmluZyBqc29uU3RyaW5nKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBKU1ZhbHVlIENyZWF0ZU51bGwoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBKU1ZhbHVlIENyZWF0ZVVuZGVmaW5lZCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIEdldEJvb2woKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgZG91YmxlIEdldE51bWJlcigpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgR2V0U3RyaW5nKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNBcnJheSgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIElzQm9vbCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIElzQm9vbGVhbk9iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIElzRG90TmV0T2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRmFsc2UoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBJc0Z1bmN0aW9uKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNKU09OKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNOdWxsKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNOdW1iZXIoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBJc051bWJlck9iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBib29sIElzT2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgSXNTdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBJc1N0cmluZ09iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1RydWUoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBJc1VuZGVmaW5lZCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRG90TmV0QnJvd3NlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSlNDb250ZXh0IDogSURpc3Bvc2FibGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgbG9uZyBGcmFtZUlkIHsgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH0gfVxyXG4gICAgICAgIHB1YmxpYyBib29sIElzRGlzcG9zZWQgeyBnZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSB9XHJcbiAgICAgICAgcHVibGljIGxvbmcgV29ybGRJZCB7IGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIGV2ZW50IEV2ZW50SGFuZGxlciBEaXNwb3NlRXZlbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU09iamVjdCBDcmVhdGVPYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBEaXNwb3NlKGJvb2wgZGlzcG9zaW5nKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgaW50IEdldEhhc2hDb2RlKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBEb3ROZXRCcm93c2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBKU09OU3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEpTT05TdHJpbmcoc3RyaW5nIHZhbHVlKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVmFsdWUgeyBnZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIFN5c3RlbS5SdW50aW1lLlNlcmlhbGl6YXRpb25cclxue1xyXG4gICAgdXNpbmcgU3lzdGVtO1xyXG4gICAgdXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzLkNvbnRyYWN0cztcclxuXHJcbiAgICBbQXR0cmlidXRlVXNhZ2UoQXR0cmlidXRlVGFyZ2V0cy5GaWVsZCwgSW5oZXJpdGVkID0gZmFsc2UpXVxyXG4gICAgcHVibGljIHNlYWxlZCBjbGFzcyBPcHRpb25hbEZpZWxkQXR0cmlidXRlIDogQXR0cmlidXRlXHJcbiAgICB7XHJcbiAgICAgICAgaW50IF92ZXJzaW9uQWRkZWQgPSAxO1xyXG4gICAgICAgIHB1YmxpYyBPcHRpb25hbEZpZWxkQXR0cmlidXRlKCkgeyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgVmVyc2lvbkFkZGVkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJzaW9uQWRkZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50RXhjZXB0aW9uKFwiU2VyaWFsaXphdGlvbl9PcHRpb25hbEZpZWxkVmVyc2lvblZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgQ29udHJhY3QuRW5kQ29udHJhY3RCbG9jaygpO1xyXG4gICAgICAgICAgICAgICAgX3ZlcnNpb25BZGRlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBEb3ROZXRCcm93c2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBKU09iamVjdCA6IEpTVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgSlNDb250ZXh0IGNvbnRleHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBKU0NvbnRleHQgQ29udGV4dCB7IGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBJc0Rpc3Bvc2VkIHsgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgb2JqZWN0IEFzRG90TmV0T2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBKU09iamVjdCBBc09iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgTGlzdDxzdHJpbmc+IEdldE93blByb3BlcnR5TmFtZXMoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIEpTVmFsdWUgR2V0UHJvcGVydHkoc3RyaW5nIG5hbWUpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgTGlzdDxzdHJpbmc+IEdldFByb3BlcnR5TmFtZXMoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgSGFzUHJvcGVydHkoc3RyaW5nIG5hbWUpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc0RvdE5ldE9iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc09iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgYm9vbCBSZW1vdmVQcm9wZXJ0eShzdHJpbmcgbmFtZSkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIFNldFByb3BlcnR5KGludCBpbmRleCwgb2JqZWN0IHZhbHVlKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIGJvb2wgU2V0UHJvcGVydHkoc3RyaW5nIG5hbWUsIG9iamVjdCB2YWx1ZSkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVG9KU09OU3RyaW5nKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBEb3ROZXRCcm93c2VyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBKU1ByaW1pdGl2ZTxUPiA6IEpTVmFsdWVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgSlNQcmltaXRpdmUoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBUIFZhbHVlIHsgZ2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uUmVmbGVjdGlvbjtcclxuXHJcbm5hbWVzcGFjZSBEb3ROZXRCcm93c2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBKU0FycmF5IDogSlNPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IENvdW50IHsgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgSlNWYWx1ZSB0aGlzW2ludCBpbmRleF0geyBnZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSBzZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBKU0FycmF5IEFzQXJyYXkoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgSXNBcnJheSgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRG90TmV0QnJvd3NlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSlNCb29sZWFuIDogSlNQcmltaXRpdmU8Ym9vbD5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBWYWx1ZSB7IGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEpTQm9vbGVhbiBBc0Jvb2xlYW4oKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgR2V0Qm9vbCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc0Jvb2woKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldEJyb3dzZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEpTQm9vbGVhbk9iamVjdCA6IEpTT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIGJvb2wgVmFsdWVPZiB7IGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEpTQm9vbGVhbk9iamVjdCBBc0Jvb2xlYW5PYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgR2V0Qm9vbCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc0Jvb2xlYW5PYmplY3QoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldEJyb3dzZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEpTRnVuY3Rpb24gOiBKU09iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBKU0Z1bmN0aW9uIEFzRnVuY3Rpb24oKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgSW52b2tlKEpTT2JqZWN0IGluc3RhbmNlLCBwYXJhbXMgb2JqZWN0W10gYXJncykgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBKU1ZhbHVlIEludm9rZUFuZFJldHVyblZhbHVlKEpTT2JqZWN0IGluc3RhbmNlLCBwYXJhbXMgb2JqZWN0W10gYXJncykgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIElzRnVuY3Rpb24oKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldEJyb3dzZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEpTTnVtYmVyIDogSlNQcmltaXRpdmU8ZG91YmxlPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBkb3VibGUgVmFsdWUgeyBnZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBKU051bWJlciBBc051bWJlcigpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgZG91YmxlIEdldE51bWJlcigpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc051bWJlcigpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgRG90TmV0QnJvd3NlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSlNOdW1iZXJPYmplY3QgOiBKU09iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgVmFsdWVPZiB7IGdldCB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9IH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEpTTnVtYmVyT2JqZWN0IEFzTnVtYmVyT2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBkb3VibGUgR2V0TnVtYmVyKCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIElzTnVtYmVyT2JqZWN0KCkgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBEb3ROZXRCcm93c2VyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBKU1N0cmluZyA6IEpTUHJpbWl0aXZlPHN0cmluZz5cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFZhbHVlIHsgZ2V0IHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH0gfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSlNTdHJpbmcgQXNTdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBHZXRTdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgSXNTdHJpbmcoKSB7IHRocm93IG5ldyBOb3RJbXBsZW1lbnRlZEV4Y2VwdGlvbigpOyB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIERvdE5ldEJyb3dzZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEpTU3RyaW5nT2JqZWN0IDogSlNPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFZhbHVlT2YgeyBnZXQgeyB0aHJvdyBuZXcgTm90SW1wbGVtZW50ZWRFeGNlcHRpb24oKTsgfSB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBKU1N0cmluZ09iamVjdCBBc1N0cmluZ09iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEdldFN0cmluZygpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBJc1N0cmluZ09iamVjdCgpIHsgdGhyb3cgbmV3IE5vdEltcGxlbWVudGVkRXhjZXB0aW9uKCk7IH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
