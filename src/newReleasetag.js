const { Octokit } = require('@octokit/rest');

const config = {
    username: 'SavvasLearning',
    accessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    branchName: 'release',
    repositories: ['repo1', 'repo2'],
    releaseTagName: 'v10.x.x'
}

// Initialize Octokit with your access token
const octokit = new Octokit({
  auth: config.accessToken,
});

async function createReleaseTag() {
    const { branchName, releaseTagName, repositories, username } = config;

    for (const repo of repositories) {
        try {
           console.log(`Creating release tag for repository: ${repo}`);
           
           // Create a new release for the repository
           const releaseResponse = await octokit.repos.createRelease({
               owner: username,
               repo,
               tag_name: releaseTagName,
               target_commitish: branchName,
           });

           console.log(`Release tag created for repository: ${repo}`);
           console.log(`Release URL: ${releaseResponse.data.html_url}`);
        }
        catch (error) {
            console.error('An error occurred while creating release tags:', error);
        }
    }
    console.log('Release tagging process completed successfully.');
}

// call the async function
createReleaseTag();