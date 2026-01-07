import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudyGroupsList from "../components/StudyGroupsList";
import GroupDetail from "../components/GroupDetail";
import "../styles/PeerStudyGroups.css";

export default function PeerStudyGroups({ user, onLogout }) {
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // list, detail, create
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "DSA Masters",
      topic: "Data Structures & Algorithms",
      description: "Master all data structures and algorithms for interviews",
      icon: "🏗️",
      members: 24,
      active: true,
      joined: true,
      createdBy: "John Doe",
      createdDate: "2025-11-15",
      lastActive: "2 hours ago",
      memberList: [
        { id: 1, name: "You", role: "Member", joinedDate: "2025-12-01" },
        { id: 2, name: "John Doe", role: "Admin", joinedDate: "2025-11-15" },
        { id: 3, name: "Alice Smith", role: "Moderator", joinedDate: "2025-11-20" },
      ],
      discussions: [
        {
          id: 1,
          author: "Alice Smith",
          title: "Best approach for solving LeetCode 2Sum?",
          content: "What's the optimal approach to solve the two sum problem?",
          timestamp: "2 hours ago",
          replies: 5,
        },
        {
          id: 2,
          author: "John Doe",
          title: "Binary Tree Traversal Discussion",
          content: "Let's discuss different tree traversal techniques",
          timestamp: "5 hours ago",
          replies: 12,
        },
      ],
      curriculum: [
        {
          id: 1,
          name: "Arrays & Strings",
          completed: true,
          subtopics: [
            { id: 1, name: "Two Pointers Technique", completed: true, problems: 15 },
            { id: 2, name: "Sliding Window", completed: true, problems: 12 },
            { id: 3, name: "Array Manipulation", completed: true, problems: 20 },
          ]
        },
        {
          id: 2,
          name: "Linked Lists",
          completed: true,
          subtopics: [
            { id: 1, name: "Singly Linked List", completed: true, problems: 10 },
            { id: 2, name: "Doubly Linked List", completed: true, problems: 8 },
            { id: 3, name: "Circular Linked List", completed: false, problems: 6 },
          ]
        },
        {
          id: 3,
          name: "Stacks & Queues",
          completed: true,
          subtopics: [
            { id: 1, name: "Stack Implementation", completed: true, problems: 8 },
            { id: 2, name: "Queue Implementation", completed: true, problems: 7 },
            { id: 3, name: "Priority Queue", completed: true, problems: 10 },
          ]
        },
        {
          id: 4,
          name: "Trees & BST",
          completed: false,
          subtopics: [
            { id: 1, name: "Binary Tree Basics", completed: true, problems: 15 },
            { id: 2, name: "Binary Search Tree", completed: true, problems: 12 },
            { id: 3, name: "Tree Traversals", completed: false, problems: 10 },
            { id: 4, name: "Balanced Trees (AVL)", completed: false, problems: 8 },
          ]
        },
        {
          id: 5,
          name: "Graphs",
          completed: false,
          subtopics: [
            { id: 1, name: "Graph Representation", completed: true, problems: 8 },
            { id: 2, name: "BFS & DFS", completed: false, problems: 15 },
            { id: 3, name: "Shortest Path Algorithms", completed: false, problems: 12 },
            { id: 4, name: "Minimum Spanning Tree", completed: false, problems: 10 },
          ]
        },
        {
          id: 6,
          name: "Dynamic Programming",
          completed: false,
          subtopics: [
            { id: 1, name: "1D DP Problems", completed: false, problems: 20 },
            { id: 2, name: "2D DP Problems", completed: false, problems: 18 },
            { id: 3, name: "DP on Strings", completed: false, problems: 15 },
          ]
        },
        {
          id: 7,
          name: "Sorting & Searching",
          completed: true,
          subtopics: [
            { id: 1, name: "Comparison Sorting", completed: true, problems: 10 },
            { id: 2, name: "Binary Search", completed: true, problems: 15 },
            { id: 3, name: "Search in Rotated Array", completed: true, problems: 8 },
          ]
        },
        {
          id: 8,
          name: "Hashing",
          completed: true,
          subtopics: [
            { id: 1, name: "Hash Tables", completed: true, problems: 12 },
            { id: 2, name: "Hash Maps & Sets", completed: true, problems: 15 },
          ]
        },
      ],
      progress: {
        topicsCompleted: 8,
        totalTopics: 15,
        averageMemberProgress: 53,
      },
    },
    {
      id: 2,
      name: "DBMS Study Buddies",
      topic: "Database Management Systems",
      description: "Collaborative learning for DBMS concepts and SQL optimization",
      icon: "🗄️",
      members: 18,
      active: true,
      joined: false,
      createdBy: "Sarah Johnson",
      createdDate: "2025-12-01",
      lastActive: "1 hour ago",
      memberList: [
        { id: 1, name: "Sarah Johnson", role: "Admin", joinedDate: "2025-12-01" },
        { id: 2, name: "Bob Wilson", role: "Moderator", joinedDate: "2025-12-05" },
      ],
      discussions: [
        {
          id: 1,
          author: "Bob Wilson",
          title: "SQL Query Optimization Tips",
          content: "Share your best SQL optimization techniques",
          timestamp: "3 hours ago",
          replies: 8,
        },
      ],
      progress: {
        topicsCompleted: 5,
        totalTopics: 12,
        averageMemberProgress: 42,
      },
    },
    {
      id: 3,
      name: "System Design Bootcamp",
      topic: "System Design",
      description: "Practice system design problems and learn scalable architecture",
      icon: "🏗️",
      members: 32,
      active: true,
      joined: false,
      createdBy: "Mike Chen",
      createdDate: "2025-11-10",
      lastActive: "30 minutes ago",
      memberList: [
        { id: 1, name: "Mike Chen", role: "Admin", joinedDate: "2025-11-10" },
      ],
      discussions: [],
      progress: {
        topicsCompleted: 12,
        totalTopics: 20,
        averageMemberProgress: 60,
      },
    },
    {
      id: 4,
      name: "Operating Systems Learning Hub",
      topic: "Operating Systems",
      description: "Deep dive into OS concepts, processes, and memory management",
      icon: "⚙️",
      members: 15,
      active: true,
      joined: false,
      createdBy: "Emma Davis",
      createdDate: "2025-11-25",
      lastActive: "4 hours ago",
      memberList: [],
      discussions: [],
      progress: {
        topicsCompleted: 3,
        totalTopics: 10,
        averageMemberProgress: 30,
      },
    },
  ]);

  const [formData, setFormData] = useState({
    groupName: "",
    topic: "",
    description: "",
  });

  const handleViewGroup = (group) => {
    console.log("🔥🔥🔥 handleViewGroup called with:", group);
    // Find the most up-to-date version of the group
    const currentGroup = groups.find(g => g.id === group.id);
    console.log("🔥🔥🔥 Found current group:", currentGroup);
    console.log("🔥🔥🔥 About to set selectedGroup and view to detail");
    setSelectedGroup(currentGroup || group);
    setView("detail");
    console.log("🔥🔥🔥 State updates called!");
  };

  const handleJoinGroup = (groupId) => {
    const updatedGroups = groups.map((g) => {
      if (g.id === groupId) {
        // Add current user to member list
        const newMember = {
          id: g.memberList.length + 1,
          name: user?.name || "You",
          role: "Member",
          joinedDate: new Date().toISOString().split("T")[0],
        };
        return {
          ...g,
          joined: true,
          members: g.members + 1,
          memberList: [...g.memberList, newMember],
        };
      }
      return g;
    });
    setGroups(updatedGroups);
    
    // Update selected group if viewing it
    if (selectedGroup && selectedGroup.id === groupId) {
      const updatedGroup = updatedGroups.find(g => g.id === groupId);
      setSelectedGroup(updatedGroup);
    }
    
    alert("Successfully joined the group!");
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!formData.groupName || !formData.topic || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    const newGroup = {
      id: Math.max(...groups.map((g) => g.id)) + 1,
      name: formData.groupName,
      topic: formData.topic,
      description: formData.description,
      icon: "📚",
      members: 1,
      active: true,
      joined: true,
      createdBy: user?.name || "You",
      createdDate: new Date().toISOString().split("T")[0],
      lastActive: "now",
      memberList: [{ id: 1, name: user?.name || "You", role: "Admin", joinedDate: new Date().toISOString().split("T")[0] }],
      discussions: [],
      progress: {
        topicsCompleted: 0,
        totalTopics: 10,
        averageMemberProgress: 0,
      },
    };

    setGroups([...groups, newGroup]);
    setFormData({ groupName: "", topic: "", description: "" });
    alert("Group created successfully!");
    setView("list");
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="peer-study-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h1>👥 Peer Study Groups</h1>

        {view === "list" && (
          <>
            <div className="view-controls">
              <button
                className="view-btn active"
                onClick={() => setView("list")}
              >
                📋 My Groups & Browse
              </button>
              <button className="view-btn" onClick={() => setView("create")}>
                ➕ Create New Group
              </button>
            </div>

            <StudyGroupsList
              groups={groups}
              onViewGroup={handleViewGroup}
              onJoinGroup={handleJoinGroup}
            />
          </>
        )}

        {view === "detail" && selectedGroup ? (
          <div>
            <GroupDetail
              group={selectedGroup}
              onBack={() => {
                console.log("Back button clicked");
                setView("list");
                setSelectedGroup(null);
              }}
              onJoinGroup={() => {
                console.log("Join button clicked for group:", selectedGroup.id);
                handleJoinGroup(selectedGroup.id);
              }}
            />
          </div>
        ) : view === "detail" && !selectedGroup ? (
          <div style={{padding: '40px', textAlign: 'center'}}>
            <p>No group selected. Please go back and select a group.</p>
            <button className="back-button" onClick={() => setView("list")}>
              ← Back to Groups
            </button>
          </div>
        ) : null}

        {view === "create" && (
          <div className="create-group-container">
            <h2>Create a New Study Group</h2>
            <form onSubmit={handleCreateGroup} className="create-group-form">
              <div className="form-group">
                <label>Group Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Advanced DSA Learners"
                  value={formData.groupName}
                  onChange={(e) =>
                    setFormData({ ...formData, groupName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Topic *</label>
                <select
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                >
                  <option value="">Select a topic</option>
                  <option value="Data Structures & Algorithms">
                    Data Structures & Algorithms
                  </option>
                  <option value="Database Management Systems">
                    Database Management Systems
                  </option>
                  <option value="System Design">System Design</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  placeholder="Describe your study group's goals and focus areas..."
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="create-btn">
                  Create Group
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setView("list")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
