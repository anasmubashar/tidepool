// ============================================================
// Deterministic seed data for The Small Web
// 10 richly-written, cross-linked sites; 5 people; 1h history
// ============================================================

export const SEED_SITES = [
  {
    address: 'tidepool.zz',
    title: 'Tidepool — A QuietWeb Engine',
    author: '@mesh_maintainer',
    summary: 'The entry point. A federated mesh index for the Small Web, hand-maintained by wanderers.',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tidepool — A QuietWeb Engine</title>
</head>
<body>
  <header>
    <h1>Tidepool</h1>
    <p>A federated mesh index for the Small Web. Hand-maintained by wanderers, served across solar-backed nodes.</p>
  </header>
  <nav>
    <h2>Where to begin</h2>
    <ul>
      <li><a href="alder.zz/essays/tending-digital-gardens">Tending the Digital Garden: A Primer on Slow Systems</a></li>
      <li><a href="archard.zz/hypertext/craft-and-longevity">Handmade Hypertext: Why Small Webs Endure</a></li>
      <li><a href="breadbox.zz/manuals/wild-yeast-html">Wild Yeast &amp; Static HTML: A Manual of Domestic Crafts</a></li>
      <li><a href="directory.zz/nodes/garden-rings">The Quiet Web Directory &amp; Node Map</a></li>
      <li><a href="botanyx.zz/rhizome-patterns">Rhizomatic Organization: Botanical Structures in Web Graphs</a></li>
    </ul>
  </nav>
  <section>
    <h2>About this index</h2>
    <p>Tidepool is not a search engine. It is a fishing net — coarse enough to let algorithms through, fine enough to catch what matters. Each entry was added by a human who read the page and decided it belonged here.</p>
    <p>We index only what the mesh confirms is reachable. No JavaScript required. No analytics. No cookies. Pages load in the time it takes to exhale.</p>
    <blockquote>"A page is not an advertisement; it is a room you built with your hands."</blockquote>
  </section>
  <footer>
    <p>Protocol: quiet:// · Version: 0.9 · <a href="nowhere.zz/lost-island">Report a broken node</a></p>
    <p>Maintained by @mesh_maintainer · <a href="deep-time.zz/longform/geological-patience">On Deep Time and Patient Networks</a></p>
  </footer>
</body>
</html>`,
  },
  {
    address: 'alder.zz/essays/tending-digital-gardens',
    title: 'Tending the Digital Garden: A Primer on Slow Systems',
    author: '@dara_v',
    summary: 'Why we practice gardening rather than continuous stream publishing.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Tending the Digital Garden</title></head>
<body>
  <article>
    <header>
      <p>alder.zz · essays · tending-digital-gardens</p>
      <h1>Tending the Digital Garden: A Primer on Slow Systems</h1>
      <p>by <strong>@dara_v</strong> · updated April 28, 2024 · hosted on raspberry-pi-4 · 3.2 KB</p>
    </header>
    <section>
      <p>Why we practice <strong>gardening</strong> rather than continuous stream publishing. Streams wash away thought; gardens ask for pruning, weeding, and cross-pollination across small bespoke notebooks.</p>
      <p>The gardener does not expect an audience. She expects return visits — her own, mostly — and the occasional wanderer who comes in through a gap in the hedge. The content does not broadcast itself. It waits, certain in its own value, growing laterally through links rather than vertically through timestamps.</p>
      <p>There is a particular posture required of the digital gardener: patience with ambiguity, willingness to leave half-finished thought visible, and trust that the right person will find the right thing at the right moment. This is not the posture of the content creator. It is the posture of someone who plants perennials.</p>
      <blockquote>"A garden is a document of time. Each revision leaves a layer visible to the careful reader."</blockquote>
      <p>When I first began tending this space, I made the mistake of pruning too aggressively — removing old posts that seemed embarrassing in retrospect. What I lost was the record of my own thinking. Gardens need their dead wood. It tells you which branches tried and failed, and where the new growth needs to go.</p>
      <h2>Cross-pollination and linking</h2>
      <p>The best thing a garden can do is point outward. See also: <a href="archard.zz/hypertext/craft-and-longevity">Handmade Hypertext: Why Small Webs Endure</a> for a meditation on what linking means when it's permanent. And <a href="botanyx.zz/rhizome-patterns">Rhizomatic Organization</a> for a structural model borrowed from Deleuze and applied to web graphs.</p>
      <p>Return to <a href="tidepool.zz">Tidepool index</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'archard.zz/hypertext/craft-and-longevity',
    title: 'Handmade Hypertext: Why Small Webs Endure',
    author: '@imre_foster',
    summary: 'The tactile pleasure of hand-coded HTML links and what permanence means on the small web.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Handmade Hypertext</title></head>
<body>
  <article>
    <header>
      <p>archard.zz · hypertext · craft-and-longevity</p>
      <h1>Handmade Hypertext: Why Small Webs Endure</h1>
      <p>by <strong>@imre_foster</strong> · updated March 14, 2024 · hosted on tidepool-x220 · 1.8 KB</p>
    </header>
    <section>
      <p>The tactile pleasure of hand-coded HTML links. As long as documents link to documents with unmediated anchors, the ethos of personal <strong>gardening</strong> thrives. A resilient <strong>hypertext</strong> web requires neither cloud giants nor telemetry.</p>
      <p>I type my links by hand. Not because I am a purist — I am not — but because the act of typing makes me ask whether the link is necessary. When I reach for the keyboard to write the href, I pause. Does this connection serve the reader? Does it serve the thought?</p>
      <p>Automated link-harvesting produces quantity. Handmade linking produces quality. The difference is visible to any reader who has followed a hand-chosen link into a document that genuinely extended their understanding, versus clicking a recommendation algorithm into seventeen minutes of nothing.</p>
      <h2>What longevity requires</h2>
      <p>Small web pages survive because they make no promises they cannot keep. They do not promise updates. They do not promise community. They promise only this: the page will be here, unchanged, whenever you return. The words will mean what they meant when they were written.</p>
      <p>See: <a href="deep-time.zz/longform/geological-patience">On Deep Time and Patient Networks</a> — a meditation on what it means to build something that outlasts the platform that hosts it.</p>
      <p>Also: <a href="alder.zz/essays/tending-digital-gardens">Tending the Digital Garden</a> for the companion piece on gardening versus streaming.</p>
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'breadbox.zz/manuals/wild-yeast-html',
    title: 'Wild Yeast & Static HTML: A Manual of Domestic Crafts',
    author: '@maeve_b',
    summary: 'Treating server uptime like sourdough culture. The relationship between botanical gardening and persistent hypertext archives.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Wild Yeast & Static HTML</title></head>
<body>
  <article>
    <header>
      <p>breadbox.zz · manuals · wild-yeast-html</p>
      <h1>Wild Yeast &amp; Static HTML: A Manual of Domestic Crafts</h1>
      <p>by <strong>@maeve_b</strong> · updated February 2, 2024 · hosted on aidan-rpi-mb-02 · 5.1 KB</p>
    </header>
    <section>
      <p>Treating server uptime like sourdough culture. The relationship between botanical <strong>gardening</strong>, kitchen fermentation, and tending persistent <strong>hypertext</strong> archives. Both require quiet temperature stability and deliberate seasonal attention.</p>
      <p>My sourdough starter is called Edgar. Edgar is eleven years old. He has survived three house moves, a power outage, and one summer when I forgot about him for six weeks and had to rehabilitate him slowly back to activity with daily feedings of rye and room-temperature water.</p>
      <p>My website is also eleven years old. It has survived three hosting providers, a domain name change, and a period when I was convinced I should "professionalize" it by moving to a CMS. I rehabilitated it the same way I rehabilitated Edgar: slow, patient attention, one small thing at a time.</p>
      <h2>What fermentation teaches</h2>
      <p>Fermentation is a technology of patience. You create conditions and step back. You check, but you do not intervene constantly. The culture knows what it needs. Static HTML is the same. Write the page, link the page, serve the page. The file system does not need your help every fifteen minutes.</p>
      <p>See also: <a href="alder.zz/essays/tending-digital-gardens">Tending the Digital Garden</a> for the horticultural parallel, and <a href="mechanica.zz/quiet-machinery">Quiet Machinery: Notes on Self-Hosting</a> for the technical companion.</p>
      <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150'><rect width='200' height='150' fill='%23f0e8d8'/><text x='10' y='80' font-size='12' fill='%23666'>kitchen shelf — 2024</text></svg>" alt="kitchen shelf with jars — 2024" />
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'directory.zz/nodes/garden-rings',
    title: 'The Quiet Web Directory & Node Map (Ring #04)',
    author: '@ringmaster_j',
    summary: 'Index of 84 connected nodes organized around the philosophical motif of digital gardening. Includes federated RSS roll, mutual webrings, and bidirectional hypertext backlink manifests.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>The Quiet Web Directory</title></head>
<body>
  <main>
    <header>
      <p>directory.zz · nodes · garden-rings</p>
      <h1>The Quiet Web Directory &amp; Node Map (Ring #04)</h1>
      <p>by <strong>@ringmaster_j</strong> · updated 3 days ago · hosted on shal-cree-mini · 12.4 KB</p>
    </header>
    <section>
      <p>Index of 84 connected nodes organized around the philosophical motif of digital <strong>gardening</strong>. Includes federated RSS roll, mutual webrings, and bidirectional <strong>hypertext</strong> backlink manifests.</p>
      <p>Ring 04 is the garden ring. Its members agreed to three things: publish at least one page per season, link to at least two other ring members from each new page, and keep their pages under 15KB without minification.</p>
    </section>
    <section>
      <h2>Member nodes</h2>
      <ul>
        <li><a href="alder.zz/essays/tending-digital-gardens">alder.zz</a> — digital garden essays (Dara V)</li>
        <li><a href="archard.zz/hypertext/craft-and-longevity">archard.zz</a> — hypertext craft (Imre Foster)</li>
        <li><a href="breadbox.zz/manuals/wild-yeast-html">breadbox.zz</a> — domestic crafts &amp; static HTML (Maeve B)</li>
        <li><a href="botanyx.zz/rhizome-patterns">botanyx.zz</a> — botanical web structures (Dena R)</li>
        <li><a href="deep-time.zz/longform/geological-patience">deep-time.zz</a> — geological patience (Cole W)</li>
        <li><a href="mechanica.zz/quiet-machinery">mechanica.zz</a> — self-hosting notes (Jo S)</li>
      </ul>
    </section>
    <section>
      <h2>How to join</h2>
      <p>Add the ring navigation widget to your page, link to at least two members, and send your address to @ringmaster_j. New nodes are accepted at the spring and autumn equinoxes only.</p>
      <p>Next ring add window: September 22, 2024.</p>
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </main>
</body>
</html>`,
  },
  {
    address: 'botanyx.zz/rhizome-patterns',
    title: 'Rhizomatic Organization: Botanical Structures in Web Graphs',
    author: '@dena_roots',
    summary: 'Applying Deleuzian rhizome principles to real world greenhouse gardening and decentralized hypertext web structures.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Rhizomatic Organization</title></head>
<body>
  <article>
    <header>
      <p>botanyx.zz · rhizome-patterns</p>
      <h1>Rhizomatic Organization: Botanical Structures in Web Graphs</h1>
      <p>by <strong>@dena_roots</strong> · updated December 12, 2023 · hosted on clients-linux2 · 4.4 KB</p>
    </header>
    <section>
      <p>Applying Deleuzian rhizome principles to real world greenhouse <strong>gardening</strong>. Root systems demonstrate that decentralized <strong>hypertext</strong> cannot be severed by removing central authority nodes.</p>
      <p>Deleuze and Guattari described the rhizome as a model of culture and thought that is non-hierarchical and non-linear. Unlike a tree, which has a single root and branches outward in decreasing diameter, a rhizome spreads horizontally, connecting to itself at any point, having no beginning and no end.</p>
      <p>The small web is a rhizome. Cut one node and the links reroute around the gap. The directory at <a href="directory.zz/nodes/garden-rings">directory.zz</a> demonstrates this practically: when a member goes offline, their links remain in other members' pages, pointing patiently toward a space that may one day be reoccupied.</p>
      <h2>Structural lessons from the greenhouse</h2>
      <p>Iris rhizomes spread by horizontal extension. They do not ask permission before occupying new ground. They simply grow toward available light, connecting backward to what has already grown. The old growth feeds the new growth. Nothing is wasted.</p>
      <p>A web of handmade pages works the same way. The pages written five years ago continue to feed traffic to the pages written last week, if someone links them. The gardener at <a href="alder.zz/essays/tending-digital-gardens">alder.zz</a> describes this as cross-pollination; I prefer rhizome because it emphasizes the underground connection — the invisible link structure that makes the surface growth possible.</p>
      <p>Return to <a href="tidepool.zz">Tidepool index</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'deep-time.zz/longform/geological-patience',
    title: 'On Deep Time and Patient Networks',
    author: '@cole_w',
    summary: 'What geological time scales teach us about building networks that outlast the platforms that host them.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>On Deep Time and Patient Networks</title></head>
<body>
  <article>
    <header>
      <p>deep-time.zz · longform · geological-patience</p>
      <h1>On Deep Time and Patient Networks</h1>
      <p>by <strong>@cole_w</strong> · updated January 7, 2024 · hosted on deep-time-nuc · 7.2 KB</p>
    </header>
    <section>
      <p>Geologists think in hundreds of millions of years. When you spend enough time with sedimentary rock, human timescales begin to seem almost comically compressed. A company founded a hundred years ago is a brief disturbance in the record. A protocol designed to last fifty years is geological infancy.</p>
      <p>The small web is an experiment in what happens when you design for decades rather than quarters. Not because we expect to live forever, but because the act of designing for the long term changes what you build. You stop optimizing for the metrics of this season and start asking: what will still be readable when the tools I used to write it are long gone?</p>
      <h2>Plain text and geological time</h2>
      <p>Plain text has been readable for sixty years. It will be readable for sixty more. The same cannot be said for any proprietary format invented since 1990. HTML is an approximation of plain text that adds just enough structure to be useful without making the file unreadable in a raw editor.</p>
      <p>See: <a href="archard.zz/hypertext/craft-and-longevity">Handmade Hypertext: Why Small Webs Endure</a> for the craft perspective. And <a href="mechanica.zz/quiet-machinery">Quiet Machinery</a> for the technical perspective on running servers that survive time.</p>
      <p>The directory at <a href="directory.zz/nodes/garden-rings">directory.zz</a> attempts to be a geological record: an index of who was here, what they thought, and where they pointed.</p>
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'mechanica.zz/quiet-machinery',
    title: 'Quiet Machinery: Notes on Self-Hosting',
    author: '@jo_s',
    summary: 'Running servers on low-wattage hardware in linen closets. The ethics of quiet infrastructure.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Quiet Machinery</title></head>
<body>
  <article>
    <header>
      <p>mechanica.zz · quiet-machinery</p>
      <h1>Quiet Machinery: Notes on Self-Hosting</h1>
      <p>by <strong>@jo_s</strong> · updated April 1, 2024 · hosted on closet-node-03 · 2.8 KB</p>
    </header>
    <section>
      <p>My server is a Raspberry Pi Model 3B+ that lives in a linen closet next to a bag of buckwheat and a broken space heater. It consumes approximately 3 watts at idle. It has served pages continuously for nineteen months, except for one afternoon when a cat knocked the power strip off the shelf.</p>
      <p>I chose this life because I wanted to understand where my pages live. Not in a datacenter I've never visited, maintained by people I've never met, under terms of service I agreed to without reading. I wanted to understand the full stack: from the file on the SD card to the TCP handshake at the router to the HTML in someone's browser.</p>
      <h2>The ethics of quiet infrastructure</h2>
      <p>A server that uses 3 watts is a political statement. It says: this service does not require your attention economy. It does not need to grow. It does not need to scale. It needs only to persist, quietly, using resources proportional to the value it provides.</p>
      <p>Contrast with the cloud-hosted equivalent, which requires idle compute cycles, redundant storage, load balancers, CDN edges, monitoring dashboards, and the sustained anxiety of the SRE who wakes at 3am when the p99 latency exceeds 200ms.</p>
      <p>The closet node does not have an SRE. It has me, and I sleep fine.</p>
      <p>See: <a href="deep-time.zz/longform/geological-patience">On Deep Time and Patient Networks</a> for the long view. And <a href="breadbox.zz/manuals/wild-yeast-html">Wild Yeast &amp; Static HTML</a> for the fermentation parallel.</p>
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'lichen.zz/poems/peat',
    title: 'Specimens of the Low Mosses & Peat Soils',
    author: '@mira_sol',
    summary: 'In quiet bogs where mesh signal barely skims above the heather, the microclimate sustains both physical mosses and lingering distributed packets.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Specimens of the Low Mosses & Peat Soils</title></head>
<body>
  <article>
    <header>
      <p>lichen.zz · poems · peat · Lichen Press · Issue #09</p>
      <h1>Specimens of the Low Mosses &amp; Peat Soils</h1>
      <p>by <strong>@mira_sol</strong> · Observed: May 14, 14:22 · Verified P2P Hash</p>
    </header>
    <section>
      <p>In quiet bogs where the mesh signal barely skims above the heather, the microclimate sustains both physical mosses and lingering distributed packets. We sit upon damp planks, turning over field notebooks while the slow reader engine decrypts sixteen lines of raw plaintext from the nearest peer node.</p>
      <p>Sphagnum moss is an archive. Layer by layer, it records centuries of rain, pollen, insects, and atmospheric chemistry. A core sample taken from a deep peat bog can reconstruct the local climate of five thousand years ago with remarkable precision. The moss did not intend to preserve this record. It simply grew, and the anaerobic conditions of its own growth did the preservation.</p>
      <blockquote>"To browse without urgency is to allow thoughts to settle into peat, slowly compressing under the quiet weight of unhurried seasons."</blockquote>
      <p>Each fragment logged into your local journal is preserved as raw text on your storage cylinder. No telemetry leaves this chassis. The node table remembers only the cryptographic peers who offered their mirror cache.</p>
      <p>Small Web Ring #04: <a href="directory.zz/nodes/garden-rings">[Prev node]</a> · [Random] · <a href="alder.zz/essays/tending-digital-gardens">[Next node]</a></p>
      <p>Return to <a href="tidepool.zz">Tidepool</a>.</p>
    </section>
  </article>
</body>
</html>`,
  },
  {
    address: 'nowhere.zz/lost-island',
    title: 'Missive from an Untracked Shore',
    author: '@ghost_node',
    summary: 'A page from the void — this address resolves to nowhere. The node is silent.',
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Missive from an Untracked Shore</title></head>
<body>
  <article>
    <p>SMALL WEB DISPATCH · Leaf #084-Q</p>
    <h1>Missive from an Untracked Shore</h1>
    <p>This page was once here. The node is now silent.</p>
    <p>Dead links are not emergencies on the small web — they are simply quiet spaces awaiting care, remembrance, or a new gardener.</p>
    <blockquote>"What is absent is not gone forever; it is only unannounced."</blockquote>
    <p>Return to <a href="tidepool.zz">Tidepool</a> · <a href="directory.zz/nodes/garden-rings">Directory</a></p>
  </article>
</body>
</html>`,
  },
];

