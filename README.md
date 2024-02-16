# Welcome to Invoice Manager

Invoice Manager is an

## Table of contents

- [Welcome to Invoice Manager](#welcome-to-invoice-manager)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Links](#links)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Contribution](#contribution)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Deployment](#deployment)
    - [Do It Yourself](#do-it-yourself)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![Invoice Manager](./preview.jpg)

### Links

- Repository: [https://github.com/princemuel/invoicemanager](https://github.com/princemuel/invoicemanager)
- Live Site: [https://invoicemanager.vercel.app](https://invoicemanager.vercel.app/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://react.dev/) - The JS library for web and native user interfaces
- [Remix](https://remix.run/docs) - The full stack React web framework that uses web standards
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup

### What I learned

1. I faced a challenge where I desired real-time synchronization between the user's input in the price and quantity fields, with an immediate computation of the result. Although the code I wrote was somewhat intricate, I successfully implemented it by leveraging React's useEffect to trigger the component's re-render when the inputs (price and quantity) changed. While I acknowledge that opting for a readonly input to register changes could have been a simpler approach, I intentionally chose the approach I took to experiment with achieving the same result in a different manner. Additionally, I took precautions to simplify the variable names and the code for better understanding.

```tsx
// The Real Time Input Sync Code: It renders the total in an <output></output>
useEffect(() => {
  const subscription = watch((_, { name, type }) => {
    const value = getValues();

    if (type === "change" && name) {
      if (name.endsWith("quantity") || name.endsWith("price")) {
        type FieldValueType = FieldPathValue<typeof value, typeof name>;

        const { items } = value;
        const [, indexString, fieldName] = name.split(".");
        const index = parseInt(indexString);

        const fieldValue: FieldValueType = get(value, name);

        if (fieldValue) {
          if (fieldName === "quantity")
            setValue(
              `items.${index}.total`,
              approximate(calculateTotal(fieldValue, items[index].price)),
            );
          else if (fieldName === "price")
            setValue(
              `items.${index}.total`,
              approximate(calculateTotal(items[index].quantity, fieldValue)),
            );
        }
      }
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, [getValues, setValue, watch]);
```

2. I wrote a function calculateTotal that calculates the total value based on its input

Use Case:

- Total of 2 numbers
- Total an array of items based on the total of each item
- Total an array of items based on the price and quantity in each item object

```tsx
export function calculateTotal<T extends FirstArg>(
  a?: T,
  b?: T extends number ? NonNullable<T>
  : T extends (infer _)[] ? "total"
  : never,
) {
  // Safely parses a value to a number and guards against NaN and negative zero.
  function const numberGuard = (value: any, defaultValue: number = 0): number => {
    const parsed = Number(value);
    return Number.isNaN(parsed) || Object.is(parsed, -0) ? defaultValue : parsed;
  };

  if (Array.isArray(a)) {
    return a.reduce((acc, item) => {
      const { total = 0, quantity = 0, price = 0 } = item;
      return b === "total" ? acc + total : acc + quantity * price;
    }, 0);
  }

  // bailout since the function expects 2 number params, or an array params
  return numberGuard(a) * numberGuard(b);
}

calculateTotal(10, 5);  // 50
calculateTotal([{ total: 100 }, { total: 200 }], "total"); // 300
calculateTotal([{ quantity: 3, price: 20 }, { quantity: 2, price: 15 }]); // 90
calculateTotal([{ total: 100 }, { quantity: 2, price: 30 }, { total: 50 }],'total'); // 210

```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Contribution

To contribute to this project please check out the contribution guidelines.

### Prerequisites

Before cloning/forking this project, make sure you have the following tools installed:

- [Git](https://git-scm.com/downloads)
- [Node.JS](https://nodejs.org/en/download/)

### Installation

From your terminal:

Clone the project

```sh
# Choose one method out of these 3 c
git clone git@github.com:princemuel/invoicemanager.git # clone with git history

git clone git@github.com:your_username/invoicemanager.git # if you forked the project

npx degit git@github.com:princemuel/invoicemanager # clone without git history
```

Navigate to the project directory

```sh
cd invoicemanager
```

Install the Dependencies

```sh
# This project uses pnpm but you can use your favorite package manager.
# Just make sure to remove the lockfile before installation is not using pnpm
pnpm install
```

This starts your app in development mode, rebuilding assets on file changes.

```sh
pnpm run dev # replace package manager name with your chosen package manager
```

### Deployment

First, build your app for production:

```sh
pnpm run build # replace package manager name with your chosen package manager
```

Then run the app in production mode:

```sh
pnpm start # replace package manager name with your chosen package manager
```

Now you'll need to pick a host to deploy it to.

### Do It Yourself

If you're familiar with deploying Node.JS applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

## Author

- Twitter - [@iamprincemuel](https://www.x.com/princemuel)
- LinkedIn - [@princemuel](https://www.linkedin.com/in/princemuel)

## Acknowledgments
