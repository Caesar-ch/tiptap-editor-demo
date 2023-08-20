import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

export default {
  name: 'bcpns',
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },
  props: nodeViewProps,
  data() {
    return {
      languages: this.extension.options.lowlight.listLanguages(),
    }
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({ language })
      },
    },
  },
  render() {
    return (
      <node-view-wrapper class="code-block">
      <select contenteditable="false" v-model={this.selectedLanguage}>
        <option value="null">
          auto
        </option>
        <option disabled>
          —
        </option>
        {this.languages.map((item,index) => <option value={item} key={index}> {item} </option>)}
      </select>
      <pre><code><node-view-content /></code></pre>
    </node-view-wrapper>
    )
  },
}