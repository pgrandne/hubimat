import { cn } from "@/lib/utils";
import { useState } from "react";

function EditableText( { defaultValue, onChange, placeholder } : 
  { defaultValue ?: string, onChange ?: (value?:string) => void, placeholder ?: string }
) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultValue);

  const handleDoubleClick = () => setIsEditing(true);
  const handleChange = (e: { target: { value: string } }) => { setText(e.target.value); onChange?.(e.target.value); }
  const handleBlur = () => setIsEditing(false);

  return (
    <div className="w-full">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={e => {if (e.code === 'Enter') e.currentTarget.blur()}}
          autoFocus
          placeholder={placeholder}
          className="w-[calc(100%-2px)] h-fit mx-1 flex rounded-md border border-input bg-background px-1 py-1.5 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        />
      ) : (
        <span className={cn(
          "w-[calc(100%-2px)] h-fit mx-1 flex rounded-md border border-transparent hover:border-white px-1 py-1.5 text-sm", 
          text && text !== "" ? "" : "italic text-gray-500"
        )}
          style={{boxSizing:"border-box"}}
          onDoubleClick={handleDoubleClick}>
            {text && text !== "" ? text : placeholder }
        </span>
      )}
    </div>
  );
}

export default EditableText;
