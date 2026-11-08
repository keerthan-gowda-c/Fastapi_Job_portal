import { EditorContent, useEditor } from "@tiptap/react"
import "./RichTextEditor.css"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { useEffect } from "react"
import { marked } from "marked"

export default function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" }
            })
        ],
        content: value || "",
        onUpdate: ({ editor }) => { onChange(editor.getHTML()) }
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "", false)
        }
    }, [value, editor])

    if (!editor) return null

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl || "https://")

        if (url === null) return;

        if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()

    }

    const handlePaste = (event) => {
    const text = event.clipboardData.getData("text/plain");
    const html = event.clipboardData.getData("text/html");

    // Preserve formatting when the clipboard already contains HTML.
    if (html || !text) return;

    // Convert pasted Markdown into formatted HTML.
    if (!/(\*\*|__|^#{1,3}\s|^\s*[-*+]\s|\[.+\]\(.+\))/m.test(text)) return;

    event.preventDefault();
    editor.chain().focus().insertContent(marked.parse(text)).run();
};

    return (
        <div className="jh-editor" onPaste={handlePaste}>
            <div className="jh-editor-toolbar">
                <button
                    type="button"
                    className={editor.isActive("bold") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>

                <button
                    type="button"
                    className={editor.isActive("italic") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <em>I</em>
                </button>

                <button
                    type="button"
                    className={editor.isActive("strike") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    title="Strikethrough"
                >
                    <s>S</s>
                </button>

                <span className="jh-editor-divider" />

                <button
                    type="button"
                    className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="Heading"
                >
                    H2
                </button>

                <button
                    type="button"
                    className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    title="Subheading"
                >
                    H3
                </button>

                <span className="jh-editor-divider" />

                <button
                    type="button"
                    className={editor.isActive("bulletList") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet list"
                >
                    • List
                </button>

                <button
                    type="button"
                    className={editor.isActive("orderedList") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Numbered list"
                >
                    1. List
                </button>

                <button
                    type="button"
                    className={editor.isActive("link") ? "active" : ""}
                    onClick={setLink}
                    title="Add link"
                >
                    Link
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    title="Clear formatting"
                >
                    Clear
                </button>
            </div>

            <EditorContent editor={editor} className="jh-editor-content" />
        </div>
    );
}