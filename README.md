Collaborative Whiteboard App

A web-based drawing board built with Next.js, React, and Tldraw where users can draw, save, and restore their work even after refreshing the page.

Features

Draw shapes, lines, and freehand sketches on the canvas

Auto-save your drawing to the database in real-time

Refresh the page and your last work is restored automatically

Supports multiple boards via unique board IDs

Tech Stack

Frontend: React, Next.js, Tldraw

Backend: Next.js API routes

Database: Prisma + PostgreSQL (or any supported database)

Version Control: Git

Database Explanation:
Each whiteboard is stored as a single JSON snapshot in the database:
Column	Type	Description
id	String	Unique board identifier (boardId)
data	JSON	Full snapshot of the canvas including shapes, session info, and camera state

When a user draws, the app saves the snapshot via the PUT API route

When a board is opened, the app fetches the snapshot via the GET API route and restores the canvas

Using JSON allows storing all shapes, positions, and session information in one place.

Setup Instructions:
Installation Steps-
git clone <repo-url>
cd project-name
npm install

Install dependencies:
npm install

Set up the database with Prisma:
npx prisma migrate dev --name init

Run the development server:
npm run dev  

Testing Guide:-

Explain how to test:

User registration/login

Create project

Whiteboard functionality

Database entries

Edge cases