export const SEED_PEOPLE = [
  {
    id: 'alice_vance',
    name: 'Alice Vance',
    bio: 'Library archivist, tidal pool enthusiast, handmade HTML purist.',
    avatarColor: '#b8502a',
  },
  {
    id: 'bob_chen',
    name: 'Bob Chen',
    bio: 'System administrator who hosts three small web nodes in his basement.',
    avatarColor: '#5d7a4a',
  },
  {
    id: 'clara_morales',
    name: 'Clara Morales',
    bio: 'Botanist and occasional poet. Tends both actual gardens and digital ones.',
    avatarColor: '#4a6b7a',
  },
  {
    id: 'david_kim',
    name: 'David Kim',
    bio: 'Fermentation hobbyist. Found the small web through breadbox.zz.',
    avatarColor: '#7a5a2a',
  },
  {
    id: 'elena_rostova',
    name: 'Elena Rostova',
    bio: 'The most curious browser on the mesh. Visits almost everywhere.',
    avatarColor: '#5a3a6b',
  },
];

// Generates a date relative to now, offset by minutes
function minutesAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60 * 1000);
}

export const SEED_VISITS = [
  // Elena Rostova — the wide-ranging explorer (visited almost everywhere)
  { personId: 'elena_rostova', address: 'tidepool.zz', title: 'Tidepool — A QuietWeb Engine', status: 200, referrer: 'typed', visitedAt: minutesAgo(60) },
  { personId: 'elena_rostova', address: 'alder.zz/essays/tending-digital-gardens', title: 'Tending the Digital Garden', status: 200, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(57) },
  { personId: 'elena_rostova', address: 'archard.zz/hypertext/craft-and-longevity', title: 'Handmade Hypertext: Why Small Webs Endure', status: 200, referrer: 'link:alder.zz', visitedAt: minutesAgo(54) },
  { personId: 'elena_rostova', address: 'deep-time.zz/longform/geological-patience', title: 'On Deep Time and Patient Networks', status: 200, referrer: 'link:archard.zz', visitedAt: minutesAgo(50) },
  { personId: 'elena_rostova', address: 'botanyx.zz/rhizome-patterns', title: 'Rhizomatic Organization', status: 200, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(45) },
  { personId: 'elena_rostova', address: 'directory.zz/nodes/garden-rings', title: 'The Quiet Web Directory', status: 200, referrer: 'link:botanyx.zz', visitedAt: minutesAgo(40) },
  { personId: 'elena_rostova', address: 'breadbox.zz/manuals/wild-yeast-html', title: 'Wild Yeast & Static HTML', status: 200, referrer: 'link:directory.zz', visitedAt: minutesAgo(35) },
  { personId: 'elena_rostova', address: 'mechanica.zz/quiet-machinery', title: 'Quiet Machinery: Notes on Self-Hosting', status: 200, referrer: 'link:breadbox.zz', visitedAt: minutesAgo(30) },
  { personId: 'elena_rostova', address: 'lichen.zz/poems/peat', title: 'Specimens of the Low Mosses & Peat Soils', status: 200, referrer: 'typed', visitedAt: minutesAgo(22) },
  { personId: 'elena_rostova', address: 'nowhere.zz/lost-island', title: '[404] Missive from an Untracked Shore', status: 404, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(8) },

  // Alice Vance — 4-deep link trail
  { personId: 'alice_vance', address: 'tidepool.zz', title: 'Tidepool — A QuietWeb Engine', status: 200, referrer: 'typed', visitedAt: minutesAgo(55) },
  { personId: 'alice_vance', address: 'alder.zz/essays/tending-digital-gardens', title: 'Tending the Digital Garden', status: 200, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(50) },
  { personId: 'alice_vance', address: 'archard.zz/hypertext/craft-and-longevity', title: 'Handmade Hypertext: Why Small Webs Endure', status: 200, referrer: 'link:alder.zz', visitedAt: minutesAgo(45) },
  { personId: 'alice_vance', address: 'deep-time.zz/longform/geological-patience', title: 'On Deep Time and Patient Networks', status: 200, referrer: 'link:archard.zz', visitedAt: minutesAgo(38) },

  // Bob Chen — repeat visits to mechanica and tidepool
  { personId: 'bob_chen', address: 'tidepool.zz', title: 'Tidepool — A QuietWeb Engine', status: 200, referrer: 'typed', visitedAt: minutesAgo(59) },
  { personId: 'bob_chen', address: 'mechanica.zz/quiet-machinery', title: 'Quiet Machinery: Notes on Self-Hosting', status: 200, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(52) },
  { personId: 'bob_chen', address: 'breadbox.zz/manuals/wild-yeast-html', title: 'Wild Yeast & Static HTML', status: 200, referrer: 'link:mechanica.zz', visitedAt: minutesAgo(48) },
  { personId: 'bob_chen', address: 'mechanica.zz/quiet-machinery', title: 'Quiet Machinery: Notes on Self-Hosting', status: 200, referrer: 'history', visitedAt: minutesAgo(20) },
  { personId: 'bob_chen', address: 'tidepool.zz', title: 'Tidepool — A QuietWeb Engine', status: 200, referrer: 'typed', visitedAt: minutesAgo(5) },

  // Clara Morales — botanical trail
  { personId: 'clara_morales', address: 'botanyx.zz/rhizome-patterns', title: 'Rhizomatic Organization', status: 200, referrer: 'typed', visitedAt: minutesAgo(50) },
  { personId: 'clara_morales', address: 'alder.zz/essays/tending-digital-gardens', title: 'Tending the Digital Garden', status: 200, referrer: 'link:botanyx.zz', visitedAt: minutesAgo(44) },
  { personId: 'clara_morales', address: 'lichen.zz/poems/peat', title: 'Specimens of the Low Mosses & Peat Soils', status: 200, referrer: 'typed', visitedAt: minutesAgo(30) },
  { personId: 'clara_morales', address: 'directory.zz/nodes/garden-rings', title: 'The Quiet Web Directory', status: 200, referrer: 'link:lichen.zz', visitedAt: minutesAgo(18) },

  // David Kim — fermentation angle
  { personId: 'david_kim', address: 'breadbox.zz/manuals/wild-yeast-html', title: 'Wild Yeast & Static HTML', status: 200, referrer: 'typed', visitedAt: minutesAgo(58) },
  { personId: 'david_kim', address: 'alder.zz/essays/tending-digital-gardens', title: 'Tending the Digital Garden', status: 200, referrer: 'link:breadbox.zz', visitedAt: minutesAgo(50) },
  { personId: 'david_kim', address: 'tidepool.zz', title: 'Tidepool — A QuietWeb Engine', status: 200, referrer: 'typed', visitedAt: minutesAgo(35) },
  { personId: 'david_kim', address: 'nowhere.zz/lost-island', title: '[404] Node Absent', status: 404, referrer: 'link:tidepool.zz', visitedAt: minutesAgo(15) },
];
