const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const discord_url =
  "https://discord.com/api/webhooks/1104692069383028777/6oibP5FzHH6w7qYgXyXuWtOWrUW_W4F0lOIJdxd98iYr9uSz6O2JOtB_y-X6uS8B5M4q";

async function run() {
  try {
    const owner = core.getInput("owner", { required: true });
    const repo = core.getInput("repo", { required: true });
    const pr_number = core.getInput("pr_number", { required: true });
    const token = core.getInput("token", { required: true });

    const octokit = new github.getOctokit(token);

    const { data } = await octokit.rest.pulls.listCommits({
      owner,
      repo,
      pull_number: pr_number,
    });

    let discordData = "";

    for (const item of data) {
      discordData += item.commit.message + "\n";
    }

    await axios.post(
      discord_url,
      {
        username: "Neeraj Kumar",
        content: discordData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
