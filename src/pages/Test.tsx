import { ResourceTest } from '../components/ResourceTest';
import { ScrcpyTest } from '../components/ScrcpyTest';

export function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Phase 1 Tests</h1>
          <p className="mt-2 text-gray-600">
            Verify bundled resources and scrcpy execution
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <ResourceTest />
        </div>

        <div className="bg-white rounded-lg shadow">
          <ScrcpyTest />
        </div>
      </div>
    </div>
  );
}
