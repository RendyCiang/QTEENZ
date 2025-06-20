# QTEENZ | SOFTWARE ENGINEERING & AGILE PROJECT

Welcome to the QTEENZ documentation!

This documentation explains the QTEENZ project, a completed software engineering and agile development initiative.

## Contents

- [Overview](#1-overview)
- [Software Architecture](#2-software-architecture)

## 1. Overview

QTEENZ is a web-based and mobile-accessible application designed to solve long queue issues and inefficient break times at BINUS Anggrek canteens. Based on surveys from students, staff, and canteen vendors, the app enables pre-ordering meals, real-time order tracking, and provides vendors with a dashboard to manage and monitor sales, ultimately increasing convenience and efficiency for all.

## 2. Software Architecture

![Software Architecture](./SoftwareArchitecture.png)
This project was built using the **PERN Stack** (PostgreSQL, Express.js, React.js, and Node.js), combining powerful backend and frontend technologies to deliver a modern web application.

For the database, this project uses **Supabase** as a managed PostgreSQL provider.

To interact with the database in a type-safe and efficient way, **Prisma ORM** is used as the Object-Relational Mapping tool, enabling easy querying, migrations, and schema management.

Additionally, the application implements **PWA (Progressive Web App)** features, enabling users to experience an app-like interface with offline support and enhanced performance on mobile and desktop platforms.

This architecture combines modern tools to deliver a scalable and maintainable full-stack web application.
