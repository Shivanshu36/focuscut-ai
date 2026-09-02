# SnapCut AI Studio

## Local and Vercel configuration

The frontend does not depend on the Vercel deployment. Local development and the Vercel deployment each load their own Vite environment variables and call the n8n webhooks directly.

For local development, copy `.env.example` to `.env.local` and set the n8n webhook base URL. Start the app from this directory with:

```bash
npm install
npm run dev
```

For Vercel, add the `VITE_N8N_API_URL` value in Project Settings → Environment Variables, then redeploy.

The n8n workflow must allow browser requests from both `http://localhost:5173` and the Vercel domain.

You are an expert senior full-stack developer, UI/UX designer, product architect, and SaaS engineer.

Build a complete, modern, production-ready SaaS web application called:

SNAPCUT AI

====================================================

1. PROJECT OVERVIEW

====================================================

SnapCut AI is an AI-powered web application that allows users to remove the background from images with a single click.

The core experience should be:

Upload Image → AI Processing → Background Removed → Preview Result → Download

The website should feel modern, premium, simple, fast, and trustworthy.

The primary target users are:

- Content creators

- E-commerce sellers

- Small businesses

- Digital marketers

- Social media users

- Designers

- Anyone who needs to quickly remove an image background

The main USP is:

"Remove image backgrounds instantly with AI — simple, fast, and professional."

The application should focus heavily on a frictionless user experience.

====================================================

2. TECH STACK

====================================================

Use the following stack:

Frontend:

- React

- JavaScript or TypeScript

- Vite

- React Router

Styling:

- Tailwind CSS

UI Components:

- shadcn/ui where suitable

- Lucide icons

State Management:

- React Context or Zustand

Forms:

- React Hook Form

- Zod validation where necessary

Backend / Automation:

- n8n Cloud

- Use n8n webhooks as the primary backend/API layer

Payments:

- Payment provider to be configured

Deployment:

- Frontend should be deployable on Vercel or Netlify

- n8n workflows will be managed through n8n Cloud

IMPORTANT:

Do NOT use Next.js.

Build the application using React + Vite only.

The codebase should be clean, modular, scalable, and easy to migrate later if needed.

====================================================

3. BRAND IDENTITY

====================================================

Brand Name:

SnapCut AI

Logo:

Use the provided SnapCut AI logo as the main brand identity.

The logo contains a modern visual symbol with the text:

SNAPCUT AI

The visual style should follow the logo's existing color scheme.

Primary visual direction:

- Purple gradient

- Pink / magenta gradient

- Violet tones

- Dark professional backgrounds

- White content areas

- Soft purple highlights

Suggested brand colors:

Primary Purple:

#6C2CF4

Primary Violet:

#8B5CF6

Magenta / Pink:

#EC4899

Dark Background:

#0F0A1F

Secondary Dark:

#1A1028

White:

#FFFFFF

Light Background:

#F8F7FC

Muted Text:

#6B7280

Use smooth gradients such as:

linear-gradient(

  135deg,

  #6C2CF4,

  #8B5CF6,

  #EC4899

)

The design should feel:

- Premium

- AI-powered

- Modern

- Clean

- Minimal

- Professional

- Fast

- Creative

Avoid excessive gradients everywhere.

Use gradients primarily for:

- Primary buttons

- Logo-related elements

- Hero accents

- Important CTA sections

- Processing animations

====================================================

4. GLOBAL DESIGN SYSTEM

====================================================

Use:

- Clean modern typography

- Large headings

- Strong visual hierarchy

- Rounded corners

- Soft shadows

- Spacious layouts

- Subtle animations

- Smooth hover effects

Recommended border radius:

- Small components: 8px

- Buttons: 10px to 12px

- Cards: 16px to 24px

- Large upload containers: 24px

Use consistent spacing.

The website must be fully responsive for:

- Desktop

- Tablet

- Mobile

Mobile experience must be considered from the beginning.

====================================================

5. MAIN WEBSITE PAGES

====================================================

Create the following pages:

1. Home Page

2. Background Remover Tool

3. Login Page

4. Signup Page

5. Pricing Page

6. User Dashboard

