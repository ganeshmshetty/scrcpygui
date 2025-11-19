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

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    showMessage('success', 'Reset to default settings');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings & Configuration</h2>

      {/* Message Banner */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Resolution Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution
          </label>
          <select
            value={settings.resolution}
            onChange={(e) => updateSetting('resolution', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default (Device Native)</option>
            <option value="1920">1920 (1080p)</option>
            <option value="1280">1280 (720p)</option>
            <option value="800">800 (Lower Quality)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Lower resolution can improve performance on slower networks
          </p>
        </div>

        {/* Bitrate Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bitrate: {(settings.bitrate / 1000000).toFixed(1)} Mbps
          </label>
          <input
            type="range"
            min="1000000"
            max="20000000"
            step="1000000"
            value={settings.bitrate}
            onChange={(e) => updateSetting('bitrate', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 Mbps</span>
            <span>20 Mbps</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Higher bitrate provides better quality but requires more bandwidth
          </p>
        </div>

        {/* Max FPS Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max FPS: {settings.maxFps}
          </label>
          <input
            type="range"
            min="15"
            max="120"
            step="5"
            value={settings.maxFps}
            onChange={(e) => updateSetting('maxFps', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>15 FPS</span>
            <span>120 FPS</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Lower FPS can reduce CPU usage and network bandwidth
          </p>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Display Options</h3>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm font-medium text-gray-700">Always on Top</div>
              <div className="text-xs text-gray-500">Keep mirror window above other windows</div>
            </div>
            <input
              type="checkbox"
              checked={settings.alwaysOnTop}
              onChange={(e) => updateSetting('alwaysOnTop', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm font-medium text-gray-700">Stay Awake</div>
              <div className="text-xs text-gray-500">Prevent device from sleeping during mirroring</div>
            </div>
            <input
              type="checkbox"
              checked={settings.stayAwake}
              onChange={(e) => updateSetting('stayAwake', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="text-sm font-medium text-gray-700">Turn Screen Off</div>
              <div className="text-xs text-gray-500">Turn off device screen while mirroring (saves battery)</div>
            </div>
            <input
              type="checkbox"
              checked={settings.turnScreenOff}
              onChange={(e) => updateSetting('turnScreenOff', e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
