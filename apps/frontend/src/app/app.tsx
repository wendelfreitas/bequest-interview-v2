import { Clauses } from '../components/Clauses/Clauses';
import { Header } from '../components/Header/Header';
import { ClausesProvider } from '../hooks/use-clauses';
import { DocumentProvider } from '../hooks/use-document';
import { DocumentEditor } from './DocumentEditor';

export default function App() {
  return (
    <DocumentProvider>
      <ClausesProvider>
        <div className="flex h-screen flex-col overflow-hidden bg-background">
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
              <DocumentEditor />
            </div>

            <Clauses />
          </div>
        </div>
      </ClausesProvider>
    </DocumentProvider>
  );
}