7. Account / Profile Page

8. FAQ Section

9. Contact Page

10. Privacy Policy

11. Terms of Service

====================================================

6. NAVIGATION

====================================================

Create a professional sticky navigation bar.

Left side:

- SnapCut AI logo

Navigation links:

- Home

- Remove Background

- Pricing

- FAQ

Right side:

For unauthenticated users:

- Login

- Sign Up button

For authenticated users:

- Dashboard

- Credits indicator

- Profile dropdown

Primary CTA:

"Remove Background"

The CTA should use the SnapCut AI purple-to-pink gradient.

====================================================

7. HOME PAGE

====================================================

Create a premium SaaS landing page.

SECTION 1: HERO

Main heading:

"Remove Image Backgrounds in One Click"

Supporting text:

"Upload any image and let SnapCut AI remove the background instantly using powerful AI."

Primary CTA:

"Remove Background Free"

Secondary CTA:

"See How It Works"

Hero visual:

Create a large interactive background removal demonstration.

Show:

- Original image

- Processed image

- Transparent background with checkerboard pattern

Use a before/after comparison slider.

The visual should clearly communicate what the product does within seconds.

Add subtle animated gradient effects in the background.

----------------------------------------------------

SECTION 2: UPLOAD CTA

Create a large upload box.

Display:

"Drop your image here"

Supporting text:

"or click to upload"

Accepted formats:

PNG, JPG, JPEG, WEBP

Maximum file size:

Use a configurable limit.

Add:

- Upload icon

- Drag and drop functionality

- Click to upload functionality

Below the upload area:

"No sign-up required to try it."

The user should be able to start processing immediately.

----------------------------------------------------

SECTION 3: HOW IT WORKS

Display 3 simple steps.

Step 1:

Upload Your Image

Upload any image from your device.

Step 2:

AI Removes Background

Our AI automatically detects and removes the background.

Step 3:

Download Your Image

Preview the result and download your new transparent image.

Use clean icons and subtle animations.

----------------------------------------------------

SECTION 4: FEATURES

Create feature cards.

Feature 1:

AI-Powered

Smart AI automatically detects the main subject.

Feature 2:

One-Click Removal

Remove backgrounds without complicated editing.

Feature 3:

Fast Processing

Get your image processed in seconds.

Feature 4:

High Quality

Preserve image quality and clean subject edges.

Feature 5:

Transparent Background

Download images with transparent PNG backgrounds.

Feature 6:

Easy to Use

No design skills required.

----------------------------------------------------

SECTION 5: USE CASES

Create cards for:

- E-commerce Products

- Social Media Content

- Profile Pictures

- Marketing Materials

- Product Photography

- Creative Design

Use attractive visuals or icons.

----------------------------------------------------

SECTION 6: BEFORE AND AFTER DEMO

Create another interactive before/after comparison.

This should be visually prominent.

The user should be able to drag a slider to compare:

Original → Background Removed

----------------------------------------------------

SECTION 7: PRICING CTA

Display a simplified preview of pricing.

Example:

Free

₹0

- Limited free credits

- Standard quality

- PNG downloads

Pro

₹XX / month

- More credits

- High-quality processing

- Faster processing

- Priority support

Add CTA:

"View Pricing"

Pricing values should be configurable.

----------------------------------------------------

SECTION 8: FAQ

Create an accordion.

Questions:

- Is SnapCut AI free?

- What image formats are supported?

- How long does processing take?

- Can I download transparent images?

- Do I need to install software?

- What happens to my uploaded images?

- How do credits work?

----------------------------------------------------

SECTION 9: FINAL CTA

Heading:

"Ready to Remove Your Background?"

Supporting text:

"Upload your image and let AI do the work."

Button:

"Try SnapCut AI Free"

====================================================

8. BACKGROUND REMOVER TOOL

====================================================

This is the core product page.

Create a professional tool interface.

The interface should have three major states.

----------------------------------------------------

STATE 1: UPLOAD

Display a large upload area.

Text:

"Upload an Image"

Supporting text:

"Drag and drop your image here, or click to browse."

Supported formats:

PNG, JPG, JPEG, WEBP

