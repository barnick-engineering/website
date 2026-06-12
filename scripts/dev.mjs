import { execSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";

const PORT = "3000";

function killPort(port) {
  try {
    const pids = execSync(`lsof -ti :${port}`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
    for (const pid of pids) {
      process.kill(Number(pid), "SIGKILL");
    }
    if (pids.length) {
      console.log(`Stopped stale process on port ${port}`);
    }
  } catch {
    // No process on this port.
  }
}

killPort(PORT);
rmSync(".next", { recursive: true, force: true });

console.log(`Starting dev server on http://localhost:${PORT}`);

const child = spawn("next", ["dev", "-p", PORT], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));
