# Invoicer (In Progress)

![Design preview](./preview.jpg)

## Table of contents

- [Invoicer (In Progress)](#invoicer-in-progress)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Project Links](#project-links)
  - [My process](#my-process)
    - [Building with](#building-with)
    - [The challenge (Situation)](#the-challenge-situation)
    - [Expected Behaviour (Tasks)](#expected-behaviour-tasks)
  - [Author](#author)

## Overview

This project uses the STAR approach.

### Screenshot

![Invoicer](./screenshot.jpg)

### Project Links

Press . on the keyboard to view this project's code just like in Visual Studio Code

- Solution URL: [Frontend Repo](https://github.com/princemuel/invoice-web-app)
- Solution URL: [Backend Repo](https://your-solution-url.com)
- Live Site URL: [Live Site](https://invoicer.vercel.app)

## My process

### Building with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/docs) - For component composition and styles

### The challenge (Situation)

View the User Stories at the [User Stories Markdown File](./stories.md)

### Expected Behaviour (Tasks)

- Creating an invoice
  - When creating a new invoice, an ID needs to be created. Each ID should be 2 random uppercased letters followed by 4 random numbers.
  - Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
  - Changing the Payments Terms field should set the `paymentDue` property based on the `createdAt` date plus the numbers of days set for the payment terms.
  - The `total` should be the sum of all items on the invoice.
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
  - If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
- Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
- Users should receive a confirmation modal when trying to delete invoices.
- Feel free not to add custom styling for the date and dropdown form fields. The designs for those fields are optional extras and are mostly for illustration purposes.

## Author

- Website - [Prince Muel](https://princemuel.vercel.app/)
- LinkedIn - [@princemuel](https://linkedin.com/in/princemuel/)
- Twitter - [@iamprincemuel](https://twitter.com/iamprincemuel)
- Frontend Mentor - [@princemuel](https://www.frontendmentor.io/profile/princemuel)
