import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Update the base path to your deployment path
export default defineConfig({
    plugins: [react()],
});
