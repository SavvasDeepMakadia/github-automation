const { Octokit } = require('@octokit/rest');

// config object to tweak the main params 
const config = {
    username: 'your-username',
    accessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    repositories: ['sm', 'reading', 'smdbus'],
    sourceBranch: 'branch',
    targetBranch: 'new-branch'
}

// Initialize Octokit with your access token
const octokit = new Octokit({
  auth: config.accessToken,
});

async function createNewBranch() {
    const { targetBranch, sourceBranch, repositories, username } = config;

    for (const repo of repositories) {
        try {
            console.log(`Creating new branch '${targetBranch}' from '${sourceBranch}' in '${repo}'`);

            // Get the reference for the source branch
            const branchRefResponse = await octokit.git.getRef({
                owner: username,
                repo: repo,
                ref: `heads/${sourceBranch}`,
            });

            // Create the new branch based on the source branch reference
            const newBranchResponse = await octokit.git.createRef({
                owner: username,
                repo: repo,
                ref: `refs/heads/${targetBranch}`,
                sha: branchRefResponse.data.object.sha,
            });

            console.log(`New branch '${targetBranch}' created successfully.`);
            console.log(`Branch URL: ${newBranchResponse.data.url}`);
        } catch (error) {
            console.error('An error occurred while creating the branch:', error);
        }
    }

    console.log("Process completed!")
}

// call the async function
createNewBranch();