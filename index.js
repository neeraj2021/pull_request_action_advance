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

    let { data: pull_request } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pr_number,
    });

    let discordData = "-------------------------------------------- \n";

    discordData += `Project Name: ${pull_request.base.repo.name} \n`;

    discordData += `PR Creator: ${pull_request.assignee.login} \n`;

    discordData += `PR Created on: ${new Date(
      pull_request.created_at
    ).toLocaleString()} \n`;

    discordData += `Last Updated on: ${new Date(
      pull_request.updated_at
    ).toLocaleString()} \n`;

    discordData += `PR Link: ${pull_request.html_url} \n`;

    discordData += "Reviewers :  ";

    for (const reviewer of pull_request.requested_reviewers) {
      discordData += reviewer.login + " ";
    }

    discordData += "\n--------------------------------------------";

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