Features:

- Drag and drop

- File browser

- File validation

- Upload progress

- Error handling

Show errors for:

- Unsupported file type

- File too large

- Upload failure

----------------------------------------------------

STATE 2: PROCESSING

After upload, show:

- Uploaded image preview

- Processing animation

- AI loading indicator

Text:

"Removing background with AI..."

Add:

- Animated progress indicator

- Estimated processing message

- Disable duplicate requests

The UI should feel fast and polished.

----------------------------------------------------

STATE 3: RESULT

Show a large result comparison interface.

Include:

- Original image

- Background removed image

- Before/after slider

- Checkerboard background for transparency

Actions:

- Download PNG

- Download JPG

- Remove Another Background

If JPG is selected, allow the user to choose a background color.

Add an optional enhancement section:

"Change Background"

Options:

- Transparent

- White

- Black

- Custom Color

Do not overcomplicate the initial version.

====================================================

9. AI PROCESSING ARCHITECTURE

====================================================

The React frontend should NOT directly expose secret API keys.

Use the following flow:

1. User uploads an image

2. Frontend validates the file

3. Frontend sends the file to an n8n webhook

4. n8n receives the image

5. n8n sends the image to the configured background removal AI service

6. The AI processes the image

7. n8n receives the processed result

8. n8n sends the result or result URL back to the frontend

9. React displays the processed image

Design the code so the AI provider can be easily changed later.

Create environment variables for:

VITE_N8N_API_URL

VITE_MAX_FILE_SIZE

VITE_APP_NAME

Do not hardcode URLs.

Create a centralized API service layer.

Example structure:

src/

  api/

    backgroundRemoval.js

  components/

    common/

    home/

    tool/

    dashboard/

  pages/

  hooks/

  context/

  utils/

  config/

The frontend should handle:

- Loading states

- Errors

- Timeouts

- Retry functionality

====================================================

10. AUTHENTICATION

====================================================

Create a complete authentication UI.

Pages:

Login

Fields:

- Email

- Password

Actions:

- Login

- Forgot Password

- Sign Up

Signup

Fields:

- Name

- Email

- Password

- Confirm Password

The authentication API should connect through configurable endpoints or n8n workflows.

Do not hardcode a specific authentication provider unless necessary.

Structure the application so authentication can later integrate with:

- Supabase

- Firebase

- Auth0

- Custom backend

Use an authentication context.

====================================================

11. USER DASHBOARD

====================================================

Create a clean SaaS dashboard.

Header:

"Welcome back, [User Name]"

Dashboard statistics:

- Available Credits

- Images Processed

- Current Plan

Add a credit usage card.

Example:

Credits Remaining

7 / 10

Include a progress bar.

Create a Recent Images section.

Each item should display:

- Image thumbnail

- Date

- Status

- Download button

If no images exist:

"No images processed yet."

CTA:

"Remove Your First Background"

====================================================

12. USER ACCOUNT PAGE

====================================================

Allow users to manage:

Profile:

- Name

- Email

Account:

- Password change

Subscription:

- Current plan

- Credits remaining

- Upgrade plan button

Billing:

- Payment history placeholder

- Invoice placeholder

====================================================

13. PRICING PAGE

====================================================

Create a modern pricing page.

Display at least 3 plans.

Example:

FREE

₹0

- Limited credits

- Standard processing

- PNG download

PRO

₹XX / month

- More monthly credits

- Faster processing

- High-quality images

- Priority processing

BUSINESS

₹XX / month

- Large number of credits

- Priority processing

- Business usage

- Priority support

Highlight the Pro plan as:

"Most Popular"

The exact prices and credits should be easy to change from a configuration file.

====================================================

14. PAYMENT INTEGRATION

====================================================

Use a secure payment provider through the backend.

Payment flow:

1. User clicks Upgrade

2. User selects a subscription or credit package

3. Frontend requests payment/order creation through backend/n8n

4. Backend creates or prepares the payment

5. Hosted checkout opens

6. User completes payment

7. Payment verification is handled securely through n8n/backend

8. User's subscription or credits are updated

9. Frontend refreshes the user's account information

