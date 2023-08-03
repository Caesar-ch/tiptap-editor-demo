"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizableMedia = exports.VIDEO_INPUT_REGEX = exports.IMAGE_INPUT_REGEX = void 0;
var core_1 = require("@tiptap/core");
var vue_3_1 = require("@tiptap/vue-3");
var ResizableMediaNodeView_vue_1 = require("./ResizableMediaNodeView.vue");
exports.IMAGE_INPUT_REGEX = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
exports.VIDEO_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;
exports.ResizableMedia = core_1.Node.create({
    name: 'resizableMedia',
    addOptions: function () {
        return {
            inline: false,
            allowBase64: false,
            HTMLAttributes: {},
        };
    },
    inline: false,
    group: 'block',
    draggable: true,
    addAttributes: function () {
        return {
            src: {
                default: null,
            },
            'media-type': {
                default: null
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: 'auto'
            },
            dataAlign: {
                default: 'left' // 'left' | 'center' | 'right'
            },
            dataFloat: {
                default: null // 'left' | 'right'
            },
        };
    },
    selectable: true,
    parseHTML: function () {
        return [
            {
                tag: 'img[src]:not([src^="data:"])',
                getAttrs: function (el) { return ({
                    src: el.getAttribute('src'),
                    'media-type': 'img'
                }); }
            },
            {
                tag: 'video',
                getAttrs: function (el) { return ({
                    src: el.getAttribute('src'),
                    'media-type': 'video'
                }); },
            },
        ];
    },
    renderHTML: function (_a) {
        var HTMLAttributes = _a.HTMLAttributes;
        var mediaType = HTMLAttributes["media-type"];
        if (mediaType === 'img') {
            return ['img', (0, core_1.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes)];
        }
        else if (mediaType === 'video') {
            return [
                'video',
                __assign({ controls: 'true', style: 'width: 100%' }, HTMLAttributes),
                ['source', HTMLAttributes]
            ];
        }
        if (!mediaType)
            console.error('TiptapMediaExtension-renderHTML method: Media Type not set, going default with image');
        return ['img', (0, core_1.mergeAttributes)(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addCommands: function () {
        var _this = this;
        return {
            setMedia: function (options) { return function (_a) {
                var commands = _a.commands;
                var mediaType = options["media-type"];
                if (mediaType === 'img') {
                    return commands.insertContent({
                        type: _this.name,
                        attrs: options,
                    });
                }
                else if (mediaType === 'video') {
                    return commands.insertContent({
                        type: _this.name,
                        attrs: __assign(__assign({}, options), { controls: 'true' }),
                    });
                }
                if (!mediaType)
                    console.error('TiptapMediaExtension-setMedia: Media Type not set, going default with image');
                return commands.insertContent({
                    type: _this.name,
                    attrs: options,
                });
            }; },
        };
    },
    addNodeView: function () {
        return (0, vue_3_1.VueNodeViewRenderer)(ResizableMediaNodeView_vue_1.default);
    },
    addInputRules: function () {
        return [
            (0, core_1.nodeInputRule)({
                find: exports.IMAGE_INPUT_REGEX,
                type: this.type,
                getAttributes: function (match) {
                    var alt = match[2], src = match[3], title = match[4];
                    return {
                        src: src,
                        alt: alt,
                        title: title,
                        'media-type': 'img'
                    };
                },
            }),
            (0, core_1.nodeInputRule)({
                find: exports.VIDEO_INPUT_REGEX,
                type: this.type,
                getAttributes: function (match) {
                    var src = match[2];
                    return {
                        src: src,
                        'media-type': 'video'
                    };
                },
            })
        ];
    },
});
