(function() {
  "use strict";
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("k-field", { attrs: { "label": _vm.label } }, [_c("k-text-field", { attrs: { "type": "text", "label": "New prompt:" }, model: { value: _vm.prompttext, callback: function($$v) {
      _vm.prompttext = $$v;
    }, expression: "prompttext" } }), _c("k-select-field", { attrs: { "options": _vm.valueprompt, "name": "select", "type": "select", "label": "Select saved prompts:" }, model: { value: _vm.valuepromptselected, callback: function($$v) {
      _vm.valuepromptselected = $$v;
    }, expression: "valuepromptselected" } }), _c("k-button", { attrs: { "icon": "check" }, on: { "click": _vm.loadAI } }, [_vm._v("Generate AI text")]), _c("k-textarea-field", { ref: "kgpt3textfield", attrs: { "theme": "field", "size": "large", "type": "text", "name": "textfield", "value": _vm.value }, on: { "input": _vm.onInput } })], 1);
  };
  var staticRenderFns = [];
  render._withStripped = true;
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const __vue2_script = {
    props: {
      label: String,
      value: String
    },
    data() {
      return {
        prompttext: "",
        valueprompt: [],
        valuepromptselected: ""
      };
    },
    created() {
      this.loadJSONforPrompt();
    },
    methods: {
      onInput(value) {
        this.$emit("input", value);
      },
      loadJSONforPrompt() {
        this.$api.get("openai-textgenerator-field/getpromptdata").then((response) => {
          this.valueprompt = response;
        }).catch((error) => {
          console.log(error.message);
        });
      },
      saveJSONforPrompt() {
        this.$api.post("openai-textgenerator-field/setpromptdata", { promptvalues: this.valueprompt }).then((response) => {
        }).catch((error) => {
          console.log(error.message);
        });
      },
      loadAI() {
        if (this.prompttext == "" && this.valuepromptselected == "") {
          alert("Please create a question (prompt) or select an existing one!");
          return false;
        }
        if (this.prompttext !== "") {
          if (this.valueprompt.find(({ text }) => text == this.prompttext) == void 0) {
            let valueToPush = {};
            valueToPush["value"] = this.prompttext;
            valueToPush["text"] = this.prompttext;
            this.valueprompt.push(valueToPush);
          }
          this.saveJSONforPrompt();
        }
        let sprompt = this.prompttext !== "" ? this.prompttext : this.valuepromptselected;
        this.$api.post("openai-textgenerator-field/generatetext", { prompt: sprompt }).then((response) => {
          if (response.choices) {
            this.onInput(response.choices[0].text);
          } else {
            this.onInput(response.error.message);
          }
        }).catch((error) => {
          this.onInput(error.message);
        });
      }
    }
  };
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  __component__.options.__file = "src/components/fields/openai-textgenerator-field.vue";
  var openaitextgeneratorfield = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  panel.plugin("raduhoria/openai-textgenerator-field", {
    fields: {
      openaitextgeneratorfield
    },
    blocks: {
      aitext: `
    <div @click="open">
      <div v-html="content.aiarticle"></div>
    </div>
    `
    }
  });
})();
