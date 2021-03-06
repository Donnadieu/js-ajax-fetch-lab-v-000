const baseApi = 'https://api.github.com'
const repo = 'javascript-fetch-lab'

function createIssue() {
  const issueTitle = document.getElementById('title').value
  const issueBody = document.getElementById('body').value
  const postData = { title: issueTitle, body: issueBody }
  const url = `${baseApi}/repos/Donnadieu/${repo}/issues`

  fetch(url, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    },
    body: JSON.stringify(postData)
  }).then(res => res.json()).then(getIssues())
}

function getIssues() {
  const url = `${baseApi}/repos/Donnadieu/${repo}/issues`

  fetch(url, {
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(res => showIssues(res))
}

function showIssues(issues) {
  document.getElementById('issues').append(renderIssues(issues))
}

const renderIssues = (issues) => (
  "<ul>" + issues.map(issue => {
    return(`
        <li>
          <h2>${issue.title}</h2>
          <p>${issue.body}</p>
        </li>
      `)
  }).join('') + "</ul>"
)

function forkRepo() {
  fetch(`${baseApi}/repos/learn-co-curriculum/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json()).then(res => showForkedRepo(res))
}

function showForkedRepo(repo) {
  $('#results').append(renderRepo(repo))
}

const renderRepo = (repo) => {
  return(`
    <div name="repo">
      <span>Repo forked successfully!</span>
      <h2><a href="${repo.html_url}">${repo.name}</a></h2>
    </div>
    `)
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
