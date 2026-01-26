import { useState, useEffect } from 'react';
import { Settings, DEFAULT_SETTINGS } from '../types';
import { settingsService } from '../services';

interface SettingsPanelProps {
  onSettingsChange?: (settings: Settings) => void;
}

export function SettingsPanel({ onSettingsChange }: SettingsPanelProps) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const loadedSettings = await settingsService.loadSettings();
      setSettings(loadedSettings);
      onSettingsChange?.(loadedSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
      showMessage('error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      await settingsService.saveSettings(settings);
      onSettingsChange?.(settings);
      showMessage('success', 'Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      showMessage('error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = async () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      await settingsService.saveSettings(DEFAULT_SETTINGS);
      onSettingsChange?.(DEFAULT_SETTINGS);
      showMessage('success', 'Reset to default settings');
    } catch (error) {
      console.error('Failed to save default settings:', error);
      showMessage('error', 'Reset locally but failed to save');
    }
  };

  if (loading) {
    return (
      <div className="card flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent mb-3"></div>
          <div className="text-gray-500 font-medium">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 max-w-3xl mx-auto animate-slide-down">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Mirroring Settings</h2>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 animate-slide-down ${message.type === 'success'
              ? 'bg-green-50 text-green-800 border-green-500'
              : 'bg-red-50 text-red-800 border-red-500'
            }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Resolution Settings */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            <svg className="w-4 h-4 inline mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Resolution
          </label>
          <select
            value={settings.resolution}
            onChange={(e) => updateSetting('resolution', e.target.value)}
            className="input"
          >
            <option value="default">Default (Device Native)</option>
            <option value="1920">1920 (1080p)</option>
            <option value="1280">1280 (720p)</option>
            <option value="800">800 (Lower Quality)</option>
          </select>
          <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
            <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Lower resolution can improve performance on slower networks
          </p>
        </div>

        {/* Bitrate Settings */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            <svg className="w-4 h-4 inline mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Bitrate: <span className="text-primary-600">{(settings.bitrate / 1000000).toFixed(1)} Mbps</span>
          </label>
          <input
            type="range"
            min="1000000"
            max="20000000"
            step="1000000"
            value={settings.bitrate}
            onChange={(e) => updateSetting('bitrate', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1 Mbps</span>
            <span>20 Mbps</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
            <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Higher bitrate provides better quality but requires more bandwidth
          </p>
        </div>

        {/* Max FPS Settings */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            <svg className="w-4 h-4 inline mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Max FPS: <span className="text-primary-600">{settings.maxFps}</span>
          </label>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={settings.maxFps}
            onChange={(e) => updateSetting('maxFps', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>15 FPS</span>
            <span>120 FPS</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 flex items-start gap-1">
            <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Lower FPS can reduce CPU usage and network bandwidth
          </p>
        </div>

        {/* Toggle Settings */}
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-4 rounded-lg border border-primary-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Display Options
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div>
                <div className="text-sm font-semibold text-gray-900">Always on Top</div>
                <div className="text-xs text-gray-600 mt-0.5">Keep mirror window above other windows</div>
              </div>
              <input
                type="checkbox"
                checked={settings.alwaysOnTop}
                onChange={(e) => updateSetting('alwaysOnTop', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div>
                <div className="text-sm font-semibold text-gray-900">Stay Awake</div>
                <div className="text-xs text-gray-600 mt-0.5">Prevent device from sleeping during mirroring</div>
              </div>
              <input
                type="checkbox"
                checked={settings.stayAwake}
                onChange={(e) => updateSetting('stayAwake', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
              <div>
                <div className="text-sm font-semibold text-gray-900">Turn Screen Off</div>
                <div className="text-xs text-gray-600 mt-0.5">Turn off device screen while mirroring (saves battery)</div>
              </div>
              <input
                type="checkbox"
                checked={settings.turnScreenOff}
                onChange={(e) => updateSetting('turnScreenOff', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </>
            )}
          </button>
          <button
            onClick={resetToDefaults}
            className="btn-ghost"
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
