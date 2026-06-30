import { FilePath, FullSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

interface BookGraphOptions {
  folder: string
  similarityThreshold: number
  maxEdgesPerNode: number
  slug: string
}

const defaultOptions: BookGraphOptions = {
  folder: "3-resources/books",
  similarityThreshold: 0.15,
  maxEdgesPerNode: 5,
  slug: "books/graph",
}

interface BookNode {
  id: string
  title: string
  author: string
  tags: string[]
  slug: string
}

interface BookEdge {
  source: string
  target: string
  weight: number
}

interface BookGraphData {
  nodes: BookNode[]
  edges: BookEdge[]
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

function computeTfIdf(documents: string[][]): number[][] {
  const docCount = documents.length
  const vocabulary = new Map<string, number>()

  // Build vocabulary
  for (const doc of documents) {
    const seen = new Set<string>()
    for (const token of doc) {
      if (!vocabulary.has(token)) {
        vocabulary.set(token, vocabulary.size)
      }
      seen.add(token)
    }
  }

  // Compute document frequency for each term
  const docFrequency = new Array(vocabulary.size).fill(0)
  for (const doc of documents) {
    const seen = new Set<string>()
    for (const token of doc) {
      if (!seen.has(token)) {
        docFrequency[vocabulary.get(token)!]++
        seen.add(token)
      }
    }
  }

  // Compute TF-IDF vectors
  const vectors: number[][] = []
  for (const doc of documents) {
    const vector = new Array(vocabulary.size).fill(0)
    const termCounts = new Map<string, number>()

    for (const token of doc) {
      termCounts.set(token, (termCounts.get(token) ?? 0) + 1)
    }

    for (const [term, count] of termCounts) {
      const idx = vocabulary.get(term)!
      const tf = count / doc.length
      const idf = Math.log(docCount / (1 + docFrequency[idx]))
      vector[idx] = tf * idf
    }

    vectors.push(vector)
  }

  return vectors
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  if (denominator === 0) return 0
  return dotProduct / denominator
}

function buildGraphData(
  books: { title: string; author: string; tags: string[]; slug: string; text: string }[],
  options: BookGraphOptions,
): BookGraphData {
  // Combine text content with tags for richer signal
  const documents = books.map((book) => {
    const tagText = book.tags.join(" ").repeat(3) // Boost tag weight
    const authorText = book.author.repeat(2) // Boost author weight
    return tokenize(`${book.title} ${authorText} ${tagText} ${book.text}`)
  })

  const vectors = computeTfIdf(documents)

  const nodes: BookNode[] = books.map((book) => ({
    id: book.slug,
    title: book.title,
    author: book.author,
    tags: book.tags,
    slug: book.slug,
  }))

  // Compute pairwise similarity and build edges
  const edges: BookEdge[] = []
  const edgeCounts = new Map<string, number>()

  // Collect all candidate edges with their weights
  const candidates: BookEdge[] = []
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const similarity = cosineSimilarity(vectors[i], vectors[j])
      if (similarity >= options.similarityThreshold) {
        candidates.push({
          source: books[i].slug,
          target: books[j].slug,
          weight: Math.round(similarity * 1000) / 1000,
        })
      }
    }
  }

  // Sort by weight descending, then apply maxEdgesPerNode constraint
  candidates.sort((a, b) => b.weight - a.weight)
  for (const edge of candidates) {
    const sourceCount = edgeCounts.get(edge.source) ?? 0
    const targetCount = edgeCounts.get(edge.target) ?? 0

    if (sourceCount < options.maxEdgesPerNode && targetCount < options.maxEdgesPerNode) {
      edges.push(edge)
      edgeCounts.set(edge.source, sourceCount + 1)
      edgeCounts.set(edge.target, targetCount + 1)
    }
  }

  return { nodes, edges }
}

