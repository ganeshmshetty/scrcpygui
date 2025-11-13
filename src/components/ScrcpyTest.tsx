import { useState } from 'react';
import { scrcpyService } from '../services';

export function ScrcpyTest() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [available, setAvailable] = useState<boolean>(false);
  const [version, setVersion] = useState<string>('');
  const [error, setError] = useState<string>('');

  const testScrcpy = async () => {
    setStatus('checking');
    setError('');
    
    try {
      // Check if scrcpy is available
      const isAvailable = await scrcpyService.checkAvailable();
      setAvailable(isAvailable);

      if (!isAvailable) {
        throw new Error('Scrcpy is not available');
      }

      // Get scrcpy version (this tests actual execution)
      const ver = await scrcpyService.testExecution();
      setVersion(ver);
      
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Scrcpy Execution Test</h2>
      <p className="text-gray-600 mb-4">
        This test verifies that scrcpy can be executed from the Tauri backend.
      </p>
      
      <button
        onClick={testScrcpy}
        disabled={status === 'checking'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'checking' ? 'Testing...' : 'Test Scrcpy Execution'}
      </button>

      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold text-green-800 mb-2">✓ Scrcpy Execution Successful!</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Available:</span>
              <span className="ml-2 text-green-700">{available ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="font-medium">Version:</span>
              <pre className="mt-1 p-2 bg-white rounded text-xs overflow-x-auto">{version}</pre>
            </div>
          </div>
          <p className="mt-3 text-green-700 text-sm">
            ✅ Scrcpy is properly bundled and can be executed!
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-semibold text-red-800 mb-2">✗ Test Failed</h3>
          <p className="text-red-700 text-sm">{error}</p>
          <div className="mt-3 text-sm text-red-600">
            <p className="font-medium">Troubleshooting:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Ensure scrcpy.exe is in src-tauri/resources/scrcpy/</li>
              <li>Check that all required DLLs are present</li>
              <li>Verify tauri.conf.json has resources configured</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-semibold text-blue-800 mb-2">ℹ️ About This Test</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Checks if scrcpy executable is bundled correctly</li>
          <li>• Executes scrcpy --version to verify it runs</li>
          <li>• Validates all DLL dependencies are available</li>
          <li>• Confirms Tauri can spawn external processes</li>
        </ul>
      </div>
    </div>
  );
}
