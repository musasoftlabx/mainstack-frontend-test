module.exports = {
  apps: [
    {
      name: "Mainstack App Server",
      exec_mode: "cluster",
      instances: 1,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      node_args: ["--max_old_space_size=2048"],
      watch: false,
      max_memory_restart: "2G",
      env: { PORT: 3333 },
    },
  ],
};
