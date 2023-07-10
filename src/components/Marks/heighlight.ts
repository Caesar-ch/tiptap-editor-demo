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
      HTMLAttributes: {
        style: 'line-height: 2.5',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'strong',
      },
      {
        tag: 'b',
        getAttrs: node => (node as HTMLElement).style.fontWeight !== 'normal' && null,
      },
      {
        style: 'font-weight',
        getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setHeight: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleHeight: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetHeight: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-b': () => this.editor.commands.toggleBold(),
      'Mod-B': () => this.editor.commands.toggleBold(),
    }
  },

  addInputRules() {
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