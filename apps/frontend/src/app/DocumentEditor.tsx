import {
  DocumentEditorContainerComponent,
  Toolbar,
} from '@syncfusion/ej2-react-documenteditor';

DocumentEditorContainerComponent.Inject(Toolbar);

import { registerLicense } from '@syncfusion/ej2-base';
import { useEffect } from 'react';
import { useClauses } from '../hooks/use-clauses';
import { useDocument } from '../hooks/use-document';
import debounce from 'lodash.debounce';
import { CLAUSES } from '../utils/constants';

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJ2WmFZfVtgdV9DZVZUTGYuP1ZhSXxWdkZiWH9fdXJVR2BaWEE='
);

export const DocumentEditor = () => {
  const { document, save, id, loaded, setDocument } = useDocument();

  const { clauses, setClauses } = useClauses();
  let container: DocumentEditorContainerComponent;

  useEffect(() => {
    if (loaded) {
      container.documentEditor.editor.paste(document?.content);

      const items = CLAUSES.filter((c) =>
        document?.clauses.split(',').includes(c.id)
      ).map((c) => ({ ...c, added: true }));

      setClauses(items);
    }
  }, [loaded]);

  useEffect(() => {
    const items = clauses.filter((c) => c.added === false);

    if (items.length) {
      items.forEach((c) => {
        container.documentEditor.editor.paste(c.content);
      });
    }
  }, [clauses]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <DocumentEditorContainerComponent
            height="calc(100vh)"
            ref={(scope: DocumentEditorContainerComponent) => {
              container = scope;
            }}
            serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
            enableToolbar={true}
            showPropertiesPane={false}
            contentChange={(e) =>
              debounce(() => {
                if (container) {
                  save({
                    name: document?.name || '',
                    content: container.documentEditor.serialize(),
                    clauses: clauses
                      .map((clause) => Number(clause.id))
                      .join(','),
                    id,
                  });
                }
              }, 1000)()
            }
            toolbarItems={[
              'New',
              'Open',
              'Separator',
              'Undo',
              'Redo',
              'Separator',
              'Bookmark',
              'Table',
              'Separator',
              'Find',
            ]}
          />
        </div>
      </div>
    </>
  );
};
