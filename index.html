<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Roblox Profile Checker</title>
<style>
  body{font-family:Consolas, "Courier New", monospace;background:#1c1c1c;color:#dcdcdc;padding:20px;margin:0;display:flex;flex-direction:column;align-items:center}
  .checker-tool,.report-container{width:100%;max-width:600px;padding:20px;margin-bottom:20px;background:#242424;border:2px solid #555;border-radius:8px;box-shadow:0 0 15px rgba(0,0,0,0.7)}
  h2{text-align:center;color:#ffcc00;margin:0 0 10px}
  input[type="text"]{width:100%;padding:8px;margin-top:10px;background:#333;border:1px solid #555;color:#dcdcdc;border-radius:4px}
  button{width:100%;padding:10px;margin-top:16px;background:#55aaff;color:#1c1c1c;border:none;cursor:pointer;font-weight:bold;border-radius:6px}
  button:hover{background:#4499ee}
  .divider{text-align:center;margin:10px 0;color:#777}
  .status-dismissed{color:#ff5555;font-weight:bold}
  .status-passed{color:#77ff77;font-weight:bold}
  .red-flag-list{list-style:none;padding-left:0}
  .red-flag-list li{margin-bottom:6px}
  .red-flag{color:#ff5555}
  .no-flag{color:#77ff77}
  .username{color:#ffcc00;font-weight:bold}
  .badge-name{color:#55ffff}
  .meta{font-size:13px;color:#aaa;margin-top:8px}
  pre#debug{white-space:pre-wrap;color:#f88;background:#200;padding:10px;border-radius:6px;display:none}
</style>
</head>
<body>
  <div class="checker-tool">
    <h2>🔍 Roblox Account Checker</h2>
    <input id="username" placeholder="Enter Roblox username (e.g. Builderman)" />
    <button id="run">GENERATE FINAL REPORT</button>
    <p class="meta">No backend required — uses your Cloudflare Worker as a proxy (you must supply its URL in the script).</p>
  </div>

  <div class="report-container" id="reportOutput" style="display:none"></div>
  <pre id="debug"></pre>

<script>
/*
  IMPORTANT: Replace WORKER_BASE below with your deployed Cloudflare Worker URL including the ?url= suffix.
  Example: https://my-worker.example.workers.dev/?url=
*/
const WORKER_BASE = "https://YOUR_WORKER_SUBDOMAIN.workers.dev/?url=";
const SANDHURST_GAME_ID = 270499015;

// Robust proxy fetch: returns parsed JSON or null on non-JSON/404
async function proxyFetchJson(targetUrl) {
  try {
    const res = await fetch(WORKER_BASE + encodeURIComponent(targetUrl));
    const text = await res.text();
    // Try JSON parse, otherwise return null
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  } catch (err) {
    throw new Error("Proxy fetch failed: " + err.message);
  }
}

async function getUserByUsername(username){
  const url = `https://users.roblox.com/v1/users/by-username/${encodeURIComponent(username)}`;
  return await proxyFetchJson(url);
}

async function getFriendCount(userId){
  return await proxyFetchJson(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
}

async function getGroupRoles(userId){
  return await proxyFetchJson(`https://groups.roblox.com/v2/users/${userId}/groups/roles`);
}

async function getAllUserBadges(userId){
  let out = [], cursor = "";
  while(true){
    const url = `https://badges.roblox.com/v1/users/${userId}/badges?limit=100${cursor ? "&cursor=" + cursor : ""}`;
    const data = await proxyFetchJson(url);
    if(!data?.data || data.data.length===0) break;
    out = out.concat(data.data);
    if(!data.nextPageCursor) break;
    cursor = data.nextPageCursor;
  }
  return out;
}

async function getAllGameBadges(gameId){
  let out = [], cursor = "";
  while(true){
    const url = `https://badges.roblox.com/v1/universes/${gameId}/badges?limit=100${cursor ? "&cursor=" + cursor : ""}`;
    const data = await proxyFetchJson(url);
    if(!data?.data || data.data.length===0) break;
    out = out.concat(data.data);
    if(!data.nextPageCursor) break;
    cursor = data.nextPageCursor;
  }
  return out;
}

function renderReport({username, userId, friends, groups, badges, sandhurstOwned}) {
  const badgePages = Math.ceil(badges.length / 10);
  let redFlags = [], flagCount = 0;

  if((friends?.count ?? 0) < 30) { redFlags.push(`1. <span class="red-flag">Fewer than 30 friends</span> (${friends?.count ?? 0})`); flagCount++; }
  else redFlags.push(`1. <span class="no-flag">30 or more friends</span> (${friends?.count ?? 0})`);

  if((groups?.data?.length ?? 0) < 13) { redFlags.push(`2. <span class="red-flag">Fewer than 13 groups</span> (${groups?.data?.length ?? 0})`); flagCount++; }
  else redFlags.push(`2. <span class="no-flag">13 or more groups</span> (${groups?.data?.length ?? 0})`);

  if(badgePages < 10) { redFlags.push(`3. <span class="red-flag">Fewer than 10 pages of badges</span> (${badgePages} pages, ${badges.length} badges)`); flagCount++; }
  else redFlags.push(`3. <span class="no-flag">10 or more pages of badges</span> (${badgePages} pages, ${badges.length} badges)`);

  if(sandhurstOwned.length > 0) { redFlags.push(`4. <span class="red-flag">Sandhurst badge(s) found</span>: ${sandhurstOwned.map(b=>`<span class="badge-name">${b.name}</span>`).join(', ')}`); flagCount++; }
  else redFlags.push(`4. <span class="no-flag">No Sandhurst badges found</span>`);

  const statusText = flagCount > 2 ? "DISMISSED" : "PASSED";
  const statusClass = flagCount > 2 ? "status-dismissed" : "status-passed";
  const statusEmoji = flagCount > 2 ? "❌" : "✅";

  return `
    <div class="divider">============</div>
    <p style="text-align:center;font-weight:bold;">FINAL REPORT</p>
    <div class="divider">============</div>
    <p>User: <span class="username">${username}</span><br>
    Status: <span class="${statusClass}">${statusEmoji} ${statusText}</span> (${flagCount} red flag${flagCount===1?'':'s'})</p>
    <ol class="red-flag-list">${redFlags.map(f=>`<li>${f}</li>`).join('')}</ol>
    <div class="divider">============</div>
  `;
}

document.getElementById('run').addEventListener('click', async ()=>{
  const out = document.getElementById('reportOutput');
  const dbg = document.getElementById('debug');
  dbg.style.display = 'none';
  out.style.display = 'block';
  const username = document.getElementById('username').value.trim();
  if(!username){ out.textContent = "Enter a username."; return; }

  out.innerHTML = "<p style='opacity:.8'>Fetching data — this may take a few seconds...</p>";
  try {
    const user = await getUserByUsername(username);
    if(!user?.id) { out.textContent = "User not found."; return; }
    const userId = user.id;

    // Fetch in parallel
    const [friends, groups, badgesAll, gameBadges] = await Promise.all([
      getFriendCount(userId),
      getGroupRoles(userId),
      getAllUserBadges(userId),
      getAllGameBadges(SANDHURST_GAME_ID)
    ]);

    // Map game badges by id for quick lookup
    const gameSet = new Set((gameBadges||[]).map(b=>b.id));
    const sandhurstOwned = (badgesAll||[]).filter(b => gameSet.has(b.id));

    out.innerHTML = renderReport({
      username: user.username || user.displayName || username,
      userId,
      friends,
      groups,
      badges: badgesAll || [],
      sandhurstOwned
    });

  } catch (err) {
    out.innerHTML = `<div style="color:#ffaaaa">Error: ${err.message}</div>`;
    dbg.style.display = 'block';
    dbg.textContent = err.stack || String(err);
    console.error(err);
  }
});
</script>
</body>
</html>
