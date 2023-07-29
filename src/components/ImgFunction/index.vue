<template>
    <div class="image-button">
        <button class="button-item">
            <input @change="handleChange" id="12312" :placeholder="'啊飒飒'" type="file" accept="image/*" />
            <label for="12312">
                <svg t="1690613984862" class="icon" viewBox="0 0 1098 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="41158" width="20" height="20"><path d="M365.717333 329.152q0 45.717333-32 77.717333t-77.717333 32-77.717333-32-32-77.717333 32-77.717333 77.717333-32 77.717333 32 32 77.717333zM950.848 548.565333l0 256-804.565333 0 0-109.717333 182.848-182.848 91.434667 91.434667 292.565333-292.565333zM1005.717333 146.282667l-914.282667 0q-7.424 0-12.864 5.418667t-5.418667 12.864l0 694.848q0 7.424 5.418667 12.864t12.864 5.418667l914.282667 0q7.424 0 12.864-5.418667t5.418667-12.864l0-694.848q0-7.424-5.418667-12.864t-12.864-5.418667zM1097.152 164.565333l0 694.848q0 37.717333-26.858667 64.576t-64.576 26.858667l-914.282667 0q-37.717333 0-64.576-26.858667t-26.858667-64.576l0-694.848q0-37.717333 26.858667-64.576t64.576-26.858667l914.282667 0q37.717333 0 64.576 26.858667t26.858667 64.576z" fill="#222222" p-id="41159"></path></svg>
            </label>
        </button>
    </div>
</template>

<script>
export default {
    name: 'imgBlock',
    props: {
        editor: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emits }) {
        const addImg = () => {
            const url = window.prompt('URL')

            if (url) {
                props.editor.chain().focus().setImage({ src: url }).run()
            }
        }
        const handleChange = (event) => {
            const file = event.target.files[0];
            if (!file.type.match("image.*")) {
                alert("请选择图片文件！");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                props.editor.chain().focus().setImage({ src: e.target.result }).run()
            };
            reader.readAsDataURL(file);
        }
        return {
            addImg,
            handleChange,
        }
    }
}
</script>

<style scoped lang="less">
.image-button {
    display: inline-block;
    button.button-item {
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
        input {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            opacity: 0;
        }
        &:hover {
            background-color: rgb(136, 255, 255);
        }
    }

}
</style>
