type Props = {};

const CreateInvoice = (props: Props) => {
  return (
    <section aria-labelledby='create-invoice' className='h-container'>
      <header className='mt-10'>
        <h1
          id='create-invoice'
          className='text-primary-900 dark:text-neutral-100'
        >
          New Invoice
        </h1>
      </header>

      <form className='my-10'>
        {/*<!--------- SENDER DETAILS START ---------!>*/}
        <fieldset className='grid grid-cols-6 gap-6'>
          <legend className='body-100 col-span-6 block font-bold text-primary-500'>
            Bill From
          </legend>
          <div className='col-span-6 mt-10'>
            <label
              htmlFor='sender-street'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Street Address
            </label>
            <input
              type='text'
              id='sender-street'
              name='sender-street'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='19 Union Terrace'
            />
          </div>

          <div className='col-span-3 max-s:col-span-6 sx:col-span-2'>
            <label
              htmlFor='sender-city'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              City
            </label>
            <input
              type='text'
              id='sender-city'
              name='sender-city'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='London'
            />
          </div>

          <div className='col-span-3 max-s:col-span-6 sx:col-span-2'>
            <label
              htmlFor='sender-postCode'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Post Code
            </label>
            <input
              type='text'
              id='sender-postCode'
              name='sender-postCode'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='E1 3EZ'
            />
          </div>

          <div className='col-span-6 sx:col-span-2'>
            <label
              htmlFor='sender-country'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Country
            </label>

            <input
              type='text'
              id='sender-country'
              name='sender-country'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='United Kingdom'
            />
          </div>
        </fieldset>
        {/*<!--------- SENDER DETAILS END ---------!>*/}

        {/*<!--------- CLIENT DETAILS START ---------!>*/}
        <fieldset className='mt-20 grid grid-cols-6 gap-6'>
          <legend className='body-100 col-span-6 block font-bold text-primary-500'>
            Bill To
          </legend>
          <div className='col-span-6 mt-10'>
            <label
              htmlFor='client-name'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Client&#39;s Name
            </label>
            <input
              type='text'
              id='client-name'
              name='client-name'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='Alex Grim'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='client-email'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Client&#39;s Email
            </label>
            <input
              type='email'
              id='client-email'
              name='client-email'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='e.g. alexgrim@mail.com'
            />
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='client-street'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Street Address
            </label>
            <input
              type='text'
              id='client-street'
              name='client-street'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='84 Church Way'
            />
          </div>

          <div className='col-span-3 max-s:col-span-6 sx:col-span-2'>
            <label
              htmlFor='client-city'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              City
            </label>
            <input
              type='text'
              id='client-city'
              name='client-city'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='Bradford'
            />
          </div>

          <div className='col-span-3 max-s:col-span-6 sx:col-span-2'>
            <label
              htmlFor='client-postCode'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Post Code
            </label>
            <input
              type='text'
              id='client-postCode'
              name='client-postCode'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='BD1 9PB'
            />
          </div>

          <div className='col-span-6 sx:col-span-2'>
            <label
              htmlFor='client-country'
              className='body-100 block text-primary-500 dark:text-primary-100'
            >
              Country
            </label>

            <input
              type='text'
              id='client-country'
              name='client-country'
              className='body-100 mt-6 w-full rounded-lg border border-primary-100 bg-neutral-100 py-6 px-8 font-bold text-primary-900 outline-none hover:border-primary-500 focus:border-primary-500 dark:border-primary-600 dark:bg-primary-700 dark:text-primary-100 dark:hover:border-primary-500 dark:focus:border-primary-500'
              placeholder='United Kingdom'
            />
          </div>
        </fieldset>
        {/*<!--------- CLIENT DETAILS END ---------!>*/}
      </form>
    </section>
  );
};

export { CreateInvoice };
