<template>
  <Bubble-Menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor" :should-show="shouldShow">
    <button title="addColumnBefore" @click.stop="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
      <img src="@/assetslc2/add-column-before.svg" alt="" srcset="">
    </button>
    <button title="addColumnAfter" @click.stop="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
      <img src="@/assetslc2/add-column-after.svg" alt="" srcset="">
    </button>
    <button title="deleteColumn" @click.stop="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
      <img src="@/assetslc2/delete-column.svg" alt="" srcset="">
    </button>
    <button title="addRowBefore" @click.stop="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
      <img src="@/assetslc2/add-row-before.svg" alt="" srcset="">
    </button>
    <button title="addRowAfter" @click.stop="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
      <img src="@/assetslc2/add-column-after.svg" alt="" srcset="">
    </button>
    <button title="deleteRow" @click.stop="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
      <img src="@/assetslc2/delete-row.svg" alt="" srcset="">
    </button>
    <button title="deleteTable"  @click.stop="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
      <img src="@/assetslc2/delete-table.svg" alt="" srcset="">
    </button>
    <button title="toggleHeaderCell" @click.stop="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
      <img src="@/assetslc2/heading.svg" alt="" srcset="">
    </button>
    <button title="mergeOrSplitCells" @click.stop="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
      <img src="@/assetslc2/merge-cells.svg" alt="" srcset="">
    </button>
    <!-- <button @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
      setCellAttribute
    </button> -->
  </Bubble-Menu>
</template>

<script>
import { BubbleMenu } from '@tiptap/vue-3'
export default {
  props: {
    editor: {
      require: true,
      type: Object,
    },
  },
  components: {
    BubbleMenu,
  },
  setup(props) {
    const shouldShow = ({ editor, view, state, oldState, from, to }) => {
      // 仅在无序列表选中的时候才显示 气泡菜单
      return editor.isActive("table");
    };
    const editor = props.editor
    return {
      shouldShow,
      editor,
    }
  },
}
</script>

<style lang="less" scoped>
button {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  &:hover {
      background-color: #d2e4ff;
    }
}
</style>