<template>
  <div class="box tiny-rich-text-editor" resize="both" v-if="editor">
    <Bubble-Menu :editor="editor"></Bubble-Menu>
    <Img :editor="editor"></Img>
    <button  @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <img src="@/assetslc2/bold.svg" alt="" srcset="">
    </button>
    <button class="line-height-button" @click="editor.chain().focus().toggleHeight().run()">
      <div class="line-height-icon">
        <img src="@/assetslc2/line-height.svg" alt="" srcset="">
      </div>
      <div class="line-height-options">
        <button class="line-1.0" @click.stop="editor.chain().focus().setP({level: 1}).run()">1.0</button>
        <button class="line-1.5" @click.stop="editor.chain().focus().setP({level: 1.5}).run()">1.5</button>
        <button class="line-2.0"  @click.stop="editor.chain().focus().setP({level: 2}).run()">2.0</button>
        <button class="line-2.5"  @click.stop="editor.chain().focus().setP({level: 2.5}).run()">2.5</button>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()">
      <img src="@/assetslc2/italic.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleUnderline().run()"
      :class="{ 'is-active': editor.isActive('underline') }">
      <img src="@/assetslc2/underline.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      <img src="@/assetslc2/strikethrough.svg" alt="" srcset="">
    </button>
    <button class="color-button">
      <label for="tiny-color">
      <img src="@/assetslc2/color.svg" alt="" srcset="">
      </label>
      <input id="tiny-color" type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
        :value="editor.getAttributes('textStyle').color">
    </button>
    <button class="h-box">
      <div class="h-ico">
        <img src="@/assetslc2/heading.svg" alt="" srcset="">
      </div>
      <div class="h-options">
        <button @click="editor.chain().focus().setParagraph().run()">
          <img src="@/assetslc2/paragraph.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          <img src="@/assetslc2/h-1.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <img src="@/assetslc2/h-2.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          <img src="@/assetslc2/h-3.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
          <img src="@/assetslc2/h-4.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
          <img src="@/assetslc2/h-5.svg" alt="" srcset="">
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
          <img src="@/assetslc2/h-6.svg" alt="" srcset="">
        </button>
      </div>
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()">
      <img src="@/assetslc2/list-unordered.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()">
      <img src="@/assetslc2/list-ordered.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleSubscript().run()"
      :class="{ 'is-active': editor.isActive('subscript') }">
      <img src="@/assetslc2/subscript.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleSuperscript().run()"
      :class="{ 'is-active': editor.isActive('superscript') }">
      <img src="@/assetslc2/superscript.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()">
      <img src="@/assetslc2/double-quotes-l.svg" alt="" srcset="">
    </button>
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      <img src="@/assetslc2/link.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
      <img src="@/assetslc2/link-unlink.svg" alt="" srcset="">
    </button>
    <!-- <button @click="editor.chain().focus().toggleStrike().run()">
      strike
    </button> -->
    <button @click="editor.chain().focus().toggleCode().run()">
      <img src="@/assetslc2/code-view.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()">
      <img src="@/assetslc2/code-block.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      <img src="@/assetslc2/format-clear.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      <img src="@/assetslc2/node-delete.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().undo().run()">
      <img src="@/assetslc2/undo.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().redo().run()">
      <img src="@/assetslc2/redo.svg" alt="" srcset="">
    </button>
    <button title="high light" @click="editor.chain().focus().toggleHighlight().run()"
      :class="{ 'is-active': editor.isActive('highlight') }">
      <img src="@/assetslc2/high-light.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }">
      <img src="@/assetslc2/task-list.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().setTextAlign('left').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
      <img src="@/assetslc2/align-left.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().setTextAlign('center').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
      <img src="@/assetslc2/align-center.svg" alt="" srcset="">
    </button>
    <button @click="editor.chain().focus().setTextAlign('right').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
      <img src="@/assetslc2/align-right.svg" alt="" srcset="">
    </button>
    <button class="font-siez-box">
      <img src="@/assetslc2/font-size.svg" alt="" srcset="">
      <div class="font-size-options">
        <button @click="handleFontSize(12)">12px</button>
        <button @click="handleFontSize(14)">14px</button>
        <button @click="handleFontSize(16)">16px</button>
        <button @click="handleFontSize(18)">18px</button>
        <button @click="handleFontSize(20)">20px</button>
        <button @click="handleFontSize(24)">24px</button>
        <button @click="handleFontSize(30)">30px</button>
      </div>
    </button>
    <TableButton :editor="editor"></TableButton>
    <div class="small-box" :style="{fontSize: fontSize}">
      <editor-content :editor="editor">
      </editor-content>
    </div> 
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// bubbele
import BubbleMenu from './BubbleMenu/BubbleMenu'
// -- config
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// -- table
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TableButton from './tableFunction/index'
// -- img
import Image from '@tiptap/extension-image'
// import Image from 'tiptap-extension-image-freely'
import Img from './ImgFunction/index.vue'
// -- HeighLight
import Highlight from '@tiptap/extension-highlight'
// -- height
import { Height } from './Marks'
// -- color
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
// -- link
import Link from '@tiptap/extension-link'
// underline
import Underline from '@tiptap/extension-underline'
// subScript
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
// taskList
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
// textalign
import TextAlign from '@tiptap/extension-text-align'
// code highlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'
import CodeHighLight from './code-highlight/CodeHighLight'
lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)
// resize
// import { ResizableMedia } from './resizeable/index'
import { mergeAttributes } from '@tiptap/core'
// -- Collaboration
import Collaboration from '@tiptap/extension-collaboration'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
// import { HocuspocusProvider } from '@hocuspocus/provider'
// svg
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    EditorContent,
    Img,
    TableButton,
    BubbleMenu,
    CodeHighLight,
  },
  setup(props, { emits }) {
    const CustomParagraph = Image.extend({
      renderHTML({ HTMLAttributes }) {
        return ['div', { class: 'img-button' }, ['img', HTMLAttributes]]
      }
    })
    const CustomParag = Paragraph.extend({
      addOptions() {
        return {
          levels: [1, 1.5, 2, 2.5, 3],
        }
      },
      addAttributes() {
        return {
          level: {
            default: 1,
          },
        }
      },
      renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel
          ? node.attrs.level
          : this.options.levels[0]
        console.log('2', node, HTMLAttributes,this.options);
        return ['p', mergeAttributes({style: `line-height: ${level}`}, HTMLAttributes), 0]
      },
      addCommands() {
        return {
          setP: attributes => ({ commands }) => {
            return commands.setNode(this.name, attributes)
          },
        }
      },
    })
    // const CustomMedia = Image.extend({
    //   renderHTML({ HTMLAttributes }) {
    //     return ['div', { class: 'img-button' }, ['video', mergeAttributes({ controls: true }, HTMLAttributes)]]
    //   }
    // })
    const styleMode = 'white'
    const setLink = () => {
      const previousUrl = editor.value.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        editor.value
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      editor.value
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
    // A new Y document
    const ydoc = new Y.Doc()
    // Registered with a WebRTC provider
    // 所有客户端都需要相互连接，这是提供者的工作
    const provider = new WebrtcProvider('example-document', ydoc)
    // const provider = new HocuspocusProvider({
    //   url: 'ws://127.0.0.1:1234',
    //   name: 'example-document',
    // })
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          // The Collaboration extension comes with its own history handling
          // 开启协作编辑时需要禁用自带的history模式
          history: false,
        }),
        // 扩展
        Document,
        Paragraph,
        Text,
        // --Collaboration
        Collaboration.configure({
          document: ydoc,
        }),
        // Collaboration.configure({
        //   document: provider.document,
        // }),
        // --table 表格扩展
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        // -- img
        Image.configure({
          HTMLAttributes: {
            style: 'resize: both; overflow: auto',
          },
        }),
        // -- Color
        Color,
        TextStyle,
        // -- link
        Link.configure({
          protocols: [
            {
              scheme: 'tel',
              optionalSlashes: true
            }
          ]
        }),
        // -- heightLight
        // Highlight,
        Highlight.configure({
          HTMLAttributes: {
            style: 'color: red;'
          },
        }),
        CustomParagraph,
        // CustomMedia,
        Height,
        Underline,
        Subscript,
        Superscript,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        // resize
        CustomParag,
        // ResizableMedia,
        // bubbel
        // BubbleMenu.configure({
        //   shouldShow: ({ editor, view, state, oldState, from, to }) => {
        //     // only show the bubble menu for images and links
        //     return editor.isActive('table')
        //   },
        // })
        CodeBlockLowlight
        .extend({
          addNodeView() {
            return VueNodeViewRenderer(CodeHighLight)
          },
        })
        .configure({ lowlight }),
      ],
      content: 'Example Tesxt',
      autofocus: true,
      editable: true,
      injectCSS: false,
      onUpdate({ editor }) {
        
        // console.log(editor.state.doc);
        // const json = editor.getJSON()
        const html = editor.getHTML()
        // 默认两个节点 nodes 之间两个换行符
        const text = editor.getText()
        // 可传入参数 blockSeparator 控制节点之间的连接
        const lineText = editor.getText({ blockSeparator: '--' })
        // console.log(json)
        // console.log(html)
        // console.log(text)
        // console.log(lineText) // 文本一行内展示，可设置连接符，只能获得文本
      }
    })
    console.log(editor);
    onBeforeUnmount(() => {
      provider.destroy()
      editor.value.destroy()
    })
    const fontSize = ref('16px')
    const handleFontSize = (value) => {
      fontSize.value = value + 'px'
      console.log('fontsize', fontSize.value);
    }
    return {
      editor,
      setLink,
      styleMode,
      fontSize,
      handleFontSize,
    }
  }
}
</script>

