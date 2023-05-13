# Invoice Note (In Progress)

![Design preview](./preview.jpg)

## Table of contents

- [Invoice Note (In Progress)](#invoice-note-in-progress)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Project Links](#project-links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [The challenge (Situation)](#the-challenge-situation)
    - [Expected Behaviour (Tasks)](#expected-behaviour-tasks)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)

## Overview

This project was bootstrapped using Vite and uses the STAR approach.

### Screenshot

![Invoice Note](./screenshot.jpg)

### Project Links

Press `.` on the keyboard to view this project's code just like in Visual Studio Code

- [Frontend Repository](https://github.com/princemuel/invoice-web-app)
- [Live Site](https://invoicemail.vercel.app/)
- [Backend Repository](https://github.com/princemuel/invoice-api)
- [Api Endpoint](https://invoicemailer.onrender.com/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Vite](https://vitejs.dev/guide/) - A next-gen frontend build tool for JavaScript that aims to provide a faster and leaner development experience for modern web projects
- [React](https://react.dev/learn) - A Javascript library for web and native user interfaces
- [Next.js](https://nextjs.org/docs) - A React framework for building web applications
- [Typescript](https://www.typescriptlang.org/docs/) - A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [Graphql](https://graphql.org/learn/) - A server-side runtime for executing queries using a type system you define for your data
- [TanStack Query for React](https://tanstack.com/query/latest/docs/react/overview) - A powerful asynchronous state management library for React which makes fetching, caching, synchronizing and updating server state in your web applications a breeze
- [Immer](https://immerjs.github.io/immer/) - A javascript package which helps you interact with your data by simply modifying it while keeping all the benefits of immutable data
- [Tailwind CSS](https://tailwindcss.com/docs/installation) - A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup
- [Headless UI](https://headlessui.com/) - Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS

### The challenge (Situation)

View the User Stories in the [User Stories Markdown File](./docs/stories.md)

### Expected Behaviour (Tasks)

- Creating an invoice
  - When creating a new invoice, an tag needs to be created. Each tag should be 2 random uppercased letters followed by 4 random numbers.
  - Invoices can be created either as drafts or as pending. Clicking "Save as Draft" should allow the user to leave any form field blank, but should create an ID if one doesn't exist and set the status to "draft". Clicking "Save & Send" should require all forms fields to be filled in, and should set the status to "pending".
  - Changing the Payments Terms field should set the `paymentDue` property based on the `issueDate` date plus the numbers of days set for the payment terms.
  - The `total` should be the sum of all items on the invoice.
- Editing an invoice
  - When saving changes to an invoice, all fields are required when the "Save Changes" button is clicked. If the user clicks "Cancel", any unsaved changes should be reset.
  - If the invoice being edited is a "draft", the status needs to be updated to "pending" when the "Save Changes" button is clicked. All fields are required at this stage.
- Users should be able to mark invoices as paid by clicking the "Mark as Paid" button. This should change the invoice's status to "paid".
- Users should receive a confirmation modal when trying to delete invoices.
- Add custom styling for the date and dropdown form fields.

### What I learned

- The proper way to work with state removing the need for boilerplate code and protecting it from future accidental modifications

- How to create event driven reducers to keep application logic out of the ui and instead in the reducer

```ts
// The Pattern
const reducer = (data) => (state, action) => {
  // ✅ you'll always have access to the latest server state in here
};

function App() {
  const { data } = useQuery(key, queryFn);
  const [state, dispatch] = React.useReducer(reducer(data));
}

// My Version
function authReducer(user?: Partial<IUser>, token?: string) {
  return produce((draft: IState, action: IAction) => {
    switch (action) {
      case 'auth/addUser':
        draft.user = user;
        break;
      case 'auth/addToken':
        draft.token = token;
        break;
      case 'auth/logout':
        draft.token = undefined;
        draft.user = undefined;
        break;
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  });
}

function useAuth(client: GraphQLClient) {
  const refreshAuthQuery = useRefreshAuthQuery(client);
  const userQuery = useGetUserQuery(client);

  const token = refreshAuthQuery?.data?.refreshAuth?.token;
  if (token) client.setHeader('authorization', `Bearer ${token}`);

  const user = userQuery?.data?.user;

  const reducer = authReducer(user, token);
  return useReducer(reducer, initialState);
}
```

### Continued development

### Useful resources

- [Javascript:The Definitive Guide](https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/) - This book by author David Flanagan helped me improve in my Javascript knowledge. I really liked this book and it will be my companion guide going forward cus' there are still some important concepts I have to master.

- [React TypeScript Tutorial: Polymorphic Components](https://youtu.be/uZ8GZm5KEXY?list=PLC3y8-rFHvwi1AXijGTKM0BKtHzVC-LSK) - This amazing video resource helped me finally understand how the reusable components in the existing component libraries are created. I'd recommend it to anyone who wants is not familiar with this concept.

- [Get a catch block error message with TypeScript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript) - This is an amazing article which helped me understand how to provide handle errors obtained in the catch block and make them type-safe. I'd recommend it to anyone still learning this concept.
- [Kent C. Dodds' Blog](hhttps://kentcdodds.com/blog) An awesome resource for major concepts in React, Typescript and so on. He also has a course [Epic React](https://epicreact.dev/) which expanded my React knowledge. I recommend it to everyone who wants to upgrade their thinking in React. Thanks Kent, you're the best 🎉
- [Tk Dodo's Blog](https://tkdodo.eu/blog/all) A verry useful resource for major concepts in React, React Query etc. The blog exposed me to the hidden features of things I'd been using in React, and I was able to get up to speed with React Query using the blog and docs. Thanks TK, you're awesome 🎉

## Author

- Website - [Prince Muel](https://princemuel.vercel.app/)
- LinkedIn - [@princemuel](https://linkedin.com/in/princemuel/)
- Twitter - [@iamprincemuel](https://twitter.com/iamprincemuel)
- Frontend Mentor - [@princemuel](https://www.frontendmentor.io/profile/princemuel)
