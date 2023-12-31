import React, { ReactNode, useState } from 'react'
import { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextEditor from './TextEditor'

interface Para {
    setDescription: React.Dispatch<React.SetStateAction<any>>
    description: string
}

const Para:React.FC<Para> = ({setDescription, description}) => {
    const [focus, setFocus] = useState(false)
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editorProps:{
            attributes:{
                class: "prose w-full focus:outline-none loading-5 pose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline"
            }
        },
        content: description,
    })
    
    const html = editor?.getHTML()

    useEffect(() => {
        setDescription(html)
        console.log(html)
    },[html])


    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e:any) => {
            if(!menuRef.current?.contains(e.target)){
                setFocus(false)
            }
        }
        document.addEventListener('mousedown', handler)
    },[])

    return (
        <div className={`mx-auto border-[1px] mt-4 rounded-xl ${focus ? "border-orange-500 border-[2px] ml-0 text-white":""}`} ref = {menuRef}>
            {/* <TextEditor editor={editor} /> */}
            <EditorContent editor={editor} style={{padding:'18px'}} onClick={() => setFocus(true)}/>
        </div>
    )
}

export default Para