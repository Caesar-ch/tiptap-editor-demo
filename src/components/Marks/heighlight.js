"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Height = exports.underscorePasteRegex = exports.underscoreInputRegex = exports.starPasteRegex = exports.starInputRegex = void 0;
var core_1 = require("@tiptap/core");
exports.starInputRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/;
exports.starPasteRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g;
exports.underscoreInputRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/;
exports.underscorePasteRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g;
exports.Height = core_1.Mark.create({
    name: 'heighlight',
    addOptions: function () {
        return {
            HTMLAttributes: {
                style: 'line-height: 2.5',
            },
        };
    },
    parseHTML: function () {
        return [
            {
                tag: 'strong',
            },
            {
                tag: 'b',
                getAttrs: function (node) { return node.style.fontWeight !== 'normal' && null; },
            },
            {
                style: 'font-weight',
                getAttrs: function (value) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null; },
            },
        ];
    },
    renderHTML: function (_a) {
        var HTMLAttributes = _a.HTMLAttributes;
        return ['p', (0, core_1.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands: function () {
        var _this = this;
        return {
            setHeight: function () { return function (_a) {
                var commands = _a.commands;
                return commands.setMark(_this.name);
            }; },
            toggleHeight: function () { return function (_a) {
                var commands = _a.commands;
                return commands.toggleMark(_this.name);
            }; },
            unsetHeight: function () { return function (_a) {
                var commands = _a.commands;
                return commands.unsetMark(_this.name);
            }; },
        };
    },
    addKeyboardShortcuts: function () {
        var _this = this;
        return {
            'Mod-b': function () { return _this.editor.commands.toggleBold(); },
            'Mod-B': function () { return _this.editor.commands.toggleBold(); },
        };
    },
    addInputRules: function () {
        return [
            (0, core_1.markInputRule)({
                find: exports.starInputRegex,
                type: this.type,
            }),
            (0, core_1.markInputRule)({
                find: exports.underscoreInputRegex,
                type: this.type,
            }),
        ];
    },
    addPasteRules: function () {
        return [
            (0, core_1.markPasteRule)({
                find: exports.starPasteRegex,
                type: this.type,
            }),
            (0, core_1.markPasteRule)({
                find: exports.underscorePasteRegex,
                type: this.type,
            }),
        ];
    },
});
