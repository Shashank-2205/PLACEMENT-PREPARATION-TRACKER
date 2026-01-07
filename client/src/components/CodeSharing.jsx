import { useState } from "react";

export default function CodeSharing({ groupId }) {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [sharedCode, setSharedCode] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([
    {
      id: 1,
      author: "Priya Kumar",
      language: "python",
      title: "Efficient Merge Sort Implementation",
      code: "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)",
      timestamp: "2 hours ago",
      likes: 5,
      liked: false,
    },
    {
      id: 2,
      author: "Arjun Singh",
      language: "javascript",
      title: "Binary Search Tree Insert",
      code: "class Node {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nfunction insert(node, val) {\n  if (val < node.val) {\n    node.left = node.left ? insert(node.left, val) : new Node(val);\n  } else {\n    node.right = node.right ? insert(node.right, val) : new Node(val);\n  }\n  return node;\n}",
      timestamp: "4 hours ago",
      likes: 3,
      liked: false,
    },
    {
      id: 3,
      author: "Neha Patel",
      language: "java",
      title: "LRU Cache Implementation",
      code: "class LRUCache {\n    private Map<Integer, Integer> cache;\n    private int capacity;\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {\n            protected boolean removeEldestEntry(Map.Entry eldest) {\n                return size() > capacity;\n            }\n        };\n    }\n}",
      timestamp: "1 day ago",
      likes: 8,
      liked: false,
    },
  ]);

  const languages = [
    { value: "python", label: "🐍 Python", color: "#3776ab" },
    { value: "javascript", label: "🟨 JavaScript", color: "#f7df1e" },
    { value: "java", label: "☕ Java", color: "#007396" },
    { value: "cpp", label: "⚙️ C++", color: "#00599c" },
    { value: "sql", label: "🗄️ SQL", color: "#336791" },
  ];

  const handleShareCode = () => {
    if (!sharedCode.trim()) {
      alert("Please write some code to share!");
      return;
    }

    const newSnippet = {
      id: codeSnippets.length + 1,
      author: "You",
      language: selectedLanguage,
      title: `Code snippet in ${selectedLanguage}`,
      code: sharedCode,
      timestamp: "now",
      likes: 0,
      liked: false,
    };

    setCodeSnippets([newSnippet, ...codeSnippets]);
    setSharedCode("");
    alert("Code shared successfully!");
  };

  const handleLike = (snippetId) => {
    setCodeSnippets(
      codeSnippets.map((snippet) =>
        snippet.id === snippetId
          ? {
              ...snippet,
              liked: !snippet.liked,
              likes: snippet.liked ? snippet.likes - 1 : snippet.likes + 1,
            }
          : snippet
      )
    );
  };

  return (
    <div className="code-sharing">
      {/* Share Code Section */}
      <div className="share-code-section">
        <h3>Share Code with Your Group</h3>

        <div className="language-selector">
          <label>Select Language:</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Paste your code here..."
          className="code-editor"
          rows="8"
          value={sharedCode}
          onChange={(e) => setSharedCode(e.target.value)}
          style={{ fontFamily: "monospace" }}
        />

        <button className="share-code-btn" onClick={handleShareCode}>
          📤 Share Code
        </button>
      </div>

      {/* Code Snippets Library */}
      <div className="code-snippets-library">
        <h3>Shared Code Snippets ({codeSnippets.length})</h3>

        {codeSnippets.length > 0 ? (
          <div className="snippets-grid">
            {codeSnippets.map((snippet) => {
              const langInfo = languages.find((l) => l.value === snippet.language);
              return (
                <div key={snippet.id} className="code-snippet-card">
                  <div className="snippet-header">
                    <div>
                      <h4>{snippet.title}</h4>
                      <p className="snippet-author">
                        By <strong>{snippet.author}</strong> • {snippet.timestamp}
                      </p>
                    </div>
                    <span
                      className="language-badge"
                      style={{ backgroundColor: langInfo?.color }}
                    >
                      {langInfo?.label.split(" ")[1]}
                    </span>
                  </div>

                  <pre className="code-content">
                    <code>{snippet.code}</code>
                  </pre>

                  <div className="snippet-footer">
                    <button
                      className={`like-btn ${snippet.liked ? "liked" : ""}`}
                      onClick={() => handleLike(snippet.id)}
                    >
                      {snippet.liked ? "❤️" : "🤍"} {snippet.likes}
                    </button>
                    <button 
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(snippet.code);
                        alert("Code copied to clipboard!");
                      }}
                    >
                      📋 Copy
                    </button>
                    <button 
                      className="use-btn"
                      onClick={() => {
                        setSharedCode(snippet.code);
                        setSelectedLanguage(snippet.language);
                        alert("Code loaded into editor!");
                      }}
                    >
                      ✨ Use This
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-snippets">
            <p>No code snippets shared yet. Share your code to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
