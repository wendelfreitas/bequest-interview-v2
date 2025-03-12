import { useState } from 'react';
import { useDocument } from '../../hooks/use-document';

export const Header = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { document, save, isSaving, loaded } = useDocument();

  const getTitle = () => {
    if (isSaving) {
      return 'Saving...';
    }

    if (!loaded) {
      return '';
    }

    return document?.name && document?.name?.length > 0
      ? document.name
      : 'Untitled Document';
  };

  return (
    <header className="flex h-14 items-center border-b px-4 lg:px-6">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <input
            className="text-lg font-semibold bg-transparent border-none outline-none"
            placeholder={document?.name}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (document) {
                  save({ ...document, name: e.currentTarget.value });
                }
                setIsEditing(false);
              }
            }}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <h1
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {getTitle()}
          </h1>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {isSaving ? 'Auto-saving...' : 'Saved Successfully...'}
        </span>
      </div>
    </header>
  );
};
