# Quick Test Guide - Profile Extraction

## Step 1: Start Your Backend Server
```bash
cd server
npm start
```
Wait for "Server running on port 5000" message

## Step 2: Start Your Frontend (in new terminal)
```bash
cd client
npm run dev
```
Access at http://localhost:5175

## Step 3: Test the Profile Extraction

### Method 1: Using the Home Page
1. Click "Personal Information" section to expand it
2. Paste this CodeForces profile URL:
   ```
   https://codeforces.com/profile/tourist
   ```
3. Click "Extract" button
4. You should see the profile data appear below with:
   - Handle: tourist
   - Rating, Max Rating, Rank, etc.

### Method 2: Using cURL (for debugging)
```bash
curl -X POST http://localhost:5000/api/coding-profile/profile-from-url \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"https://codeforces.com/profile/tourist\"}"
```

### Method 3: Using Postman
- Method: POST
- URL: http://localhost:5000/api/coding-profile/profile-from-url
- Body (JSON):
  ```json
  {
    "url": "https://codeforces.com/profile/tourist"
  }
  ```

## Test URLs by Platform

### CodeForces
- URL: https://codeforces.com/profile/tourist
- Expected: Rating, Rank, Avatar

### CodeChef  
- URL: https://www.codechef.com/users/gennady
- Expected: Rating, Country, Rank

### LeetCode
- URL: https://leetcode.com/u/lcuser/
- Expected: Username, Name, Bio

### LinkedIn
- URL: https://www.linkedin.com/in/satya-nadella/
- Expected: Profile link stored (API restrictions noted)

## Troubleshooting

### No data appearing after clicking Extract?
1. Check browser console (F12 > Console tab) for errors
2. Check Network tab to see if request succeeded
3. Check server terminal for any error messages
4. Ensure backend is running on port 5000

### CORS Error?
- Verify backend has CORS configured for http://localhost:5175

### API returns "user not found"?
- Username in URL may be incorrect
- Profile may be private
- Try testing the URL directly in browser first

### Still not working?
Check:
1. Backend is running: http://localhost:5000 should show "Placement Prep Tracker API is running"
2. Frontend is running: http://localhost:5175 should load the app
3. Server terminal for actual error messages
4. Client console (F12) for JavaScript errors

---
**Last Updated**: January 4, 2026