export const BookGraph: QuartzEmitterPlugin<Partial<BookGraphOptions>> = (opts) => {
  const options = { ...defaultOptions, ...opts }

  return {
    name: "BookGraph",
    async *emit(ctx, content) {
      const books: { title: string; author: string; tags: string[]; slug: string; text: string }[] =
        []

      for (const [_tree, file] of content) {
        const slug = file.data.slug!
        const simpleSlug = simplifySlug(slug)

        if (!simpleSlug.startsWith(options.folder)) continue

        const frontmatter = file.data.frontmatter
        if (frontmatter?.type !== "book") continue

        books.push({
          title: frontmatter.title ?? simpleSlug.split("/").pop() ?? "",
          author: (frontmatter.author as string) ?? "Unknown",
          tags: (frontmatter.tags as string[]) ?? [],
          slug: simpleSlug,
          text: file.data.text ?? "",
        })
      }

      if (books.length === 0) return

      const graphData = buildGraphData(books, options)

      // Write the graph data as JSON
      const jsonSlug = joinSegments("static", "bookGraph") as FullSlug
      yield write({
        ctx,
        content: JSON.stringify(graphData),
        slug: jsonSlug,
        ext: ".json",
      })

      // Write the HTML page for the graph
      const pageContent = generateGraphPage(ctx.cfg.configuration.baseUrl ?? "")
      yield write({
        ctx,
        content: pageContent,
        slug: options.slug as FullSlug,
        ext: ".html",
      })
    },
  }
}

