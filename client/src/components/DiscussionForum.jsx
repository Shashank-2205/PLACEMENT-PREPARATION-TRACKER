import { useState } from "react";

export default function DiscussionForum({ discussions, groupId }) {
  const [newDiscussion, setNewDiscussion] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [expandedThread, setExpandedThread] = useState(null);
  const [threadReplies, setThreadReplies] = useState({});
  const [replyText, setReplyText] = useState("");

  const handleStartDiscussion = () => {
    if (!newTitle.trim() || !newDiscussion.trim()) {
      alert("Please fill in both title and content");
      return;
    }
    alert(`Discussion "${newTitle}" posted!`);
    setNewTitle("");
    setNewDiscussion("");
  };

  const handleAddReply = (threadId) => {
    if (!replyText.trim()) {
      alert("Please write a reply");
      return;
    }
    
    const newReply = {
      id: Date.now(),
      author: "You",
      content: replyText,
      timestamp: "now",
    };
    
    setThreadReplies(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newReply]
    }));
    
    setReplyText("");
    alert("Reply posted successfully!");
  };

  return (
    <div className="discussion-forum">
      {/* Start New Discussion */}
      <div className="start-discussion-box">
        <h3>Start a New Discussion</h3>
        <input
          type="text"
          placeholder="Discussion title..."
          className="discussion-input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Share your thoughts, questions, or insights with the group..."
          className="discussion-textarea"
          rows="3"
          value={newDiscussion}
          onChange={(e) => setNewDiscussion(e.target.value)}
        />
        <button className="post-btn" onClick={handleStartDiscussion}>
          Post Discussion
        </button>
      </div>

      {/* Discussions List */}
      <div className="discussions-container">
        <h3>Recent Discussions ({discussions.length})</h3>

        {discussions.length > 0 ? (
          <div className="discussions-list">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="discussion-thread">
                <div className="thread-header">
                  <h4>{discussion.title}</h4>
                  <span className="reply-count">💬 {discussion.replies} replies</span>
                </div>

                <div className="thread-meta">
                  <span className="author">By <strong>{discussion.author}</strong></span>
                  <span className="timestamp">{discussion.timestamp}</span>
                </div>

                <p className="thread-preview">{discussion.content}</p>

                <button
                  className="expand-thread-btn"
                  onClick={() => setExpandedThread(expandedThread === discussion.id ? null : discussion.id)}
                >
                  {expandedThread === discussion.id ? "Hide Replies ▲" : "View Replies ▼"}
                </button>

                {/* Expanded Thread View */}
                {expandedThread === discussion.id && (
                  <div className="expanded-thread">
                    <div className="thread-content">
                      <div className="original-post">
                        <h5>{discussion.author}</h5>
                        <p>{discussion.content}</p>
                        <span className="post-time">{discussion.timestamp}</span>
                      </div>

                      {/* Replies */}
                      {threadReplies[discussion.id] && threadReplies[discussion.id].length > 0 && (
                        <div className="replies-section">
                          <h5>Replies ({threadReplies[discussion.id].length})</h5>
                          {threadReplies[discussion.id].map((reply) => (
                            <div key={reply.id} className="reply">
                              <strong>{reply.author}</strong>
                              <p>{reply.content}</p>
                              <span className="reply-time">{reply.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="reply-input-section">
                        <textarea
                          placeholder="Write a reply..."
                          className="reply-textarea"
                          rows="2"
                          value={expandedThread === discussion.id ? replyText : ""}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          className="reply-submit-btn"
                          onClick={() => handleAddReply(discussion.id)}
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-discussions">
            <p>No discussions yet. Be the first to start one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