<style scoped lang="less">
.is-active {
  background-color: #d2e4ff !important;
}

.box {
  text-align: left;
  width: 500px;
  height: 350px;
  margin: 0 auto;
  outline: 3px solid rgb(203, 203, 203);
  border-radius: 8px 8px 0 0;

  &:hover {
    outline: 3px solid black;
  }

  button {
    background: transparent;
    border: none;
    border-radius: .4rem;
    color: #fff;
    cursor: pointer;
    height: 2.00rem;
    padding: .25rem;
    margin-right: .25rem;
    width: 2.00rem;

    &:hover {
      background-color: #d2e4ff;
    }

    // svg:last-of-type {
    //   display: none;
    // }
  }

  .line-height-button {
    position: relative;

    .line-height-options {
      position: absolute;
      background-color: #dfdede;
      padding: .15rem;
      top: 2.00rem;
      left: 0px;
      display: none;
      border-radius: .4rem;
      z-index: 999;

      button {
        margin: 0;
      }
    }

    &:hover {
      background-color: #d2e4ff;

      .line-height-options {
        display: flex;
        flex-direction: column;

        button {
          width: auto;
          color: black;
        }
      }
    }
  }
  .h-box {
    position: relative;
    .h-options {
      position: absolute;
      background-color: #dfdede;
      padding: .15rem;
      top: 2.00rem;
      left: 0px;
      display: none;
      border-radius: .4rem;
      z-index: 999;
      button {
        margin: 0;
      }
    }
    &:hover {
      background-color: #d2e4ff;
      .h-options {
        display: flex;
        flex-direction: column;

        button {
          width: auto;
          color: black;
        }
      }
    }
  }

  .color-button {
    position: relative;
    padding-right: 2.5rem;

    #tiny-color {
      position: absolute;
      border-radius: 50%;
      height: 1.25rem;
      width: 1.25rem;
      border: 0;
      top: 0.375rem;
      right: 0;
    }

    &:hover {
      #tiny-color {
        background-color: #d2e4ff;
      }
    }
  }
  .font-siez-box {
    position: absolute;
    .font-size-options {
      display: none;
      position: absolute;
      border-radius: .4rem;
      // background-color: #8d8d8d;
      background-color: #dfdede;
      button {
        color: black;
        margin: 0;
        text-align: center;
      }
    }
    &:hover {
      background-color: #d2e4ff;
      .font-size-options {
        display: flex;
        flex-direction: column;
      }
    }
  }
}

.small-box {
  overflow: auto;
  height: 200px;
  margin-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(0, 0, 0);
    border-radius: 8px;
  }
}

::v-deep .ProseMirror {
  outline: none !important;
}

::v-deep .ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  video {
    width: 100%;
    height: 100%;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

::v-deep .ProseMirror {
  .img-button {
    resize: both;
    overflow: hidden;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

::v-deep .ProseMirror {

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }
}
::v-deep .ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>
