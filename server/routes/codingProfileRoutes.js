const express = require("express");
const https = require("https");
const http = require("http");
const router = express.Router();

// Helper function to make HTTPS/HTTP requests
const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const isHttp = options.protocol === "http" || options.protocol === "http:";
    const protocol = isHttp ? http : https;
    const requestOptions = {
      hostname: options.hostname,
      path: options.path,
      method: options.method || "GET",
      timeout: options.timeout || 5000,
      headers: options.headers || {}
    };
    
    protocol.request(requestOptions, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({ data, statusCode: res.statusCode });
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", (err) => {
      reject(err);
    }).end();
  });
};

// Extract username from profile URL
const extractUsernameFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes("codeforces.com")) {
      const match = urlObj.pathname.match(/\/profile\/([^/]+)/);
      return match ? { platform: "codeforces", username: match[1] } : null;
    }
    if (hostname.includes("codechef.com")) {
      const match = urlObj.pathname.match(/\/users\/([^/]+)/);
      return match ? { platform: "codechef", username: match[1] } : null;
    }
    if (hostname.includes("leetcode.com")) {
      const match = urlObj.pathname.match(/\/u\/([^/]+)/);
      return match ? { platform: "leetcode", username: match[1] } : null;
    }
    if (hostname.includes("linkedin.com")) {
      const match = urlObj.pathname.match(/\/in\/([^/]+)/);
      return match ? { platform: "linkedin", username: match[1] } : null;
    }
    if (hostname.includes("codeio") || hostname.includes("codio")) {
      const match = urlObj.pathname.match(/\/([^/]+)/);
      return match ? { platform: "codio", username: match[1] } : null;
    }
  } catch (e) {
    return null;
  }
};

// Fetch Codeforces profile
const fetchCodeforcesProfile = async (username) => {
  try {
    const options = {
      hostname: "codeforces.com",
      path: `/api/user.info?handles=${username}`,
      method: "GET",
      timeout: 5000
    };

    const result = await makeRequest(options);
    const data = JSON.parse(result.data);

    if (data.status === "OK" && data.result && data.result.length > 0) {
      const user = data.result[0];
      return {
        success: true,
        data: {
          platform: "Codeforces",
          handle: user.handle,
          name: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : username,
          rating: user.rating || 0,
          maxRating: user.maxRating || 0,
          rank: user.rank || "Unranked",
          maxRank: user.maxRank || "Unranked",
          avatar: user.avatar || "",
          contributions: user.contribution || 0,
          profile_url: `https://codeforces.com/profile/${user.handle}`
        }
      };
    } else {
      return { success: false, message: "Codeforces user not found" };
    }
  } catch (error) {
    return { success: false, message: `Error fetching Codeforces data: ${error.message}` };
  }
};

router.get("/codeforces/:username", async (req, res) => {
  const result = await fetchCodeforcesProfile(req.params.username);
  return res.json(result);
});

// Fetch Codechef profile
const fetchCodechefProfile = async (username) => {
  try {
    const options = {
      hostname: "codechef.com",
      path: `/api/users/${username}`,
      method: "GET",
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    };

    const result = await makeRequest(options);
    const data = JSON.parse(result.data);

    if (data && data.name) {
      return {
        success: true,
        data: {
          platform: "CodeChef",
          handle: data.name || username,
          name: data.name || username,
          rating: data.currentRating || 0,
          maxRating: data.highestRating || 0,
          rank: data.globalRank || "Unranked",
          country: data.countryName || "Unknown",
          profile_url: `https://www.codechef.com/users/${data.name}`
        }
      };
    } else {
      return { success: false, message: "CodeChef user not found" };
    }
  } catch (error) {
    return { success: false, message: `Error fetching CodeChef data: ${error.message}` };
  }
};

router.get("/codechef/:username", async (req, res) => {
  const result = await fetchCodechefProfile(req.params.username);
  return res.json(result);
});

// Fetch LeetCode profile
const fetchLeetcodeProfile = async (username) => {
  try {
    const options = {
      hostname: "leetcode.com",
      path: `/api/users/${username}/`,
      method: "GET",
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    };

    const result = await makeRequest(options);
    
    if (result.statusCode !== 200) {
      return { success: false, message: "LeetCode user not found" };
    }

    const data = JSON.parse(result.data);

    if (data && data.username) {
      return {
        success: true,
        data: {
          platform: "LeetCode",
          handle: data.username,
          name: data.name || data.username,
          real_name: data.real_name || "",
          bio: data.bio || "",
          avatar: data.avatar || "",
          profile_url: `https://leetcode.com/u/${data.username}`
        }
      };
    } else {
      return { success: false, message: "LeetCode user not found" };
    }
  } catch (error) {
    return { success: false, message: `Error fetching LeetCode data: ${error.message}` };
  }
};

router.get("/leetcode/:username", async (req, res) => {
  const result = await fetchLeetcodeProfile(req.params.username);
  return res.json(result);
});

// Fetch LinkedIn profile (basic public info)
const fetchLinkedInProfile = async (username) => {
  try {
    // LinkedIn doesn't provide a public API, so we'll return a message
    return {
      success: true,
      data: {
        platform: "LinkedIn",
        handle: username,
        profile_url: `https://www.linkedin.com/in/${username}/`,
        message: "LinkedIn profile link stored. Note: LinkedIn data cannot be automatically fetched due to API restrictions."
      }
    };
  } catch (error) {
    return { success: false, message: `Error processing LinkedIn profile: ${error.message}` };
  }
};

router.get("/linkedin/:username", async (req, res) => {
  const result = await fetchLinkedInProfile(req.params.username);
  return res.json(result);
});

// Fetch Codio profile
const fetchCodioProfile = async (username) => {
  try {
    // Codio API endpoint (if available)
    const options = {
      hostname: "codio.com",
      path: `/api/users/${username}`,
      method: "GET",
      timeout: 5000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    };

    const result = await makeRequest(options);
    const data = JSON.parse(result.data);

    if (data && data.username) {
      return {
        success: true,
        data: {
          platform: "Codio",
          handle: data.username || username,
          name: data.name || username,
          profile_url: `https://codio.com/users/${username}`
        }
      };
    } else {
      return { success: false, message: "Codio user not found" };
    }
  } catch (error) {
    return { success: false, message: `Error fetching Codio data: ${error.message}` };
  }
};

router.get("/codio/:username", async (req, res) => {
  const result = await fetchCodioProfile(req.params.username);
  return res.json(result);
});

// Universal profile fetcher by URL
router.post("/profile-from-url", async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ success: false, message: "URL is required" });
    }

    const extracted = extractUsernameFromUrl(url);
    if (!extracted) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid URL. Supported platforms: CodeForces, CodeChef, LeetCode, LinkedIn, Codio" 
      });
    }

    const { platform, username } = extracted;
    
    let result;
    if (platform === "codeforces") {
      result = await fetchCodeforcesProfile(username);
    } else if (platform === "codechef") {
      result = await fetchCodechefProfile(username);
    } else if (platform === "leetcode") {
      result = await fetchLeetcodeProfile(username);
    } else if (platform === "linkedin") {
      result = await fetchLinkedInProfile(username);
    } else if (platform === "codio") {
      result = await fetchCodioProfile(username);
    }

    return res.json(result);
  } catch (error) {
    console.error("Profile extraction error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Error extracting profile: " + error.message 
    });
  }
});

module.exports = router;
