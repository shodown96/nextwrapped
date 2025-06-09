import { APP_EMAIL_CONTACT, APP_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { marked } from 'marked'
import React from 'react'

const EULA = `# End User Agreement

**Effective Date: 1st, June, 2025**

Welcome to **${APP_NAME}** — a web application that gives you a personalized snapshot of your Spotify listening habits. This End User Agreement (“Agreement”) governs your access to and use of the ${APP_NAME} web application (“App”). By using the App, you agree to be bound by this Agreement.

---

## 1. Purpose

${APP_NAME} is a **non-commercial** project created for entertainment and educational purposes only. It allows users to view their top Spotify artists, tracks, and other listening insights using Spotify’s Web API.

---

## 2. Use of Spotify APIs

${APP_NAME} uses the Spotify Web API to access your listening data **only after your explicit authorization** through Spotify’s secure login system (OAuth). The App is **not affiliated with, endorsed by, or certified by Spotify AB** in any way.

---

## 3. User Data

- ${APP_NAME} accesses your Spotify data solely to generate your personal music summary.
- No personal data is stored on our servers.
- Your data is never shared, sold, or used for marketing purposes.

For more details, please see our [Privacy Policy](#privacy-policy).

---

## 4. User Obligations

By using ${APP_NAME}, you agree that you will:
- Use the App only for lawful, personal, and non-commercial purposes.
- Not attempt to reverse-engineer, copy, or distribute any part of the App.

---

## 5. Disclaimer

The App is provided **"as-is"** without warranties of any kind. ${APP_NAME} makes no guarantees about the accuracy, completeness, or availability of the App.

---

## 6. Limitation of Liability

To the maximum extent permitted by law, ${APP_NAME} and its creators shall not be liable for any damages arising from the use or inability to use the App.

---

## 7. Termination

We reserve the right to suspend or terminate access to ${APP_NAME} at any time, without notice, for conduct that we believe violates this Agreement or is harmful to other users or third parties.

---

## 8. Changes to This Agreement

We may update this Agreement from time to time. Continued use of the App after changes means you accept the updated terms.

<div id="privacy-policy"></div>

---
# Privacy Policy

**Effective Date: 1st, June, 2025**

Your privacy matters to us. This Privacy Policy explains how ${APP_NAME} handles your information.

---

## 1. What Data We Collect

When you log in with Spotify, we request access to the following:
- Your top artists and tracks
- Your Spotify display name and profile image
- Your Spotify user ID

---

## 2. How We Use Your Data

We use your data **only** to:
- Display your personalized music summary
- Generate visuals or stats for your own use

Your data is processed **in your browser** and is **not stored on our servers**.

---

## 3. Data Retention

${APP_NAME} does not store any Spotify user data beyond your active session.

---

## 4. Third Parties

We do **not** share your data with any third parties.

---

## 5. Security

While no system is 100% secure, we follow standard practices to protect your data during its brief use in the app. Data is accessed via Spotify's secure OAuth 2.0 authentication.

---

## 6. Your Rights

You may revoke ${APP_NAME}'s access to your Spotify account at any time by visiting your [Spotify Apps Settings](https://www.spotify.com/account/apps/).

---

## 7. Contact

For questions about this policy or your data, contact: ${APP_EMAIL_CONTACT}

---

By using ${APP_NAME}, you confirm that you have read and agree to this Privacy Policy and the End User Agreement.
`

export default function page() {
    return (
        <div className="p-10 eula">
            <div className={cn(
                "prose prose-lg",
                "prose-h1:text-white prose-h2:text-white prose-p:text-white",
                "prose-strong:text-white",
                "prose-li:text-white",
                "prose-a:text-primary"
            )}
                dangerouslySetInnerHTML={{
                    __html: marked.parse(EULA)
                }}>
            </div>
        </div>
    )
}
// next-mdx-remote