IMPORTANT:

Never expose payment secrets in the frontend.

Use environment variables and backend workflows for sensitive operations.

Handle:

- Successful payment

- Failed payment

- Cancelled payment

- Payment verification

- Duplicate payment protection

Create a reusable payment service.

====================================================

15. CREDITS SYSTEM

====================================================

The application should use a credit-based system.

Example:

Free users:

10 credits

Each background removal:

1 credit

The system should check:

- Is the user authenticated?

- Does the user have available credits?

- If yes → allow processing

- If no → show upgrade modal

If credits reach zero:

Show a professional modal.

Heading:

"You're Out of Credits"

Text:

"Upgrade your plan to continue removing image backgrounds."

Actions:

- View Plans

- Buy Credits

Credit rules should be configurable.

====================================================

16. ERROR HANDLING

====================================================

Create professional error states.

Handle:

- Invalid image

- Large file

- Upload failure

- AI processing failure

- Network error

- Payment failure

- Authentication failure

- Insufficient credits

Use toast notifications where appropriate.

Every major action should have:

- Loading state

- Success feedback

- Error feedback

====================================================

17. ANIMATIONS

====================================================

Use subtle, modern animations.

Examples:

- Button hover effects

- Upload drag state

- Smooth page transitions

- Fade-in content

- Processing animation

- Skeleton loading states

- Before/after slider movement

Do not overuse animations.

Performance is more important than excessive visual effects.

====================================================

18. RESPONSIVE DESIGN

====================================================

The application must work perfectly on:

Desktop:

- Full-width layouts

- Multi-column sections

Tablet:

- Adjusted grid layouts

Mobile:

- Single-column layouts

- Large touch targets

- Responsive navigation

- Optimized upload experience

Use a mobile-first approach.

====================================================

19. PERFORMANCE

====================================================

Optimize for:

- Fast loading

- Lazy loading where appropriate

- Optimized images

- Minimal bundle size

- Efficient API calls

Avoid unnecessary dependencies.

Do not add heavy libraries unless they provide significant value.

====================================================

20. SEO

====================================================

Create SEO-friendly page titles and meta descriptions.

Homepage title:

"SnapCut AI – Remove Image Backgrounds Instantly"

Meta description:

"Remove image backgrounds instantly using AI. Upload your image and download a clean transparent background in seconds."

====================================================

21. ACCESSIBILITY

====================================================

Ensure:

- Keyboard navigation

- Proper button labels

- Accessible forms

- Image alt text

- Sufficient contrast

- Focus states

====================================================

22. CODE QUALITY

====================================================

Follow best practices:

- Reusable components

- Clean folder structure

- Centralized configuration

- Environment variables

- No hardcoded secrets

- Modular API services

- Reusable UI components

- Proper error handling

- Maintainable code

Use clear and meaningful naming.

Avoid unnecessary complexity.

====================================================

23. IMPORTANT DESIGN RESTRICTIONS

====================================================

Do NOT create:

- A generic template-looking website

- Excessive glassmorphism

- Too many gradients

- Excessive animations

- Cluttered interfaces

- Oversized text everywhere

- Too many cards

- Unnecessary features

The final website should feel like a real modern AI SaaS product.

The main focus should always be:

UPLOAD IMAGE → REMOVE BACKGROUND → DOWNLOAD RESULT

====================================================

24. FINAL DELIVERABLE

====================================================

Generate a complete working React + Vite application.

Include:

- All required pages

- Responsive design

- Routing

- Reusable components

- Authentication UI and architecture

- Background removal workflow integration

- n8n webhook integration layer

- Payment architecture

- Credits system

- User dashboard

- Pricing page

- Error handling

- Loading states

- Modern animations

- Environment configuration

- Clean project structure

Make the application visually polished and production-ready.

Do not use placeholder sections unnecessarily.

Build the UI as a functional product rather than only a static landing page.

Prioritize a premium user experience, clean architecture, and easy future scalability.

The final result should look like a professional AI SaaS startup called SnapCut AI.   use the attached image as logo and for website colour theme  identification

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/576fb081-374e-420c-bf8e-f05fa6faa405).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
