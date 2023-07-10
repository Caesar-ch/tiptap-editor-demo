<template>
  <div class="box" v-if="editor">

    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      bold加粗
    </button>
    <button @click="editor.chain().focus().toggleHeight().run()">
      line-height行高
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()">
      italic斜体
    </button>
    <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
      :value="editor.getAttributes('textStyle').color">
    <button @click="editor.chain().focus().setParagraph().run()">
      paragraph
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
      h2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
      h3
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
      h4
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
      h5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
      h6
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()">
      bullet list无序列表
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()">
      ordered list有序列表
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()">
      blockquote引用
    </button>
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      setLink
    </button>
    <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
      unsetLink
    </button>
    <!-- <button @click="editor.chain().focus().toggleStrike().run()">
      strike
    </button> -->
    <button @click="editor.chain().focus().toggleCode().run()">
      code
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()">
      code block
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>

    <!-- <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button> -->
    <button @click="editor.chain().focus().undo().run()">
      undo
    </button>
    <button @click="editor.chain().focus().redo().run()">
      redo
    </button>
    <button @click="editor.chain().focus().toggleHighlight().run()" :class="{ 'is-active': editor.isActive('highlight') }">
      toggleHighlight高亮
    </button>
    <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
      insertTable
    </button>
    <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
      addColumnBefore
    </button>
    <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
      addColumnAfter
    </button>
    <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
      deleteColumn
    </button>
    <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
      addRowBefore
    </button>
    <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
      addRowAfter
    </button>
    <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
      deleteRow
    </button>
    <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
      deleteTable
    </button>
    <button @click="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
      toggleHeaderCell
    </button>
    <button @click="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
      mergeOrSplit
    </button>
    <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
      setCellAttribute
    </button>
    <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
      setCellAttribute
    </button>
    <div class="small-box">
      <editor-content :editor="editor">
      </editor-content>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
// -- config
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// -- table
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
// -- img
import Image from '@tiptap/extension-image'
// -- HeighLight
import Highlight from '@tiptap/extension-highlight'
// -- height
import { Height } from './Marks'
// -- color
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
// -- link
import Link from '@tiptap/extension-link'
// -- Collaboration
import Collaboration from '@tiptap/extension-collaboration'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
// import { HocuspocusProvider } from '@hocuspocus/provider'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    EditorContent,
  },
  setup(props, { emits }) {
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
        Image,
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
        Highlight,
        Height,

      ],
      content: '<p>Example Text</p>',
      autofocus: true,
      editable: true,
      injectCSS: false,
      onUpdate({ editor }) {
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
    return {
      editor,
      setLink
    }
  }
}
</script>

<style scoped lang="less">
.is-active {
  border: 1px solid red;
}

.box {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  outline: 3px solid rgb(203, 203, 203);

  &:hover {
    outline: 3px solid black;

    button {
      background-color: #383838;
      // border: 2px solid #545454;
    }
  }

  border-radius: 8px 8px 0 0;

  button {
    background-color: #9e9e9e;
    color: rgb(202, 202, 202);
    margin: 1px 1px;
    border-radius: 4px;
    // border-color: gray;
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
</style>
