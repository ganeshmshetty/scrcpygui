import { useState } from 'react';
import { verifyBundledResources, getAdbPath, getScrcpyPath } from '../services';

export function ResourceTest() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [adbPath, setAdbPath] = useState<string>('');
  const [scrcpyPath, setScrcpyPath] = useState<string>('');
  const [error, setError] = useState<string>('');

  const checkResources = async () => {
    setStatus('checking');
    setError('');
    
    try {
      // Verify resources are available
      await verifyBundledResources();
      
      // Get the actual paths
      const adb = await getAdbPath();
      const scrcpy = await getScrcpyPath();
      
      setAdbPath(adb);
      setScrcpyPath(scrcpy);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bundled Resources Test</h2>
      
      <button
        onClick={checkResources}
        disabled={status === 'checking'}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {status === 'checking' ? 'Checking...' : 'Verify Bundled Resources'}
      </button>

      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold text-green-800 mb-2">✓ Resources Found Successfully!</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">ADB Path:</span>
              <p className="text-gray-700 break-all">{adbPath}</p>
            </div>
            <div>
              <span className="font-medium">Scrcpy Path:</span>
              <p className="text-gray-700 break-all">{scrcpyPath}</p>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
          <h3 className="font-semibold text-red-800 mb-2">✗ Error</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
