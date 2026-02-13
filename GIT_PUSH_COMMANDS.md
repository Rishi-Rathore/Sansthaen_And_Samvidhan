# 🚀 GitHub Pe Push Karne Ke Commands

## Step 1: Git Status Check Karo
```bash
git status
```

## Step 2: Saari Files Add Karo
```bash
git add .
```

## Step 3: Commit Karo
```bash
git commit -m "Fixed forgot password functionality with production URLs"
```

## Step 4: GitHub Pe Push Karo
```bash
git push origin main
```

**Ya agar branch name `master` hai:**
```bash
git push origin master
```

---

## 🔧 Agar Pehli Baar Push Kar Rahe Ho:

### Step 1: Git Initialize Karo (Agar nahi kiya)
```bash
git init
```

### Step 2: Remote Repository Add Karo
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Step 3: Files Add Karo
```bash
git add .
```

### Step 4: Commit Karo
```bash
git commit -m "Initial commit - Forgot password system"
```

### Step 5: Branch Set Karo
```bash
git branch -M main
```

### Step 6: Push Karo
```bash
git push -u origin main
```

---

## ⚠️ Important: .gitignore Check Karo

Ye files push NAHI honi chahiye:
- `node_modules/`
- `.env`
- `*.log`

`.gitignore` file already hai, check karo:
```bash
cat .gitignore
```

---

## 🔐 Sensitive Files Ko Protect Karo

**IMPORTANT:** `.env` file mein sensitive data hai (API keys, passwords). 

### Option 1: .env Ko Ignore Karo (Recommended)
`.gitignore` mein already hai, confirm karo:
```bash
echo "backend/.env" >> .gitignore
echo ".env" >> .gitignore
```

### Option 2: Environment Variables Ko GitHub Secrets Mein Daalo
1. GitHub repo → Settings → Secrets and variables → Actions
2. New repository secret add karo:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`

---

## 📋 Quick Commands (Copy-Paste)

```bash
# Check status
git status

# Add all files
git add .

# Commit with message
git commit -m "Updated forgot password with production URLs"

# Push to GitHub
git push origin main
```

---

## 🚨 Common Errors & Solutions

### Error: "fatal: not a git repository"
**Solution:**
```bash
git init
git remote add origin YOUR_REPO_URL
```

### Error: "failed to push some refs"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied (publickey)"
**Solution:**
1. GitHub → Settings → SSH and GPG keys
2. Add your SSH key
3. Ya HTTPS use karo instead of SSH

---

## ✅ Verify Push

GitHub pe jao aur check karo:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
```

Files dikhai deni chahiye!

---

**Ready to push? Terminal mein ye commands run karo! 🚀**
