import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const require = createRequire(import.meta.url);

function isMusl() {
  if (process.platform !== 'linux') return false;
  try {
    if (fs.existsSync('/usr/bin/ldd') && fs.readFileSync('/usr/bin/ldd', 'utf8').includes('musl')) {
      return true;
    }
  } catch {}
  if (process.report && typeof process.report.getReport === 'function') {
    try {
      const report = process.report.getReport();
      if (report?.header?.glibcVersionRuntime) return false;
      if (Array.isArray(report?.sharedObjects)) {
        if (report.sharedObjects.some((f) => f.includes('libc.musl-') || f.includes('ld-musl-'))) return true;
      }
    } catch {}
  }
  try {
    return execSync('ldd --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).includes('musl');
  } catch {
    return false;
  }
}

function getExpectedPackage() {
  const { platform, arch } = process;
  if (platform === 'linux') {
    const musl = isMusl();
    if (arch === 'x64') return musl ? '@rolldown/binding-linux-x64-musl' : '@rolldown/binding-linux-x64-gnu';
    if (arch === 'arm64') return musl ? '@rolldown/binding-linux-arm64-musl' : '@rolldown/binding-linux-arm64-gnu';
  } else if (platform === 'darwin') {
    if (arch === 'arm64') return '@rolldown/binding-darwin-arm64';
    if (arch === 'x64') return '@rolldown/binding-darwin-x64';
  } else if (platform === 'win32') {
    if (arch === 'x64') return '@rolldown/binding-win32-x64-msvc';
    if (arch === 'arm64') return '@rolldown/binding-win32-arm64-msvc';
  }
  return null;
}

const pkg = getExpectedPackage();
if (!pkg) {
  console.log(`[ensure-native] Platform ${process.platform}-${process.arch} has no known rolldown native binding target; skipping.`);
  process.exit(0);
}

try {
  require.resolve(pkg);
  console.log(`✓ Rolldown native binding ${pkg} is already installed.`);
} catch {
  console.warn(`[ensure-native] Native binding ${pkg} not found in node_modules! Attempting self-healing install...`);
  try {
    execSync(`npm install --no-save --include=optional ${pkg}@1.2.15`, { stdio: 'inherit' });
  } catch {
    console.warn(`[ensure-native] Standard install failed; retrying with --force --ignore-engines...`);
    try {
      execSync(`npm install --no-save --force --ignore-engines ${pkg}@1.2.15`, { stdio: 'inherit' });
    } catch (retryErr) {
      console.error(`[ensure-native] Failed to install ${pkg}:`, retryErr);
      process.exit(1);
    }
  }

  try {
    require.resolve(pkg);
    console.log(`✓ Successfully self-healed and installed ${pkg}!`);
  } catch (verifyErr) {
    console.error(`[ensure-native] Installed ${pkg} but could not resolve it:`, verifyErr);
    process.exit(1);
  }
}
