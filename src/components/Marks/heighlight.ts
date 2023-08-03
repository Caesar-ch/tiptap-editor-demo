import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@tiptap/core'

export interface BoldOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heighLight: {
      /**
       * Set a bold mark
       */
      setHeight: () => ReturnType,
      /**
       * Toggle a bold mark
       */
      toggleHeight: () => ReturnType,
      /**
       * Unset a bold mark
       */
      unsetHeight: () => ReturnType,
    }
  }
}

export const starInputRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/
export const starPasteRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g
export const underscoreInputRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/
export const underscorePasteRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g

export const Height = Mark.create<BoldOptions>({
  name: 'heighlight',

  addOptions() {
    return {
      HTMLAttributes: { // 定义html属性
        style: 'line-height: 2.5; color: red;', // 定义属性，会在下面的渲染规则将改样式加进去，进行标记
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'p',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() { // 设置命令，在执行明亮时就会执行mark标记，标记就会触发对应的标记的渲染函数和解析函数
    return { // 设置命令在其他文件导入就可以进行执行命令，就会对文本进行操作，进行操作就会触发渲染规则函数，和解析规则函数
      setHeight: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleHeight: () => ({ commands }) => {
        let a = commands.toggleMark(this.name)
        console.log(a);
        return a
      },
      unsetHeight: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() { //
    return {
      'Mod-b': () => this.editor.commands.toggleBold(), 
      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },

  addInputRules() { // 在此标记的文本内进行输入的 规则，会延续此 规则
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type,
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type,
      }),
    ]
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type,
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type,
      }),
    ]
  },
})