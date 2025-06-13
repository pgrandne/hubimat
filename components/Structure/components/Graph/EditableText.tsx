import { SetStateAction, useState } from "react";

function EditableText( { initText } : { initText: string}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initText);

  const handleDoubleClick = () => setIsEditing(true);
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value);
  const handleBlur = () => setIsEditing(false);

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <p onDoubleClick={handleDoubleClick}>{text}</p>
      )}
    </div>
  );
}

export default EditableText;
