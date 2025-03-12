import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../AlertDialog/AlertDialog';
import { useClauses } from '../../hooks/use-clauses';
import { CLAUSES } from '../../utils/constants';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { useState } from 'react';
import { useDocument } from '../../hooks/use-document';

export const Clauses = () => {
  const { document, save } = useDocument();
  const { clauses, addClause, removeClause } = useClauses();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Card className="hidden w-72 flex-shrink-0 border-l border-t-0 md:block">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between ">
          <h3 className="font-medium">Clauses</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Add Clause</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Clause</AlertDialogTitle>
                <AlertDialogDescription>
                  Choose a clause to add to your document
                </AlertDialogDescription>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search clauses..."
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-4 mt-4">
                  {CLAUSES.filter((clause) =>
                    clauses.find((c) => c.id === clause.id) ? false : true
                  )
                    .filter((clause) =>
                      clause.name
                        .toLocaleLowerCase()
                        .includes(searchTerm.toLocaleLowerCase())
                    )
                    .map((clause) => (
                      <div
                        key={clause.id}
                        className="flex items-center justify-between border p-2 px-4 rounded-lg"
                      >
                        <span className="text-sm">{clause.name}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => addClause({ ...clause, added: false })}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="h-[calc(100vh-14rem)]">
        <div className="space-y-4 p-4">
          <div className="space-y-3">
            <div className="space-y-3">
              {clauses.map((clause) => (
                <div
                  className="flex items-center justify-between"
                  key={clause.id}
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => addClause({ ...clause, added: false })}
                  >
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {clause.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      removeClause(clause.id);

                      if (document) {
                        save({
                          ...document,
                          clauses: document?.clauses
                            ? document.clauses
                                .split(',')
                                .filter((c: string) => c === clause.id)
                                .join(',')
                            : '',
                        });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