function generateGraphPage(baseUrl: string): string {
  // Use relative paths so it works both locally and on GitHub Pages
  const basePath = ""
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Book Similarity Graph</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      overflow: hidden;
    }
    #graph-container {
      width: 100vw;
      height: 100vh;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 16px 24px;
      background: linear-gradient(180deg, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0) 100%);
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .header h1 {
      font-size: 1.2rem;
      font-weight: 600;
    }
    .header a {
      color: #7b97aa;
      text-decoration: none;
      font-size: 0.85rem;
    }
    .header a:hover { text-decoration: underline; }
    .legend {
      position: fixed;
      bottom: 16px;
      left: 16px;
      background: rgba(26,26,46,0.9);
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.75rem;
      z-index: 10;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .tooltip {
      position: fixed;
      background: rgba(26,26,46,0.95);
      border: 1px solid #7b97aa;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 20;
      max-width: 250px;
    }
    .tooltip.visible { opacity: 1; }
    .tooltip .title { font-weight: 600; margin-bottom: 2px; }
    .tooltip .author { color: #7b97aa; font-size: 0.75rem; }
    .tooltip .tags { color: #84a59d; font-size: 0.7rem; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <a href="../">← Home</a>
    <h1>Book Similarity Graph</h1>
  </div>
  <div id="graph-container"></div>
  <div class="legend" id="legend"></div>
  <div class="tooltip" id="tooltip">
    <div class="title"></div>
    <div class="author"></div>
    <div class="tags"></div>
  </div>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script>
    const TAG_COLORS = {
      'fiction': '#e63946',
      'novel': '#e63946',
      'non-fiction': '#2a9d8f',
      'self-help': '#e9c46a',
      'science': '#219ebc',
      'history': '#f4a261',
      'business': '#06d6a0',
      'philosophy': '#8338ec',
      'travel': '#fb8500',
      'politics': '#d62828',
      'economics': '#06d6a0',
      'biography': '#f77f00',
      'technology': '#4cc9f0',
      'finance': '#2a9d8f',
      'default': '#7b97aa'
    };

    function getNodeColor(tags) {
      for (const tag of tags) {
        const lower = tag.toLowerCase();
        if (TAG_COLORS[lower]) return TAG_COLORS[lower];
      }
      return TAG_COLORS['default'];
    }

    async function init() {
      const response = await fetch('../static/bookGraph.json');
      const data = await response.json();

      const container = document.getElementById('graph-container');
      const width = container.clientWidth;
      const height = container.clientHeight;
      const tooltip = document.getElementById('tooltip');

      // Build legend from tags present in data
      const tagSet = new Set();
      data.nodes.forEach(n => n.tags.forEach(t => tagSet.add(t.toLowerCase())));
      const legend = document.getElementById('legend');
      for (const tag of [...tagSet].sort()) {
        const color = TAG_COLORS[tag] || TAG_COLORS['default'];
        legend.innerHTML += '<div class="legend-item"><div class="legend-dot" style="background:' + color + '"></div>' + tag + '</div>';
      }

      const svg = d3.select('#graph-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const g = svg.append('g');

      // Zoom behavior
      svg.call(d3.zoom()
        .scaleExtent([0.3, 4])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
      );

      // Build link index for quick lookup
      const linkedNodes = new Set();
      const links = data.edges.map(e => ({
        source: e.source,
        target: e.target,
        weight: e.weight
      }));
      links.forEach(l => { linkedNodes.add(l.source); linkedNodes.add(l.target); });

      // Only show nodes that have at least one edge
      const connectedNodes = data.nodes.filter(n => linkedNodes.has(n.id));

      const simulation = d3.forceSimulation(connectedNodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(d => 150 * (1 - d.weight)))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(30));

      const link = g.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', '#4a4a6a')
        .attr('stroke-opacity', d => d.weight)
        .attr('stroke-width', d => 1 + d.weight * 3);

      const node = g.append('g')
        .selectAll('circle')
        .data(connectedNodes)
        .join('circle')
        .attr('r', d => {
          const edgeCount = links.filter(l => l.source.id === d.id || l.target.id === d.id).length;
          return 5 + edgeCount * 2;
        })
        .attr('fill', d => getNodeColor(d.tags))
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .attr('cursor', 'pointer')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
        );

      const label = g.append('g')
        .selectAll('text')
        .data(connectedNodes)
        .join('text')
        .text(d => d.title.length > 25 ? d.title.slice(0, 22) + '...' : d.title)
        .attr('font-size', '9px')
        .attr('fill', '#ccc')
        .attr('text-anchor', 'middle')
        .attr('dy', d => {
          const edgeCount = links.filter(l => l.source.id === d.id || l.target.id === d.id).length;
          return -(8 + edgeCount * 2);
        });

      node.on('mouseover', (event, d) => {
        tooltip.querySelector('.title').textContent = d.title;
        tooltip.querySelector('.author').textContent = 'by ' + d.author;
        tooltip.querySelector('.tags').textContent = d.tags.join(', ');
        tooltip.style.left = (event.clientX + 12) + 'px';
        tooltip.style.top = (event.clientY - 12) + 'px';
        tooltip.classList.add('visible');

        // Highlight connected
        const connected = new Set();
        links.forEach(l => {
          if (l.source.id === d.id) connected.add(l.target.id);
          if (l.target.id === d.id) connected.add(l.source.id);
        });
        connected.add(d.id);

        node.attr('opacity', n => connected.has(n.id) ? 1 : 0.2);
        link.attr('opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.05);
        label.attr('opacity', n => connected.has(n.id) ? 1 : 0.1);
      });

      node.on('mouseout', () => {
        tooltip.classList.remove('visible');
        node.attr('opacity', 1);
        link.attr('opacity', d => d.weight);
        label.attr('opacity', 1);
      });

      node.on('click', (event, d) => {
        window.location.href = '../' + d.slug;
      });

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
        label
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      });

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }

    init();
  </script>
</body>
</html>`
}

const STOP_WORDS = new Set([
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over",
  "think", "also", "back", "after", "use", "two", "how", "our", "work",
  "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "was", "were", "been", "has", "had", "are",
  "is", "did", "does", "more", "very", "much", "own", "should", "being",
  "those", "may", "each", "still", "such", "here", "both", "between",
  "while", "where", "every", "through", "too", "same", "before", "must",
  "down", "long", "made", "many", "off", "always", "never", "let", "again",
  "why", "once", "under", "last", "might", "old", "great", "right", "man",
  "little", "world", "thing", "life", "don", "didn", "doesn", "won", "isn",
  "wasn", "weren", "shouldn", "wouldn", "couldn", "ain", "aren", "hasn",
  "haven", "hadn", "that", "what", "which", "who", "whom", "when", "where",
  "will", "shall", "than", "that", "you", "your", "yours", "yourself",
])
