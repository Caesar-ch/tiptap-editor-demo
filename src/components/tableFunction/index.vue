<template>
    <button class="table-button"
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
        <div class="table-icon">
            <svg t="1690610436084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="38795" width="20" height="20-">
                <path
                    d="M885.3 957.3H140.7c-42.2 0-76.5-34.3-76.5-76.5V136.3c0-42.2 34.3-76.5 76.5-76.5h744.6c42.2 0 76.5 34.3 76.5 76.5v744.6c-0.1 42.1-34.3 76.4-76.5 76.4z m-744.6-851c-16.5 0-29.9 13.4-29.9 29.9v744.6c0 16.5 13.4 29.9 29.9 29.9h744.6c16.5 0 29.9-13.4 29.9-29.9V136.3c0-16.5-13.4-29.9-29.9-29.9H140.7z"
                    fill="#2c2c2c" p-id="38796"></path>
                <path d="M938.5 315.8h-851V91.1c0-4.4 3.6-8 8-8h835c4.4 0 8 3.6 8 8v224.7z" fill="#2c2c2c" p-id="38797"></path>
                <path
                    d="M961.7 339H64.3V136.3c0-42.2 34.3-76.5 76.5-76.5h744.6c42.2 0 76.5 34.3 76.5 76.5V339z m-850.9-46.5h804.4V136.3c0-16.5-13.4-29.9-29.9-29.9H140.7c-16.5 0-29.9 13.4-29.9 29.9v156.2zM938.5 644.8h-851c-12.9 0-23.3-10.4-23.3-23.3 0-12.8 10.4-23.3 23.3-23.3h851c12.9 0 23.3 10.4 23.3 23.3-0.1 12.9-10.5 23.3-23.3 23.3z"
                    fill="#2c2c2c" p-id="38798"></path>
                <path
                    d="M363.4 957.3c-12.9 0-23.3-10.4-23.3-23.3V315.8c0-12.8 10.4-23.3 23.3-23.3s23.3 10.4 23.3 23.3V934c0 12.9-10.4 23.3-23.3 23.3zM662.6 957.3c-12.9 0-23.3-10.4-23.3-23.3V315.8c0-12.8 10.4-23.3 23.3-23.3s23.3 10.4 23.3 23.3V934c0 12.9-10.5 23.3-23.3 23.3z"
                    fill="#2c2c2c" p-id="38799"></path>
            </svg>
        </div>
        <svg t="1690619350901" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="75921" width="16" height="20"><path d="M257.783111 431.783027L493.964228 145.503908c9.351995-11.336186 26.720571-11.336186 36.072567 0l236.181117 286.279119c12.58155 15.250332 1.733481 38.262442-18.036795 38.262442H275.818883c-19.770276 0-30.617321-23.01211-18.035772-38.262442zM766.216889 592.216973L530.036795 878.496092c-9.351995 11.336186-26.720571 11.336186-36.072567 0L257.783111 592.216973c-12.58155-15.250332-1.733481-38.262442 18.036795-38.262442h472.361211c19.770276 0 30.617321 23.01211 18.035772 38.262442z" fill="#000000" p-id="75922"></path></svg>
        <div class="option">
            <button @click.stop="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
                addColumnBefore
            </button>
            <button @click.stop="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
                addColumnAfter
            </button>
            <button @click.stop="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
                deleteColumn
            </button>
            <button @click.stop="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
                addRowBefore
            </button>
            <button @click.stop="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
                addRowAfter
            </button>
            <button @click.stop="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
                deleteRow
            </button>
            <button @click.stop="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
                deleteTable
            </button>
            <button @click.stop="editor.chain().focus().toggleHeaderCell().run()" :disabled="!editor.can().toggleHeaderCell()">
                toggleHeaderCell
            </button>
            <button @click.stop="editor.chain().focus().mergeOrSplit().run()" :disabled="!editor.can().mergeOrSplit()">
                mergeOrSplit
            </button>
            <button @click.stop="editor.chain().focus().setCellAttribute('backgroundColor', '#000').run()"
                :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')">
                setCellAttribute
            </button>
        </div>
    </button>
</template>

<script>
export default {
    name: 'tableBlock',
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emits }) {
        return {
        }
    }
}
</script>

<style scoped lang="less">
button {
    background: transparent;
    border: none;
    border-radius: .4rem;
    color: #fff;
    cursor: pointer;
    height: 1.75rem;
    padding: .25rem;
    margin-right: .25rem;
    width: 1.75rem;
    position: relative;
    .option {
        position: absolute;
        border: red;
        background-color: white;
        border-radius: .4rem;
        display: none;
        border: 1px solid gray;
        left: 0px;
        top: 1.75rem;
        z-index: 999;
    }
    &:hover {
      background-color: #d2e4ff;
      .option {
        display: flex;
        flex-direction: column;
        button {
            width: auto;
            color: black;
        }
      }
    }
}
.table-button {
    display: flex;
    width: 2.75rem !important;
    .table-icon {
        display: inline-block;
    }
}
</style>
